# EF Core + SQL Server

> Especialização `ef_core_sqlserver` · `integration_kind: database`

## Checklist Diplomata

1. Connection strings SQL Server (higienizadas).
2. Pasta `Migrations/` e plano EF major.
3. NTS / spatial e features do provider se presentes.

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

| Nível | O que usar | O que verifica | Cobertura e limites |
|-------|------------|-------------|---------------------------|
| **Unitário / fake** | Mock de repositório ou InMemory com limites explícitos | Lógica do serviço | Apenas lógica do chamador; não valida o contrato do pacote |
| **Contrato persistência** | Testcontainers SQL Server (`testcontainers_mssql`) ou BD isolada | CRUD/roundtrip, features do provider | Somente os comportamentos exercitados, com asserções observáveis e evidência registrada |
| **Homolog** | Ambiente real | Schema, permissões | `manual_homolog` |

1. Opt-in/Skippable para contentor; skip ≠ validação do provider.
2. Smoke CRUD e queries críticas no nível contrato.

Um teste aprovado cobre apenas o cenário e as asserções executados; não encerra todos os riscos do pacote. Vincular a evidência ao critério de encerramento do risco e registrar os residuais. Para CVE, teste funcional não substitui reauditoria e verificação da correção ou mitigação documentada. Aprovação no Canvas e prioridade P0 não são evidência de execução.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 / net10.0 | EF Core + SqlServer alinhados ao TFMD (candidatos — verificar). |
| net7.0 | EF Core 7 + SqlServer 7. |

Cruzar `raw_sql_signals[]` do Cartógrafo se existir. Versões = candidatas — [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md).
