# Qualidade das decisões e evidências

Contrato comum de Auditor, Estratega, Orquestrador, Executor e gates. Aplicar ao escopo e à versão do alvo da sessão; exemplos e playbooks são apoio, não decisões de upgrade.

## Escolha de pacotes

- Comparar **manter**, **atualizar** e **substituir** quando aplicáveis. Versão antiga, major diferente do TFM ou lançamento mais recente não bastam para justificar mudança.
- Fundamentar a opção em compatibilidade documentada, vulnerabilidades verificadas, suporte/EOL, uso real, breaking changes nos caminhos usados, paridade, esforço de código/testes e custo de licença para o uso pretendido.
- Registrar versão candidata e fonte, alternativa considerada e motivo da escolha. Estimativa L/M/H é qualitativa; não inventar preço, prazo ou elegibilidade de licença.
- Distinguir três estados, sem misturá-los: **versão candidata** (proposta a verificar), **decisão aprovada** (faixa, condições de licença e alternativa escolhida pelo humano) e **validação executada** (restore, teste ou reauditoria já corridos). Major indefinida, licença não confirmada ou escolha ainda aberta permanece **pendente**. O Executor só resolve patch dentro da faixa e das condições já aprovadas; não escolhe major nem licença.
- Preservar a avaliação da **última versão gratuita compatível**, verificando também segurança e suporte. Gratuidade não torna uma versão adequada automaticamente. Licença paga/restritiva ou informação não confirmada → explicitar condição e obter decisão humana antes da mudança afetada.
- Não forçar troca de biblioteca ou modernização de arquitetura apenas para alcançar a versão mais recente. Mudança com custo, escopo ou risco além do Canvas exige emenda aprovada.
- Versões sugeridas nos playbooks são candidatas históricas, não pins obrigatórios. Conferir documentação da versão considerada e TFM real do alvo. Sem evidência, marcar **Verificar**.

## Diretos e transitivos

**N** é a união de todos os pacotes classificados Critical ou Warning no escopo — segurança, compatibilidade com o TFM, suporte/EOL e breaking — diretos e transitivos, sem duplicar a mesma identidade. Se versões ou projetos diferirem, discriminá-los na linha. Declarar N e as categorias; N=0 é válido com evidência. A contagem de vulnerabilidades (`dotnet list package --vulnerable`) fica em separado e **não substitui** N: pacote Warning de compatibilidade ou breaking entra em N mesmo sem advisory. Todo pacote desse universo aparece em §3, §4 e §12. Pacote classificado Critical/Warning fora da rastreabilidade é omissão.

Direto: declaração no csproj ou gerenciamento central, versão efetiva e uso. Transitivo: saída de resolução e cadeia/origem quando disponível; sem uso direto, registrar essa condição em vez de inventar grep. Cadeia desconhecida é lacuna explícita.

Todo vulnerável identificado recebe ação, responsável/fase e critério de encerramento. A ação pode ser upgrade, substituição ou mitigação/exceção humana documentada; nunca desaparecimento silencioso do plano. Reauditar diretos e transitivos após mudanças; risco residual fica visível no DoD, sem declarar segurança comprovada por build/test verde.

## Evidência mínima reproduzível

Guardar em `<RAIZ_ALVO>/.migration-context/evidence/<sessao>/` saídas essenciais **higienizadas** de auditoria NuGet e testes. Os nomes dos arquivos são livres; citar os paths nos reports. Não exige facts JSON nem cópia integral de saídas sensíveis.

Registrar comando, diretório de execução, UTC, SDK/TFM, exit code, contagens quando disponíveis, commit/base e alterações locais relevantes. Sem Git, registrar identificação disponível da cópia e a limitação. Guardar também falha/tentativa e causa; não afirmar execução ou ausência de vulnerabilidade sem evidência.

Log de teste sem contagens ou corrida sem descoberta de testes não comprova testes aprovados. Evidência de outra sessão/base deve ser identificada como histórica; não reutilizar automaticamente como baseline atual. Contagens iguais não provam identidade de cenários.

Telemetria: contagem observada, `não medido` ou `não aplicável` justificado. Zero só quando confirmado. Aproximações explicitamente marcadas não comprovam um requisito. O Gate Auditor consulta as evidências e faz amostragem dirigida ao risco; não aceita apenas a declaração da persona.

## Cenários por risco

Cada item do universo N e cada risco relevante da fila de integrações deve apontar para cenário existente/novo, fase, nível do teste, comportamento observado, resultado esperado e evidência; ou para exclusão/residual justificado. Cada linha diz **o que o cenário cobre** e **o que permanece**. Um teste pode cobrir vários riscos se o mapeamento for explícito. Não criar testes por contagem de pacotes.

Mock de interface ou serviço valida o chamador. Risco do cliente, do provider ou do contrato exige evidência nesse nível, ou residual com responsável, fase e aceite. Não encerrar risco com evidência vazia, mock insuficiente ou homologação apenas implícita. Agrupar, adiar ou retirar um risco exige justificativa; baixar prioridade sem fundamento não vale. Mudança material de cobertura exige aceite humano.

- Contrato de cliente/serialização: exercitar o cliente/serializer real com transporte simulado e assertir rota, headers e payload relevantes. Mock do serviço/interface valida o chamador, não esse contrato.
- Persistência: usar o provider real quando o risco for específico dele e verificar operação/roundtrip afetado (datas, transações ou tradução de consultas quando presentes). Alternativa em memória tem limites explícitos.
- Mensageria/cache: verificar efeito observável, como mensagem recebida ou valor relido. Apenas invocar método ou não receber exceção não comprova entrega.
- Hosting/contrato publicado: executar rota/documento relevante e verificar resultado quando esse caminho estiver afetado.

Selecionar somente riscos presentes e mudanças propostas; não impor uma stack, endpoint ou bateria universal. Registrar custo e residual das alternativas. Contentores continuam opt-in; skip não é regressão automática nem evidência de validação da integração. Cobertura não executada permanece pendente/residual até a evidência ou aceite previsto no Canvas.

## Handoff e autorização

Antes da execução, fechar escopo, versões/alternativas ou critérios para resolução de patch, licença/custo, infraestrutura por componente, fases, cenários, gates e DoD. Propostas alternativas são permitidas durante a revisão humana, identificadas como pendentes; aprovação genérica não escolhe automaticamente entre opções incompatíveis.

Estado **fechado** no handoff exige decisão aprovada (faixa e licença, ou critério explícito de patch) e cenário com evidência ou residual com responsável, fase e aceite. “Pin na execução”, major aberta ou licença Verificar não fecham a linha. Cada item de N e cada risco relevante de integração chega à rastreabilidade, ou sai com justificativa. O gate reprova fechamento com escolha material ainda delegada ao Executor.

| Lacuna | Conduta |
|---|---|
| Localização de arquivo, comando ou detalhe de implementação dentro do plano aprovado | Executor investiga pontualmente e registra em `execucao.md`; não reabre análise completa |
| Transcrição incompleta do plano, mas decisões já inequívocas em Canvas e Estratega aprovados | Orquestrador completa handoff e repete o gate da síntese; não exige nova aprovação humana se não mudar decisão |
| Escopo, licença/custo, escolha de infra, cobertura, ordem de gates ou alternativa ainda indecididos | Não iniciar a etapa dependente; Orquestrador apresenta decisão concreta e emenda para aprovação humana |

Plano faseado ausente não autoriza o Executor a inventá-lo. Preservar o trabalho concluído e retornar apenas a lacuna identificada. Ajustes locais não autorizam reescrever Canvas/handoff. A escolha de patch dentro de faixa/condições aprovadas exige verificação e registro, sem ampliar a decisão.

## Entregas e significado de PASS

Obrigatórios: cinco reports de análise, gates, complementos com telemetria, Canvas Markdown, handoff e evidências de comandos executados; na execução, registro e reports Guardião. Seções sem aplicação recebem N/A com motivo, não conteúdo inventado.

Canvas visual é opcional, gerado quando solicitado; se gerado, deve refletir o Markdown. Sua ausência não bloqueia o gate. Perfil quantitativo no Canvas reutiliza os reports; campo não levantado não exige nova análise apenas para preencher uma contagem. Facts JSON não são requisito.

PASS do gate de análise significa qualidade suficiente do relatório, com lacunas visíveis conforme a rubrica; não é aprovação humana, licença autorizada, homologação concluída nem garantia de execução. Decisões pendentes bloqueiam a etapa dependente. Guardião não declara DoD satisfeito quando faltam cenários obrigatórios, baseline comparável ou evidência de execução, salvo exceção explícita no plano aprovado.
