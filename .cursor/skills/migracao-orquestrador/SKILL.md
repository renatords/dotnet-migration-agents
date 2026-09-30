---
name: migracao-orquestrador
description: >
  Maestro da migração: encadeia personas na análise, valida gates e, na síntese, emite
  parecer de viabilidade (desafios, cuidados), 3Rs finais, Canvas e handoff. Use no
  início e no fim de /analisar-migracao — não substitui inventário, grafo, integrações
  nem estratégia de testes das outras personas.
disable-model-invocation: true
compatibility: repositório alvo com .migration-context/.
license: MIT
metadata:
  persona: orquestrador
  outputs: orquestrador-complementos.md,canvas-migration.md,handoff-execucao.md
  phase: analysis-synthesis
---

# Orquestrador de migração .NET

> Encadeamento: [encadeamento-analise.md](references/encadeamento-analise.md) · Gate: skill `migracao-gate-auditor`

## Quando usar esta skill

| Momento | Papel do Orquestrador |
|---------|------------------------|
| **Início de `/analisar-migracao`** | Confirmar raiz alvo, TFM destino, criar `.migration-context/`; **anunciar** sequência; após cada persona, **validar gate** (não redigir reports das outras personas). |
| **Fim de `/analisar-migracao`** | Síntese: parecer + 3Rs + complementos + Canvas + handoff; **parar** para aprovação humana. |
| **Pedido avulso** | Síntese após reports manuais — [parecer-sintese.md](references/parecer-sintese.md). |

Delegar pacotes, grafo, integrações e testes às Skills responsáveis; não assumir esses inventários.

## Referências

| Tema | Arquivo |
|------|----------|
| Ordem passos 0–7 | [encadeamento-analise.md](references/encadeamento-analise.md) |
| Piso insumo | [piso-insumo-personas.md](references/piso-insumo-personas.md) |
| Rubrica gate | [rubrica-gate-externo.md](references/rubrica-gate-externo.md) |
| Gate Auditor | [migracao-gate-auditor](../migracao-gate-auditor/SKILL.md) |
| Objetivos por persona | [objetivos-negocio-personas.md](references/objetivos-negocio-personas.md) |
| Pacote → playbook → Grep | [mapeamento-pacote-playbook.md](references/mapeamento-pacote-playbook.md) |
| Padrões breaking/uso | [grep-patterns-migracao.md](references/grep-patterns-migracao.md) |
| Fila de homologação (Diplomata) | [template-fila-homologacao.md](references/template-fila-homologacao.md) |
| Leitura predecessors | [guia-leitura-predecessor.md](references/guia-leitura-predecessor.md) |
| Grep exaustivo Auditor | [guia-grep-exaustivo-auditor.md](references/guia-grep-exaustivo-auditor.md) |
| Blast radius (grep) | [heuristica-blast-radius-grep.md](references/heuristica-blast-radius-grep.md) |
| Config higienizada | [checklist-config-higienizada.md](references/checklist-config-higienizada.md) |
| Pré-check personas | [checklist-gate-persona.md](references/checklist-gate-persona.md) |
| Gate negócio passo 6 | [checklist-gate-negocio-orquestrador.md](references/checklist-gate-negocio-orquestrador.md) |
| Erros gate | [guia-troubleshooting-gate.md](references/guia-troubleshooting-gate.md) |
| Parecer, 3Rs, seções a ler | [parecer-sintese.md](references/parecer-sintese.md) |
| `@codebase` | [uso-codebase.md](references/uso-codebase.md) |
| Canvas visual (opcional, quando solicitado) | [canvas-visual-proposta.md](references/canvas-visual-proposta.md) |

Contrato: Markdown em `.migration-context/` no repo alvo.

## Entradas (síntese)

- Raiz absoluta do repo **alvo**; TFM destino; estratégia (Big Bang por padrão)
- Cinco reports — seções em [parecer-sintese.md](references/parecer-sintese.md)
- Evidência pontual no código só para lacunas bloqueantes

## Saídas obrigatórias (no repo alvo)

| Arquivo | Template |
|----------|----------|
| `.migration-context/reports/orquestrador-complementos.md` | [report-template-orquestrador-complementos.md](references/report-template-orquestrador-complementos.md) |
| `.migration-context/canvas-migration.md` | [report-template-canvas.md](references/report-template-canvas.md) |
| `.migration-context/handoff-execucao.md` | [report-template-handoff.md](references/report-template-handoff.md) |

### Saída visual opcional (quando solicitada; workspace Cursor)

| Arquivo | Referência |
|----------|------------|
| `canvases/<project-id>-migration-canvas.canvas.tsx` | [canvas-visual-proposta.md](references/canvas-visual-proposta.md) + [canvas-visual-template.canvas.tsx](references/canvas-visual-template.canvas.tsx) |

## Steps — Arranque (`/analisar-migracao` início)

- [ ] Validação inicial: **`source:` + `TFMO:` + `TFMD:`** presentes e `source` existe no disco — se faltar → **parar**
- [ ] Garantir `<source>/.migration-context/reports/`
- [ ] Anunciar sequência — ver [encadeamento-analise.md](references/encadeamento-analise.md)
- [ ] Delegar personas 1–5; após cada Write → invocar **Gate Auditor** até `gate-<papel>.md` **PASS**

## Steps — Síntese (após Estratega válido)

- [ ] Confirmar os cinco gates das personas PASS e cumprir a **etapa 1** de [checklist-gate-negocio-orquestrador.md](references/checklist-gate-negocio-orquestrador.md) antes de produzir a síntese
- [ ] Ler reports — [parecer-sintese.md](references/parecer-sintese.md)
- [ ] `@codebase`/grep só onde reports não fecham viabilidade ou 3R
- [ ] `reports/orquestrador-complementos.md`
- [ ] Parecer: viabilidade, desafios, cuidados (incl. contentores)
- [ ] 3Rs finais com justificativa cruzada
- [ ] `canvas-migration.md`
- [ ] `handoff-execucao.md` (plano faseado a partir do Estratega; TFMO→TFMD; melhorias alinhadas a complementos)
- [ ] Se solicitado, gerar Canvas visual `.canvas.tsx` após Canvas MD e handoff — [canvas-visual-proposta.md](references/canvas-visual-proposta.md)
- [ ] Preencher §8 Telemetria de complementos com gate da síntese pendente
- [ ] Cumprir a **etapa 2** do checklist de negócio (artefatos produzidos, antes do gate)
- [ ] Solicitar Gate Auditor `orquestrador` após os artefatos estarem completos; FAIL → corrigir e repetir até PASS
- [ ] Atualizar telemetria com o veredito e tentativas, conforme o template de complementos
- [ ] Validation (seção abaixo)
- [ ] Gate humano — aprovação explícita do Canvas **incluindo estratégia de contentores** antes de `/executar-migracao`

## Validation — Gate análise (antes de declarar fim)

Gate completo: [parecer-sintese.md § Gate](references/parecer-sintese.md#gate) + [checklist-gate-negocio-orquestrador.md](references/checklist-gate-negocio-orquestrador.md). Resumo:

- [ ] Cinco gates das personas e `gate-orquestrador.md` PASS sobre os artefatos atuais; checklist negócio; §8 Telemetria de complementos atualizada (`gate_externo` + `gate_failures`)
- [ ] `orquestrador-complementos.md`, `canvas-migration.md`, handoff completos
- [ ] Parecer explícito + 3Rs finais; plano faseado com matriz `container_auto`/`alt_auto`/`manual_homolog`
- [ ] Canvas visual (opcional, quando solicitado); perguntas de contentores no gate humano
- [ ] Sem segredos em claro; sem reanálise completa das personas

## Critical rules

- Sem `source`/`TFMO`/`TFMD` → não criar contexto nem encadear.
- **Complementos:** registrar gaps em `orquestrador-complementos.md`; **não** implementar melhorias em rules/skills nesta sessão.
- **Síntese ≠ resumo:** Canvas permite ao humano **decidir** se migra.
- **3Rs finais só aqui:** única classificação Rehost/Revise/Retain autoritativa.
- **Handoff (plano faseado):** consolidar Estratega; **baseline Guardião antes de MigrarVersao**; inventário contentores fechado.
- **Idioma:** português (Brasil).

## Gotchas

- Analista sem 3Rs — normal.
- Estratega bloqueia migração — destacar no parecer e Lacunas.
- Muito complemento no codebase — evoluir persona indicada em `orquestrador-complementos.md`.

## Boundaries

| Papel | Delegar |
|-------|---------|
| Topologia / escopo | Analista |
| Pacotes / CVE | Auditor |
| Grafo / blast radius | Cartógrafo |
| Integrações externas | Diplomata |
| Testes / DoD testes | Estratega de Testes |
| Worktree / edits / guardian | Executor + Guardião |

## Contrato de decisão

Antes do gate da síntese, aplicar [qualidade das decisões e evidências](references/qualidade-decisoes-evidencias.md). Preservar alternativas de versão, esforço e licença; fechar o mapeamento risco→cenário→evidência; perfil quantitativo usa os reports existentes.
