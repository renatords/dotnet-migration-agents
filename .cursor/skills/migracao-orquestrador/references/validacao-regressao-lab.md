# Validação de regressão do lab

> Protocolo para evoluir o kit sem perder qualidade decisória.
> Contrato: [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md).
> Uso típico: após mudar rubrica/piso/handoff — reexecutar análise no **mesmo** alvo.

## Condições fixas (antes/depois)

| Fixar | Registrar |
|-------|-----------|
| Commit/base do alvo e estado local relevante | Mesmo SHA e mesmas alterações locais nas duas execuções |
| Escopo e TFMO / TFMD | Mesmos projetos, fluxos e frameworks de origem/destino |
| Modelo / configuração do agente | Mesmo modelo e configuração, incluindo ferramentas disponíveis |
| Ambiente e dependências | SDK, fontes de pacotes, versões resolvidas e infraestrutura disponível |
| Critérios de comparação | Mesmos casos aplicáveis e critérios de qualidade para avaliar os dois resultados |

A **versão das instruções do kit é a variável da comparação**: registrar a versão A (antes) e B (depois), por commit ou cópia identificável, incluindo alterações locais. Manter separados os artefatos e as evidências de cada execução.

Se baseline, escopo ou condições externas mudarem (por exemplo, dados de vulnerabilidades ou disponibilidade de serviços), registrar o delta e **não** atribuir o resultado só à refatoração do kit. Uma comparação isolada fornece indícios; investigar diferenças relevantes antes de concluir regressão ou melhoria.

## Casos genéricos de avaliação

Aplicar os mesmos critérios aos reports e `gate-*.md` das versões A e B. Selecionar os casos a partir do inventário e dos riscos do alvo; registrar **não aplicável com justificativa** quando a condição não existir, sem inventar dependências ou cenários.

| # | Caso, quando presente no alvo | Resultado esperado |
|---|------------------------------|--------------------|
| 1 | Pacote com vulnerabilidade ou breaking change | Cadeia risco→ação→cenário pertinente→evidência; teste funcional não substitui reauditoria de vulnerabilidade |
| 2 | Dependência com risco de CVE, compatibilidade ou breaking | Entra em N mesmo sem advisory; §12 cobre a identidade; vulnerabilidades continuam contadas à parte |
| 3 | Suite unitária aprovada, com riscos de integração | Distinguir lógica do chamador de contrato; cenários prioritários derivados dos fluxos e riscos do alvo |
| 4 | Infraestrutura ou decisão humana pendente | Executor não decide implicitamente; pendência no handoff §9b e bloqueio da execução dependente até resolução |
| 5 | Relatório com inventário e contagens completos | PASS depende dos critérios da rubrica, incluindo AU-08/13, ES-07 e OR-06; contagem não compensa falha de qualidade |
| 6 | Mock de cliente ou abstração externa | Evidência limitada ao chamador; contrato exige implementação real e asserções observáveis no nível pertinente, ou residual explícito conforme Canvas |
| 7 | Decisão de manter, atualizar ou substituir pacote | Candidata, aprovada e validação executada distintas; major ou licença indefinida permanece pendente e não é delegada ao Executor |

## O que medir

- Riscos Critical/Warning com ação, fase e critério de encerramento
- Decisões manter/atualizar/substituir justificadas (ou pendência humana)
- Cenários com **asserção observável** e nível de teste explícito
- Evidência recuperável em `.migration-context/evidence/<sessao>/`
- Handoff §9b sem decisão implícita para o Executor

Contagens Glob/Grep **não** são métrica de sucesso. Contagens iguais de testes **não** provam identidade de cenários. Na análise, distinguir evidência já disponível de validação planejada: um cenário proposto não equivale a teste executado.

## Procedimento sugerido

1. Congelar e registrar as condições da tabela e os casos aplicáveis.
2. Correr `/analisar-migracao` com a versão A (ou usar artefatos existentes com condições e origem verificáveis).
3. Aplicar a mudança no kit e identificar a versão B.
4. Repetir a análise nas mesmas condições, preservando os artefatos de A e B.
5. Avaliar ambos os resultados pelos mesmos critérios; registrar PASS/FAIL ou não aplicável por caso, com evidências, diferenças e limitações. Evidência obrigatória ausente não é PASS.
6. Investigar perdas de cobertura ou de qualidade decisória antes de aceitar a mudança ou experimentar novos alívios de mínimos/opcionais.

## Referências

- [piso-insumo-personas.md](piso-insumo-personas.md)
- [rubrica-gate-externo.md](rubrica-gate-externo.md)
- [guia-troubleshooting-gate.md](guia-troubleshooting-gate.md)
- RUNBOOK: `agents/RUNBOOK.md` § Qualidade e avaliação do lab
