# Relatório de Revisão Médica — consultajoelho.pt

**Agente:** medical-reviewer
**Data:** 2026-06-25
**Âmbito:** conteúdo clínico em `content/scraped-pages.json` (22 páginas; 14 clínicas + páginas de processo/CV)
**Natureza:** revisão (não foi alterado conteúdo). Sinalizados problemas de rigor clínico, atualidade científica, clareza para o paciente e tom/segurança.

> **Convenção de gravidade:**
> 🔴 **Alta** — afirmação clinicamente incorreta, potencialmente enganadora ou risco médico-legal (promessa/omissão de disclaimer).
> 🟠 **Média** — impreciso, desatualizado face à evidência, ou pode gerar expectativa errada.
> 🟡 **Baixa** — clareza, gralha, terminologia, consistência editorial.
>
> "A validar pelo médico" = ponto que depende de preferência clínica/posicionamento do Dr. e que **não devo decidir** por ele.

---

## Achados transversais (aplicam-se a várias páginas)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Ausência de disclaimer médico genérico.** Nenhuma página clínica tem aviso explícito do tipo "este conteúdo é informativo e não substitui consulta/avaliação individual". O texto até remete repetidamente para o cirurgião, mas falta a frase formal. | 🟠 Média | Adicionar rodapé padrão em todas as páginas clínicas: "Informação de carácter educativo. Não dispensa avaliação clínica individualizada nem constitui aconselhamento médico para o seu caso." Importante também por RGPD/publicidade médica (Ordem dos Médicos). |
| **Termo "cirurgião de joelho" como interlocutor para sintomas de 1ª linha.** Em várias páginas (artrocentese, entorse, banda iliotibial) sugere-se contactar "o seu cirurgião de joelho" para queixas que tipicamente passam primeiro pelo médico de família/MGF ou fisiatra. | 🟡 Baixa | Suavizar para "o seu médico assistente ou especialista de joelho", para não dar ideia de que tudo exige cirurgião. Já é feito em algumas páginas (menisco, quisto parameniscal) — uniformizar. |
| **Datas de revisão inconsistentes / anacrónicas.** Coexistem "Janeiro 2020", "Janeiro 2026", "Maio 2026", "06/2026" e páginas sem data (cartilagem tem "Janeiro 2026" no texto e "Janeiro 2026" na assinatura, mas a pág. 0 mantém "Janeiro 2020"). | 🟡 Baixa | Uniformizar formato e atualizar a página Gonalgia (pág. 0), que está datada de 2020 e é a página-mãe. |
| **grizo.pt mencionado 3× (entorse, medo, recuperar) como recomendação de crioterapia com compressão.** É uma marca comercial externa. | 🟠 Média | A validar pelo médico: confirmar se há relação/declaração de interesse. Em publicidade médica, recomendar marca comercial sem disclaimer pode ser problemático. Sugerir formulação neutra ("sistemas de crioterapia com compressão, disponíveis para aluguer") ou tornar explícita a ausência de conflito. |
| **Inconsistência com a regra de credenciais (memória do projeto).** Ver secção CV abaixo — "FIFA Medical Center of Excellence" aparece 2× na pág. 20, contrariando a regra 2026-06-21 de não expor FIFA/Lyon nas páginas públicas. | 🟠 Média | Ver tabela da página 20. |

---

## Página 0 — Gonalgia (`joelhodrnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Data "Janeiro 2020" — página-mãe desatualizada há 6 anos. | 🟡 Baixa | Rever e re-datar; é a porta de entrada do site. |
| "descarga do joelho (canadianas)" listada como medida geral inicial para qualquer gonalgia. | 🟡 Baixa | A descarga com canadianas não é medida universal (muitas gonalgias não a exigem e o desuso pode ser contraproducente, ex. artrose). Clarificar "quando indicado". |
| Conteúdo clinicamente correto e prudente no resto; bom encaminhamento para diagnóstico. | — | Sem ação. Considerar substituir/ligar ao "Algoritmo de Gonalgia" (a memória do projeto indica que este deve ter mais destaque que o Lysholm). |

---

## Página 1 — Lesões da Cartilagem (`cartilagemjoelhodrnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **"Microfratura ... permite estimular o crescimento de uma nova fibrocartilagem"** apresentada como técnica de eleição genérica. A evidência recente (séries a longo prazo, consensos ICRS/ESSKA) mostra deterioração do resultado da microfratura além de ~2-5 anos e favorece técnicas de restauração (AMIC, ACI/MACI, osteocondral) para defeitos médios/grandes. | 🟠 Média | Manter como opção para defeitos **pequenos**, mas enquadrar que para defeitos maiores há técnicas com melhores resultados a longo prazo. Já distingue tamanhos — reforçar a limitação temporal do resultado. |
| **OAT e ACI agrupados como equivalentes** ("Transplante Autólogo de Osteocondral (OAT) / Implantação Autóloga de Condrócitos (ACI)"). São técnicas distintas com indicações e custos diferentes. | 🟡 Baixa | Separar em dois parágrafos; o texto já os descreve individualmente a seguir, mas o cabeçalho conjunto confunde. Mencionar MACI (3ª geração) como evolução do ACI. |
| Gralhas: "actuaa", "cirúrgicoque". | 🟡 Baixa | Corrigir. |
| Tom geral equilibrado, sem promessas excessivas. Bom. | — | — |

---

## Página 2 — Prótese e Desporto (`protesejoelhodesportodrnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **"Posso Fazer Desporto com a Prótese? Sim Pode!"** — afirmação categórica logo no topo. | 🟠 Média | É verdadeiro para baixo impacto, mas o título absoluto pode ser lido como "qualquer desporto". O corpo corrige (baixo impacto), mas sugerir título mais matizado: "Sim, com escolhas adequadas". Evita expectativa de retorno a desportos de alto impacto/pivot. |
| Lista de desportos recomendados (caminhada, natação, ciclismo) está alinhada com consenso atual (golfe, ginásio ligeiro também são habitualmente permitidos). | — | Opcional acrescentar golfe/dança ligeira. Correto. |

---

## Página 3 — Quisto de Baker (`quistobakerjoelhodrnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Conteúdo clinicamente sólido. Boa menção ao diagnóstico diferencial com **TVP** na rotura — ponto de segurança importante e bem colocado. | — | Sem ação. |
| "tratamento dirigido não ao quisto mas à patologia intra-articular" — correto e atual. | — | Sem ação. |

---

## Página 4 — Artrocentese (`liquidojoelho-artrocentese-drnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Omissão de contraindicação/risco-chave: infeção da pele sobre o local de punção e o risco (raro) de artrite séptica iatrogénica.** O texto só refere monitorizar sinais de infeção *após*. | 🟠 Média | Acrescentar que o procedimento não deve ser feito sobre pele infetada e que a técnica asséptica minimiza o risco de infeção articular. |
| "O líquido sinovial é aspirado... enviado para análise" — bom. Procedimento descrito com rigor. | — | Sem ação. |
| Gralha: "o seu cirurgião de joelho **podem** diagnosticar". | 🟡 Baixa | Corrigir concordância. |

---

## Página 5 — Infiltrações (`infiltracaojoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Ácido hialurónico: "teoricamente atraso da progressão da osteoartrite".** A evidência atual (meta-análises, recomendações OARSI 2019 e ACR 2019) é **fraca/inconsistente**; OARSI e ACR não recomendam fortemente a viscossuplementação e não há evidência robusta de modificação da progressão. | 🟠 Média | Texto já usa "teoricamente" e "eficácia pode ser limitada" — bom hedging. Reforçar: "não há evidência sólida de que altere a progressão da doença; o benefício sintomático é variável". |
| **PRP:** texto honesto e bem calibrado ("potencial teórico", "evidência não universalmente consistente", "área de pesquisa"). Excelente tom. | — | Manter. É o tratamento da página com mensagem mais correta. |
| **Corticosteroides: omite o risco de uso repetido.** Evidência (ex. ensaio JAMA 2017, McAlindon) sugere que injeções repetidas de corticoide podem associar-se a perda de cartilagem; e há limite prático de frequência. | 🟠 Média | Acrescentar nota: alívio rápido mas duração limitada; injeções repetidas com cautela pelo potencial efeito sobre a cartilagem. |
| Bom enquadramento final ("expectativas realistas", parte de abordagem mais ampla). | — | — |

---

## Página 6 — Quistos Parameniscais (`quistosparameniscaisjoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Afirmação de epidemiologia:** "ocorrem com maior frequência associados ao menisco lateral do que ao medial". | 🟠 Média | A validar pelo médico / referência. A literatura clássica diz que os quistos **parameniscais** são mais frequentes no menisco **lateral**, mas os quistos **meniscais intrassubstância/Baker-like** e algumas séries divergem. Convém citar fonte ou marcar "habitualmente". O texto diz "com maior frequência" — aceitável, mas é uma afirmação quantitativa que beneficia de referência. |
| Duas teorias etiológicas bem explicadas; tom prudente. | — | Sem ação. |
| Heading da página aparece **no fim** ("QUISTOS PARAMENISCAIS... O que são? Como se Tratam?") — provável artefacto de scraping/ordem de blocos. | 🟡 Baixa | Verificar ordem dos blocos na renderização. |

---

## Página 7 — Síndrome da Banda Iliotibial (`sindromebandailiotibialjoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Modelo fisiopatológico "atrito/fricção da banda contra o fémur".** A compreensão atual (Fairclough et al.; revisões recentes) é que **não há verdadeiro deslizamento/fricção**; trata-se de compressão de uma almofada de tecido conjuntivo/gordura ricamente inervada sobre o epicôndilo lateral. O modelo de "fricção" está datado. | 🟠 Média | Atualizar a explicação: em vez de "atrito constante", referir "compressão e irritação dos tecidos na face lateral do joelho". Manter linguagem acessível. O próprio nome alternativo "Síndrome de Fricção" é tradicional mas conceptualmente ultrapassado — pode manter-se como sinónimo histórico. |
| "fortalecimento dos músculos ao redor do **quadriceps**" — provável erro; o foco reabilitativo é a **anca/glúteo médio** (abdutores), não o quadricípite. | 🟠 Média | Corrigir para fortalecimento dos **abdutores da anca/glúteos**, que é o pilar do tratamento baseado em evidência. |
| Tom otimista e tranquilizador adequado ("pode ser tratada e gerida com sucesso"). | — | — |

---

## Página 8 — Tendinopatia Rotuliana (`tendao-rotuliano-tendinite-drnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Injeções de corticosteroides listadas como tratamento não-cirúrgico sem ressalva.** Na tendinopatia rotuliana, o corticoide **intratendinoso é desaconselhado** (risco de rotura do tendão) e a evidência é desfavorável; só tem papel muito limitado peritendinoso. | 🔴 Alta | Adicionar ressalva clara: o corticoide tem papel muito limitado e **não deve ser injetado dentro do tendão** pelo risco de enfraquecimento/rotura. O exercício **excêntrico/de carga progressiva** é o tratamento de 1ª linha com melhor evidência — destacá-lo mais. |
| **"Transferência de Tendão... para substituir o tendão danificado"** listada como opção cirúrgica para tendinopatia rotuliana. Isto não é prática corrente na tendinopatia rotuliana (é raríssimo/atípico). | 🟠 Média | A validar pelo médico. Provável imprecisão — a cirurgia habitual é desbridamento/tenotomia, não transferência tendinosa. Remover ou reformular. |
| **Título da página/meta-description tem gralhas e tom pouco profissional** ("Por vezes são difíceis de tratar e podem levar inclusivamente ao abandono desportivo... pode mesmo doer de noite a dormir"). | 🟡 Baixa | Reescrever a meta-description (também é importante para SEO). |
| O exercício excêntrico é mencionado — bom — mas merece mais destaque como 1ª linha. | 🟠 Média | Reordenar: colocar fisioterapia/exercício de carga no topo das opções conservadoras. |

---

## Página 9 — Entorse do Joelho (`entorsejoelho-drnunocamelo`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Protocolo PRICE/POLICE bem descrito (repouso, gelo, elevação). Atual o suficiente para público leigo. | — | Opcional: a tendência atual (POLICE — *Optimal Loading*) desencoraja repouso absoluto prolongado. Pode suavizar "Evite colocar peso" para "evite carga dolorosa". |
| **Gelo 15-20 min** — correto. Boa menção a procurar diagnóstico (Rx/RMN) e às lesões associadas (menisco/LCA). | — | Sem ação. |
| Menção a grizo.pt (ver achado transversal). | 🟠 Média | Ver acima. |
| Gralhas: "tar após", "precrever". | 🟡 Baixa | Corrigir (algumas estão na meta-description). |

---

## Página 10 — Lesão de Menisco (`meniscosnojoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Mensagem central excelente e atual:** preservação meniscal, sutura sobre meniscectomia, "as funções do menisco são essenciais... a sua preservação é essencial". Alinhado com a evidência mais recente (ESSKA Meniscus Consensus). | — | Manter. Página exemplar. |
| Não menciona que em **lesões degenerativas em joelho artrósico** a artroscopia/meniscectomia tem benefício limitado (ensaios FIDELITY, METEOR) e que o tratamento conservador é frequentemente preferível. | 🟠 Média | Acrescentar nuance: nas roturas degenerativas associadas a artrose, a cirurgia artroscópica muitas vezes não traz benefício adicional face à reabilitação — distinção importante para gerir expectativas. |
| "Transplante meniscal: substituição completa do menisco" — correto, mas é procedimento de nicho. | 🟡 Baixa | Opcional clarificar que é reservado a casos selecionados (pós-meniscectomia subtotal sintomática). |

---

## Página 11 — LCA (`ligamentocruzadoanterior`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Conteúdo equilibrado e atual: reconhece o papel do **tratamento conservador** em subgrupos (não só "operar sempre"), menciona reparação vs. reconstrução e a tenodese lateral. Boa atualidade científica. | — | Manter. |
| **Vídeo/legenda menciona "técnica do Prof. Dr Bertrand Sonnery-Cottet SAMBBA".** | 🟠 Média | **Conflito com a regra de credenciais do projeto** (não expor Sonnery-Cottet/SANTI/Lyon em páginas públicas, só nas citações de publicações). Esta é uma legenda de página clínica pública — a validar pelo médico se deve manter. Memória do projeto sugere remover. (Nota: a sigla correta é **SANTI**, não "SAMBBA" — possível gralha.) |
| "reparação ou reconstrução do LCA" — a reparação do LCA voltou a ser investigada (técnicas BEAR) mas continua a ser de indicação restrita; o texto está prudente ao chamar a reconstrução de "procedimento de eleição". | — | Correto. |

---

## Página 12 — Luxação da Rótula (`luxacaorotulajoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Foco quase exclusivo em crianças** ("deparamo-nos... com crianças"). A instabilidade/luxação patelar é muito comum em adolescentes e adultos jovens (atletas). | 🟡 Baixa | Alargar a redação para "crianças e jovens adultos" — o conteúdo aplica-se a ambos e o foco infantil estreita demasiado. |
| Reconstrução do **MPFL (Ligamento Patelofemoral Medial)** corretamente apresentada como técnica popular atual e com evidência. | — | Correto e atual. |
| Gralhas: "adisplasia patelar" (falta espaço), "anatômicos/anatómicos" (mistura PT-BR/PT-PT em várias páginas). | 🟡 Baixa | Uniformizar para português europeu (anatómicos, monitorização, etc.). Mistura PT-BR ("monitoramento", "treinamento", "anatômica") aparece em várias páginas. |

---

## Página 13 — Quadricípite / AMI (`quadricepsjoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Conteúdo cientificamente forte e **atual** (Inibição Muscular Artrogénica, classificação de Sonnery-Cottet, artrofibrose). | — | Manter — é dos conteúdos mais sofisticados do site. |
| **Menciona Sonnery-Cottet/SANTI 2× no corpo e linka o artigo.** | 🟠 Média | A validar pelo médico face à regra de credenciais (a memória permite Sonnery-Cottet nas *citações de publicações* mas pede sobriedade no corpo das páginas públicas). Aqui é uma referência científica legítima (classificação epónima) — defensável manter, mas decisão do Dr. |
| Linguagem por vezes técnica para paciente leigo (VMO, co-contração isquiotibiais, artrólise posterior, retração capsular). | 🟡 Baixa | Considerar versão "para o paciente" simplificada + secção técnica recolhível. A classificação detalhada Grau 0-3 é mais para profissionais. |

---

## Páginas de processo (14, 15, 16) — Preparar / Medo / Recuperar Cirurgia

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **Pág. 16 (Recuperar): "A primeira fase... pode durar 3 a 5 dias no hospital".** Para artroscopia (menisco, LCA) a alta é habitualmente no **próprio dia (ambulatório)**; 3-5 dias é mais típico de artroplastia. Generalizar 3-5 dias a "a cirurgia" pode assustar/confundir. | 🟠 Média | Clarificar que o internamento varia muito: artroscopia = ambulatório/1 dia; prótese = alguns dias. |
| **Pág. 16: "Evitar alimentos inflamatórios, como açúcar refinado e gorduras saturadas"** apresentado como recomendação de recuperação. | 🟠 Média | A evidência de "dieta anti-inflamatória" específica acelerar cicatrização pós-operatória de joelho é fraca. Suavizar para "alimentação equilibrada"; evitar afirmação que soa a aconselhamento nutricional não suportado. Igualmente "monitoramento nutricional pelo nutricionista hospitalar" pode não corresponder à realidade de todas as unidades. |
| **Pág. 15 (Medo): "Embora as complicações sejam raras..."** — tom tranquilizador é apropriado, mas combinar "raras" com a ausência de qualquer disclaimer pode soar a minimização. | 🟡 Baixa | Manter o tom positivo (adequado a esta página de gestão de ansiedade) mas garantir que as páginas cirúrgicas têm a informação de risco real noutro local. |
| Pág. 14 (Preparar) — sólida, prática e bem alinhada com ERAS (parar de fumar, otimização pré-op, ativação do quadricípite). Boa. | — | Sem ação. |
| grizo.pt em 15 e 16 (ver achado transversal). | 🟠 Média | Ver acima. |
| Gralhas: "saber reconhece-las", "està", "cirurgica". | 🟡 Baixa | Corrigir. |

---

## Página 17 — SIGIC (`sigic`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Conteúdo **administrativo, não clínico** — em geral bem explicado e útil. | — | — |
| **"taxas moderadoras... atualmente 7€ por consulta pós-operatória".** Valor específico que pode estar desatualizado e varia/pode ser isento. | 🟠 Média | A validar pelo médico/secretariado: confirmar valor atual das taxas moderadoras (sujeitas a legislação que muda). Risco de informação financeira incorreta. |
| "lista de hospitais do vale é apenas uma sugestão, não vinculativa" — afirmação assertiva sobre regra administrativa. | 🟠 Média | A validar: confirmar que esta interpretação está correta e atual à luz das normas SIGIC/ARS, pois é afirmada com forte convicção e o doente pode agir com base nela. |

---

## Página 18 — Prices (EN) (`kneesurgeryinportugalprices`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **"typically 80%-40 less"** — erro tipográfico/lógico (intervalo invertido e mal formatado). | 🟡 Baixa | Corrigir para "40%-80% less" (ou rever os números). |
| **Preços indicativos** apresentados como intervalos — razoável, mas sem data nem disclaimer cambial/temporal forte. | 🟠 Média | Acrescentar "indicative, subject to change" com data. Já diz "indicative" — reforçar e datar para evitar reclamações. |
| **"most procedures scheduled within 2 to 4 weeks"** repetido — promessa de tempo que pode não se concretizar. | 🟠 Média | Suavizar para "often within 2-4 weeks, depending on case complexity and scheduling". Evitar promessa de prazo. |
| Inclui consulta de vídeo e relatório em inglês — bom para o público-alvo. | — | — |

---

## Página 20 — CV / Sobre (`nuno-camelo-especialista-cirurgia-joelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| **"FIFA Medical Center of Excellence" aparece 2×** (nas duas linhas de fellowship em Lyon/Santy). | 🟠 Média | **Conflito direto com a regra de credenciais do projeto (2026-06-21):** não destacar FIFA/Lyon/Santy nas páginas públicas; "uma menção sóbria a Centre Orthopédique Santy, Lyon basta, sem FIFA Medical Centre of Excellence repetido". Recomendo remover a expressão "FIFA Medical Center of Excellence" e consolidar as duas linhas 2015/2016 numa só menção sóbria. **Decisão final do Dr.** |
| **Lista de revisor: "Orthopaedic Journal of Sports Medicine; Journal of Experimental Orthopaedics".** A memória do projeto refere também AJSM e KSSTA. | 🟡 Baixa | A validar: alinhar a lista de revisor (AJSM · KSSTA · OJSM · JEO) com a versão aprovada na memória, se for a intenção. |
| **Não inclui ORCID** (0000-0002-7443-4085) que a memória sugere usar. | 🟡 Baixa | Considerar adicionar ORCID como credencial verificável neutra. |
| Datas de formação (Licenciatura 2009, Internato 2011-2016) — coerentes. | — | A validar pelo médico (factual). |

---

## Página 21 — Publicações (`actividadecientificajoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| 5 artigos com DOI — factual e verificável. Bom para autoridade/E-E-A-T. | — | A validar pelo médico (factual). |
| **DOI da publicação KSSTA 2017 "Reconstruction of chronic patellar tendon rupture" = 10.1007/s00167-015-3951-7** mas datado de **2017** (DOI sugere submissão 2015). Coerência ano/DOI. | 🟡 Baixa | A validar: confirmar ano de publicação vs. ano do DOI (provável online-first 2015 / print 2017 — normal, mas verificar). |

---

## Página 19 — Avaliar / Lysholm-Tegner (`avaliarjoelho`)

| Problema | Gravidade | Correção sugerida |
|---|---|---|
| Interpretação do score (90-100 Excelente, etc.) está conforme as faixas habituais do Lysholm. | — | Correto. |
| **"Lysholm Tegner"** tratado como um score único. São tecnicamente **dois instrumentos** (Lysholm score 0-100 + Tegner activity level). | 🟡 Baixa | Clarificar que são complementares (Lysholm = função; Tegner = nível de atividade). |
| Memória do projeto: o **Algoritmo de Gonalgia deve ter mais destaque que o Lysholm**. | 🟡 Baixa | Alinhamento de produto (não clínico) — sinalizado para o swarm de UX/conteúdo. |

---

## Síntese de prioridades clínicas

1. 🔴 **Tendinopatia rotuliana (pág. 8):** ressalva sobre corticoide intratendinoso (risco de rotura) e destaque do exercício excêntrico como 1ª linha. Rever "transferência de tendão".
2. 🟠 **Banda iliotibial (pág. 7):** atualizar modelo de "fricção" e corrigir alvo de reforço (abdutores da anca, não quadricípite).
3. 🟠 **Infiltrações (pág. 5):** moderar claim do ácido hialurónico sobre progressão; acrescentar cautela sobre corticoide repetido.
4. 🟠 **Menisco (pág. 10):** acrescentar nuance sobre roturas degenerativas em joelho artrósico.
5. 🟠 **Artrocentese (pág. 4):** mencionar contraindicação por infeção cutânea/risco de artrite séptica.
6. 🟠 **Recuperar cirurgia (pág. 16):** corrigir "3-5 dias de internamento" (não se aplica a artroscopia) e moderar claim da "dieta anti-inflamatória".
7. 🟠 **Disclaimer médico** transversal + revisão das menções a **grizo.pt** e aos valores **financeiros** (SIGIC 7€, preços EN).
8. 🟠 **Credenciais (págs. 20, 11, 13):** alinhar com a regra do projeto (FIFA/Lyon/Sonnery-Cottet).

**Nota:** Não foram inventados factos clínicos. Afirmações de epidemiologia, números, datas, credenciais e DOIs foram marcados "a validar pelo médico" quando dependem de fonte/posicionamento. Conteúdo não foi alterado — apenas revisto.
