# RUNBOOK — migração .NET assistida (Cursor)

Como correr a análise e a execução. Contrato por persona: [AGENTS.md](../AGENTS.md). Encadeamento detalhado: [encadeamento-analise.md](../.cursor/skills/migracao-orquestrador/references/encadeamento-analise.md).

**Modelo:** reports Markdown + Canvas + handoff em `.migration-context/` no repo **alvo**.

---

## Pré-requisitos

| Item | Notas |
|------|--------|
| `source:` | Caminho do repo .NET alvo (deve existir no disco) |
| `TFMO:` | TFM atual declarado (ex. `netcoreapp3.1`) |
| `TFMD:` | TFM destino (ex. `net10.0`) — reports / Canvas / handoff |
| dotnet SDK | No PATH — `dotnet test`, `dotnet list package` |

---

## Dois comandos principais

| Comando | Fase | Descrição |
|---------|------|-----------|
| **`/analisar-migracao`** | Análise | Encadeia personas; valida gates; gera Canvas + handoff; **para** para aprovação humana |
| **`/executar-migracao`** | Execução | Lê handoff + canvas aprovados; Executor + Guardião; execução local |

### Invocação da análise (obrigatória)

```text
/analisar-migracao source:<caminho> TFMO:<TFM_ORIGEM> TFMD:<TFM_DESTINO>
```

Exemplo: `/analisar-migracao source:C:\repos\MeuApp TFMO:netcoreapp3.1 TFMD:net10.0`

Se faltar `source:`, `TFMO:` ou `TFMD:` (ou o path não existir) → **abortar** com erro de uso; não criar `.migration-context/` nem iniciar personas.

---

## Convenção `.migration-context/` (no repo alvo)

```
<migration-target>/.migration-context/
  reports/
    analista.md
    auditor.md
    cartografo.md
    diplomata.md
    estratega-testes.md
    orquestrador-complementos.md   # síntese
    gate-*.md                      # Gate Auditor
    guardiao-baseline.md           # execução
    guardiao-post.md
    execucao.md                    # opcional
  evidence/<sessao>/               # saídas higienizadas (dotnet test, CVE, …)
  canvas-migration.md
  handoff-execucao.md
  canvas-approved.txt              # opcional — gate humano datado
```

Nomes dos ficheiros em `evidence/` são livres; citar os paths nos reports. Contrato: [qualidade-decisoes-evidencias.md](../.cursor/skills/migracao-orquestrador/references/qualidade-decisoes-evidencias.md).

---

## Fase análise — `/analisar-migracao`

Procedimento completo: [encadeamento-analise.md](../.cursor/skills/migracao-orquestrador/references/encadeamento-analise.md). Resumo:

| # | Passo | Validação | Artefatos |
|---|--------|------------|------------|
| 0 | Orquestrador (pastas) | Validação inicial `source`/`TFMO`/`TFMD` | `.migration-context/reports/` |
| 1 | Analista | Pré-check + Gate Auditor | `analista.md`, `gate-analista.md` |
| 2 | Auditor | Pré-check + Gate Auditor | `auditor.md`, `gate-auditor.md` |
| 3 | Cartógrafo | Pré-check + Gate Auditor | `cartografo.md`, `gate-cartografo.md` |
| 4 | Diplomata | Pré-check + Gate Auditor | `diplomata.md`, `gate-diplomata.md` |
| 5 | Estratega de Testes | Pré-check + Gate Auditor + `dotnet test` | `estratega-testes.md`, `gate-estratega.md` |
| 6 | Orquestrador (síntese) | Checklist de insumos → produzir artefatos/telemetria → `gate-orquestrador.md` PASS | complementos, canvas, handoff, Canvas visual (opcional, quando solicitado) |
| 7 | Gate humano | Aprovação explícita do Canvas (incl. contentores) | opcional `canvas-approved.txt` |

Checklist de negócio: [checklist-gate-negocio-orquestrador.md](../.cursor/skills/migracao-orquestrador/references/checklist-gate-negocio-orquestrador.md).

Pré-check por persona: [checklist-gate-persona.md](../.cursor/skills/migracao-orquestrador/references/checklist-gate-persona.md).

Read pontual de playbooks em `.cursor/skills/migracao-orquestrador/references/specializations/` é permitido quando a stack for detectada no alvo.

Evidência na análise: Glob/Grep/Read no repo alvo; Shell `dotnet` pontual (`dotnet list package`, `dotnet test`).

---

## Fase execução — `/executar-migracao`

| Passo | Contexto | Artefatos |
|-------|----------|------------|
| Ler handoff + canvas | Só `.migration-context/` | — |
| Worktrees (Executor) | Origem e destino do mesmo commit; contexto na raiz alvo | paths / commit em `execucao.md` |
| Suíte mínima + GuardiãoOrigem | Criar e testar na origem antes do upgrade | `guardiao-baseline.md` |
| Transferir suíte e migrar | Conferir mesmos testes no destino; aplicar plano 3Rs + ondas | diff na worktree destino |
| Guardião pós | Mesma suíte no destino comparada à baseline | `guardiao-post.md` |

**Regra:** primeira ação = ler **`handoff-execucao.md`** + **`canvas-migration.md`**. Não reabrir inventário/grafo/`appsettings` salvo **Lacunas** do handoff.

**DoD:** seções DoD do `handoff-execucao.md` (reports + Canvas aprovado + Guardião).

Worktree: `.cursor/skills/migracao-executor/references/worktree.md`

---

## Fallback manual (depuração)

Se o encadeamento falhar a meio:

1. Corrigir o report da persona em falta (skill `migracao-<papel>` + template).
2. Repetir `/gate-auditor <papel>` até PASS.
3. Retomar `/analisar-migracao` a partir do passo seguinte, **ou** repetir a análise completa.

Não há slash commands por persona — só `/analisar-migracao`, `/gate-auditor` e `/executar-migracao`.

Mapa persona → rule → skill: [AGENTS.md](../AGENTS.md).

---

## Referências

- `.cursor/commands/analisar-migracao.md`, `gate-auditor.md` e `executar-migracao.md`
- `.cursor/skills/migracao-orquestrador/references/` — encadeamento, templates Canvas/handoff
- Contrato cross-persona: [qualidade-decisoes-evidencias.md](../.cursor/skills/migracao-orquestrador/references/qualidade-decisoes-evidencias.md)
- Globais: `.cursor/rules/migracao-globais.mdc`

## Qualidade e avaliação do lab

Seguir [qualidade das decisões e evidências](../.cursor/skills/migracao-orquestrador/references/qualidade-decisoes-evidencias.md). Cobertura substitui cotas de buscas/linhas; Canvas MD, reports, gates e evidências continuam obrigatórios. Canvas visual é opcional quando solicitado.

Protocolo antes/depois e casos genéricos de avaliação: [validacao-regressao-lab.md](../.cursor/skills/migracao-orquestrador/references/validacao-regressao-lab.md).

Para comparar versões do lab, fixar commit/base do alvo (incluindo testes), TFM, versão das instruções, modelo/configuração e condições das ferramentas. Avaliar riscos identificados, decisões de pacote com esforço/licença, cenários que exercitam o risco e evidência recuperável. Repetições ajudam a observar variabilidade. Se baseline ou escopo mudarem, registrar a diferença e não atribuir causalmente o resultado à refatoração. Não exige facts JSON ou framework adicional.
