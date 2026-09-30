# Cliente HTTP genérico

> Especialização `http_client_generic` · heurística: `Client/`, `I*Client`, `HttpClient`

## Quando activar

Pacote com uso em pastas `Client/` ou snippets com `I*Client` / `HttpClient`, sem especialização catalogada (ex.: RestSharp, gRPC futuro).

## Checklist Diplomata

1. Endpoints e config (higienizada).
2. Timeouts, retry, certificados.
3. Documentar sistema externo (nome lógico, não URL com credenciais).

## Checklist Estratega

Alinhar a [qualidade-decisoes-evidencias.md](../qualidade-decisoes-evidencias.md#cenários-por-risco):

1. **Chamador:** mock da abstração/`I*Client` — valida o serviço, não o stack HTTP.
2. **Contrato HTTP:** cliente/`HttpClient` real (ou factory) com `HttpMessageHandler` / WireMock; assertir status, rota ou payload relevantes.
3. Cenário de timeout / 5xx no nível contrato (ou residual documentado).
4. Homolog com endpoint real só quando necessário (`manual_homolog`).

## Notas por TFM

| TFM | Foco |
|-----|------|
| net8.0 | `IHttpClientFactory`; Extensions.Http / Polly 8.x. |
| net7.0 | Alinhar Extensions ao TFM 7. |
