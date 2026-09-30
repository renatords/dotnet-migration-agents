---
name: migracao-executor
description: >
  Use na fase /executar-migracao após Canvas aprovado e handoff lido: criar worktrees
  origem+destino, aplicar alterações no âmbito do plano 3Rs e preparar validação (Guardião).
  Suite mínima e matriz container_auto / alt_auto.
disable-model-invocation: true
compatibility: git no PATH; repo alvo com histórico git; handoff e Canvas aprovados.
license: MIT
metadata:
  persona: executor
  phase: execution
---

# Executor de migração .NET

## Contexto

Aplicar o Canvas aprovado e o handoff (passos + plano `PrepararAmbiente` → `ValidarHomolog`) em **worktrees isoladas**.

| Fonte do plano | Quando usar |
|----------------|-------------|
| **handoff** (passos + plano faseado) | Caminho normal — seguir ordem e gates |
| **`estratega-testes.md`** (matriz, faseamento, DoD) | Apoio aos cenários aprovados; plano ausente retorna ao Orquestrador, sem derivação automática pelo Executor |
| [estrategia-testes-faseada-migracao.md](../migracao-estratega-testes/references/estrategia-testes-faseada-migracao.md) | Ordem canónica |

**Não reordenar** fases (ex.: `MigrarVersao` antes da baseline Guardião) sem aprovação humana.

## Entradas

- Raiz absoluta do repo alvo
- `handoff-execucao.md` e Canvas aprovado
- Confirmação humana de aprovação do Canvas (**incl. estratégia de contentores**)

## Worktrees

Procedimento: [references/worktree.md](references/worktree.md)

Resumo (**salto de TFM**):

1. Verificar `git status` na raiz do alvo
2. Criar **origem** `.migration-worktrees/baseline-<tfm>` e **destino** `.migration-worktrees/sandbox-<stamp>` a partir do mesmo commit registrado
3. Registrar paths em `reports/execucao.md`
4. Suite mínima + baseline Guardião **só** na origem; transferir e conferir a mesma suíte no destino antes de `MigrarVersao`, conforme worktree.md
5. `MigrarVersao`+ **só** no destino; preservar a origem e manter `.migration-context/` canônica na raiz do alvo

## Suite mínima e contentores (tecto)

- Implementar **apenas** cenários com decisão `container_auto` ou `alt_auto` no plano faseado / Canvas.
- Contentores: sempre **Skippable / opt-in** (`RUN_CONTAINER_TESTS=1` ou `testsettings` + Trait); default **não** exige Docker.
- Checklist técnico (gitignore, nuget.config, ProjectReferences explícitas, path longo): [references/suite-minima.md](references/suite-minima.md).
- Baseline / validação pós: suite **default** (`dotnet test` sem flag de contentor); skip de contentor ≠ regressão.
- Novos testes do **gate** só na worktree **origem**, **antes** da baseline Guardião.
- **Anti-promoção:** pedido de contentor para `manual_homolog` → **parar** e pedir emenda ao Canvas/handoff.

## Steps

- [ ] Confirmar Canvas aprovado (incl. contentores); ler handoff (passos + plano faseado)
- [ ] Se plano ausente ou decisão material pendente: devolver a lacuna ao Orquestrador antes da etapa dependente; detalhes locais autorizados ficam em `execucao.md`
- [ ] Criar **duas** worktrees do mesmo commit (`PrepararAmbiente`); registrar raiz canônica do contexto
- [ ] Executar fases: suite mínima → baseline Guardião → transferir/conferir suíte no destino → MigrarVersao → ValidarMigracao → ValidarHomolog residual
- [ ] Commits pequenos; **sem** `Co-authored-by: Cursor`
- [ ] Build/test; acionar Guardião na baseline e na validação pós (suite default)
- [ ] Informar usuário: paths, fases, DoD, residual

## Validation

- [ ] Duas worktrees (`git worktree list`)
- [ ] Tecto `container_auto`/`alt_auto`; contentores opt-in
- [ ] Ordem baseline Guardião → MigrarVersao
- [ ] Não migrar TFM na worktree da baseline Guardião
- [ ] Sem promoção `manual_homolog` → auto sem emenda

## Critical rules

- **Não iniciar** sem aprovação humana do Canvas (incl. contentores).
- **Não** acrescentar integração automatizada fora da matriz do handoff.
- **Idioma:** português (Brasil).

## Decisões e evidências na execução

Seguir [contrato de qualidade](../migracao-orquestrador/references/qualidade-decisoes-evidencias.md). Não converter versão candidata em upgrade obrigatório; verificar esforço, breaking e licença. Resolver somente opções dentro dos critérios aprovados. Reauditar pacotes após alterações e preservar evidências higienizadas de testes/auditoria.
