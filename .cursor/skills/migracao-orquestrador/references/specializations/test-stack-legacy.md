# Pacotes de teste legados

> Especialização `test_stack_legacy`

## Quando activar

Pacote referenciado em `*Tests*.csproj` incompatível ou legado (ex.: `Microsoft.AspNetCore.Mvc.Core` 2.x) — identificado pelo Auditor/Estratega.

## Checklist Estratega

1. Listar csproj de teste afetados.
2. Remover referência legada ou substituir (ex.: `Microsoft.AspNetCore.Mvc.Testing` na major do TFM destino).
3. `dotnet test` deve compilar antes de migrar produção.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 | Evitar ASP.NET Core 2.x em testes; usar Mvc.Testing 8.x + WebApplicationFactory. |
| net7.0 | Mvc.Testing 7.x. |

## Evidência

Pacotes listados em `reports/auditor.md` §4 com projetos de teste em `sources`.
