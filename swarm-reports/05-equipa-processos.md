# 05 — Otimização de Equipa, Papéis e Processos · Prática Dr. Nuno Camelo Barbosa

**Agente:** team-optimizer (swarm) · **Prática:** Ortopedia / Cirurgia do Joelho
**Unidades:** Hospital Lusíadas Porto · Hospital Misericórdia de Vila do Conde · Hospital Lusíadas Paços de Ferreira (Coordenador de Ortopedia)
**Vias de marcação:** Privado · SIGIC/SNS (vale de cirurgia, sem listas de espera) · Internacional (EN agora, RU a seguir) · Subsistemas de saúde
**Data:** 2026-06-25

---

## Premissa que atravessa todo o relatório

> **O tempo do médico é o recurso mais escasso da prática.** Cada processo abaixo é desenhado para que o Dr. Camelo só toque no que exige um cérebro de cirurgião do joelho — triagem clínica de fronteira, consulta, decisão cirúrgica, ato operatório, pós-op. **Tudo o resto deve ser delegado, automatizado ou eliminado.**

Restrições reais assumidas:
- **Multi-unidade:** a mesma pessoa (paciente, secretária, processo) move-se entre 3 hospitais com sistemas administrativos próprios (Lusíadas ×2 + Misericórdia). A camada própria do Dr. tem de ser **agnóstica à unidade** e sobrepor-se aos sistemas hospitalares, não substituí-los.
- **RGPD / sigilo médico:** dados de saúde são categoria especial (art. 9.º RGPD). Nada de dados clínicos em ferramentas de consumo (WhatsApp pessoal, Sheets abertas, email não cifrado para conteúdo sensível). Consentimento + minimização + registo de tratamentos.
- **Deontologia (Ordem dos Médicos):** ver report 03 — sem promessas, sem testemunhos sensacionalistas, sem incitamento ao consumo. Os fluxos de resposta a leads herdam estas regras.
- **Equipa pequena:** provavelmente 1 médico + 1–2 administrativos hoje. As recomendações distinguem **papel** (função a cobrir) de **pessoa** — vários papéis acumulam na mesma cabeça no início, e a maturidade está em saber *quando* destacar.

---

## 1. Mapa de papéis-chave

Seis papéis. Numa prática deste tamanho, **uma pessoa cobre vários papéis** — a tabela diz o que cada função faz e, na coluna final, quem realisticamente a assume hoje vs. quando vale a pena destacar.

| Papel | O que faz (núcleo) | Não faz / passa adiante | Quem assume |
|---|---|---|---|
| **Médico (Dr. Camelo)** | Triagem de fronteira (casos ambíguos), consulta, decisão cirúrgica, cirurgia, pós-op, leitura de MCDTs, validação de conteúdo clínico e científico. | Agendar, cobrar, responder a "quanto custa?", primeira resposta a leads, confirmações. | Próprio — proteger esta agenda é o objetivo de tudo o resto. |
| **Secretariado / Agendamento** | Coração operacional. Marca/remarca nas 3 unidades, atende telefone (926 850 194), confirma consultas, gere lembretes, coordena salas/blocos, faz a ponte com o secretariado de cada hospital. | Triagem clínica (encaminha), aconselhamento médico, negociar preço fora de tabela. | Pessoa dedicada nº1. Se houver só 1 contratação, é esta. |
| **Assistente clínico** | Prepara consulta (RM/relatórios à mão antes do médico entrar), recolhe formulário pré-consulta e PROMs (Lysholm, e sobretudo o **Algoritmo de Gonalgia**), explica preparação pré/pós-op, acompanha o doente na recuperação, organiza processo clínico. | Decisão cirúrgica, prescrição. | Pode acumular com secretariado no início; destacar quando o volume cirúrgico cresce. |
| **Gestão Marketing/Digital** | Site (consultajoelho.pt), SEO, **Google Business Profile das 3 unidades**, redes, calendário editorial (2 peças/mês — report 03), GA4/Search Console, responder a avaliações de forma sóbria. | Conteúdo clínico sem validação do médico; claims de resultado. | Externo (freelancer/agência) ou meio-tempo. **Não** deve ser o secretariado a horas livres — fica sempre por fazer. |
| **Faturação / Seguros** | Faturação privada, processo SIGIC (vale → autorização → ato → faturação ao SNS), subsistemas (ADSE, Multicare, Médis, SAMS…), pré-autorizações, recibos, conciliação por unidade. | Decisão clínica, definição de preço internacional. | Frequentemente partilhado com o circuito administrativo do hospital + 1 ponto interno de controlo. |
| **Coordenação Internacional** | Único ponto de contacto para leads EN/RU: responde em inglês, recolhe RM/relatório para avaliação remota, dá preço transparente, trata logística (viagem, datas, follow-up à distância), faz a ponte para a agenda cirúrgica. | Avaliação clínica (envia ao médico o pacote já pronto). | No início, **o secretariado mais à-vontade em inglês** + apoio do médico. Destacar quando o fluxo internacional escala. |

**Princípio de desenho:** quanto mais um papel proteger o tempo do médico, mais cedo deve ser destacado. A ordem natural de contratação numa prática a crescer é: **Secretariado/Agendamento → Marketing/Digital (externo) → Assistente clínico → Coordenação internacional dedicada.**

---

## 2. Fluxos críticos e gargalos típicos

### 2.1 Fluxo clínico principal (PT — privado / SIGIC / subsistema)

```
MARCAÇÃO → TRIAGEM → CONSULTA → MCDTs → DECISÃO → CIRURGIA → PÓS-OP → FOLLOW-UP → ALTA/RECOMENDAÇÃO
```

| Etapa | O que acontece | Gargalo típico | Mitigação |
|---|---|---|---|
| **Marcação** | Paciente chega por site/telefone/referência; escolhe unidade e via. | Telefone como único canal → chamadas perdidas = leads perdidos. Confusão sobre "que via/que unidade/que preço". | Agendamento online + formulário que **pré-qualifica via e unidade**; clique-para-ligar; resposta a leads do site < algumas horas. |
| **Triagem** | Decidir urgência, via correta (SIGIC vs privado), e se precisa de MCDT antes da 1ª consulta. | Médico a triar coisas que um protocolo resolve; ou administrativo a triar o que precisa de médico. | **Protocolo de triagem escrito**: regras claras (red flags → contacto rápido; queixa de 1ª linha → orientar; resto → consulta). O Algoritmo de Gonalgia faz pré-triagem do lado do paciente. |
| **Consulta** | Avaliação, exame, explicação, plano. | Médico a procurar exames/relatórios em cima da hora; consulta a derrapar por falta de contexto. | Assistente clínico monta o processo **antes**: formulário pré-consulta + PROMs + imagens carregadas e organizadas. |
| **MCDTs** | RM, RX, análises. | Paciente perdido entre pedir, fazer e voltar; resultados que não chegam a tempo da reavaliação. | Pedido com instruções claras + lembrete; canal seguro para o paciente entregar exames; checklist de "exame chegou?". |
| **Decisão cirúrgica** | Indicar ou não cirurgia; consentimento informado. | "Cirurgia só quando necessária" (linha editorial) exige tempo de explicação — bem empregue, mas é tempo de médico. | Material educativo do site (páginas de patologia + preparar/recuperar) reduz a explicação repetida; consentimento padronizado. |
| **Cirurgia** | Agendamento de bloco na unidade certa; pré-op (anestesia, análises). | Coordenação de bloco/anestesia/material entre 3 hospitais; SIGIC com prazos próprios. | Checklist pré-op por unidade; ponto único de agendamento cirúrgico no secretariado. |
| **Pós-op** | Pensos, observação, gestão de dor, sinais de alarme. | Doente ansioso a ligar ao médico para dúvidas que um protocolo resolve. | FAQ pós-op + folha de sinais de alarme entregue na alta; assistente clínico como primeiro filtro. |
| **Follow-up** | Consultas de revisão, PROMs no tempo. | Doentes que se perdem (no-show, esquecimento), sobretudo aos 6/12 meses. | Agenda de follow-up automática + lembretes; PROMs por link. |
| **Alta / Recomendação** | Encerrar episódio, pedir avaliação Google (sóbria), reativar para prevenção. | Momento de maior satisfação não é aproveitado para avaliação/referência. | Pedido de avaliação **sem incentivo** (deontologia) no momento certo; "como nos encontrou?" registado. |

**Os 3 gargalos que mais custam:**
1. **Chamadas/leads não respondidos a tempo** (perda direta de doentes — é o KPI de negócio do report 03).
2. **Médico a fazer triagem administrativa e a repetir explicações** que protocolo + conteúdo do site resolvem.
3. **Coordenação multi-unidade manual** (saber em que hospital está cada doente/cirurgia/processo SIGIC sem uma vista única).

### 2.2 Fluxo do paciente internacional (EN / futura RU)

```
LEAD EN/RU → RESPOSTA <24h → RECOLHA RM/RELATÓRIO → AVALIAÇÃO REMOTA → PROPOSTA (preço+plano) →
DECISÃO → LOGÍSTICA (viagem/datas) → PRÉ-OP REMOTO → CIRURGIA → ALTA → FOLLOW-UP À DISTÂNCIA
```

| Etapa | Gargalo | Mitigação |
|---|---|---|
| Lead → resposta | Fuso horário, idioma, expectativa de resposta rápida; lead esfria em horas. | **WhatsApp Business EN** + resposta-modelo em < 24h; um único responsável (coordenação internacional). |
| Recolha de exames | Receber RM/relatórios de forma segura e legível (RGPD + ficheiros DICOM pesados). | Canal seguro de upload (não email pessoal); checklist do que enviar. |
| Avaliação remota | Médico a triar pacotes incompletos. | Coordenação entrega ao médico **só pacotes completos** (RM + relatório + queixa estruturada). |
| Proposta | Preço tem de ser claro e enquadrado como informação, não promoção (deontologia). | Página EN de preços/processo como base; proposta escrita padronizada. |
| Logística + pré-op remoto | Viagem, datas de bloco, análises feitas no país de origem, anestesia. | Checklist internacional; datas de cirurgia reservadas condicionalmente. |
| Follow-up à distância | Doente regressa ao país; revisões e PROMs ficam por fazer. | Teleconsulta de revisão + PROMs por link + carta para o médico de origem. |

> **Risco-chave internacional:** velocidade de primeira resposta e segurança no manuseio de exames. Um lead de prótese/LCA internacional vale muito (report 03) — perdê-lo por demora é o pior desperdício da prática.

---

## 3. Onde automatizar / delegar (e onde **não**)

Regra de ouro: **automatizar o repetitivo e previsível; delegar o que exige julgamento administrativo; reservar para o médico só o que exige julgamento clínico.**

| Tarefa | Ação | Como | Cautela |
|---|---|---|---|
| Agendamento de 1ª consulta | **Automatizar** | Agendamento online com seleção de unidade + via; sincroniza com agenda. | Manter telefone para público mais velho (PRODUCT.md). |
| Lembretes de consulta/cirurgia/MCDT | **Automatizar** | SMS/WhatsApp/email automáticos T-48h e T-24h → reduz no-shows. | Consentimento de canal; sem dados clínicos na mensagem. |
| FAQ (preço, vias, moradas, preparação) | **Automatizar** | FAQ no site + respostas-modelo; eventual chatbot só informativo. | **Sem aconselhamento clínico automatizado.** Dúvida clínica → humano. |
| Formulário pré-consulta + PROMs | **Automatizar (recolha) + delegar (revisão)** | Link enviado na marcação; Algoritmo de Gonalgia como pré-triagem; assistente revê antes da consulta. | Dado de saúde → ferramenta com garantias RGPD. |
| Resposta a leads do site | **Delegar (1ª linha) + automatizar (acuse de receção)** | Auto-resposta imediata "recebemos, contactamos em Xh" + secretariado/coordenação a fechar. | SLA de resposta é o KPI; não deixar morrer no email. |
| Triagem clínica de fronteira | **NÃO automatizar** | Protocolo escrito guia o administrativo; casos ambíguos sobem ao médico. | É decisão clínica — automação só ajuda a *encaminhar*, não a *decidir*. |
| Faturação / pré-autorizações | **Delegar** | Papel de faturação + circuito de cada hospital. | Conciliação por unidade; trilho de auditoria. |
| Pedido de avaliação Google | **Automatizar o pedido** | Mensagem no momento da alta. | **Sem incentivo** (deontologia); sóbrio. |
| Conteúdo / SEO / GBP | **Delegar (externo)** | Marketing digital; médico só valida o clínico. | Claims calibrados (report 03). |
| Follow-up e reativação | **Automatizar (agenda) + delegar (execução)** | Follow-ups gerados automaticamente; assistente executa. | PROMs no tempo certo. |

---

## 4. Ferramentas / sistemas recomendados

**Critérios de escolha (por ordem):** (1) conformidade RGPD para dados de saúde + contrato de subcontratação; (2) funciona em **multi-unidade** sobrepondo-se aos sistemas hospitalares; (3) baixa fricção para equipa pequena; (4) integra agenda↔CRM↔comunicação; (5) custo proporcional.

| Necessidade | Recomendação (critério, não marca fixa) | Porquê |
|---|---|---|
| **Agenda unificada multi-unidade** | Agenda online própria que **espelha** as 3 unidades numa só vista, com agendamento online para o paciente. | O médico/secretariado tem de ver tudo num sítio sem depender de 3 portais hospitalares. |
| **PMS / CRM clínico** | Software de gestão de consultório com hosting em UE, RGPD-compliant, com módulo de pacientes, episódios, comunicações e faturação (categoria: PMS médico português/UE com app de marcação). | Centraliza ficha + agenda + faturação + comunicação; evita Sheets/WhatsApp informais. Em PT há opções desenhadas para consultório e que cobrem subsistemas/SNS. |
| **Comunicação segura com paciente** | **WhatsApp Business API** (não o app pessoal) para lembretes/internacional + email; canal de **upload seguro** para exames (DICOM). | WhatsApp é onde o internacional já está; a API permite registo, modelos e separação do número pessoal. Exames nunca por email pessoal. |
| **Faturação / seguros** | Módulo de faturação do PMS + integração com o circuito de cada hospital; mapa de subsistemas e regras SIGIC. | Conciliação por unidade e trilho de auditoria; reduz erros de pré-autorização. |
| **Medição (marketing)** | GA4 + Search Console + Google Business Profile (3 unidades) — já no report 03. | Sem baseline não se otimiza; "como nos encontrou?" no fluxo de contacto. |
| **Camada de automação** | Lembretes/auto-respostas nativos do PMS; só recorrer a integrador externo (tipo automação no-code) se o PMS não cobrir — e sempre com avaliação RGPD do fluxo de dados. | Preferir automação *dentro* do sistema certificado a espalhar dados de saúde por ferramentas de consumo. |

> **Antipadrão a evitar:** gerir uma prática multi-unidade em WhatsApp pessoal + Excel + email. Funciona até falhar — e com dados de saúde, falhar é um problema de RGPD, não só de produtividade. A escolha estrutural é **um PMS/CRM clínico como fonte única de verdade**.

---

## 5. Quadro RACI simplificado

**R** = Responsável (faz) · **A** = Aprova/Accountable (responde pelo resultado) · **C** = Consultado · **I** = Informado
Papéis: **Méd** (Médico) · **Sec** (Secretariado/Agendamento) · **AC** (Assistente clínico) · **MK** (Marketing/Digital) · **Fat** (Faturação/Seguros) · **Int** (Coordenação internacional)

| Processo | Méd | Sec | AC | MK | Fat | Int |
|---|---|---|---|---|---|---|
| Resposta a lead do site (PT) | I | **R/A** | C | C | – | – |
| Resposta a lead internacional | C | I | – | I | – | **R/A** |
| Marcação / remarcação | I | **R/A** | C | – | – | C |
| Triagem clínica (encaminhamento) | **A** | **R** | C | – | – | C |
| Preparação da consulta (exames/PROMs) | C | C | **R/A** | – | – | C |
| Consulta e decisão clínica | **R/A** | I | I | – | I | I |
| Pedido e gestão de MCDTs | **A** | **R** | C | – | – | – |
| Agendamento e checklist cirúrgico | **A** | **R** | C | – | C | C (intl) |
| Pré-autorizações / SIGIC / subsistemas | C | C | – | – | **R/A** | C (intl) |
| Faturação e conciliação por unidade | I | C | – | – | **R/A** | C |
| Acompanhamento pós-op | **A** | I | **R** | – | – | C (intl) |
| Follow-up / PROMs / reativação | C | **R** | **R** | – | – | C (intl) |
| Pedido de avaliação (sóbrio) / "como nos encontrou?" | I | **R** | C | **A** | – | C |
| Conteúdo do site / SEO / GBP | **C (clínico)** | I | – | **R/A** | – | C (EN/RU) |
| Conformidade RGPD dos fluxos | **A** | C | C | C | C | C |

Leitura rápida: o **médico aprova clínica e RGPD**, mas é **R** em pouca coisa fora da consulta/cirurgia — exatamente o objetivo. O **secretariado é o R operacional** da maioria dos fluxos. **Marketing e Internacional** têm donos próprios para não ficarem "órfãos".

---

## 6. Roadmap de implementação — 90 dias

### Mês 1 — Fundações (parar a hemorragia de leads + base RGPD)
- **Definir a fonte única de verdade:** escolher/ativar PMS/CRM clínico (RGPD-UE) com agenda multi-unidade; migrar contactos e agenda para lá. Assinar contratos de subcontratação.
- **SLA de resposta a leads:** auto-resposta imediata no formulário do site + regra "contacto humano em < X horas (PT) / < 24h (intl)". Atribuir donos (Sec / Int).
- **Protocolo de triagem escrito** (1 página): red flags, queixas de 1ª linha, via correta (SIGIC vs privado), o que sobe ao médico. Treinar secretariado.
- **WhatsApp Business** (separar do número pessoal) + canal seguro de upload de exames.
- **Higiene RGPD:** inventário de onde estão dados de saúde hoje; eliminar Excel/WhatsApp pessoal como repositório; consentimentos de canal.

### Mês 2 — Automatizar o previsível + montar o internacional
- **Lembretes automáticos** (consulta/MCDT/cirurgia, T-48h/T-24h) → atacar no-shows.
- **Formulário pré-consulta + PROMs por link** (incl. Algoritmo de Gonalgia como pré-triagem); assistente clínico monta processo antes da consulta.
- **Pacote internacional:** página EN de preços/processo afinada (report 03) + resposta-modelo EN + checklist de recolha de exames + circuito de avaliação remota.
- **Faturação:** mapa de subsistemas + procedimento SIGIC escrito; conciliação por unidade.

### Mês 3 — Fechar o ciclo + medir
- **Agenda de follow-up automática** + PROMs aos 6/12 meses + carta para médico de origem (intl).
- **Pós-op self-service:** FAQ + folha de sinais de alarme na alta; assistente como 1º filtro.
- **Pedido de avaliação Google** (sóbrio, sem incentivo) no momento da alta + "como nos encontrou?" no fluxo.
- **Revisão de KPIs operacionais:** taxa de resposta a leads dentro do SLA, no-show rate, tempo médio lead→consulta, % de processos com pacote completo antes da consulta, leads internacionais e tempo de 1ª resposta. Ajustar protocolos onde apertar.

**Indicadores operacionais a vigiar** (complementam os KPIs de marketing do report 03):
- % de leads respondidos dentro do SLA · taxa de no-show · tempo lead→consulta · tempo de 1ª resposta internacional · % de consultas com processo pré-montado · nº de "toques administrativos" do médico/semana (deve descer).

---

## Resumo executivo — 3 melhorias de maior impacto

A prática tem 3 unidades, 3 vias de marcação e um único recurso verdadeiramente escasso: o tempo do Dr. Camelo. O desenho certo não é "mais gente" — é **proteger esse tempo** com protocolos, uma fonte única de verdade e respostas rápidas. As três alavancas de maior impacto:

1. **PMS/CRM clínico RGPD-UE como fonte única de verdade**, com agenda multi-unidade e agendamento online — acaba com a gestão em Excel/WhatsApp pessoal (risco de RGPD e de erro), dá vista única das 3 unidades e habilita toda a automação seguinte.
2. **SLA de resposta a leads + protocolo de triagem escrito** — o desperdício que mais custa hoje é o lead que esfria e o médico a fazer triagem/explicações que um protocolo + o conteúdo do site resolvem; responder depressa (e bem encaminhado) é o ganho de conversão mais barato.
3. **Automação do previsível (lembretes, formulários/PROMs, follow-up) + pacote internacional dedicado** — corta no-shows, monta a consulta antes de o médico entrar, e captura os leads EN/RU de alto valor com primeira resposta < 24h e manuseio seguro de exames.

Tudo dentro das restrições reais: RGPD primeiro (dados de saúde nunca em ferramentas de consumo), deontologia herdada do tom do site (sem promessas, avaliações sóbrias sem incentivo) e credenciais sóbrias. A sequência de contratação, quando o volume justificar: Secretariado → Marketing (externo) → Assistente clínico → Coordenação internacional dedicada.
