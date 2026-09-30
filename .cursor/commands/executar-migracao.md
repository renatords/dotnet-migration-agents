---
description: Executa migração a partir do handoff e Canvas aprovados (worktree + Guardião); sem reanalisar
---

Ler handoff e Canvas **aprovados**, alterar a worktree e validar com Guardião. Análise via `/analisar-migracao`.

**Referências:**

- Worktree: [worktree.md](../skills/migracao-executor/references/worktree.md)
- Evidência pontual: [uso-codebase.md](../skills/migracao-orquestrador/references/uso-codebase.md)
- Rules/skills: `migracao-executor`, `migracao-guardiao`

## Pré-requisitos

1. No repo **alvo**:
   - `.migration-context/handoff-execucao.md`
   - `.migration-context/canvas-migration.md`
2. **Canvas aprovado** pelo humano (confirmação no chat ou `canvas-approved.txt`).

Handoff sem plano ou decisão material: não iniciar a etapa dependente; retornar ao Orquestrador para completar e repetir gate, com nova aprovação humana se mudar decisão. Lacunas locais de implementação dentro do plano aprovado podem ser resolvidas e registradas pelo Executor. Ver [contrato de qualidade](../skills/migracao-orquestrador/references/qualidade-decisoes-evidencias.md#handoff-e-autorização).

## Primeira ação

1. Ler **`handoff-execucao.md`** na íntegra.
2. Ler **`canvas-migration.md`**.
3. Abrir outros arquivos em `.migration-context/` **somente** se o handoff listar em **Artefatos no disco** ou **Lacunas**.

Não reabrir análise completa; evidência pontual conforme rule Executor (ver Referências) — registrar em `execucao.md`.

Incorpore o texto após o comando (ex.: “aprovado”, path da worktree) conforme aplicável.

## Encadeamento

| Fase | Papel | Rule | O que fazer |
|------|-------|------|-------------|
| 1 | Executor | `migracao-executor` | Worktree/branch isolada; alterações no âmbito do handoff e Canvas (ondas); `dotnet` conforme **Passos do Executor** |
| 2 | Guardião | `migracao-guardiao` | Baseline **antes** de migrar TFM e validação **pós-migração** (plano faseado do handoff); Write `guardiao-baseline.md` / `guardiao-post.md` via Shell `dotnet test` |

## Seguir o handoff

1. Executar os passos numerados de **Passos do Executor** na ordem indicada.
2. Respeitar **Não mexer** e **Plano 3Rs** sem desvio.
3. Verificar no handoff o **DoD de migração** e o **DoD de testes** (referência: `estratega-testes.md`).

## Não fazer

- Não regenerar Canvas/handoff sem pedido do usuário.

## Conclusão

Informar ao usuário: path da worktree, resultado dos testes, regressões, itens DoD satisfeitos ou pendentes.
