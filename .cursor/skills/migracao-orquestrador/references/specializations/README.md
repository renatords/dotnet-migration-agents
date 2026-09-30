# Playbooks de especialização

Espelho humano dos stacks de migração (Refit, Kafka, EF, etc.).

## Catálogos (ler antes dos playbooks)

| Arquivo | Uso |
|----------|-----|
| [mapeamento-pacote-playbook.md](../mapeamento-pacote-playbook.md) | Pacote NuGet → playbook + Grep (Auditor) |
| [grep-patterns-migracao.md](../grep-patterns-migracao.md) | Padrões breaking/uso por stack |
| [template-fila-homologacao.md](../template-fila-homologacao.md) | Fila de homologação Diplomata |

## Guias

| Arquivo | Persona | Uso |
|----------|---------|-----|
| [guia-leitura-predecessor.md](../guia-leitura-predecessor.md) | 2–5 | Seções exactas a ler por passo |
| [guia-grep-exaustivo-auditor.md](../guia-grep-exaustivo-auditor.md) | Auditor | Inventário de uso exaustivo |
| [heuristica-blast-radius-grep.md](../heuristica-blast-radius-grep.md) | Cartógrafo | Blast radius + confiança |
| [checklist-config-higienizada.md](../checklist-config-higienizada.md) | Diplomata | Config sem secrets |
| [checklist-gate-persona.md](../checklist-gate-persona.md) | 1–5 | Pré-check |
| [checklist-gate-negocio-orquestrador.md](../checklist-gate-negocio-orquestrador.md) | Orquestrador | Passo 6 síntese |
| [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md) | Cross-persona | Decisões, transitivos, mock≠contrato, handoff |
| [validacao-regressao-lab.md](../validacao-regressao-lab.md) | Evolução do lab | Antes/depois no mesmo alvo |

**Uso:** Read **pontual** quando Auditor/Diplomata/Estratega identificarem pacote mapeável — **não** ler todos de uma vez.

| Arquivo | Pacotes / sinal |
|----------|-----------------|
| `refit.md` | Refit, Refit.HttpClientFactory |
| `http-client-generic.md` | HttpClient, `I*Client`, Client/ |
| `confluent-kafka.md` | Confluent.Kafka |
| `stackexchange-redis.md` | StackExchange.Redis, caching Redis |
| `ef-core.md` | EF Core genérico — **confirmar provider** |
| `ef-core-sqlserver.md` | EF Core + SQL Server |
| `ef-core-postgresql.md` | EF Core + Npgsql |
| `observability-stack.md` | Serilog, OpenTelemetry, App Insights |
| `generic-external.md` | Pacote fora do catálogo com uso no código |
| `test-stack-legacy.md` | Pacotes legados em `*Tests*.csproj` |
| `test-contract-baseline-reuse.md` | P0 reutilizável origem→destino |

Path: `.cursor/skills/migracao-orquestrador/references/specializations/`

## Uso das recomendações de versão

Versões e upgrades citados são candidatos a verificar; não impõem troca. A decisão segue [qualidade das decisões](../qualidade-decisoes-evidencias.md), incluindo esforço, breaking, licença e alternativas de manter/substituir.
