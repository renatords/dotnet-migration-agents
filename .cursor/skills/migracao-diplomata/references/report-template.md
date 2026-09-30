# Relatório Diplomata — {{project_id}}

> Write integral via Grep no repo (sem valores de secrets). Objetivos: [objetivos-negocio-personas.md](../../migracao-orquestrador/references/objetivos-negocio-personas.md#diplomata).

> `.migration-context/reports/diplomata.md` no repositório **alvo**  
> **Pré-requisitos:** `reports/analista.md`, `reports/auditor.md`, `reports/cartografo.md`.

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | |
| Raiz absoluta | |
| `target_framework` | |
| Gerado em (UTC) | |

## 2. Resumo executivo

- Total de interfaces externas (config):
- Por tipo (Database / REST_API / SOAP / File_System):
- EF Core: (sim / não / parcial por projeto)
- Observabilidade: (stack detectada ou "não identificada")

## 3. Escopo (cruzamento com Analista)

Cruzar §3 Analista — integrações em projetos **in scope**.

## 4. Interfaces externas

> Grep em config (**chaves**, não valores) e código. Valores **higienizados** — [checklist-config-higienizada.md](../../migracao-orquestrador/references/checklist-config-higienizada.md).

| type | identifier | migration_risk |
|------|------------|----------------|
| Database / REST_API / SOAP / File_System | | |

Filas ou outros padrões não classificados pelo script: documentar aqui com tipo descritivo e risco.

## 5. Persistência e EF

> Grep `DbContext`, `AddDbContext`; Glob `Migrations/`.

| Projeto (in scope) | EF Core | Versão (se conhecida) | Connection string (higienizada) | Pasta Migrations | Riscos upgrade (checklist) |
|--------------------|---------|----------------------|---------------------------------|------------------|----------------------------|
| | Sim / Não | | | Sim / Não / N/A | |

**Checklist breve EF (marcar aplicável):**

- [ ] Provider SQL compatível com runtime destino
- [ ] Breaking changes entre versões EF (consultar release notes)
- [ ] Migrations pendentes / histórico inconsistente
- [ ] Raw SQL / `FromSql` / views
- [ ] Interceptors, value converters, owned types

## 6. Observabilidade

> Grep OpenTelemetry, Serilog, Application Insights em csproj e Startup/Program.

| Componente | Presente? | Pacote / config | Atualização para TFM destino | Impactos |
|------------|-----------|-----------------|------------------------------|----------|
| Serilog | | | | |
| OpenTelemetry | | | | |
| Application Insights | | | | |
| Outro | | | | |

> Versões de pacotes: preferir `reports/auditor.md` ou `.csproj`; não duplicar inventário CVE.

## 7. Contratos externos / consumidores

APIs ou integrações cujo **contrato vive fora deste repositório** (parceiros, gateways, contratos publicados):

| Consumidor / parceiro | Contrato / artefato | Direção | Risco na migração |
|-----------------------|----------------------|---------|-------------------|
| | OpenAPI / WSDL / doc / oral | inbound / outbound | |

Não incluir aqui dependências **entre projetos do mesmo repo** (Cartógrafo).

## 8. Riscos por tipo de integração

| Tipo | Quantidade (aprox.) | Riscos agregados | Mitigação sugerida |
|------|---------------------|------------------|-------------------|
| Database | | TLS, driver, timeout, secrets | |
| REST_API | | Auth, serialização, HttpClient | |
| SOAP | | WCF/CoreWCF, bindings | |
| File_System | | Paths Linux/container | |
| Filas / messaging | | SDK, poison, idempotência | |

## 8b. Fila de homologação

> Preencher via [template-fila-homologacao.md](../../migracao-orquestrador/references/template-fila-homologacao.md) — uma linha por integração Critical/Warning (Auditor §4) ou risco equivalente.  
> **DI-03:** cada risco relevante precisa de prioridade, evidência e **asserção observável** (resultado verificável), ou encaminhamento justificado (`manual_homolog` / residual).  
> Mock da interface do chamador ≠ contrato HTTP do cliente — ver [qualidade-decisoes-evidencias.md](../../migracao-orquestrador/references/qualidade-decisoes-evidencias.md#cenários-por-risco).

| integration_kind | identifier | playbook | evidence | migration_risk | homolog_priority | asserção_observável | verificacao_sugerida |
|------------------|------------|----------|----------|----------------|------------------|---------------------|----------------------|
| | | | | | P0/P1/P2 | (ex.: status+payload; roundtrip DB; msg no tópico) | (nível do teste + infra) |

## 9. Recomendações

1. 
2. 

## 10. Perguntas abertas (para personas downstream)

| # | Pergunta | Persona sugerida |
|---|----------|------------------|
| 1 | | Estratega |
| 2 | | |

> Delegar testes E2E ou validação de contrato externo.

## 11. Incertezas

- 

## 12. Evidências

| Fonte | Path / comando |
|-------|----------------|
| Predecessors | `reports/analista.md`, `auditor.md`, `cartografo.md` — [guia-leitura-predecessor.md](../../migracao-orquestrador/references/guia-leitura-predecessor.md#diplomata-passo-4) |
| Config higienizada | [checklist-config-higienizada.md](../../migracao-orquestrador/references/checklist-config-higienizada.md) |
| Fila de homologação | §8b + [template-fila-homologacao.md](../../migracao-orquestrador/references/template-fila-homologacao.md) |
| Config (chaves) | Grep em `appsettings*.json` — sem valores |
| Código | paths relativos citados (DbContext, Refit, Kafka, etc.) |
