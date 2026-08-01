import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import {
  HORARIO,
  DIAS_NOME_PT,
  weekdayOf,
  getLocal,
  capacidadeDe,
  blackoutDe,
  type Periodo,
  type Tipo,
} from '@/lib/marcacoes';

// googleapis precisa do runtime Node (não Edge); nunca cachear.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SHEET_ID = '1L9Fahg7XxW_RS8C0Mqzk5YKuBImCFN2yJ3ofSN1bm60';
const SHEET_TAB = 'Marcacoes_Extra';

const TIPOS: Tipo[] = ['Presencial', 'Vídeo'];
const PERIODOS: Periodo[] = ['manha', 'tarde'];

// Índices de coluna na folha Marcacoes_Extra.
const COL = { tipo: 5, data: 6, periodo: 8, status: 11 } as const;

// Formato compatível com o cenário Make existente (M/D/YYYY, sem zeros à esquerda).
function formatarDataSemZeros(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split('-');
  return `${parseInt(mes)}/${parseInt(dia)}/${ano}`;
}

// Conta marcações ativas (Status != 'Cancelado') para uma (data, período, tipo).
// Presencial e Vídeo têm contadores independentes — não competem entre si.
function contarAtivas(
  rows: string[][],
  dataFormatada: string,
  periodo: Periodo,
  tipo: Tipo,
): number {
  return rows.filter(
    (row) =>
      row[COL.data] === dataFormatada &&
      row[COL.periodo] === periodo &&
      row[COL.tipo] === tipo &&
      row[COL.status] !== 'Cancelado',
  ).length;
}

function getSheetsClient() {
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const private_key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
  if (!client_email || !private_key) {
    throw new Error('Credenciais da Service Account em falta (env).');
  }
  const auth = new google.auth.GoogleAuth({
    credentials: { client_email, private_key },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const nome = (body.nome || '').trim();
  const dataNascimento = (body.dataNascimento || '').trim();
  const numeroSNS = (body.numeroSNS || '').trim();
  const telefone = (body.telefone || '').trim();
  const email = (body.email || '').trim();
  const tipo = body.tipo as Tipo; // 'Presencial' | 'Vídeo'
  const dataConsulta = body.dataConsulta; // ISO YYYY-MM-DD
  const periodo = body.periodo as Periodo;
  const motivo = (body.motivo || '').trim();

  // Validações (SNS é facultativo; se preenchido, tem de ter 9 dígitos)
  if (!nome || !telefone || !email || !tipo || !dataConsulta || !periodo) {
    return NextResponse.json({ error: 'Campos em falta.' }, { status: 400 });
  }
  if (numeroSNS && !/^\d{9}$/.test(numeroSNS)) {
    return NextResponse.json({ error: 'Número de SNS inválido (9 dígitos).' }, { status: 400 });
  }
  if (tipo !== 'Presencial' && tipo !== 'Vídeo') {
    return NextResponse.json({ error: 'Tipo de consulta inválido.' }, { status: 400 });
  }
  if (periodo !== 'manha' && periodo !== 'tarde') {
    return NextResponse.json({ error: 'Período inválido.' }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataConsulta)) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }
  // Rejeitar datas no passado (compara strings ISO em UTC)
  const hojeISO = new Date().toISOString().slice(0, 10);
  if (dataConsulta < hojeISO) {
    return NextResponse.json({ error: 'A data escolhida já passou.' }, { status: 400 });
  }

  // Bloqueio de férias — verificar ANTES da contagem.
  const blackout = blackoutDe(dataConsulta);
  if (blackout) {
    return NextResponse.json(
      { erro: 'indisponivel', motivo: blackout.motivo, ate: blackout.fim },
      { status: 409 },
    );
  }

  const local = getLocal(dataConsulta, periodo);
  if (!local) {
    return NextResponse.json({ error: 'Sem consulta disponível nesse dia/período.' }, { status: 400 });
  }

  let sheets;
  try {
    sheets = getSheetsClient();
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro de credenciais.';
    console.error('[marcar-consulta] auth', msg);
    return NextResponse.json({ error: 'Serviço indisponível de momento.' }, { status: 500 });
  }

  const dataFormatada = formatarDataSemZeros(dataConsulta);

  try {
    // Contar marcações ativas do mesmo (dia, período, tipo) e comparar com a capacidade.
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A:M`,
    });
    const rows = (existing.data.values || []) as string[][];

    const capacidade = capacidadeDe(tipo);
    const contagem = contarAtivas(rows, dataFormatada, periodo, tipo);

    if (contagem >= capacidade) {
      return NextResponse.json(
        { erro: 'periodo_esgotado', tipo, restantes: 0 },
        { status: 409 },
      );
    }

    const diaSemana = DIAS_NOME_PT[weekdayOf(dataConsulta)];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A:N`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(), // A Timestamp
          nome,                       // B
          numeroSNS,                  // C
          telefone,                   // D
          email,                      // E
          tipo,                       // F
          dataFormatada,              // G
          diaSemana,                  // H
          periodo,                    // I
          local,                      // J
          motivo,                     // K
          'Confirmado',               // L Status
          'FALSE',                    // M Notificado_Secretaria (o Make trata)
          dataNascimento,             // N Data_Nascimento (coluna nova; não altera índices 0-12 do Make)
        ]],
      },
    });

    // Vagas que sobram neste período/tipo depois de registar esta marcação.
    return NextResponse.json({
      success: true,
      data: dataFormatada,
      periodo,
      local,
      diaSemana,
      restantes: capacidade - contagem - 1,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro desconhecido.';
    console.error('[marcar-consulta] sheets', msg);
    return NextResponse.json({ error: 'Não foi possível registar a marcação. Tente novamente.' }, { status: 500 });
  }
}

// Disponibilidade de uma data: quantas vagas restam por (período × tipo).
// GET /api/marcar-consulta?date=YYYY-MM-DD
//   -> { date, blackout: {motivo,ate}|null, restantes: { manha:{Presencial,Vídeo}, tarde:{...} } }
export async function GET(req: NextRequest) {
  const date = (new URL(req.url).searchParams.get('date') || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }

  // Vagas iniciais = capacidade por tipo (antes de descontar as ocupadas).
  const restantesCheias = () => ({
    manha: { Presencial: capacidadeDe('Presencial'), 'Vídeo': capacidadeDe('Vídeo') },
    tarde: { Presencial: capacidadeDe('Presencial'), 'Vídeo': capacidadeDe('Vídeo') },
  });

  // Data de férias: tudo indisponível, sem sequer consultar a folha.
  const blackout = blackoutDe(date);
  if (blackout) {
    return NextResponse.json({
      date,
      blackout: { motivo: blackout.motivo, ate: blackout.fim },
      restantes: {
        manha: { Presencial: 0, 'Vídeo': 0 },
        tarde: { Presencial: 0, 'Vídeo': 0 },
      },
    });
  }

  const restantes = restantesCheias();

  try {
    const sheets = getSheetsClient();
    const dataFormatada = formatarDataSemZeros(date);
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A:M` });
    const rows = (res.data.values || []) as string[][];
    for (const p of PERIODOS) {
      for (const tp of TIPOS) {
        const usados = contarAtivas(rows, dataFormatada, p, tp);
        restantes[p][tp] = Math.max(0, capacidadeDe(tp) - usados);
      }
    }
    return NextResponse.json({ date, blackout: null, restantes });
  } catch (e) {
    console.error('[marcar-consulta GET]', e instanceof Error ? e.message : e);
    // Em caso de falha, devolver tudo livre (não bloquear a marcação; o POST valida à mesma).
    return NextResponse.json({ date, blackout: null, restantes: restantesCheias() });
  }
}
