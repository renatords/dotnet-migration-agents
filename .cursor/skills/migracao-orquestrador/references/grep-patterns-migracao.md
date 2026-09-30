# Padrões Grep — uso e breaking no repo

> Padrões de Grep para uso e breaking no repo.  
> **Auditor:** executar Grep quando pacote correspondente estiver **in scope**.

## Como usar

1. Identificar pacote em §4 (via [mapeamento-pacote-playbook.md](mapeamento-pacote-playbook.md)).
2. Correr **≥1** padrão abaixo para esse pacote.
3. Registrar hits (path:linha) em §4 col. uso e §12 Evidências.

---

## EF Core (provider do alvo)

| `pattern_id` | Grep (ripgrep) | Breaking / risco |
|--------------|----------------|------------------|
| `ef_dbcontext` | `DbContext` | Lifetime, DI, migrations |
| `ef_on_configuring` | `OnConfiguring\s*\(\s*DbContextOptionsBuilder` | Connection string fora de DI |
| `ef_use_sqlserver` | `UseSqlServer\s*\(` | Provider SQL Server — alinhar EF + SqlServer ao TFM |
| `ef_use_npgsql` | `UseNpgsql\s*\(` | Provider PostgreSQL — alinhar Npgsql + EF ao TFM |
| `ef_include` | `\.Include\s*\(` | Queries complexas pós-upgrade |

**Breaking summary (net8):** EF Core 8 + **provider do alvo** (SqlServer ou Npgsql) — migrations, DateTime, tracking. **Não** assumir PostgreSQL. Ver playbooks `ef-core.md` / `ef-core-sqlserver.md` / `ef-core-postgresql.md`.

---

## HTTP / Refit / Polly

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `refit_http_attr` | `\[(Get\|Post\|Put\|Delete\|Patch)\s*\(` | Refit 5→7 atributos/serialização |
| `refit_add_client` | `AddRefitClient` | DI + BaseAddress |
| `refit_rest_service` | `RestService\.For` | API legada Refit |
| `http_client_factory` | `IHttpClientFactory` | Preferir factory vs `new HttpClient` |
| `polly_policy_handler` | `AddPolicyHandler` | Polly v8 vs v7 |

---

## Kafka (Confluent)

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `kafka_namespace` | `using Confluent\.Kafka` | Cliente 2.x |
| `kafka_producer_config` | `new ProducerConfig` | Config 1→2 |
| `kafka_producer_builder` | `ProducerBuilder\s*<` | Handlers, Commit |

---

## Cache Redis

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `redis_add_cache` | `AddStackExchangeRedisCache` | Extensions 8.x |
| `redis_multiplexer` | `ConnectionMultiplexer` | TLS, cluster |

---

## Newtonsoft / MVC

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `mvc_add_newtonsoft_json` | `AddNewtonsoftJson` | Pipeline serialização ASP.NET Core 8 |
| `jsonconvert` | `JsonConvert\.` | Settings vs System.Text.Json |

---

## Swagger / OpenAPI

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `swagger_add` | `AddSwaggerGen` | Swashbuckle 6.x |
| `swagger_use` | `UseSwagger` | Middleware order |

---

## Observabilidade

| `pattern_id` | Grep | Notas |
|--------------|------|-------|
| `serilog` | `UseSerilog`, `Serilog` | Serilog 3.x |
| `otel` | `AddOpenTelemetry`, `OpenTelemetry` | Exporters |
| `appinsights` | `AddApplicationInsights` | SDK ASP.NET Core 8 |

---

## Testes legados

| `pattern_id` | Grep | Breaking / risco |
|--------------|------|------------------|
| `mvc_core_test` | `Microsoft\.AspNetCore\.Mvc\.Core` | **Incompatível net8** — Mvc.Testing 8.x |
| `xunit_fact` | `\[Fact\]` | xUnit 2.x — geralmente OK |
| `moq_mock` | `new Mock\s*<` | Política Moq SponsorLink |

---

## ASP.NET Core / hosting (transversal)

| Grep | Risco |
|------|-------|
| `Startup\.cs` + `ConfigureServices` | Hosting legado vs minimal |
| `WebHost\.CreateDefaultBuilder` | API hosting antiga |
| `System\.Web` | **Bloqueante** — não suportado em Core |

---

## Pacote sem entrada acima

1. Grep `using <NamespacePrincipal>;` (NuGet docs).
2. Marcar **Verificar** em §11 + playbook [generic-external.md](specializations/generic-external.md).
