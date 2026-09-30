# Template — `handoff-execucao.md`

Contrato de **`/executar-migracao`**: sem reabrir análise completa; leituras pontuais para implementar o plano são permitidas.
Preencher todas as seções, incluindo Melhorias de persona e DoD de migração.

---

```markdown
# Handoff de execução

> Gerado em: <ISO-8601 UTC> · Fase: pós-análise · Consumidor: `/executar-migracao`

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | (nome da solução ou pasta raiz) |
| `project_root` | `<caminho absoluto>` |
| `source_framework` | (TFMO do pedido; cruzar com inventário Analista) |
| `target_framework` | (TFMD do pedido → `--target`) |
| `strategy` | Big Bang (ou exceção documentada) |
| `canvas_path` | `.migration-context/canvas-migration.md` |

## 2. Âmbito

### In scope

| Projeto / módulo | 3R | Notas |
|------------------|-----|-------|

### Out of scope / RETAIN

| Item | Motivo RETAIN / out |
|------|---------------------|

## 3. Plano 3Rs

| Ordem | Projeto / módulo | 3R | Dependências | Evidência |
|-------|------------------|-----|--------------|-----------|
| 1 | | | | analista / cartografo |

## 4. Alterações estruturais previstas

- **TFMs:** (lista projeto → de → para)
- **Pacotes críticos:** (resumo Auditor — nome, versão alvo, breaking)
- **Referências entre projetos:** (refs a adicionar/remover)

## 5. Não mexer

Lista fechada — violação exige nova aprovação humana:

- 

## 6. Riscos e dependências

| # | Risco | Severidade | Caminho de evidência | Mitigação na execução |
|---|-------|------------|----------------------|------------------------|
| | | | | |

## 7. Interfaces externas

Resumo Diplomata (identificadores **higienizados**):

| Tipo | Identificador | Projeto consumidor | Nota migração |
|------|---------------|-------------------|---------------|
| BD / API / fila / arquivo | | | |

## 8. Artefatos no disco

| Artefato | Path absoluto ou relativo a `project_root` |
|-----------|---------------------------------------------|
| analista.md | `.migration-context/reports/analista.md` |
| auditor.md | `.migration-context/reports/auditor.md` |
| cartografo.md | `.migration-context/reports/cartografo.md` |
| diplomata.md | `.migration-context/reports/diplomata.md` |
| estratega-testes.md | `.migration-context/reports/estratega-testes.md` |
| canvas | `.migration-context/canvas-migration.md` |
| gate-*.md | `.migration-context/reports/gate-*.md` |

## 9. Passos do Executor

Checklist numerado — `/executar-migracao` segue esta ordem (alinhar com Canvas e **plano faseado**):

1. Ler este handoff + `canvas-migration.md` (e `canvas-approved.txt` se existir)
2. Confirmar gate humano (Canvas aprovado)
3. Criar **duas** worktrees (origem + destino) — skill `migracao-executor` / `worktree.md`
4. **Seguir o plano faseado** — não inverter `GuardiãoOrigem` antes de `MigrarVersao`
5. Ondas de alteração de código/TFM na worktree **destino** conforme seção 3 e Canvas §6
6. `dotnet build` / restore após cada onda relevante
7. Registrar paths das worktrees e resumo em `reports/execucao.md`

> Plano faseado ausente: retornar ao Orquestrador para completar e repetir gate. Lacunas locais de implementação podem ser resolvidas pelo Executor; decisões de escopo/custo/licença/infra/cobertura exigem fechamento conforme [contrato de qualidade](qualidade-decisoes-evidencias.md#handoff-e-autorização).

## 9b. Plano faseado — testes e migração

> **Consolidado pelo Orquestrador** a partir de `estratega-testes.md` §5b, §6, §8. Executor executa **esta** tabela salvo lacuna §10.
> Baseline na origem = `CriarSuiteMinima` + `GuardiãoOrigem` (gates distintos).
> Decisões infra: `container_auto` | `alt_auto` | `manual_homolog` — inventário **fechado** (Executor não promove `manual_homolog` → auto sem emendao ao Canvas).

| Fase | Objectivo | Ações | Gate / comando | Evidência |
|------|-----------|--------|----------------|-----------|
| PrepararAmbiente | Duas worktrees + build origem | `baseline-<tfm>` + `sandbox-<stamp>` do mesmo commit; registrar contexto canônico na raiz alvo; build TFM origem | `dotnet build` OK na origem | `execucao.md` |
| CriarSuiteMinima | Suite mínima no origem | Piso (HTTP + persistência se aplicável) **+** integrações com decisão `container_auto` / `alt_auto` no Canvas; contentores **opt-in/Skippable** | Suite default verde no TFM origem | paths dos `.cs` de teste |
| GuardiãoOrigem | Baseline formal | Guardião **antes** de mudar TFM; suite **default** (`dotnet test` sem flag de contentor) | Shell `dotnet test` → skill Guardião | `guardiao-baseline.md` |
| MigrarVersao | Migração | Antes do upgrade, transferir/conferir a suíte da origem no destino (worktree.md); depois, onda(s) TFM/pacotes/hosting somente no destino | build OK | commits / handoff §3 |
| ValidarMigracao | Regressão | **Mesmos** testes da suite mínima no TFM destino (não expandir gate aqui) | Shell `dotnet test` → skill Guardião; sem `regression_detected` | `guardiao-post.md` |
| ValidarHomolog | Homolog residual | Só o que contentor/mock não substitui: IdP/Vault reais, SASL/credenciais de cluster, side-effects de negócio | Checklist humano | nota em execucao |

### Detalhe por cenário (copiar de estratega §6)

| Cenário | Criar em CriarSuiteMinima? | Reutilizar em ValidarMigracao? | Infra / decisão | Custo |
|---------|----------------------------|--------------------------------|-----------------|-------|
| | | | container_auto / alt_auto / manual_homolog | |

### Infra de teste (copiar de estratega §5b — genérico)

| Componente | Container viável? | Alternativa auto | Decisão (`container_auto` / `alt_auto` / `manual_homolog`) |
|------------|-------------------|------------------|-------------------------------------------------------------|
| Persistência / BD (provider do alvo) | | | |
| API host in-proc (WAF) | | | |
| API host em contentor (Dockerfile/publish) | | | |

> **Gate humano (Canvas):** contentores efêmeros aceitos? Se não, só `alt_auto` / `manual_homolog`. Contrato CI: testes de contentor opt-in; skip ≠ regressão.

### Rastreabilidade e decisões para execução

| Risco / integração | Decisão e custo/licença quando aplicáveis | Cenário / asserção observável | Fase / gate | Evidência exigida | Estado (fechado / pendente humano) |
|---|---|---|---|---|---|
| | | | | | |

Cada item do universo N (Auditor) e cada risco relevante de integração (Diplomata) tem linha aqui, ou exclusão justificada. Estado **fechado** exige decisão aprovada (faixa e licença, ou critério de patch) e evidência ou residual com responsável, fase e aceite. Major aberta, licença Verificar ou “pin na execução” fica **pendente humano** e bloqueia a etapa dependente. O Executor só escolhe patch dentro do que o Canvas aprovou.

## 10. Lacunas

Lista **fechada** de lacunas conhecidas — cada uma **autoriza** `@codebase` ou CLI pontual na execução. Fora de §10, `@codebase` continua **permitido** quando necessário para implementar o plano (ex.: CriarSuiteMinima), desde que não reabra análise completa — ver `migracao-orquestrador/references/uso-codebase.md`.

| ID | Lacuna | Ação permitida | Responsável |
|----|--------|----------------|-------------|
| — | (vazio = nenhuma) | | |

## 11. Melhorias de persona (Continual Learning)

Sugestões para evoluir rules/skills deste laboratório (não bloqueiam execução).

**Fonte canónica:** consolidar a partir de `.migration-context/reports/orquestrador-complementos.md` (§4 e §5) — não repetir inventário; só ações propostas.

| Persona | Observação | Proposta |
|---------|------------|----------|
| Analista | | |
| Auditor | | |
| Cartógrafo | | |
| Diplomata | | |
| Estratega-testes | | |
| Orquestrador | | |

Se não houver sugestões: escrever “Nenhuma — ver orquestrador-complementos.md §4”.

## 12. DoD de migração (critérios acordados)

Itens verificáveis ao fim de `/executar-migracao`:

| # | Critério | Como verificar |
|---|----------|----------------|
| **11** | Todos os reports de análise presentes e coerentes com o Canvas aprovado | Existência em `.migration-context/reports/` + revisão humana |
| **12** | Canvas **aprovado** pelo humano antes de qualquer alteração nas worktrees | Confirmação no chat ou `canvas-approved.txt` |
| **13** | Guardião concluído: GuardiãoOrigem + ValidarMigracao sem regressão não aceita documentada | `reports/guardiao-baseline.md`, `guardiao-post.md`; DoD testes (estratega §8) satisfeito ou exceção explícita |
| **14** | Riscos de pacotes encerrados ou residual/mitigação explicitamente aceitos | Reauditoria com transitivos e decisões de licença/custo, sem upgrade automático |
| **15** | Cenários obrigatórios exercitam os riscos acordados; cobertura não executada visível | Asserções/evidências por cenário; skips e homologação pendentes identificados |

### DoD de testes (referência — seção 8 de `estratega-testes.md`)

- (copiar bullets acionáveis do report do Estratega)

## 13. Evidências da síntese

| Fonte | Uso no handoff |
|-------|----------------|
| reports/analista.md | §2, §3 |
| reports/auditor.md | §4, §6 |
| reports/cartografo.md | §3, §6 |
| reports/diplomata.md | §7 |
| reports/estratega-testes.md | plano faseado, DoD testes |
| reports/orquestrador-complementos.md | §11 Melhorias de persona |
| canvas-migration.md | Ondas, esforço/risco, gate |

```

**Regras**

- Proibido deixar §10 vaga (“investigar mais”) — cada lacuna precisa ação delimitada.
- §4–§7 devem ser suficientes para o Executor **sem** rerodar inventário/grafo/appsettings.
- **Plano faseado obrigatório** — PrepararAmbiente→ValidarHomolog derivado de `estratega-testes.md`; se ausente, Orquestrador completa e repete gate antes da etapa dependente.
- Alinhar ordem de execução (§9) com ondas do Canvas e **GuardiãoOrigem antes de MigrarVersao**.
- **Proibido** citar nomes de projetos-alvo de exemplo nos templates (usar placeholders genéricos).
