---
name: migracao-cartografo
description: >
  Cartógrafo — acoplamento e blast radius via Read/Grep; Write integral de cartografo.md.
  Requer analista + auditor.
disable-model-invocation: true
compatibility: reports predecessor em .migration-context/.
license: MIT
metadata:
  persona: cartografo
  report: reports/cartografo.md
  phase: analysis
---

# Cartógrafo

Mapa de **acoplamento**, hotspots e superfície HTTP — evidência via Read/Grep no repo.

## Objetivos de negócio

Mapear acoplamento, hotspots, superfície HTTP e impacto das mudanças com evidência e nível de confiança.

Cumprir o [checklist completo de objetivos](../migracao-orquestrador/references/objetivos-negocio-personas.md#cartógrafo).

## Pré-requisitos

`reports/analista.md`, `reports/auditor.md`.

## Saída

`reports/cartografo.md` — **Write integral** — [references/report-template.md](references/report-template.md).

## Steps

- [ ] **S0** **Read** predecessors conforme [guia-leitura-predecessor.md](../migracao-orquestrador/references/guia-leitura-predecessor.md#cartógrafo-passo-3)
- [ ] **S1** **Repo:** Grep `ProjectReference`; Read hubs citados no inventário de uso do Auditor e coletar:
  - Grafo projeto ↔ projeto: Read `ProjectReference` + topologia do Analista.
  - Hotspots (Startup, DI, repositórios): Read + Grep `AddDbContext`, controllers.
  - Instanciação estática: Grep `new HttpClient`, producers Kafka, etc.
  - Superfície HTTP: Grep `Controller`, `[Route`, `MapGet`.
- [ ] **S1b** **Blast radius:** [heuristica-blast-radius-grep.md](../migracao-orquestrador/references/heuristica-blast-radius-grep.md) para top pacotes Critical
- [ ] **S2.5** **Pré-Write** — blast radius com coluna **Confiança** Alta/Média/Baixa; escopo menciona projetos do Analista; hotspots com path
- [ ] **S2** **Write integral** `reports/cartografo.md`
- [ ] **S3** Aplicar Validation abaixo e pré-check: [checklist-gate-persona.md](../migracao-orquestrador/references/checklist-gate-persona.md#cartografo)
- [ ] **Aguardar Gate Auditor** → `gate-cartografo.md` **PASS** ([piso-insumo-personas.md](../migracao-orquestrador/references/piso-insumo-personas.md#cartografo))
- [ ] **S4** Resumo: hub principal, fan-in/out, top hotspots

## Validation

- [ ] Escopo coerente com Analista/Auditor; hotspots com **path**; perguntas delegáveis
- [ ] Blast radius com **confiança** Alta/Média/Baixa ([heuristica-blast-radius-grep.md](../migracao-orquestrador/references/heuristica-blast-radius-grep.md))
- [ ] Sem inventário NuGet completo (Auditor) nem integrações BD/Kafka (Diplomata)

## Critical rules

- Grafo = **hipótese** a partir de grep/read — marcar incerteza se análise estática profunda não foi feita.
