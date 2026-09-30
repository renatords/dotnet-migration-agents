# Template — `reports/orquestrador-complementos.md`

Relatório **macro** do Orquestrador na síntese (passo 6): o que os cinco reports **não** cobriram e foi necessário obter via `@codebase`, grep ou CLI pontual para fechar parecer, 3Rs ou handoff.

> Objetivo: alimentar evolução das personas (rules/skills/scripts) ou proposta de **nova persona** — não substitui os reports das especialistas.

---

```markdown
# Complementos de síntese — Orquestrador

> Gerado em: <ISO-8601 UTC> · Repo: <caminho absoluto> · Após leitura dos reports 1–5

## 1. Resumo

| Métrica | Valor |
|---------|--------|
| Itens complementados via codebase | |
| Bloqueantes para parecer/3Rs | |
| Sugestões para personas existentes | |
| Sugestões de nova persona | |

## 2. Complementos obtidos (detalhe)

Por linha: informação necessária ausente dos reports/JSON, como foi obtida e persona responsável no futuro.

| ID | Informação necessária | Por que faltou nos reports | Como foi obtido | Paths / comandos | Persona sugerida | Prioridade (L/M/H) |
|----|----------------------|----------------------------|----------------|----------------|------------------|-------------------|
| C1 | | (ex.: Incerteza em auditor §6; gap cartógrafo) | @codebase / grep / dotnet … | | Auditor / Cartógrafo / … | |

**Prioridade:** L = nice-to-have; M = melhorar skill/script; H = bloqueou decisão 3R ou viabilidade.

## 3. Por dimensão (visão macro)

| Dimensão | Coberto pelas personas? | Complemento Orquestrador? | Nota |
|----------|-------------------------|---------------------------|------|
| Topologia / TFM | Analista | Sim / Não | |
| Pacotes / breaking | Auditor | | |
| Acoplamento / blast radius | Cartógrafo | | |
| Integrações externas | Diplomata | | |
| Testes / DoD | Estratega | | |
| Outro | — | | |

## 4. Sugestões para enriquecer personas

Ações concretas (skill, script, seção de template) — espelhar em `handoff-execucao.md` §11 quando aplicável.

| Persona | Gap observado | Proposta de evolução |
|---------|---------------|----------------------|
| Analista | | |
| Auditor | | |
| Cartógrafo | | |
| Diplomata | | |
| Estratega-testes | | |
| Orquestrador | | |

## 5. Nova persona (opcional)

Preencher só se um domínio recorrente não couber nas cinco:

| Nome candidato | Responsabilidade | Por que não basta Cartógrafo/Auditor/… |
|----------------|------------------|----------------------------------------|
| (vazio) | | |

## 6. O que **não** foi buscado no codebase

Lista fechada — decisões tomadas só com os reports (transparência):

- 

## 7. Evidências

| Artefato | Path |
|-----------|------|
| Reports lidos | `.migration-context/reports/*.md` |
| Este relatório | `.migration-context/reports/orquestrador-complementos.md` |

## 8. Telemetria

Contagens de ferramentas são telemetria, não cotas de aprovação. Vincular saídas à sessão/base conforme [contrato de qualidade](qualidade-decisoes-evidencias.md). Registrar dados observados da execução atual. Ausência de medição = `não medido`, nunca zero presumido. `0` significa ausência confirmada de ocorrências.

| Campo | Valor |
|-------|-------|
| `gate_externo` | pendente / PASS / FAIL — estado do gate da síntese, emitido pelo Gate Auditor |
| `gate_failures` | Total acumulado de vereditos FAIL nos gates da análise atual, incluindo tentativas anteriores |
| Atualizado em (UTC) | |

| Persona | Glob | Grep | Read repo | Shell | gate FAILs antes PASS |
|---------|------|------|-----------|-------|------------------------|
| Analista | | | | | |
| Auditor | | | | | |
| Cartógrafo | | | | | |
| Diplomata | | | | | |
| Estratega | | | | | |
| Orquestrador | | | | | |

| Gate / papel | Ciclo | PASS / FAIL / pendente | IDs dos critérios com FAIL | Evidência / path do gate |
|--------------|-------|-----------------------|---------------------------|-------------------------|
| | | | | |

Preencher antes de solicitar o gate da síntese, com `gate_externo = pendente`. O Gate Auditor valida a existência e rastreabilidade desta seção; não exige PASS do próprio gate como pré-requisito.

Após cada veredito, o Orquestrador atualiza estado, histórico e contagens. Preservar no histórico cada tentativa antes de sobrescrever o `gate-*.md`; `gate_failures` conta vereditos FAIL, não o número de critérios reprovados. A atualização apenas da telemetria após o veredito não requer outro gate. Correções no parecer, plano ou demais artefatos exigem nova avaliação antes da aprovação humana.
```

**Regras**

- **Só registrar — não aplicar:** este arquivo é **backlog para validação humana**. O Orquestrador **não** altera rules/skills nem cria personas durante `/analisar-migracao`.
- Se **não** houve complemento via codebase: seção 2 com uma linha “Nenhum — reports suficientes” e §4 pode ser “Nenhuma sugestão”.
- Não duplicar inventário completo de pacotes/grafo — só o **delta** que faltou.
- Sem segredos em claro; citar paths e padrões, não valores de config sensíveis.
