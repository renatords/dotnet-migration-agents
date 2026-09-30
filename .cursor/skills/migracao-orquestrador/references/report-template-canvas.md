# Template — `canvas-migration.md`

Relatório **executivo com parecer** para aprovação humana. Gerado pelo Orquestrador no fim de `/analisar-migracao`.  
Base: leitura crítica dos cinco `reports/*.md` + fatos JSON + evidência pontual no código quando necessário.

---

```markdown
# Canvas de migração

> Gerado em: <ISO-8601 UTC> · Repo: <caminho absoluto> · Estratégia: Big Bang · Destino: <TFM>

## 1. Parecer de viabilidade

### Conclusão

**Viável** / **Viável com ressalvas** / **Não recomendado sem mitigação** — (1 parágrafo com motivo)

### Principais desafios

| # | Desafio | Evidência (report § ou path) |
|---|---------|------------------------------|
| 1 | | |
| 2 | | |

### Cuidados e premissas

- (ordem de execução, integrações sensíveis, testes bloqueantes, legado intocável, etc.)
- **Estratégia de contentores:** proposta `container_auto` / `alt_auto` / `manual_homolog` — **pendente de aceite humano**
- Guardião = suite **default** (`dotnet test` sem flag de contentor); skip de contentor ≠ regressão

## 2. Resumo executivo

- **Objetivo da migração:** (1–2 frases)
- **Escopo in (decisão final):** (N projetos / módulos)
- **Escopo out / RETAIN:** (bullets)
- **Recomendação ao decisor:** Prosseguir / Prosseguir com ressalvas / Não prosseguir — (1 frase alinhada ao parecer)

### Perfil quantitativo do alvo

Consolidar os inventários já levantados, sem nova coleta apenas para preencher números. Contar tipos distintos no escopo, não quantidade de arquivos/hits. Clientes = tipos concretos outbound; interfaces sem implementação conhecida ficam explicitadas à parte. `Não levantado` difere de zero; estimativa deve ser identificada.

| Indicador | Quantidade / não levantado | Critério / escopo / fonte |
|---|---|---|
| Projetos em escopo | | Analista |
| Controllers HTTP | | Cartógrafo; endpoints mínimos separados, se aplicável |
| Clientes externos concretos | | Cartógrafo / Diplomata |
| DbContexts | | Diplomata |

## 3. Plano 3Rs (decisão final)

| Projeto / módulo | 3R | Esforço (L/M/H) | Ordem | Justificativa (evidência) |
|------------------|-----|-----------------|-------|---------------------------|
| | Rehost / Revise / Retain | | 1..n | |

> Única classificação 3Rs autoritativa. Cruzar Analista (topologia), Auditor, Cartógrafo, Diplomata, Estratega.

## 4. Riscos principais

| # | Risco | Severidade (L/M/H) | Evidência | Mitigação sugerida |
|---|-------|-------------------|-----------|-------------------|
| 1 | | | | |

## 5. Não mexer

- 

## 6. Ondas de execução (waves)

| Onda | Conteúdo | Pré-requisitos | Parar se |
|------|----------|----------------|----------|
| 0 | PrepararAmbiente + CriarSuiteMinima + GuardiãoOrigem | Canvas aprovado (contentores) | Suite / baseline falhar |
| 1 | | | |

## 7. Esforço e risco (qualitativo)

| Dimensão | L/M/H | Comentário |
|----------|-------|------------|
| Esforço técnico global | | |
| Risco de regressão | | (Estratega + Auditor) |
| Risco de integração externa | | (Diplomata) |
| Complexidade de testes | | (Estratega) |

## 8. Testes e DoD (resumo)

- **Bloqueios “não migrar sem”:** (estratega)
- **DoD de testes (top 3):** (seção 8 estratega)
- **Infra:** N componentes `container_auto` / `alt_auto` / `manual_homolog` (matriz fechada)
- **Pipe-safe:** contentores opt-in; Guardião = suite default; skip ≠ regressão
- **Homolog residual:** IdP/Vault/SASL/side-effects — não checklist de broker genérico
- **Guardião:** baseline/post em `/executar-migracao`

## 9. Próximos passos

1. **Humano:** revisar e **aprovar** este Canvas — incluindo **estratégia de contentores** (`container_auto` / `alt_auto` / `manual_homolog`)
2. **Agente:** `/executar-migracao` com `handoff-execucao.md` + este arquivo
3. **Não fazer antes da aprovação:** worktree, alterações em massa, Guardião post

### Perguntas explícitas (gate contentores)

1. Aceita contentores efêmeros na suite mínima (`container_auto`)?
2. Se não: `alt_auto` ou `manual_homolog` por componente?
3. Confirma Guardião só na suite **default** (skip ≠ regressão)?
4. Homolog residual tipado (credenciais/side-effects)?

## 10. Artefatos de apoio

| Artefato | Path |
|-----------|------|
| Handoff | `.migration-context/handoff-execucao.md` |
| Complementos (codebase) | `.migration-context/reports/orquestrador-complementos.md` |
| Reports personas | `.migration-context/reports/analista.md` … `estratega-testes.md` |
| Canvas visual (opcional, quando solicitado) (IDE) | `<workspace>/canvases/<project-id>-migration-canvas.canvas.tsx` |
```

**Regras de redação**

- O parecer (§1) é obrigatório — não substituir por bullets genéricos.
- Todo risco e 3R deve citar evidência de pelo menos um report ou path no repo.
- Ondas alinhadas a 3Rs finais + dependências do Cartógrafo.
