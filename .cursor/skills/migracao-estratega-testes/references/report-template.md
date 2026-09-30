# Relatório Estratega de Testes — {{project_id}}

> `.migration-context/reports/estratega-testes.md` no repositório **alvo**  
> Preencher via **Glob/Grep/Read** + Shell **`dotnet test`**. Objetivos: [objetivos-negocio-personas.md](../../migracao-orquestrador/references/objetivos-negocio-personas.md#estratega-de-testes).

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | |
| Raiz absoluta | |
| `target_framework` | |
| Gerado em (UTC) | |
| Pré-requisitos lidos | analista · auditor · cartografo · diplomata |

## 2. Resumo executivo

- Projetos de teste detectados (in scope):

- Estado atual da suite (`dotnet test`: OK / falhou / não executado / parcial):

- Principais gaps (top 3):

- Bloqueio “não migrar sem” (se houver):

- Faseamento resumido (baseline → migrado):

## 3. Inventário de testes

### 3.1 Projetos de teste

| Projeto (.csproj) | In scope? | Framework de teste | Cobre (assemblies/módulos) | Como correr localmente |
|-------------------|-----------|--------------------|----------------------------|-------------------------|
| | Sim / Não / Parcial | xUnit / NUnit / MSTest / ? | | `dotnet test <path>` |

### 3.2 Como executar localmente (resumo)

```bash

# Solução / entrada principal

dotnet test <caminho-sln-ou-csproj>

# Por projeto de teste in scope

```

> Alinhar com projetos de teste inventariados e resultado `dotnet test`.

## 4. Cobertura vs escopo migrado

Cruzar **escopo provisório** de `reports/analista.md` com a rede de testes existente.

| Componente / projeto (escopo provisório) | Prioridade análise | Coberto por testes? | Tipo existente | Lacuna |
|------------------------------|------------------|---------------------|----------------|--------|
| | REHOST / REVISE / RETAIN | Sim / Parcial / Não | unit / integration / E2E | |

## 5. Gaps prioritários

| # | Gap | Tipo de teste a adicionar | Complexidade (L/M/H) | Prioridade | Evidência |
|---|-----|---------------------------|----------------------|------------|-----------|
| 1 | | unitário / integração / contrato / E2E | L / M / H | suite_minima / pos_migracao / opcional | |

## 5b. Viabilidade de infraestrutura de teste

> Perguntas do [doc faseamento](estrategia-testes-faseada-migracao.md) e [padrões candidatos](padroes-candidatos-suite-minima.md) — **uma linha por componente** (Diplomata/Auditor). Exemplos só ilustrativos; não fixar produtos.

> Decisões: `container_auto` | `alt_auto` | `manual_homolog`. Contentor exige aceite no Canvas; testes de contentor opt-in / Skippable.

| Componente | Sinal (Diplomata/Auditor) | Container viável? | Alternativa auto | Decisão proposta | Risco se manual |
|------------|---------------------------|-------------------|------------------|------------------|-----------------|
| Persistência / BD | | Sim / Não / Incerto | InMemory / subclass DbContext / CS hml | container_auto / alt_auto / manual_homolog — **provider do alvo** (SqlServer / PG / …), não fixar PostgreSQL | |
| API (host in-proc) | | — | WebApplicationFactory | alt_auto | |
| API (host em contentor) | Dockerfile / publish / CI runtime | Sim se Docker aceito | WAF-only | container_auto (opt-in) / alt_auto / omitir | Publish/env/rede só em homolog |
| Integração A (fila/broker/cache/jobs/…) | | | mock / stub | | |
| Integração B | | | | | |

**Pergunta ao humano (Canvas):** contentores efêmeros são estratégia aceita neste alvo? Se não — preencher só `alt_auto` / `manual_homolog`.

## 6. Faseamento baseline → migrado

> **Insumos para o Orquestrador** — consolidados em `handoff-execucao.md` **§9b**. O Executor **não** remonta esta ordem se §9b existir. Ver [estrategia-testes-faseada-migracao.md](estrategia-testes-faseada-migracao.md) § “Quem monta o plano executável?”.

> **Mesmo teste** no TFM origem e destino quando possível. Orientação: reutilizar os mesmos testes origem→destino.

> Prioridade `suite_minima` = piso HTTP/persistência **+** integrações com decisão `container_auto` / `alt_auto`. Residual real → `manual` / ValidarHomolog (não adiar integração sem questionar automação).

| Cenário | Criar antes? | GuardiãoOrigem (TFM origem) | Pós migrado | Reutilizar mesmo teste? | Infra | Custo criar | Prioridade |
|---------|--------------|-----------------------------|-------------------|-------------------------|-------|-------------|------------|
| Contrato HTTP | Sim / Não / Já existe | Sim / Não | Sim | Sim / Não | mock / WAF | L/M/H | suite_minima |
| Persistência / BD | | | | | container (opt-in, **provider do alvo**) / alt_auto | | suite_minima |
| Smoke hosting API (in-proc) | | | | | WebApplicationFactory | | suite_minima |
| Smoke API em contentor | | | | | container_auto opt-in (Dockerfile/publish) | | suite_minima se Canvas; senão omitir |
| Integração (componente X) | | | | | container_auto / alt_auto | | suite_minima se auto |
| Unitários existentes | Não | Sim | Sim | Sim | none | L | |
| Residual (IdP/Vault/SASL/side-effect) | Não auto | Não | Homolog | — | manual | H | manual |

## 6b. Cenários críticos (detalhe)

| Cenário | Origem (Auditor/Cartógrafo/Diplomata) | In scope? | Notas técnicas |
|---------|--------------------------------------|-----------|----------------|
| | | | |

### Risco → cenário → resultado observável

| Risco / componente / origem no report | Cenário existente ou novo | Nível real exercitado / o que é mockado | Asserção / resultado esperado | Fase / decisão infra | Evidência prevista / residual |
|---|---|---|---|---|---|
| | | | | | |

Cada item de N e cada risco relevante da fila de integrações aparece aqui. A linha diz o que o cenário cobre e o que permanece. Mock do chamador não encerra cliente/provider. Residual precisa de responsável, fase e aceite. Agrupar, adiar ou retirar exige justificativa. Seguir [contrato de qualidade](../../migracao-orquestrador/references/qualidade-decisoes-evidencias.md).

## 7. Só manual / custo proibitivo / residual

> Só o que contentor ou alternativa auto **não** cobre — ou custo/flaky aceito no Canvas. Cada linha deve ter motivo (credencial real, side-effect, licença, etc.).

| Item | Motivo | Quando executar | Responsável sugerido |
|------|--------|-----------------|----------------------|
| | IdP/Vault real, SASL/cluster, side-effect de negócio, flaky | ValidarHomolog | Humano |

## 8. DoD de testes sugerido (handoff)

> Critérios que o **Orquestrador** copia para `handoff` §9b e §12. Executor/Guardião validam na execução.

- [ ] Matriz §5b preenchida (cada integração: `container_auto` / `alt_auto` / `manual_homolog`) e estratégia de contentor **aprovável** no Canvas

- [ ] Contrato de contentores documentado (opt-in/Skippable; Guardião = `dotnet test` default sem Docker obrigatório)

- [ ] **GuardiãoOrigem** no TFM origem (suite acordada default + suite mínima verde) — antes do upgrade TFM

- [ ] Suite mínima **criada** no origem: piso HTTP/persistência + integrações com decisão auto (§6) — **antes** do GuardiãoOrigem

- [ ] **Mesmos testes da suite mínima** passam no TFM migrado (ajuste só pacote/hosting/config)

- [ ] `dotnet test` agregado exit 0 GuardiãoOrigem e ValidarMigracao, ou delta explicado (skip de contentor ≠ regressão)

- [ ] Residual homolog (IdP/Vault/SASL/side-effects) listado em §7 com aceite explícito

- [ ] (itens específicos do projeto)

## 9. Recomendações

1. **Não migrar X sem Y** —

2. **Ordem de faseamento** — criar piso + integrações auto → baseline → migrar TFM → repetir testes → homolog residual

3. **Custo vs benefício** — o que ficou `manual_homolog` e porquê (contentor rejeitado? alternativa inviável?)

4. **Guardião** — subset exato baseline vs post (default; contentor opt-in à parte)

## 10. Incertezas

- 

## 11. Evidências

| Artefato | Path |
|-----------|------|
| Sessão / base / SDK / comando / exit code | registro e saída higienizada em `.migration-context/evidence/<sessao>/` |
| Evidências de teste | paths de `.csproj` / logs `dotnet test` / Incertezas |
| Faseamento (doc) | `.cursor/skills/migracao-estratega-testes/references/estrategia-testes-faseada-migracao.md` |
| Escopo provisório | `.migration-context/reports/analista.md` |
| Pacotes / breaking | `.migration-context/reports/auditor.md` |
| Acoplamento | `.migration-context/reports/cartografo.md` |
| Integrações | `.migration-context/reports/diplomata.md` |

## 12. Roadmap executável (insumo handoff §9b)

> Preenchido a partir do faseamento (§6) / roadmap PrepararAmbiente→ValidarHomolog.

| Fase | Objectivo | Responsável | Gate / evidência |
|------|-----------|-------------|------------------|
| PrepararAmbiente | Duas worktrees + build TFM origem | Executor | build OK na origem |
| CriarSuiteMinima | Piso + integrações `container_auto`/`alt_auto` (§5b/§6) no origem | Executor | suite mínima verde (default sem Docker) |
| GuardiãoOrigem | Baseline formal (suite default) | Guardião | `guardiao-baseline.md` |
| MigrarVersao | Migração (Canvas ondas) | Executor | build OK na destino |
| ValidarMigracao | Mesma suite mínima no destino | Guardião | `guardiao-post.md`; sem regressão |
| ValidarHomolog | Residual real (credenciais / side-effects) | Humano | aceite documentado |

### Cenários ligados (`test_scenario_queue[]`)

| scenario_id | Cenário | Prioridade | Fases | Arquivos evidência |
|-------------|---------|------------|-------|---------------------|
| | | suite_minima / pos_migracao / manual | CriarSuiteMinima, GuardiãoOrigem, ValidarMigracao | paths de usage_sites / blast radius |
