# Cliente HTTP Refit

> Especialização `refit` · `integration_kind: http_client`  
> Pacotes: `Refit`, `Refit.HttpClientFactory`

## Quando activar

Quando o Auditor detecta estes pacotes **in scope** com uso no código (Grep).

## Checklist Diplomata

1. Interfaces em `Client/` — métodos, rotas, DTOs.
2. `BaseUrl` / seções de config por ambiente (valores higienizados).
3. Autenticação (Bearer, certificado) — sem segredos no report.
4. Dependências Polly / HttpClientFactory no Startup ou Program.

## Checklist Estratega

Níveis de evidência — ver [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

| Nível | O que mockar | O que verifica | Cobertura e limites |
|-------|--------------|-------------|-------------------|
| **Chamador** | Interface (`I*Client` / Moq) | Serviço chama o método certo e trata retorno | Apenas lógica do chamador; não valida o contrato do pacote |
| **Contrato Refit** | Só o transporte (`HttpMessageHandler` / WireMock); cliente Refit **real** serializa e monta o HTTP | Atributos, rota, headers, payload / serialização | Somente os comportamentos exercitados, com asserções observáveis e evidência registrada |
| **Homolog** | Parceiro real | Auth/rede/side-effect | Residual `manual_homolog` |

1. Para o **serviço chamador**: mock da interface Refit — não substitui o contrato do pacote.
2. Para **breaking Refit** (ex. 5→7) ou regressão após correção de CVE: exercitar o cliente Refit com transporte simulado e **asserção observável** (status, rota, body).
3. Regressão de serialização nos DTOs partilhados (alinhada ao nível contrato).
4. Smoke por parceiro externo em homologação quando mocks não cobrirem auth/rede.

Um teste aprovado cobre apenas o cenário e as asserções executados; não encerra todos os riscos do pacote. Vincular a evidência ao critério de encerramento do risco e registrar os residuais. Para CVE, teste funcional não substitui reauditoria e verificação da correção ou mitigação documentada. Aprovação no Canvas e prioridade P0 não são evidência de execução.

## Notas por TFM

| TFM destino | Foco |
|-------------|------|
| **net8.0** / **net10.0** | Refit 7.x+ (candidato — verificar); rever `AddRefitClient`; breaking 5→7 em atributos e serialização. |
| **net7.0** | Refit 7.x; confirmar versão mínima nos csproj de teste. |

Versões são candidatas, não pins — [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md).

## Evidência

Usar paths do **report Auditor** (inventário / uso) ou Grep no repo.
