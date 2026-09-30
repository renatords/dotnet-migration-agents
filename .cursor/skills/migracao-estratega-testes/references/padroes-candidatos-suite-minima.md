# Padrões candidatos — suite mínima

> **Uso:** Estratega (e Orquestrador ao consolidar §9b) **avalia** cada padrão contra evidência **deste** alvo.  
> **Não** é receita obrigatória de conteúdo nem checklist por tecnologia.  
> **Obrigatório** (outro documento): [estrategia-testes-faseada-migracao.md](estrategia-testes-faseada-migracao.md) — duas worktrees + suite mínima no origem + GuardiãoOrigem antes de MigrarVersao.

Para cada padrão: incluir só se o **sinal** existir; omitir se o **quando omitir** se aplicar. Sem nomes de projetos de corridas anteriores.

---

## Princípio — prioridade de automação

1. **Piso:** contrato HTTP (WAF e/ou mock) + smoke de persistência **se** houver BD/EF no escopo.
2. **Integrações:** para **cada** componente de integração no escopo (Diplomata / inventário), **automatizar ou questionar** — não adiar por omissão.
3. **Contentor efémero** (ex.: Testcontainers) é a forma preferida quando o componente for “serviço de infra” (BD, broker, cache, storage de scheduler, etc.) e o Canvas aceitar contentores.
4. Se contentor **não** for viável ou aceito: propor **alternativa auto** (mock, WireMock, InMemory, subclass de DbContext, stub) **ou** marcar `manual_homolog` com motivo.
5. **Homolog residual:** só o que contentor/mock **não** substitui (IdP/Vault reais, SASL/credenciais de cluster, side-effects de negócio com parceiro real).

Decisões por componente (Canvas / handoff §9b): `container_auto` | `alt_auto` | `manual_homolog`.

Exemplos ilustrativos (não checklist): PostgreSQL, broker de mensagens, cache distribuída, storage de jobs em background.

---

## 1. Contrato HTTP (health / rota crítica)

| | |
|--|--|
| **Sinal** | Controllers/API no escopo; inventário de testes vazio ou sem cobertura HTTP |
| **Ganho** | Regressão de contrato e serialização sem parceiro real |
| **Formas** | Controller unitário com mocks; e/ou `WebApplicationFactory` (pipeline DI/hosting/JSON) |
| **Quando omitir** | Já existe TestServer/WAF equivalente verde no origem |

## 2. Stub de cliente HTTP externo

| | |
|--|--|
| **Sinal** | `HttpClient` / factory / Refit para Identity, gateway, parceiro |
| **Ganho** | Deserialização e caminho de erro sem hml |
| **Formas** | `HttpMessageHandler` fake; WireMock se já no stack |
| **Quando omitir** | Só smoke manual em homolog aceita no Canvas; ou contrato já coberto |

## 3. Smoke de persistência + BD efémera

| | |
|--|--|
| **Sinal** | EF/driver de BD no Auditor/Diplomata; persistência no escopo |
| **Ganho** | Persistência mínima comparável origem→destino |
| **Formas** | Contentor efémero do **provider do alvo** (SqlServer / PostgreSQL / … — **não** fixar PG); `SkippableFact` / opt-in se Docker ausente; env de connection string como fallback; BD hml isolada se acordada |
| **Quando omitir** | Sem persistência no escopo |
| **Decisão** | `container_auto` / `alt_auto` / `manual_homolog` — questionar no Canvas se contentor for rejeitado |

## 4. Smoke de componente de integração (genérico)

| | |
|--|--|
| **Sinal** | Qualquer serviço de infra no caminho feliz (fila, broker, cache, storage de jobs, etc.) |
| **Ganho** | Regressão de wiring/protocolo sem cluster real |
| **Formas** | Contentor efémero do **mesmo tipo** de serviço; produce/consume ou get/set mínimo; skippable/opt-in na pipe |
| **Quando omitir** | Componente fora de escopo; ou Canvas marcou `manual_homolog` (credencial real / side-effect) |
| **Não fazer** | Tratar um produto (ex. um broker) como regra universal — a regra é o **tipo de componente** |

## 5. Asserts de stack (TFM / JSON / Mvc.Testing)

| | |
|--|--|
| **Sinal** | Salto de TFM e/ou pacote JSON no caminho crítico |
| **Ganho** | Detecta csproj/stack errado sem esperar falha de negócio |
| **Formas** | Asserts no **destino** (ex. TFM destino no csproj); no **origem** asserts distintos (não copiar o assert do destino) |
| **Quando omitir** | Stack de testes já trava TFM/pacotes de forma equivalente |

## 6. Smoke da API em contentor

| | |
|--|--|
| **Sinal** | Dockerfile/CI de runtime; risco que WAF não cubra (publish, env, rede) |
| **Ganho** | App sobe e responde a um endpoint com BD/serviço de teste |
| **Formas** | Opt-in (`RUN_CONTAINER_TESTS=1` ou `testsettings`); default **off** na pipe; trait/categoria filtrável |
| **Matriz §5b** | Linha **API (host em contentor)** — `container_auto` se Canvas aceitar; senão WAF-only / omitir |
| **Quando omitir** | Sem Docker na CI; WAF + suite mínima bastam; custo desproporcional aceito no Canvas |

## 7. Subclass / inject de conexão para testes

| | |
|--|--|
| **Sinal** | `OnConfiguring` / Vault / singleton de connection string impede injectar CS de teste |
| **Ganho** | Smoke de persistência estável sem secrets reais |
| **Quando omitir** | DI já permite configurar o provider com CS de teste limpa |

---

## Contrato CI / GitLab (contentores)

| Regra | Detalhe |
|-------|---------|
| **Default** | `dotnet test` **sem** flag de contentor — testes que precisam de Docker **skip** ou não correm |
| **Opt-in** | Env (ex. `*_ENABLE_*_TESTS=true`) e/ou `testsettings.json`; documentar no `execucao.md` / README de testes |
| **Filtro** | `Category` / `Trait` (ex. `Category=TestContainers`) — pipe pode usar `--filter Category!=…` |
| **Guardião** | Corre suite **default** (`dotnet test` sem flag de contentor); skip de contentor **≠** `regression_detected` |
| **Proibido** | Tornar contentor **obrigatório** na job GitLab sem Docker service / sem opt-in |

---

## Anti-padrões

- Copiar checklist de outro alvo sem evidência neste repo.
- Adiar integração para homolog **sem** questionar automação (contentor ou alternativa).
- Meter smoke de contentor (API ou infra) como **obrigatório** na pipe sem Docker.
- Expandir a suite do **gate Guardião** depois do GuardiãoOrigem (novos cenários do gate só em `CriarSuiteMinima` na origem).
- Promover `manual_homolog` → automação na execução sem emendao ao Canvas / §9b.
- Reescrever testes no destino em vez de reutilizar os do origem.
- Tratar “suite mínima” como cobertura completa de negócio.
