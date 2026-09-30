---
description: Juiz externo pós-persona — verifica report + repo e emite PASS/FAIL; não edita o report
---

Verifica o report da persona contra o repo alvo e escreve `gate-<papel>.md`. **Não** edita o report da persona. Detalhe: skill `migracao-gate-auditor`.

## Invocação

```text
/gate-auditor <papel>
```

| Argumento | Obrigatório | Valores |
|-----------|-------------|---------|
| `<papel>` | sim | `analista` \| `auditor` \| `cartografo` \| `diplomata` \| `estratega` \| `orquestrador` |

Se ausente do contexto, informar a raiz absoluta do alvo no chat/argumentos.

## Pré-requisito

`reports/<papel>.md` já escrito; para `estratega`, ler `reports/estratega-testes.md`. Para `orquestrador`, exigir e ler os cinco reports, seus gates PASS e os artefatos da síntese atual: complementos (incl. §8 Telemetria), Canvas e handoff. Invocar após sua produção e antes da aprovação humana.

## Saída

`.migration-context/reports/gate-<papel>.md` com veredito **PASS** ou **FAIL**.

## Referências

- Rubrica: [rubrica-gate-externo.md](../skills/migracao-orquestrador/references/rubrica-gate-externo.md)
- Template: [gate-report-template.md](../skills/migracao-gate-auditor/references/gate-report-template.md)
- Rule/skill: `migracao-gate-auditor`
