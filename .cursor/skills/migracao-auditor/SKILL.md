---
name: migracao-auditor
description: >
  Auditor — inventário NuGet/CVE via repo + dotnet CLI; Write integral de auditor.md.
  Requer analista.md.
disable-model-invocation: true
compatibility: dotnet SDK no PATH.
license: MIT
metadata:
  persona: auditor
  report: reports/auditor.md
  phase: analysis
  requires_report: reports/analista.md
---

# Auditor

Inventário NuGet orientado à migração: pacotes, uso, riscos e hints 3R. A decisão 3Rs final cabe ao Orquestrador.

## Objetivos de negócio

Cruzar pacotes e escopo do Analista; registrar uso real, compatibilidade, CVE, licenciamento, EOL e breaking no alvo.

Cumprir o [checklist completo de objetivos](../migracao-orquestrador/references/objetivos-negocio-personas.md#auditor).

## Pré-requisito

`reports/analista.md` existe.

## Saída

**Write integral** de `reports/auditor.md` conforme [report-template.md](references/report-template.md).

## Steps

- [ ] **S0** Confirmar e ler topologia/escopo do Analista conforme [guia-leitura-predecessor.md](../migracao-orquestrador/references/guia-leitura-predecessor.md#auditor-passo-2). Não reler o report integral após S0, salvo lacuna.
- [ ] **S1** Inventariar por projeto: Grep `PackageReference`/`PackageVersion` em `*.csproj`; Shell `dotnet list package --vulnerable`. Licenciamento/EOL: nuget.org ou **Verificar** nas incertezas.
- [ ] **S1b** Para cada Critical/Warning in scope, seguir [guia-grep-exaustivo-auditor.md](../migracao-orquestrador/references/guia-grep-exaustivo-auditor.md): consultar [mapeamento-pacote-playbook.md](../migracao-orquestrador/references/mapeamento-pacote-playbook.md), para pacotes com uso direto, executar Grep do catálogo ou de [grep-patterns-migracao.md](../migracao-orquestrador/references/grep-patterns-migracao.md) e ler playbook em `specializations/` só se houver linha no mapeamento. Registrar pacote, grep, hits e playbook.
- [ ] **S2.5 Pré-Write** Contar **N** = união Critical/Warning (CVE, compatibilidade, suporte, breaking), não só a lista vulnerável, e preparar **N** linhas de uso. Uso detectado = path/padrão ou resolução transitiva justificada; pacote/versão = declaração direta/central ou resolução efetiva. Versão candidata ≠ decisão aprovada. Registrar breaking conforme [grep-patterns-migracao.md](../migracao-orquestrador/references/grep-patterns-migracao.md), hint 3R por pacote e `verification_hint` para o Estratega.
- [ ] **S2** Escrever o report integral.
- [ ] **S3** Aplicar Validation abaixo e [pré-check Auditor](../migracao-orquestrador/references/checklist-gate-persona.md#auditor).
- [ ] **Aguardar Gate Auditor** → `gate-auditor.md` **PASS**, cumprindo [piso de insumo](../migracao-orquestrador/references/piso-insumo-personas.md#auditor).
- [ ] **S4** Resumir ao Orquestrador os principais Critical/Warning in scope e bloqueios.

## Validation

- [ ] Todas as seções do template; Uso detectado preenchido com path/resolução ou ausência de uso direto justificada.
- [ ] **N linhas de uso = N** do universo Critical/Warning (não só vulnerabilidades). Versão candidata separada de decisão aprovada.
- [ ] CVE somente com saída dotnet ou advisory/URL; sem fonte, registrar lacuna.
- [ ] Escopo alinhado ao Analista, sem contradição.
- [ ] Licenciamento/EOL com fonte nuget.org ou **Verificar** nas incertezas.

## Limites

- **Não afirmar CVE sem evidência verificável** (saída dotnet ou advisory); sem fonte, registrar lacuna.
- Não decidir 3Rs finais (Orquestrador).
- Não produzir grafo (Cartógrafo) nem integrações (Diplomata).

## Decisões e rastreabilidade

Aplicar [qualidade das decisões e evidências](../migracao-orquestrador/references/qualidade-decisoes-evidencias.md) antes do Write: manter/atualizar/substituir, esforço, breaking e licença para o uso pretendido; diretos/transitivos com ação e critério de encerramento; guardar saída higienizada da auditoria. Playbook não impõe versão.
