# Testes de contrato — baseline reutilizável

> Especialização `test_contract_baseline_reuse` · faseamento Estratega / Executor / Guardião

## Objetivo

Criar testes no **TFM origem** que sobrevivem ao upgrade com **mínima alteração** (versões NuGet, `WebApplicationFactory`, connection string de Testcontainers).

## Quando usar

- Pacotes HTTP/Refit com `usage_sites` (Auditor + Diplomata).
- Consultas a repositório/EF tocadas pela migração.
- Integração de infra (fila, broker, cache, …): contentor **opt-in** ou mock na suite mínima se o Canvas marcar `container_auto` / `alt_auto`; só `manual_homolog` quando credencial real ou side-effect de negócio.

## Fluxo

1. **CriarSuiteMinima + GuardiãoOrigem (TFM origem):** implementar teste; GuardiãoOrigem verde.
2. **MigrarVersao:** subir TFM e pacotes na worktree destino.
3. **ValidarMigracao:** **mesmos arquivos de teste**; ajustar só:
   - versões de pacote no `.csproj` de teste;
   - factory/DI se breaking de hosting;
   - connection string (Testcontainers continua igual).
4. **Guardião post:** comparar outcome com GuardiãoOrigem.

## Contrato HTTP (Refit)

- Mock `HttpMessageHandler` ou WireMock in-process.
- Asserções: rota, headers, body serializado — **independentes** da versão Refit salvo breaking documentado.
- Golden file JSON opcional para DTOs (Newtonsoft settings iguais ao Startup).

## Consulta BD

- Preferir contentor efémero (opt-in/Skippable na pipe) **ou** BD hml isolada (documentar risco de dados).
- Teste mínimo: um `DbContext` + uma query/insert conhecida — não suite ORM completa.
- **Mesmo teste** no TFM destino; expectativa de schema igual (sem migrations no repo → validar com DBA).

## Checklist Executor

- [ ] Teste compila e passa no TFM origem.
- [ ] GuardiãoOrigem registrado.
- [ ] Após upgrade: diff limitado a csproj/DI/config.
- [ ] ValidarMigracao: sem `regression_detected` nos testes da suite mínima.

## Evidência

Citar paths de usage sites / verificações de homologação do Diplomata/Auditor — não inventar endpoints.

## Verificar o risco, não apenas a chamada

Aplicar [qualidade das decisões e evidências](../qualidade-decisoes-evidencias.md#cenários-por-risco). Cliente e serializer reais com transporte simulado para contrato; provider real para semântica específica; resultado observável em mensageria/cache. Escolher cenários pelos riscos presentes e custo, sem impor biblioteca, endpoint ou domínio.
