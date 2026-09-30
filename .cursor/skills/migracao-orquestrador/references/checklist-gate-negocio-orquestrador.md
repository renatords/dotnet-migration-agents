# Checklist gate de negócio — Orquestrador (passo 6)

> Executar em duas etapas: **1. antes da síntese** e **2. depois dos artefatos, antes do gate**.
> Consolida pré-checks ([checklist-gate-persona.md](checklist-gate-persona.md)) + fronteiras cross-persona.  
> Rubrica: [rubrica-gate-externo.md](rubrica-gate-externo.md) · Contrato: [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md).

## Etapa 1 — Antes da síntese

Validar os insumos das cinco personas. Esta etapa não exige Canvas, handoff ou complementos produzidos.

### Reports obrigatórios

- [ ] `analista.md`, `auditor.md`, `cartografo.md`, `diplomata.md`, `estratega-testes.md` existem
- [ ] Cinco `gate-*.md` das personas = **PASS**

### Analista

- [ ] §2 com paths `.csproj`/`.sln` reais; TFM coerente
- [ ] §3 escopo provisório (hipótese) com **todos** os projetos da solução (incl. Tests)

### Auditor

- [ ] §3 **N=** união Critical/Warning (segurança, compatibilidade, suporte, breaking); §6 CVE separado; §12 = N (AU-02, AU-11)
- [ ] §4/§12: uso ou resolução transitiva justificada; versões confirmadas no alvo
- [ ] §6: CVE com evidência + **ação/fase/critério de encerramento** (ou lacuna §11 documentada)
- [ ] Decisão com candidata / aprovada / validação; major ou licença indefinida pendente — AU-13

### Cartógrafo

- [ ] §4 grafo com evidência `ProjectReference`
- [ ] §7 blast radius com **confiança** e limites; sem cota artificial de linhas
- [ ] §5 hotspots com path **ou** ausência demonstrada

### Diplomata

- [ ] [checklist-config-higienizada.md](checklist-config-higienizada.md) cumprida (sem secrets)
- [ ] **§8b** cobre riscos de integração **ou** justifica ausência
- [ ] Cada risco relevante: prioridade + evidência + **asserção observável** (ou encaminhamento) — DI-03

### Estratega

- [ ] §2: `exit_code` + contagens + path da saída de testes **ou** lacuna §11
- [ ] §6/§6b: continuidade de N e da fila de integrações; o que cobre e o que permanece; residual com responsável
- [ ] Nível do teste coerente com o risco (contrato real vs mock de chamador) — ES-07
- [ ] Ordem: §10 (Incertezas) **antes** de §12 (Roadmap)

### Fronteiras

- [ ] Sem 3Rs finais fora do Orquestrador
- [ ] Sem contradição escopo §3 Analista vs Auditor sem nota (sobreposição de nomes de projeto)

## Etapa 2 — Depois dos artefatos, antes do gate

Após cumprir os itens críticos da etapa 1, produzir a síntese e verificar os insumos OR-* abaixo antes de solicitar Gate Auditor `orquestrador`.

- [ ] Complementos + `canvas-migration.md` + `handoff-execucao.md` produzidos
- [ ] Handoff §9b: cada item de N e cada risco relevante chega à rastreabilidade; fechado só com faixa/licença e evidência ou residual; escolha material no Executor reprova (OR-06)
- [ ] Parecer de viabilidade explícito + 3Rs com evidência cruzada (OR-05)
- [ ] Telemetria §8 com `gate_externo = pendente` e `gate_failures` preservando as tentativas já realizadas (OR-04 — aviso se incompleta); atualizar com o veredito após o gate

## Encaminhamento por etapa

1. **Etapa 1 — itens críticos OK:** produzir síntese (complementos, parecer, 3Rs, Canvas e handoff) e executar a etapa 2. Falha crítica nos insumos → pedir correção à persona responsável e revalidar seu gate; não iniciar a síntese até resolver.
2. **Etapa 2 — itens críticos OK:** solicitar Gate Auditor `orquestrador` sobre os artefatos atuais. Falha crítica na síntese → Orquestrador corrige os artefatos e repete esta etapa antes de solicitar o gate. Se a causa estiver em um report de origem, corrigir com a persona responsável, revalidar seu gate e atualizar a síntese afetada.
3. **Gate Auditor:** FAIL → corrigir, repetir as verificações afetadas e solicitar novo gate; PASS → atualizar a telemetria e encaminhar ao gate humano.

Para correções, consultar [guia-troubleshooting-gate.md](guia-troubleshooting-gate.md).

## Verificações de qualidade

Aplicar aos insumos na etapa 1 e aos artefatos da síntese na etapa 2 a [qualidade das decisões e evidências](qualidade-decisoes-evidencias.md): diretos e transitivos encaminhados; licença/esforço considerados; testes exercitam o risco; evidências acessíveis; handoff sem decisões implícitas. IDs e severidades são os da rubrica, não contagens de ferramentas.
