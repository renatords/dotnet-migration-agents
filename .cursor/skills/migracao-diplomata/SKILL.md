---
name: migracao-diplomata
description: >
  Diplomata — integrações externas via Read/Grep; Write integral de diplomata.md.
  Requer reports predecessor.
disable-model-invocation: true
compatibility: reports predecessor em .migration-context/.
license: MIT
metadata:
  persona: diplomata
  report: reports/diplomata.md
  phase: analysis
---

# Diplomata

Integrações **externas** (BD, filas, APIs, config) com evidência no repo.

## Objetivos de negócio

Mapear integrações externas, persistência, observabilidade e riscos; propor verificações com identificadores higienizados.

Cumprir o [checklist completo de objetivos](../migracao-orquestrador/references/objetivos-negocio-personas.md#diplomata).

## Pré-requisitos

`reports/analista.md`, `reports/auditor.md`, `reports/cartografo.md`.

## Saída

`reports/diplomata.md` — **Write integral** — [references/report-template.md](references/report-template.md).

## Steps

- [ ] **S0** **Read** predecessors conforme [guia-leitura-predecessor.md](../migracao-orquestrador/references/guia-leitura-predecessor.md#diplomata-passo-4)
- [ ] **S1** **Repo:** Grep integrações; Read [mapeamento-pacote-playbook.md](../migracao-orquestrador/references/mapeamento-pacote-playbook.md) para stacks Critical Auditor; Read playbooks **pontual**; preencher riscos por integração e fila de homologação (Critical/Warning Auditor + playbooks) com [template-fila-homologacao.md](../migracao-orquestrador/references/template-fila-homologacao.md)
  - DbContext/EF: Grep `DbContext`, `AddDbContext`; chaves config PostgreSQL/SQL (**não** valores).
  - Kafka/Redis/filas: Grep client types + config keys; HTTP/Refit: Grep `Refit`, `IHttpClientFactory`.
  - Migrations: Glob `Migrations/`, `EnsureCreated`; OTel/logging: Grep OpenTelemetry, Serilog.
- [ ] **S1b** **Config:** [checklist-config-higienizada.md](../migracao-orquestrador/references/checklist-config-higienizada.md) — chaves sim, valores nunca
- [ ] **S2.5** **Pré-Write** — fila de homologação dos riscos de integração presentes, ou ausência justificada; connection strings `(higienizada)` ou nome da chave
- [ ] **S2** **Write integral** `reports/diplomata.md`
- [ ] **S3** Aplicar Validation abaixo e pré-check: [checklist-gate-persona.md](../migracao-orquestrador/references/checklist-gate-persona.md#diplomata)
- [ ] **Aguardar Gate Auditor** → `gate-diplomata.md` **PASS**
- [ ] **S4** Resumo: contagem integrações, bloqueios homolog

### Proibido

- `Read`/`Glob` **integral** de `appsettings*.json` (risco de segredos).

## Validation

- [ ] Identificadores higienizados ([checklist-config-higienizada.md](../migracao-orquestrador/references/checklist-config-higienizada.md)); escopo alinhado
- [ ] Verificações de homologação (§8b) com evidência **e asserção observável** (arquivo/classe/playbook) — ou encaminhamento justificado; ver [template-fila-homologacao.md](../migracao-orquestrador/references/template-fila-homologacao.md)
- [ ] Sem re-inventário NuGet (Auditor) nem grafo (Cartógrafo)

## Critical rules

- **Nunca** colar connection strings no report ou chat.
