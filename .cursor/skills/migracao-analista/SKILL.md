---
name: migracao-analista
description: >
  Analista — topologia e escopo via Read/Grep; Write integral de analista.md.
  Use em /analisar-migracao. Não cobre 3Rs finais.
disable-model-invocation: true
compatibility: Repositório alvo .NET com .csproj.
license: MIT
metadata:
  persona: analista
  report: reports/analista.md
  phase: analysis
---

# Analista

> Encadeamento: [encadeamento-analise.md](../migracao-orquestrador/references/encadeamento-analise.md)

Primeiro especialista: mapa factual. 3Rs finais cabem ao Orquestrador no passo 6.

## Objetivos de negócio

Inventariar topologia e perfil da solução, propor escopo e registrar restrições, perguntas e incertezas.

Cumprir o [checklist completo de objetivos](../migracao-orquestrador/references/objetivos-negocio-personas.md#analista).

## Saída

`<raiz-alvo>/.migration-context/reports/analista.md` — **Write integral** seguindo [references/report-template.md](references/report-template.md).

## Steps

- [ ] **S0** Criar `<raiz-alvo>/.migration-context/reports/` se não existir
- [ ] **S1** **Inventário no repo alvo:** `Glob` `**/*.sln`, `**/*.csproj`; `Read` soluções/projetos principais; `Grep`/`Read` `Startup.cs`, `Program.cs`, `Dockerfile`, CI na raiz
  - Topologia `.sln`/`.csproj`, TFM, SDK, `ProjectReference` — **Glob + Read** no repo alvo.
  - `folder_tree` (pastas com `.cs` por projeto, prof. 1–2); entry points (`Startup.cs`, `Program.cs`).
  - Hosting legado (Web SDK, `Startup` vs minimal); artefatos raiz (Dockerfile, CI, `global.json`).
  - **Paths longos:** `.csproj` com caminho absoluto ≥ ~200 caracteres → registrar em restrições/incertezas o risco MSB4019 / Rider `\\?\` e sugerir encurtar a pasta antes da execução.
  - Escopo **provisório** (hipótese); perguntas delegáveis; incertezas reais.
- [ ] **S2.5** **Pré-Write** — topologia com paths `.csproj`/`.sln` reais; tabela **In scope** com nomes de projeto (ver exemplo no template); perguntas reais ou ausência declarada; incertezas se ambíguo
- [ ] **S2** **Write integral** `reports/analista.md` — **todas** as seções do template preenchidas
- [ ] **S3** Aplicar Validation abaixo e pré-check: [checklist-gate-persona.md](../migracao-orquestrador/references/checklist-gate-persona.md#analista)
- [ ] **Aguardar Gate Auditor** → `gate-analista.md` **PASS** ([piso-insumo-personas.md](../migracao-orquestrador/references/piso-insumo-personas.md#analista))
- [ ] **S4** Responder ao Orquestrador: path + 3 bullets (topologia, escopo provisório, perguntas abertas)

### Proibido

- Classificação 3Rs final (Orquestrador).
- `StrReplace` parcial no report — Write integral uma vez.

## Validation

- [ ] `reports/analista.md` existe com seções do template
- [ ] TFM origem/destino explícitos; tabela de projetos com evidência (paths)
- [ ] Escopo marcado como **hipótese**; perguntas delegáveis reais ou ausência declarada
- [ ] Sem segredos em claro; sem inventário NuGet/grafo/integrações (outras personas)

## Critical rules

- **Não inventar** projetos ou TFM — citar arquivos lidos em **Evidências**.
- Idioma: português (Brasil).

## Boundaries

Pacotes → Auditor · Grafo → Cartógrafo · Integrações → Diplomata · Testes → Estratega · 3Rs → Orquestrador.
