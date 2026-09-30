# Piso de insumo — cobertura por persona

> Critérios obrigatórios de cobertura antes do Write integral, verificados pela [rubrica](rubrica-gate-externo.md). Quantidade de chamadas não substitui evidência. Aplicar [qualidade das decisões](qualidade-decisoes-evidencias.md).

## Regra global

Glob/Grep/Read devem localizar e confirmar os fatos no alvo. Não há cota de chamadas ou de linhas: uma leitura pode cobrir vários itens; alvo pequeno não exige achados artificiais. Registrar paths, ausência confirmada e limitações. Auditor executa auditoria incluindo transitivos; Estratega executa testes da solução/projetos em escopo. Falha ou impossibilidade exige evidência e lacuna; nunca resultado inventado.

## Analista {#analista}

| ID | Cobertura exigida | Evidência |
|---|---|---|
| A1 | Localizar soluções/projetos e identificar se raiz pedida difere da raiz Git/solução | §1–§2 |
| A2 | Ler cada csproj candidato, TFM/SDK e referências | §2 |
| A3 | Examinar entry points existentes e artefatos de build/CI relevantes | §2/§4 |
| A4 | Classificar todos os projetos encontrados como in/out provisório, justificando exclusões; não perder testes irmãos | §3 |
| A5 | Registrar perguntas reais e incertezas; se nenhuma, declarar isso | §6/§8 |

## Auditor {#auditor}

| ID | Cobertura exigida | Evidência |
|---|---|---|
| B1 | Executar `dotnet list package --vulnerable --include-transitive`; preservar saída/tentativa | §6/§11/§12 |
| B2 | Inventariar declarações e versões efetivas de todos os projetos em escopo, incluindo gerenciamento central quando houver | §4 |
| B3 | Declarar N = união de todos os Critical/Warning (segurança, compatibilidade, suporte, breaking); contagem de vulnerabilidades fica em §6 e não substitui N | §3 |
| B4 | Evidenciar uso dos diretos e resolução/origem dos transitivos; justificar ausência de uso direto | §4/§12 |
| B5 | N linhas de rastreabilidade = N identidades de §3/§4, sem omitir Warning que não seja CVE | §12 |
| B6 | Distinguir versão candidata, decisão aprovada e validação não executada; major ou licença indefinida fica pendente | §4b/§7 |
| B7 | Encaminhar cada vulnerável para ação, responsável/fase e reauditoria/critério de encerramento | §6 |

## Cartógrafo {#cartografo}

| ID | Cobertura exigida | Evidência |
|---|---|---|
| C1 | Ler topologia/escopo e riscos do Auditor | §1/§3 |
| C2 | Confirmar grafo de projetos pelas referências reais | §4 |
| C3 | Identificar hotspots reais nos caminhos afetados; declarar ausência quando demonstrada | §5 com paths |
| C4 | Mapear impacto de cada mudança relevante, admitindo agrupamento justificado, com confiança e limites | §7 |
| C5 | Examinar instanciação manual, estado estático e configuração quando presentes nos caminhos afetados | §6/§7/§10 |

## Diplomata {#diplomata}

| ID | Cobertura exigida | Evidência |
|---|---|---|
| D1 | Cruzar predecessores com código e estrutura das configurações, sem valores secretos | §1/§4/§5 |
| D2 | Cobrir integrações em escopo; presença/ausência sustentada em paths/padrões | §4–§7 |
| D3 | Cumprir [higienização](checklist-config-higienizada.md) | report |
| D4 | Encaminhar riscos de integração para a fila §8b com verificação observável e prioridade; risco sem integração remete ao Auditor/Estratega | §8b |

## Estratega {#estratega}

| ID | Cobertura exigida | Evidência |
|---|---|---|
| E1 | Localizar projetos/arquivos de teste, inclusive irmãos no escopo, e inspecionar testes representativos dos riscos | §3/§4 |
| E2 | Executar `dotnet test` no escopo; guardar saída, contagens e exit code ou limitação explícita | §2/§11 |
| E3 | Cada item de N e cada risco relevante do Diplomata: o que o cenário cobre, o que permanece, fase e evidência ou residual com responsável | §5b/§6/§6b |
| E4 | Definir DoD verificável e plano origem→destino; §10 antes de §12 | §8/§12 |
| E5 | Distinguir teste unitário de contrato real, skip de validação e risco de provider; estimar custo | §5b–§8 |

## Orquestrador (passo 6) {#orquestrador}

1. Confirmar os cinco gates PASS e cumprir a **etapa 1** do [checklist de negócio](checklist-gate-negocio-orquestrador.md).
2. Produzir complementos, Canvas MD e handoff. Canvas visual opcional, quando solicitado. Perfil quantitativo usa inventários existentes.
3. Levar cada item de N e cada risco relevante de integração ao handoff. Estado fechado só com faixa/licença decididas e evidência ou residual; major, licença ou infra ainda abertas ficam pendentes para o humano.
4. Preencher §8 Telemetria com gate pendente; cumprir a **etapa 2** do checklist de negócio após os artefatos e, com os itens críticos OK, solicitar gate da síntese; atualizar histórico e só então pedir aprovação humana.

## Telemetria

Contagens de Glob/Grep/Read/Shell são observações da sessão, não critérios de aprovação. Registrar `não medido` quando indisponíveis, `não aplicável` com justificativa e zero apenas quando observado. Preservar tentativas de gate; `gate_failures` conta vereditos FAIL.
