# Encadeamento — análise com Gate Auditor

> Gate externo: skill **`migracao-gate-auditor`** emite `gate-<persona>.md` PASS/FAIL.  
> Vocabulário: suite mínima · `container_auto` / `alt_auto` / `manual_homolog` · validação inicial `source`+`TFMO`+`TFMD`.

### Glossário rápido

| Termo | Significado |
|-------|-------------|
| Write integral | Um Write completo do report (não patches parciais em massa) |
| Suite default | `dotnet test` **sem** flag/env de contentor |
| Matriz contentores | Decisão por componente: `container_auto` / `alt_auto` / `manual_homolog` |
| Skip ≠ regressão | Teste Skipped por contentor opt-in **não** conta como falha de DoD |

## Sequência

| Passo | Actor | Saída |
|-------|-------|--------|
| 0 | Orquestrador | Validar `source`+`TFMO`+`TFMD`; criar `.migration-context/reports/` |
| 1 | Analista | `analista.md` → **Gate Auditor** → `gate-analista.md` |
| 2 | Auditor | `auditor.md` → gate → `gate-auditor.md` |
| 3 | Cartógrafo | `cartografo.md` → gate → `gate-cartografo.md` |
| 4 | Diplomata | `diplomata.md` → gate → `gate-diplomata.md` |
| 5 | Estratega | `estratega-testes.md` (`dotnet test`) → gate → `gate-estratega.md` |
| 6 | Orquestrador | Síntese (complementos + Canvas + handoff + Canvas visual (opcional, quando solicitado)) → Gate Auditor → `gate-orquestrador.md` PASS |
| 7 | Humano | Aprovação Canvas **incl. contentores** |

## Princípios do gate

| # | Regra |
|---|--------|
| 1 | Persona **não** marca gate final — só pré-check honesto |
| 2 | **Gate Auditor** emite `gate-<persona>.md` com **PASS/FAIL** |
| 3 | **FAIL** → mesma persona corrige → **novo** gate antes de avançar |
| 4 | [piso-insumo-personas.md](piso-insumo-personas.md) — mínimos Glob/Grep/Read/Shell **antes** do Write |
| 5 | Gate Auditor **não** edita o report da persona |
| 6 | Telemetria em `orquestrador-complementos.md`: `gate_externo`, `gate_failures`, Read/Grep/Glob, Shell |

**Invocação:** Orquestrador após cada persona; ou `/gate-auditor <persona>`.

## Disciplina (personas 1–5)

| # | Fazer | Proibido |
|---|-------|----------|
| 1 | Write integral + [piso-insumo-personas.md](piso-insumo-personas.md) | Inventar sem evidência |
| 2 | Read predecessors ([guia-leitura-predecessor.md](guia-leitura-predecessor.md)) | Reler reports inteiros sem lacuna |
| 3 | Evidência Glob/Grep/Read no repo | Auto-declarar gate PASS |
| 4 | Lacunas em Incertezas | 3Rs finais (só Orquestrador) |
| 5 | Pré-check + aguardar **Gate Auditor PASS** | Avançar com FAIL |

## Catálogos

| Guia | Uso |
|------|-----|
| [piso-insumo-personas.md](piso-insumo-personas.md) | Mínimos insumo |
| [rubrica-gate-externo.md](rubrica-gate-externo.md) | Critérios gate |
| [guia-leitura-predecessor.md](guia-leitura-predecessor.md) | Predecessors |
| [padroes-candidatos-suite-minima.md](../../migracao-estratega-testes/references/padroes-candidatos-suite-minima.md) | Suite mínima (Estratega) |
| [checklist-gate-persona.md](checklist-gate-persona.md) | Pré-check |
| [checklist-gate-negocio-orquestrador.md](checklist-gate-negocio-orquestrador.md) | Passo 6 |
| [guia-troubleshooting-gate.md](guia-troubleshooting-gate.md) | Falhas de gate |
| Skill [migracao-gate-auditor](../../migracao-gate-auditor/SKILL.md) | Gate externo |

## Ordem interna — personas 1–5

1. Predecessors no disco (2–5) + gates PASS anteriores.
2. **Piso insumo** — Glob/Grep/Read/Shell mínimos.
3. Pré-Write.
4. **Write** report completo.
5. Pré-check ([checklist-gate-persona.md](checklist-gate-persona.md)).
6. Orquestrador invoca **Gate Auditor** → `gate-<papel>.md`.
7. **FAIL** → corrigir → novo gate.
8. **PASS** → persona seguinte.

## Passo 6 — Orquestrador

1. Confirmar `gate-analista` … `gate-estratega` = **PASS**.
2. Cumprir a **etapa 1** de [checklist-gate-negocio-orquestrador.md](checklist-gate-negocio-orquestrador.md) antes da síntese.
3. Produzir complementos, Canvas MD, handoff com plano faseado/matriz `container_auto`/`alt_auto`/`manual_homolog` e Canvas visual (opcional, quando solicitado). Preencher §8 Telemetria com gate da síntese pendente.
4. Cumprir a **etapa 2** do checklist de negócio; com os itens críticos OK, Gate Auditor `orquestrador` avalia os artefatos atuais e emite `gate-orquestrador.md`. FAIL → Orquestrador corrige e solicita novo gate.
5. Atualizar apenas os dados de telemetria após cada veredito, conforme o [template de complementos](report-template-orquestrador-complementos.md). Correção de conteúdo exige novo gate.
6. Somente após PASS, gate humano: Canvas + **estratégia de contentores**.

## Gate externo

| Regra | Detalhe |
|-------|---------|
| Saída | `reports/gate-<persona>.md` **PASS** |
| Critérios | [rubrica-gate-externo.md](rubrica-gate-externo.md) |
| Persona corrige até passar | obrigatório em FAIL |

Se falhar: **parar** — não invocar persona seguinte.
