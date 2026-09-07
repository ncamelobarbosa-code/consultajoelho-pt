# content/evidencia/

Um ficheiro JSON por página de patologia. Escritos **apenas** pelo agente mensal de
literatura (ou à mão, se preferires) e renderizados por `src/components/Evidencia.tsx`.

Regra de ouro: **o agente nunca edita `src/app/**/page.tsx`.** Esses ficheiros contêm
strings JS escapadas e um escape mal fechado parte o build. Tudo o que o agente
acrescenta ao site passa por aqui.

## Formato

```jsonc
{
  "slug": "lca",                       // tem de coincidir com a pasta em src/app/
  "atualizado": "2026-08-14",          // ISO. Data da revisão clínica humana, não da pesquisa
  "revistoPor": "Dr. Nuno Camelo",
  "referencias": [
    {
      "id": "kienberger2026leap",      // chave estável; as FAQ citam por aqui. Nunca reutilizar
      "autores": "Kienberger S, Kratochwil L, Gotterbarm T, et al.",
      "titulo": "Lateral extra-articular procedures reduce ACL graft failure...",
      "revista": "J ISAKOS",
      "ano": 2026,
      "tipo": "Revisão sistemática",   // ver NivelEvidencia em src/lib/evidencia.ts
      "pmid": "42142710",
      "doi": "10.1016/j.jisako.2026.101139",
      "resumoPt": "1–2 frases em português de Portugal, escritas para o doente."
    }
  ],
  "faq": [
    {
      "pergunta": "...?",
      "resposta": "...",
      "refs": ["kienberger2026leap"]   // tem de existir em referencias
    }
  ]
}
```

## Validar antes de commit

```bash
node scripts/evidencia-validate.mjs
```

Falha o build se: `refs` apontar para um `id` inexistente, houver `id` duplicado,
faltar DOI **e** PMID, `tipo` não for um nível reconhecido, ou o total de perguntas
FAQ na página passar de 10 (limite prático para o rich snippet do Google).
