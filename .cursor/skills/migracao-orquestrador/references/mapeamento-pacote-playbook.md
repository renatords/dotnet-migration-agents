# Mapeamento pacote NuGet → playbook → Grep

> Catálogo de pacotes para o Auditor.  
> Para cada pacote Critical/Warning **in scope**, localizar linha abaixo → executar Grep(s) → Read playbook **só se aplicável**.

Path playbooks: `.cursor/skills/migracao-orquestrador/references/specializations/`

## Tabela canónica

| Pacote NuGet (match case-insensitive) | `integration_kind` | Playbook | Grep sugerido (Auditor — ≥1 por pacote) |
|---------------------------------------|-------------------|----------|----------------------------------------|
| `Refit`, `Refit.HttpClientFactory` | `http_client` | [refit.md](specializations/refit.md) | `AddRefitClient`, `\[(Get\|Post\|Put\|Delete\|Patch)\s*\(`, `RestService\.For` |
| `Microsoft.Extensions.Http.Polly`, `Polly` | `http_client` | [http-client-generic.md](specializations/http-client-generic.md) | `AddPolicyHandler`, `IHttpClientFactory`, `new HttpClient` |
| *(heurística)* pastas `Client/`, tipos `I*Client` | `http_client` | [http-client-generic.md](specializations/http-client-generic.md) | `IHttpClientFactory`, `\.BaseAddress`, `HttpClient` |
| `Confluent.Kafka` | `message_bus` | [confluent-kafka.md](specializations/confluent-kafka.md) | `using Confluent\.Kafka`, `ProducerBuilder`, `ConsumerBuilder`, `BootstrapServers` |
| `StackExchange.Redis`, `Microsoft.Extensions.Caching.StackExchangeRedis` | `cache` | [stackexchange-redis.md](specializations/stackexchange-redis.md) | `AddStackExchangeRedisCache`, `IConnectionMultiplexer`, `ConnectionMultiplexer` |
| `Microsoft.EntityFrameworkCore` *(sem provider claro)* | `database` | [ef-core.md](specializations/ef-core.md) | `DbContext`, `AddDbContext`, `OnConfiguring` — **confirmar** `UseSqlServer` / `UseNpgsql` |
| `Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.Data.SqlClient` | `database` | [ef-core-sqlserver.md](specializations/ef-core-sqlserver.md) | `UseSqlServer`, `DbContext`, `AddDbContext` |
| `Npgsql.EntityFrameworkCore.PostgreSQL`, `Npgsql` | `database` | [ef-core-postgresql.md](specializations/ef-core-postgresql.md) | `UseNpgsql`, `DbContext`, `AddDbContext` |
| `Serilog.*`, `OpenTelemetry.*`, `Microsoft.ApplicationInsights.*` | `observability` | [observability-stack.md](specializations/observability-stack.md) | `UseSerilog`, `AddOpenTelemetry`, `AddApplicationInsights` |
| `Microsoft.AspNetCore.Mvc.Core` (em `*Tests*`) | `test_stack` | [test-stack-legacy.md](specializations/test-stack-legacy.md) | `PackageReference.*Mvc\.Core`, `WebApplicationFactory` |
| `Newtonsoft.Json`, `Microsoft.AspNetCore.Mvc.NewtonsoftJson` | — | [grep-patterns-migracao.md](grep-patterns-migracao.md) § Newtonsoft | `AddNewtonsoftJson`, `JsonConvert\.` |
| `Swashbuckle.AspNetCore.*` | — | [grep-patterns-migracao.md](grep-patterns-migracao.md) § Swagger | `AddSwaggerGen`, `UseSwagger` |
| Pacote Critical sem linha acima | `generic_external` | [generic-external.md](specializations/generic-external.md) | `using <NamespacePacote>`, nome do tipo principal |

## Heurística quando não há match exato

1. Normalizar id pacote: minúsculas, sem versão.
2. Procurar substring na coluna «Pacote NuGet» (ex.: `entityframeworkcore` → EF).
3. Se Critical/Warning e sem match: playbook `generic-external.md` + Grep `using` + namespace NuGet.
4. Registrar em §12 Evidências: pacote, grep usado, hits, playbook lido (ou `—`).

## Personas downstream

| Persona | Uso |
|---------|-----|
| **Auditor** | Grep + §12; opcional Read playbook para breaking/versão alvo |
| **Diplomata** | `integration_kind` + playbook → [template-fila-homologacao.md](template-fila-homologacao.md) §8b |
| **Estratega** | P0/P1 + [test-contract-baseline-reuse.md](specializations/test-contract-baseline-reuse.md) |

## TFM destino — notas rápidas

Consultar seção «Notas por TFM» de cada playbook após Read pontual. Tabela resumo em [grep-patterns-migracao.md](grep-patterns-migracao.md) quando breaking transversal.

## Uso das recomendações de versão

Versões e upgrades citados são candidatos a verificar; não impõem troca. A decisão segue [qualidade das decisões](qualidade-decisoes-evidencias.md), incluindo esforço, breaking, licença e alternativas de manter/substituir.
