---
name: migracao-guardiao
description: >
  Guardião na execução: baseline e validação pós-migração com Shell dotnet test e reports MD.
  Suite default sem flag de contentor; skip de contentor ≠ regressão.
disable-model-invocation: true
compatibility: dotnet SDK no PATH.
license: MIT
metadata:
  persona: guardiao
  phase: execution-validation
---

# Guardião de migração .NET

> Usar **Shell `dotnet test`** e **Write** dos reports MD.

## Quando usar

| Momento (plano faseado do handoff) | Ação | Worktree |
|------------------------------------|------|----------|
| **GuardiãoOrigem** (baseline) | Baseline **`dotnet test`** **antes** de mudar TFM | **origem** (`baseline-<tfm>`) |
| **ValidarMigracao** | **`dotnet test`** pós-migração — comparar com baseline | **destino** (`sandbox-*`) |

## Entradas

- Raiz do repo alvo com `.migration-context/` canônica e path da worktree a testar. Ler/escrever reports por paths absolutos na raiz alvo; executar testes na origem ou destino conforme o modo ([worktree.md](../migracao-executor/references/worktree.md))
- `reports/estratega-testes.md` (baseline de testes, faseamento, DoD)
- Baseline MD existente para ValidarMigracao

## Saídas obrigatórias

| Arquivo | Modo |
|----------|------|
| `reports/guardiao-baseline.md` | GuardiãoOrigem |
| `reports/guardiao-post.md` | ValidarMigracao |

Registrar contagens (passed/failed/skipped), exit code, comando, timestamp UTC.

## Comandos

```bash
dotnet test "<caminho-sln-ou-csproj>"
```

**Sem** flag de contentor na suite **default**.

## Gates DoD

- GuardiãoOrigem: exit 0; contagens ≥ mínimos do DoD do Estratega quando existirem
- ValidarMigracao: baseline comparável existe; mesmos cenários e asserções; sem regressão não aceita; exit 0. Falha ou ausência de execução fica pendente/FAIL, nunca PASS apenas por estar documentada
- Testes **Skipped** (contentor opt-in / sem Docker) **não** são falha de DoD nem, por si, `regression_detected`
- Corrida com Docker / env de contentor = evidência **extra**, não gate obrigatório
- Suíte mínima obrigatória não implementada bloqueia DoD/upgrade, salvo exceção explícita no plano aprovado; não tratar como mero aviso

## Critical rules

- **Não pular baseline Guardião** antes do upgrade TFM salvo excepção no handoff.
- **Não** correr baseline Guardião na worktree onde já se migrou o TFM.
- Guardião produz evidência; a aprovação do Canvas (incl. contentores) continua humana.
- **Idioma:** português (Brasil).

## Evidência e cobertura

Guardar saída higienizada, base/estado local, SDK/TFM, comando, UTC e identidade/seleção dos cenários conforme [contrato de qualidade](../migracao-orquestrador/references/qualidade-decisoes-evidencias.md). Não comparar bases diferentes apenas por contagens. Skip de contentor não é regressão automática, mas deixa a integração não validada; registrar residual e aceite previsto no Canvas.
