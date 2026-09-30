# Confluent.Kafka

> Especialização `confluent_kafka` · `integration_kind: message_bus`

## Checklist Diplomata

1. Bootstrap servers e tópicos (config ou código, higienizado).
2. SASL/TLS, schema registry.
3. Mapear producers/consumers nos paths do Auditor.

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

| Nível | O que usar | O que verifica | Cobertura e limites |
|-------|------------|-------------|------------------------|
| **Chamador** | Mock da abstração/producer wrapper | Serviço chama Produce com payload certo | Apenas lógica do chamador; não valida o contrato do pacote |
| **Contrato mensageria** | Cliente real + broker efêmero (`container_auto`), com asserções de entrega observável | Produce/consume, serialização, config 1→2 | Somente os comportamentos exercitados, com asserções observáveis e evidência registrada |
| **Homolog** | Cluster real / SASL | Credencial, rede, side-effect | `manual_homolog` |

1. Não basta invocar `Produce` sem asserção (mensagem recebida / offset / payload).
2. Breaking 1→2 (`ProducerConfig`/`ConsumerConfig`): cenário no nível contrato ou residual explícito.
3. Serialização e política de retry/commit com resultado observável.

Um teste aprovado cobre apenas o cenário e as asserções executados; não encerra todos os riscos do pacote. Vincular a evidência ao critério de encerramento do risco e registrar os residuais. Para CVE, teste funcional não substitui reauditoria e verificação da correção ou mitigação documentada. Aprovação no Canvas e prioridade P0 não são evidência de execução.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 / net10.0 | Cliente 2.x (candidato — verificar); breaking 1→2 em ProducerConfig/ConsumerConfig. |
| net7.0 | Confirmar versão 2.x no csproj. |

Versões = candidatas — [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md).
