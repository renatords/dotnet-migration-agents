# Suite mínima (CriarSuiteMinima) — checklist Executor

Referência operacional para `CriarSuiteMinima` no TFM **origem**. Respeitar handoff §9b / Canvas (`container_auto` / `alt_auto` / `manual_homolog`).

## Artefatos obrigatórios no repo alvo (origem)

### `.gitignore` (mínimo)

```gitignore
[Bb]in/
[Oo]bj/
.idea/
.vs/
*.user
.migration-context/
.migration-worktrees/
```

**Nunca** `git add -A` sem rever: `bin/`/`obj/` não entram no commit.

### `nuget.config` (opcional mas recomendado)

Se aparecer `NU1301` (fonte local ausente):

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
  </packageSources>
</configuration>
```

## ProjectReferences no csproj de testes

- Referenciar **explicitamente** todos os assemblies usados nos `using` (ex.: `Api`, `Domain`, `Infra.Data`) — **não** depender só de refs transitivas (Rider/ReSharper → CS0234).
- Incluir `<FrameworkReference Include="Microsoft.AspNetCore.App" />` se referenciar projeto `Sdk.Web` / Controllers.
- `PreserveCompilationContext=true` quando usar `WebApplicationFactory`.

## Contentores (opt-in)

| Contrato | Valor |
|----------|--------|
| Env opt-in | `RUN_CONTAINER_TESTS=1` |
| Comportamento default | `SkippableFact` / skip se env ausente ou Docker indisponível |
| Guardião | `dotnet test` **sem** env → skip ≠ `regression_detected` |
| Trait sugerido | `Category=TestContainers` |

BD: usar Testcontainers do **provider do alvo** (`MsSql` / `PostgreSql` / …) — evidência em PackageReference / `UseSqlServer` / `UseNpgsql` (Estratega §5b / handoff §9b; decisão aprovada no Canvas). **Não** assumir PostgreSQL.

## Smoke API em contentor

Só se §5b / Canvas marcar `container_auto` para **API (host em contentor)**. Caso contrário WAF in-proc basta. Opt-in com o mesmo `RUN_CONTAINER_TESTS=1`.

## Paths longos

Se o Analista assinalar path longo em §4/§8 (ou MSB4019 / `\\?\`): encurtar pasta/nome do `.csproj` **antes** de aprofundar worktrees; `git -c core.longpaths=true`.
