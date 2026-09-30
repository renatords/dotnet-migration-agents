# StackExchange.Redis

> Especialização `stackexchange_redis` · `integration_kind: cache`

## Checklist Diplomata

1. Connection string Redis (higienizada).
2. `AddStackExchangeRedisCache` vs `IConnectionMultiplexer`.
3. TLS / cluster.

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

| Nível | O que usar | O que verifica | Cobertura e limites |
|-------|------------|-------------|-------------------|
| **Chamador** | Mock `IDistributedCache` | Serviço lê/grava chave lógica | Apenas lógica do chamador; não valida o contrato do pacote |
| **Contrato cache** | Cliente e Redis reais (`container_auto`), com asserções de hit/miss observáveis | Valor relido, TTL, serialização | Somente os comportamentos exercitados, com asserções observáveis e evidência registrada |
| **Homolog** | Cluster/TLS real | Rede, auth | `manual_homolog` |

1. Hit/miss em fluxo crítico com **valor relido** (não só “não lançou”).
2. Preferir `alt_auto` (mock) quando cache não for P0; declarar residual.

Um teste aprovado cobre apenas o cenário e as asserções executados; não encerra todos os riscos do pacote. Vincular a evidência ao critério de encerramento do risco e registrar os residuais. Para CVE, teste funcional não substitui reauditoria e verificação da correção ou mitigação documentada. Aprovação no Canvas e prioridade P0 não são evidência de execução.

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 / net10.0 | `Microsoft.Extensions.Caching.StackExchangeRedis` alinhado ao TFMD (candidato). |
| net7.0 | Pacote Extensions alinhado ao TFM 7. |

Versões = candidatas — [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md).
