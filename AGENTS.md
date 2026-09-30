# Agentes de migração .NET (Cursor)

Kit de migração assistida: personas em sequência, reports Markdown em `.migration-context/` no repo **alvo**, gate externo por persona (**Gate Auditor**).

## Começar aqui

| Onde | Conteúdo |
|------|----------|
| **`.cursor/commands/analisar-migracao.md`** | Análise: `source` + `TFMO` + `TFMD` · persona → gate → Canvas/handoff |
| **`.cursor/commands/executar-migracao.md`** | Execução após Canvas aprovado |
| **`.cursor/rules/` + `.cursor/skills/`** | Contrato por persona |
| **`agents/RUNBOOK.md`** | Como correr o fluxo (pré-reqs, pastas, fases, fallback) |

## Comandos Cursor

| Comando | Fase |
|---------|------|
| `/analisar-migracao source:… TFMO:… TFMD:…` | Análise + Gate Auditor + Canvas + handoff |
| `/gate-auditor <persona>` | Juiz externo (PASS/FAIL em `gate-*.md`) |
| `/executar-migracao` | Execução (worktrees + `dotnet test`) |

## Personas → rule → skill → relatório

| Persona | Rule | Skill | `reports/` |
|---------|------|-------|------------|
| Orquestrador | `migracao-orquestrador` | `migracao-orquestrador` | complementos, canvas, handoff |
| Analista … Estratega | `migracao-*` | `migracao-*` | `*.md` + `gate-*.md` |
| Gate Auditor | `migracao-gate-auditor` | `migracao-gate-auditor` | `gate-<papel>.md` |
| Executor / Guardião | rules + skills | execução | worktrees + `guardiao-*.md` |

## Evidência

| Ferramenta / artefato | Uso |
|----------------------|-----|
| Glob / Grep / Read | Inventário e provas no alvo |
| Shell `dotnet` | CVE audit / `dotnet test` |
| `.migration-context/evidence/<sessao>/` | Saídas higienizadas (testes, auditoria NuGet) — citar paths nos reports |
| Templates MD + specializations | Skills Orquestrador / personas |

Contrato de qualidade (decisões, transitivos, mock≠contrato, handoff): [qualidade-decisoes-evidencias.md](.cursor/skills/migracao-orquestrador/references/qualidade-decisoes-evidencias.md).

## Estratégia de testes

Suite mínima, matriz `container_auto` / `alt_auto` / `manual_homolog`; Guardião na suite default (skip de contentor ≠ regressão) — skill Estratega e [estrategia-testes-faseada-migracao.md](.cursor/skills/migracao-estratega-testes/references/estrategia-testes-faseada-migracao.md).
