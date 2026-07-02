import { google } from "googleapis";

// Corre no runtime Node (googleapis não funciona no Edge) e nunca em cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1L9Fahg7XxW_RS8C0Mqzk5YKuBImCFN2yJ3ofSN1bm60";
const TAB = "Form Responses 1";
const PROCESSO_HEADER = "Número de processo";
const CONFIRMADO_HEADER = "Confirmado";

// Índice 0-based -> letra de coluna A1 (A, B, ... Z, AA, AB, ...)
function colToA1(n: number): string {
  let s = "";
  let x = n + 1;
  while (x > 0) {
    const m = (x - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    x = Math.floor((x - 1) / 26);
  }
  return s;
}

const norm = (v: unknown) => (v ?? "").toString().trim();

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // A private key vem com "\n" escapados quando guardada em env var -> repor as quebras reais.
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("Credenciais da Service Account em falta (env).");
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function GET(req: Request) {
  const processo = norm(new URL(req.url).searchParams.get("processo"));
  if (!processo) {
    return Response.json({ error: "Número de processo em falta." }, { status: 400 });
  }

  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });

    // Ler a folha inteira (A1 notation: nome da tab com espaços entre plicas)
    const range = `'${TAB}'`;
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range });
    const rows = res.data.values || [];
    if (rows.length < 2) {
      return Response.json({ error: "A folha não tem dados." }, { status: 500 });
    }

    const header = rows[0].map(norm);
    const lower = header.map((h) => h.toLowerCase());
    const idxProc = lower.indexOf(PROCESSO_HEADER.toLowerCase());
    const idxConf = lower.indexOf(CONFIRMADO_HEADER.toLowerCase());
    if (idxProc < 0 || idxConf < 0) {
      return Response.json(
        { error: `Colunas "${PROCESSO_HEADER}" / "${CONFIRMADO_HEADER}" não encontradas.` },
        { status: 500 },
      );
    }
    // Coluna opcional para o carimbo de confirmação (se existir no Sheet).
    const idxData = lower.findIndex((h) => /(data|hora).*confirma|confirmad[oa].*(em|data)/.test(h));

    // Encontrar a linha do processo (i=1 salta o cabeçalho; +1 -> nº de linha 1-based do Sheet)
    let rowNum = -1;
    for (let i = 1; i < rows.length; i++) {
      if (norm(rows[i][idxProc]) === processo) {
        rowNum = i + 1;
        break;
      }
    }
    if (rowNum < 0) {
      return Response.json({ error: "Número de processo não encontrado." }, { status: 404 });
    }

    const carimbo = new Date().toLocaleString("pt-PT", {
      timeZone: "Europe/Lisbon",
      dateStyle: "short",
      timeStyle: "short",
    });

    const data: { range: string; values: string[][] }[] = [
      { range: `'${TAB}'!${colToA1(idxConf)}${rowNum}`, values: [["SIM"]] },
    ];
    if (idxData >= 0) {
      data.push({ range: `'${TAB}'!${colToA1(idxData)}${rowNum}`, values: [[carimbo]] });
    }

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: { valueInputOption: "USER_ENTERED", data },
    });

    return Response.json({ success: true, processo, confirmadoEm: carimbo });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erro desconhecido.";
    console.error("[/api/confirmar]", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
