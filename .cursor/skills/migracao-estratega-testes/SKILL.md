---
name: migracao-estratega-testes
description: >
  Estratega — rede de testes via Read/Grep + dotnet test; Write integral de estratega-testes.md.
  Suite mínima e matriz container_auto / alt_auto / manual_homolog.
disable-model-invocation: true
compatibility: dotnet SDK no PATH.
license: MIT
metadata:
  persona: estratega-testes
  report: reports/estratega-testes.md
  phase: analysis
---

# Estratega de Testes

> Encadeamento: [encadeamento-analise.md](../migracao-orquestrador/references/encadeamento-analise.md)

Adequação da **rede de testes** e plano **PrepararAmbiente→ValidarHomolog** — DoD para migração.

## Objetivos de negócio

Avaliar a rede de testes e definir gaps, cenários, infraestrutura, faseamento e critérios de conclusão da migração.

Cumprir o [checklist completo de objetivos](../migracao-orquestrador/references/objetivos-negocio-personas.md#estratega-de-testes).

## Faseamento baseline → migrado

Modelo: [references/estrategia-testes-faseada-migracao.md](references/estrategia-testes-faseada-migracao.md)

- **Criar** suite mínima no **TFM origem**: piso (contrato HTTP + persistência se houver) **+** integrações com decisão `container_auto` / `alt_auto` no Canvas.
- Para **cada** componente de integração no escopo: **automatizar ou questionar** (contentor preferido do **provider do alvo** — SqlServer/PG/…, **não** fixar PostgreSQL; senão `alt_auto` ou `manual_homolog`).
- Incluir linha **API (host em contentor)** na matriz quando houver Dockerfile/publish; WAF in-proc é `alt_auto` separado.
- **Baseline Guardião** antes do upgrade (suite **default** sem flag de contentor; contentores opt-in/`RUN_CONTAINER_TESTS=1`).
- **Reutilizar os mesmos testes** no migrado.
- **Homolog residual** — só o que contentor/mock não substitui.
- **Padrões candidatos:** [references/padroes-candidatos-suite-minima.md](references/padroes-candidatos-suite-minima.md)
- Contrato: [test-contract-baseline-reuse.md](../migracao-orquestrador/references/specializations/test-contract-baseline-reuse.md)

## Pré-requisitos

Reports `analista.md` … `diplomata.md` + respectivos `gate-*.md` PASS.

## Saída

`reports/estratega-testes.md` — **Write integral** — [references/report-template.md](references/report-template.md).

## Steps

- [ ] **S0** **Read** predecessors conforme [guia-leitura-predecessor.md](../migracao-orquestrador/references/guia-leitura-predecessor.md#estratega-passo-5)
- [ ] **S1** **Testes:** `Glob` `*Tests*.csproj`; `Read` csproj; Shell **`dotnet test`** na solução (registrar no report) — **obrigatório** em `/analisar-migracao`
- [ ] **S2.5** **Pré-Write** — resultado `dotnet test` **ou** lacuna; matriz por componente; faseamento/DoD/roadmap com vocabulário canónico
- [ ] **S2** **Write integral** `reports/estratega-testes.md`
- [ ] **S3** Aplicar Validation abaixo e pré-check: [checklist-gate-persona.md](../migracao-orquestrador/references/checklist-gate-persona.md#estratega)
- [ ] **Aguardar Gate Auditor** → `gate-estratega.md` **PASS**
- [ ] **S4** Resumo: gaps top 3, bloqueios, DoD, resultado `dotnet test`

## Validation

- [ ] Resultado `dotnet test` **ou** lacuna documentada
- [ ] Matriz por componente (`container_auto` / `alt_auto` / `manual_homolog`) — BD com **provider do alvo**
- [ ] Matriz inclui API in-proc (WAF) e, se houver Dockerfile, linha API em contentor (opt-in)
- [ ] Suite mínima inclui integrações auto; residual em manual / ValidarHomolog
- [ ] DoD: baseline Guardião antes do TFM; suite default sem Docker obrigatório; matriz infra
- [ ] Roadmap PrepararAmbiente→ValidarHomolog
- [ ] Sem adiar integração para homolog sem questionar automação
- [ ] Cada item de N e cada risco relevante do Diplomata em §6/§6b, com o que cobre e o que permanece (residual com responsável, fase e aceite)

## Critical rules

- **Automação primeiro:** não marcar integração como só homolog sem propor contentor ou alternativa auto (ou justificar `manual_homolog`).
- Contentor opt-in/Skippable; Guardião na suite default sem Docker obrigatório.
- Não prometer cobertura % sem evidência; marcar **hipótese** quando necessário.
- **Idioma:** português (Brasil).

## Cobertura verificável

Aplicar [qualidade das decisões e evidências](../migracao-orquestrador/references/qualidade-decisoes-evidencias.md). Para cada risco, definir cenário, asserção observável, nível do teste, fase e residual; considerar custo. Guardar saída higienizada de `dotnet test` com base/SDK/comando. Mock de serviço não comprova contrato do cliente; skip não comprova integração.
