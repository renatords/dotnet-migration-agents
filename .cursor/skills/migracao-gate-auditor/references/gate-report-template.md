# Gate externo — {{persona}}

> Modo: **Gate Auditor** · Repo: `{{raiz}}` · Gerado: {{utc}}  
> Juiz: skill `migracao-gate-auditor` (independente da persona {{persona}})  
> Contrato: [qualidade-decisoes-evidencias.md](../../migracao-orquestrador/references/qualidade-decisoes-evidencias.md)

## Veredito global

**{{PASS | FAIL}}**

## Resumo

| Métrica | Valor |
|---------|--------|
| Critérios críticos avaliados | |
| FAIL críticos | |
| FAIL aviso | |
| Ciclo gate # | *(1 = 1.ª tentativa)* |

## Rubrica ([rubrica-gate-externo.md](../../migracao-orquestrador/references/rubrica-gate-externo.md))

| ID | Critério | Resultado | Evidência verificada |
|----|----------|-----------|----------------------|
| | | PASS / FAIL / N/A justificado | path/linha, `evidence/` ou repo; não apenas declaração da persona |

## Piso de cobertura ([piso-insumo-personas.md](../../migracao-orquestrador/references/piso-insumo-personas.md))

> Preencher com IDs do piso da persona (ex. A1–A5, B1–B7). Ferramentas (Glob/Grep/Read/Shell) são meio, **não** cota.

| ID piso | Cobertura exigida (resumo) | Evidência observada (path / comando / `evidence/`) | OK / N/A justificado? |
|---------|----------------------------|----------------------------------------------------|------------------------|
| | | | |

Telemetria de ferramentas (opcional): Glob / Grep / Read / Shell = contagem observada, `não medido` ou `não aplicável` — nunca critério de PASS.

## Falhas (se FAIL)

| ID | O que falhou | Ação para persona {{persona}} |
|----|--------------|--------------------------------|
| | | |

## Avisos e limitações

| ID | Impacto / ação | Bloqueia qual decisão ou fase? | Responsável |
|---|---|---|---|
| | | | |

PASS de análise não equivale a execução/homologação concluída nem resolve decisão humana pendente. Aviso (W) que comprometer decisão obrigatória → promover a C.

## Ação

- **PASS** → Orquestrador pode invocar persona seguinte (ou solicitar aprovação humana do Canvas se gate `orquestrador`).
- **FAIL** → **Não** avançar; persona corrige report; **novo** gate externo.

## Artefatos lidos

- `reports/{{persona-report}}.md`
- Se `orquestrador`: cinco reports e gates PASS + complementos, Canvas e handoff da síntese atual
- Repo alvo / `evidence/<sessao>/` (amostra verificada): *(listar paths)*
