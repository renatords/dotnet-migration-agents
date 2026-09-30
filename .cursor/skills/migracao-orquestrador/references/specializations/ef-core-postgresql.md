# EF Core + PostgreSQL

> Especialização `ef_core_postgresql` · `integration_kind: database`

## Checklist Diplomata

1. Connection strings PostgreSQL (higienizadas).
2. Pasta `Migrations/` e plano EF 3→8 (ou major aplicável).
3. `OnConfiguring` vs `AddDbContext` — ambientes e lifetime.

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

| Nível | O que usar | O que verifica | Cobertura e limites |
|-------|------------|-------------|------------------------|
| **Unitário / fake** | Mock de repositório ou InMemory com limites explícitos | Lógica do serviço | Apenas lógica do chamador; não valida o contrato do pacote |
| **Contrato persistência** | Provider real (Testcontainers PG / homolog isolada) | CRUD/roundtrip, datas, tradução de queries | Somente os comportamentos exercitados, com asserções observáveis e evidência registrada |
| **Homolog** | Ambiente real / DBA | Schema, permissões, side-effect | Residual `manual_homolog` |

1. Smoke CRUD e queries críticas no **provider do alvo** (Npgsql), não só InMemory.
2. Se InMemory/`alt_auto`: declarar o que **não** cobre (ex. `UseNpgsql`, DateTime, raw SQL).
3. Sem pasta `Migrations/`: coordenar schema (scripts SQL) no residual.

Um teste aprovado cobre apenas o cenário e as asserções executados; não encerra todos os riscos do pacote. Vincular a evidência ao critério de encerramento do risco e registrar os residuais. Para CVE, teste funcional não substitui reauditoria e verificação da correção ou mitigação documentada. Aprovação no Canvas e prioridade P0 não são evidência de execução.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 / net10.0 | EF Core + Npgsql alinhados ao TFMD (candidatos — verificar). |
| net7.0 | EF Core 7 + Npgsql 7. |

Cruzar `raw_sql_signals[]` do Cartógrafo se existir. Versões = candidatas — [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md).
