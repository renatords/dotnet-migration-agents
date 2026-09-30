# EF Core (provider a confirmar)

> Especialização `ef_core` · `integration_kind: database`

Usar quando o inventário tem `Microsoft.EntityFrameworkCore` **sem** provider claro ainda. O Diplomata/Estratega devem promover para `ef_core_sqlserver` ou `ef_core_postgresql` (ou outro) assim que `UseSqlServer` / `UseNpgsql` / PackageReference do provider aparecerem.

## Checklist Diplomata

1. Identificar provider real (SqlServer / Npgsql / outro).
2. Pasta `Migrations/` e plano EF major.
3. `OnConfiguring` vs `AddDbContext`.

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

1. **Não** assumir PostgreSQL — Testcontainers / `alt_auto` do **provider do alvo**.
2. Fake/InMemory: limites explícitos; não fecha risco do provider.
3. Smoke CRUD no provider real quando o risco for Critical/Warning de EF/provider.
4. Promover para o playbook específico do provider assim que identificado.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 / net10.0 | EF Core + provider alinhados ao TFMD (candidatos — verificar). |
| net7.0 | EF Core 7 + provider. |
