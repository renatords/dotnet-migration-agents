# Worktrees — origem e destino da migração

Procedimento do **Executor** no repositório **alvo**. Em salto de TFM, preparar duas worktrees a partir do mesmo commit: origem para suíte mínima/baseline; destino para migração/pós. Uma exceção deve estar documentada no handoff.

## Quando aplicar

- Somente em `/executar-migracao`, com Canvas aprovado (incluindo contentores) e handoff lido.
- Nunca criar worktrees durante `/analisar-migracao`.
- Respeitar plano 3Rs, RETAIN, out-of-scope e os passos do handoff.

## Convenções

| Item | Valor |
|------|-------|
| Raiz do alvo | `<RAIZ_ALVO>` |
| Commit inicial comum | `<START_SHA>` |
| Worktree origem | `<RAIZ_ALVO>/.migration-worktrees/baseline-<tfm>` |
| Branch origem | `migration/baseline-<tfm>-<STAMP>` |
| Worktree destino | `<RAIZ_ALVO>/.migration-worktrees/sandbox-<STAMP>` |
| Branch destino | `migration/sandbox-<STAMP>` |
| Contexto canônico | `<RAIZ_ALVO>/.migration-context/` |
| Registro | `<RAIZ_ALVO>/.migration-context/reports/execucao.md` |

`<tfm>` é o TFM de origem; `<STAMP>` é único e não contém `:` (ex.: `20260924T143000Z`). Não sobrescrever paths ou branches existentes. Se houver colisão, usar outro identificador e registrar os nomes efetivos.

## Pré-voo

Na raiz do alvo:

```bash
git status
git worktree list
git rev-parse HEAD
```

Registrar o último resultado como `<START_SHA>`. Worktree nova contém esse commit, não as alterações locais não commitadas. Exigir checkout limpo ou tratamento documentado dessas alterações (incluindo stash, quando aplicável); não descartá-las nem omiti-las silenciosamente da baseline.

Confirmar paths/branches livres e os pré-requisitos de build no TFM origem. Documentar paths das duas worktrees e comunicá-los ao usuário.

## PrepararAmbiente — criar as duas worktrees

Executar na raiz do alvo, substituindo os placeholders. Usar **o mesmo `<START_SHA>`** nas duas chamadas:

```bash
git worktree add -b "migration/baseline-<tfm>-<STAMP>" ".migration-worktrees/baseline-<tfm>" "<START_SHA>"
git worktree add -b "migration/sandbox-<STAMP>" ".migration-worktrees/sandbox-<STAMP>" "<START_SHA>"
git worktree list
git -C "<ORIGEM>" rev-parse HEAD
git -C "<DESTINO>" rev-parse HEAD
```

`<ORIGEM>` e `<DESTINO>` são os paths absolutos registrados acima. Conferir que os dois HEADs correspondem ao commit inicial e que os projetos ainda usam o TFM origem. Fazer build na origem:

```bash
dotnet build "<ORIGEM>/<SOLUCAO_OU_PROJETO>"
```

Falha de preparação deve ser resolvida ou tratada conforme o handoff antes de avançar. Alterações de código ficam nas worktrees; não no checkout principal, salvo plano explícito.

## CriarSuiteMinima e GuardiãoOrigem

1. Criar somente na **origem** os testes autorizados pelo Canvas/handoff (`container_auto` / `alt_auto`), seguindo [suite-minima.md](suite-minima.md).
2. Manter o TFM origem. Testes de contentor continuam opt-in; a suíte default não exige Docker.
3. Acionar o Guardião na origem **antes de migrar TFM**. Registrar comando, seleção de testes, contagens, exit code, UTC e evidências em `<RAIZ_ALVO>/.migration-context/reports/guardiao-baseline.md`.
4. Preservar esse estado de origem para comparação; não acrescentar cenários ao gate depois da baseline.

## Transferir a mesma suíte para o destino

As worktrees não compartilham arquivos de trabalho. Antes de `MigrarVersao`, transportar a preparação e a suíte validadas na origem para o destino, sem ampliar cenários ou alterar asserções.

Quando a preparação estiver em commits locais autorizados, registrar `<SUITE_SHA>` da origem. Com o destino limpo e ainda no `<START_SHA>`, usar:

```bash
git -C "<DESTINO>" merge --ff-only "<SUITE_SHA>"
```

Conferir que `<SUITE_SHA>` descende de `<START_SHA>` e contém apenas a preparação aprovada, ainda no TFM origem. Se não houver fast-forward, inspecionar a divergência; não forçar, resetar ou escolher conteúdo automaticamente.

Se commits não estiverem autorizados, copiar apenas os arquivos aprovados de preparação/testes, incluindo novos arquivos, preservando os caminhos relativos. Registrar a lista e comparar o conteúdo entre origem e destino antes do upgrade. Não copiar `.git`, `bin`, `obj`, segredos ou arquivos alheios ao plano. Tratar remoções explicitamente conforme o handoff.

Em ambos os casos, registrar a revisão ou lista de arquivos transferidos. Confirmar que a seleção de testes e as asserções são as mesmas da baseline; depois ajustar apenas o necessário para pacote/hosting/config conforme a migração aprovada.

## MigrarVersao e ValidarMigracao

Migrar TFM/pacotes e aplicar as ondas **somente no destino**. A origem permanece no estado da baseline.

```bash
dotnet build "<DESTINO>/<SOLUCAO_OU_PROJETO>"
dotnet test "<DESTINO>/<SOLUCAO_OU_PROJETO>"
```

Acionar o Guardião no destino com o mesmo escopo/seleção da baseline, registrando `guardiao-post.md` no contexto canônico. Comparar passed/failed/skipped, exit code e regressões. Skip de contentor opt-in não é, por si, regressão. ValidarHomolog cobre o residual previsto no plano.

## Contexto e registro

O contexto canônico continua na raiz original do alvo. `.migration-context/` pode estar ignorada pelo Git e não aparece automaticamente nas worktrees. Executor/Guardião leem handoff, Canvas e reports por seus paths absolutos nesse contexto; os comandos de build/test apontam para a worktree correspondente. Evitar cópias divergentes dos relatórios.

Registrar em `reports/execucao.md`:

| Campo | Conteúdo |
|-------|----------|
| generated_at_utc | Data/hora UTC |
| repo_root / context_root | Raiz alvo / contexto canônico |
| start_sha | Commit inicial comum |
| baseline_worktree / baseline_branch | Origem |
| worktree_path / branch | Destino; manter os campos existentes |
| suite_revision_or_files | Commit ou lista de arquivos da suíte transferida |
| test_command / test_scope | Comando e seleção comparável origem/destino |
| baseline_report / post_report | Paths absolutos dos reports Guardião |

## Remover após merge ou abandono

Preservar primeiro os resultados e alterações que ainda serão usados. Conferir cada worktree e remover apenas os paths/branches registrados:

```bash
git worktree remove "<DESTINO>"
git worktree remove "<ORIGEM>"
git branch -d "migration/sandbox-<STAMP>"
git branch -d "migration/baseline-<tfm>-<STAMP>"
```

Se houver arquivos locais ou commits não integrados, resolver o estado antes de remover; não forçar exclusão. Excluir uma worktree não substitui a preservação das evidências.

## Gates

- [ ] Canvas aprovado antes de criar worktrees.
- [ ] Origem e destino criadas do mesmo commit, com paths registrados.
- [ ] Suíte mínima e GuardiãoOrigem no TFM origem antes de MigrarVersao.
- [ ] Mesma suíte transferida e conferida no destino antes do upgrade.
- [ ] Migração somente no destino; baseline preservada na origem.
- [ ] Contexto canônico e reports acessíveis ao Executor/Guardião.
- [ ] Plano 3Rs, RETAIN e out-of-scope respeitados.
