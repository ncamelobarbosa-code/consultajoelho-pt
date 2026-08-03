import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { agendaBlock } from '@/lib/agenda-block';

// googleapis precisa do runtime Node (não Edge); nunca cachear.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SHEET_ID = '1L9Fahg7XxW_RS8C0Mqzk5YKuBImCFN2yJ3ofSN1bm60';
const SHEET_TAB = 'Marcacoes_Extra';

// Dia da semana (1=Segunda … 5=Sexta) -> local por período.
const HORARIO: Record<number, { manha?: string; tarde?: string }> = {
  1: { manha: 'Lusíadas Porto', tarde: 'Lusíadas Porto' },            // Segunda
  2: { manha: 'Lusíadas Paços de Ferreira' },                          // Terça
  3: { manha: 'Lusíadas Porto' },                                      // Quarta
  4: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Lusíadas Porto' }, // Quinta
  5: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Misericórdia de Vila do Conde' }, // Sexta
};

const DIAS_NOME = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Calcular o dia da semana de forma determinística (UTC ao meio-dia evita
// deslizes de fuso: no Vercel o servidor corre em UTC).
function weekdayOf(dataISO: string): number {
  return new Date(dataISO + 'T12:00:00Z').getUTCDay(); // 0=Dom … 6=Sáb
}

function getLocal(dataISO: string, periodo: 'manha' | 'tarde'): string | null {
  const disp = HORARIO[weekdayOf(dataISO)];
  if (!disp || !disp[periodo]) return null;
  return disp[periodo]!;
}

// Formato compatível com o cenário Make existente (M/D/YYYY, sem zeros à esquerda).
function formatarDataSemZeros(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split('-');
  return `${parseInt(mes)}/${parseInt(dia)}/${ano}`;
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
  const tipo = body.tipo; // 'Presencial' | 'Vídeo'
  const dataConsulta = body.dataConsulta; // ISO YYYY-MM-DD
  const periodo = body.periodo as 'manha' | 'tarde';
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

  const local = getLocal(dataConsulta, periodo);
  if (!local) {
    return NextResponse.json({ error: 'Sem consulta disponível nesse dia/período.' }, { status: 400 });
  }

  // Agenda fechada (férias/ausência) — rejeitar no servidor
  if (agendaBlock(dataConsulta, tipo)) {
    return NextResponse.json({ error: 'Agenda indisponível nesta data (período de férias). Escolha outra data ou uma teleconsulta.' }, { status: 409 });
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
    // Verificar se o período (dia+período+tipo) já está ocupado.
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A:M`,
    });
    const rows = existing.data.values || [];

    const ocupado = rows.some((row) => {
      const rowTipo = row[5];
      const rowData = row[6];
      const rowPeriodo = row[8];
      const rowStatus = row[11];
      return (
        rowTipo === tipo &&
        rowData === dataFormatada &&
        rowPeriodo === periodo &&
        rowStatus === 'Confirmado'
      );
    });

    if (ocupado) {
      return NextResponse.json(
        { error: 'Este período já está esgotado. Por favor escolha outra data.' },
        { status: 409 },
      );
    }

    const diaSemana = DIAS_NOME[weekdayOf(dataConsulta)];

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

    return NextResponse.json({ success: true, local, diaSemana, periodo, data: dataFormatada });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro desconhecido.';
    console.error('[marcar-consulta] sheets', msg);
    return NextResponse.json({ error: 'Não foi possível registar a marcação. Tente novamente.' }, { status: 500 });
  }
}

// Disponibilidade de uma data: que combinações (período × tipo) já estão ocupadas.
// GET /api/marcar-consulta?date=YYYY-MM-DD -> { taken: { manha:{Presencial,Vídeo}, tarde:{...} } }
export async function GET(req: NextRequest) {
  const date = (new URL(req.url).searchParams.get('date') || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Data inválida.' }, { status: 400 });
  }

  const taken = {
    manha: { Presencial: false, 'Vídeo': false },
    tarde: { Presencial: false, 'Vídeo': false },
  };

  try {
    const sheets = getSheetsClient();
    const dataFormatada = formatarDataSemZeros(date);
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A:M` });
    const rows = res.data.values || [];
    for (const row of rows) {
      if (row[6] === dataFormatada && row[11] === 'Confirmado') {
        const p = row[8] as 'manha' | 'tarde';
        const tp = row[5] as 'Presencial' | 'Vídeo';
        if (taken[p] && tp in taken[p]) taken[p][tp] = true;
      }
    }
    return NextResponse.json({ date, taken });
  } catch (e) {
    console.error('[marcar-consulta GET]', e instanceof Error ? e.message : e);
    // Em caso de falha, devolver tudo livre (não bloquear a marcação; o POST valida à mesma).
    return NextResponse.json({ date, taken });
  }
}
