---
name: migracao-gate-auditor
description: >
  Gate externo: verifica report da persona + piso + rubrica via Read/Grep no repo;
  emite gate-<persona>.md PASS/FAIL. Use após cada persona — a persona NÃO auto-valida.
disable-model-invocation: true
compatibility: reports em .migration-context/reports/.
license: MIT
metadata:
  persona: gate-auditor
  phase: analysis-gate
---

# Gate Auditor — externo

> **Papel:** juiz independente; não redige reports de persona nem a síntese do Orquestrador.

## Quando usar

| Momento | Ação |
|---------|--------|
| Após Write integral de persona 1–5 | Gate parcial → `gate-<papel>.md` |
| Após os artefatos da síntese, antes da aprovação humana | Gate orquestrador → `gate-orquestrador.md` |
| Retry | Nova invocação após persona corrigir report |

## Referências

| Tema | Arquivo |
|------|----------|
| Encadeamento | [encadeamento-analise.md](../migracao-orquestrador/references/encadeamento-analise.md) |
| Rubrica | [rubrica-gate-externo.md](../migracao-orquestrador/references/rubrica-gate-externo.md) |
| Piso insumo | [piso-insumo-personas.md](../migracao-orquestrador/references/piso-insumo-personas.md) |
| Troubleshooting | [guia-troubleshooting-gate.md](../migracao-orquestrador/references/guia-troubleshooting-gate.md) |
| Template saída | [gate-report-template.md](references/gate-report-template.md) |

## Entrada

- Raiz absoluta repo **alvo**
- `<papel>` = `analista` | `auditor` | `cartografo` | `diplomata` | `estratega` | `orquestrador`
- `reports/<papel>.md`; para `estratega`, `reports/estratega-testes.md`; para `orquestrador`, os cinco reports e seus gates PASS, complementos (incl. §8 Telemetria), Canvas e handoff atuais já produzidos

## Saída

`<raiz>/.migration-context/reports/gate-<papel>.md` — **Write integral** do template.

## Steps

- [ ] **G0** Confirmar report(s) no disco; para `orquestrador`, confirmar também complementos, Canvas e handoff da síntese atual
- [ ] **G1** Ler report da persona + seção piso + rubrica da persona; no gate `orquestrador`, ler também os artefatos da síntese. O próprio gate pode estar pendente: seu PASS é saída, não pré-requisito
- [ ] **G2** **Verificar no repo** (Glob/Grep/Read) — amostra mínima:
  - csproj/TFM claims
  - inventário de uso/resolução Auditor (amostra dirigida ao risco, incluindo transitivos vulneráveis e decisões de licença quando presentes)
  - ConfigurationManager / HttpClient se aplicável
- [ ] **G3** Consultar saídas higienizadas de comandos; preencher rubrica — cada FAIL/N/A com evidência e avisos com impacto/ação. Não aprovar por contagem de chamadas
- [ ] **G4** PASS só com todos os críticos aplicáveis satisfeitos; N/A justificado. Avisos não reprovam por quantidade; impacto que compromete decisão obrigatória é crítico, com justificativa
- [ ] **G5** Write `gate-<papel>.md`
- [ ] **G6** Anunciar ao Orquestrador: PASS → avançar; FAIL → persona indicada + IDs rubrica

## Proibido

| Proibido | Motivo |
|----------|--------|
| Editar `analista.md` … `estratega-testes.md` | Fronteira juiz vs autor |
| Marcar PASS sem Grep/Read repo | Honor system |
| Síntese Canvas/handoff | Orquestrador |

## Critical rules

- **Skepticismo:** report diz X → confirmar X no repo ou **FAIL**.
- Critérios da rubrica / piso (ex.: AU-* no inventário de uso). N do Auditor é a união Critical/Warning de §3 e §4, não a contagem de `--vulnerable`. Estado fechado no handoff com major, licença ou pin ainda no Executor é FAIL.
- Cada FAIL conta em telemetria `gate_failures` (Orquestrador — complementos).

## Boundaries

| Faz | Não faz |
|-----|---------|
| PASS/FAIL + rubrica | Inventário completo (persona) |
| Re-grep spot-check | Re-Write report persona |
