# Template — fila de homologação (Diplomata §8b)

> Fila Markdown de verificações de homologação por integração.  
> Preencher em `reports/diplomata.md` **§8b** — uma linha por integração **Critical/Warning in scope** (Auditor §4) ou risco de integração equivalente.  
> Critério DI-03: prioridade + evidência + **asserção observável** (ou encaminhamento justificado).  
> Ver [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md#cenários-por-risco).

## Colunas

| Coluna | Origem | Exemplo |
|--------|--------|---------|
| `integration_kind` | [mapeamento-pacote-playbook.md](mapeamento-pacote-playbook.md) | `http_client`, `database`, `message_bus` |
| `identifier` | Nome lógico higienizado (sem secrets) | `ApiParceiroX`, `PostgresPrincipal`, `KafkaEventos` |
| `playbook` | Arquivo em `specializations/` | `refit.md` |
| `evidence` | Path ou chave config | `Client/IParceiroApi.cs`, `ConnectionStrings:Default` (só chave) |
| `migration_risk` | 1 frase | Breaking Refit 5→7 + auth Bearer |
| `homolog_priority` | P0 / P1 / P2 | P0 = bloqueia migração ou caminho feliz |
| `asserção_observável` | Resultado verificável (não só “correr teste”) | Status 200 + body com campo X; roundtrip data UTC; mensagem no tópico Y |
| `verificacao_sugerida` | Como obter a asserção (nível do teste + infra) | `HttpMessageHandler` + assert rota/payload; Testcontainers PG + insert; residual OAuth = `manual_homolog` |

### O que conta como asserção observável

| Tipo | Aceitável | Não basta |
|------|-----------|-----------|
| HTTP / Refit | Status, rota, headers ou payload relevantes com **cliente/serializer real** e transporte simulado | Só mock da interface do serviço chamador |
| Persistência | Operação/roundtrip no provider do alvo (ou limite explícito se InMemory) | “DbContext não lançou exceção” |
| Mensageria / cache | Mensagem recebida / valor relido | Só invocar `Produce` / `Get` sem assert |
| Residual real | Encaminhar a `manual_homolog` com motivo (IdP, SASL, side-effect) | Omitir a linha |

## Priorização sugerida

| Prioridade | Critério |
|------------|----------|
| **P0** | Critical Auditor + caminho feliz (HTTP contrato, EF CRUD principal) |
| **P1** | Warning ou Kafka/Redis secundário |
| **P2** | Observabilidade, cache não-crítico, homolog manual aceita |

## Tabela (copiar para report)

```markdown
## 8b. Fila de homologação

| integration_kind | identifier | playbook | evidence | migration_risk | homolog_priority | asserção_observável | verificacao_sugerida |
|------------------|------------|----------|----------|----------------|------------------|---------------------|----------------------|
| | | | | | P0/P1/P2 | | |
```

## Ligação Estratega

- Cada linha **P0** → candidato a cenário em `estratega-testes.md` §6 / §6b (mesmo `asserção_observável`).
- HTTP/EF com playbook → ver [test-contract-baseline-reuse.md](specializations/test-contract-baseline-reuse.md).
- Mock de interface do chamador ≠ contrato do cliente — [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md#cenários-por-risco).
