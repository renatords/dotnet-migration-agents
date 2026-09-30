# Objetivos de negócio — personas

> Regras de negócio via Read/Grep/Shell no repo alvo.

---

## Analista

**Pergunta:** o que existe e o que candidatar a in/out?

| Entrega | Como obter (LLM) | Seção template |
|---------|------------------|-----------------|
| Topologia `.sln` / `.csproj`, TFM, SDK, `ProjectReference` | Glob + Read csproj/sln | §2 |
| `folder_tree` — pastas com `.cs` por projeto (prof. 1–2) | Glob + listagem | §2 |
| Entry points (`Startup.cs`, `Program.cs`) | Grep/Read | §2 |
| Hosting legado (Web SDK, `Startup` vs minimal) | Read Startup/Program, csproj | §4 |
| Artefatos raiz (Dockerfile, CI, `global.json`) | Glob raiz | §2 / §5 |
| Escopo provisório in/out (**hipótese**) | Síntese factual | §3 |
| Perguntas delegáveis | Lacunas reais | §6 |
| Incertezas | Ambiguidades | §8 |

**Proibido:** 3Rs finais; inventário NuGet; grafo de tipos; integrações externas detalhadas.

---

## Auditor

**Pergunta:** o que na stack impede ir ao TFM destino?

| Entrega | Como obter (LLM) | Seção |
|---------|------------------|--------|
| Inventário pacotes por projeto | Grep `PackageReference`/`PackageVersion` em `*.csproj` | §4 |
| **Uso no código** — path:linha ou padrão | [mapeamento-pacote-playbook.md](mapeamento-pacote-playbook.md) + [grep-patterns-migracao.md](grep-patterns-migracao.md) + [guia-grep-exaustivo-auditor.md](guia-grep-exaustivo-auditor.md) | §4 col. uso; §4b; §12 |
| Versão alvo + rationale | NuGet/docs + playbook `specializations/` quando aplicável | §4, §4b |
| CVE | Shell `dotnet list package --vulnerable` | §6 |
| Licenciamento / EOL | nuget.org ou **Verificar** | §7, §8 |
| Breaking no repo | Grep padrões deprecados, APIs removidas | §4b, §8 |
| Hint 3R por pacote (**hint**, não final) | Heurística uso + breaking | §4 |
| Escopo × Analista | Read `analista.md` §3 ([guia-leitura-predecessor.md](guia-leitura-predecessor.md#auditor-passo-2)) | §3 |
| `verification_hint` → Estratega | Por pacote Critical | §4b |

**Obrigatório:** pacotes Critical/Warning **in scope** com **uso detectado** (arquivo ou pasta) — não só versão.

---

## Cartógrafo

**Pergunta:** blast radius e hotspots?

| Entrega | Como obter (LLM) | Seção |
|---------|------------------|--------|
| Grafo projeto ↔ projeto | Read csproj `ProjectReference` + Analista §2 | §4 |
| Hotspots (Startup, DI, repositórios) | Read + Grep `AddDbContext`, controllers | §5–§7 |
| **Instanciação estática** (`new HttpClient`, Kafka producer, etc.) | Grep `new ` + tipos suspeitos | §6 / §9 |
| Superfície HTTP (controllers, minimal APIs) | Grep `Controller`, `[Route`, `MapGet` | §6 |
| Blast radius por pacote Critical (Auditor) | [heuristica-blast-radius-grep.md](heuristica-blast-radius-grep.md) — confiança Alta/Média/Baixa | §7 |
| Ordem sugerida de mudança | Síntese dependências + §7 confiança | §7 |
| Perguntas abertas | Delegação | §9 |

**Proibido:** re-inventário NuGet completo; integrações externas (Diplomata).

---

## Diplomata

**Pergunta:** fronteiras externas e persistência?

| Entrega | Como obter (LLM) | Seção |
|---------|------------------|--------|
| DbContext / EF — quantos, onde | Grep `DbContext`, `AddDbContext` | §5 |
| PostgreSQL/SQL — chaves config (**não** valores) | [checklist-config-higienizada.md](checklist-config-higienizada.md) + Grep keys | §5 |
| Kafka / Redis / filas | Grep client types, config keys | §4, §5 |
| HTTP/Refit clients | Grep `Refit`, `IHttpClientFactory`, interfaces Client | §4 |
| Migrations / schema strategy | Glob `Migrations/`, `EnsureCreated` | §5, §11 |
| OTel / logging | Grep OpenTelemetry, Serilog | §6 |
| Risco por integração (driver/TLS/breaking) | Playbook `references/specializations/*.md` + Auditor | §7 |
| Fila de homologação | [template-fila-homologacao.md](template-fila-homologacao.md) → §8b report | §8b |

**Proibido:** Read integral appsettings com secrets; segredos no report.

---

## Estratega de Testes

**Pergunta:** testes aguentam provar a migração?

| Entrega | Como obter (LLM) | Seção |
|---------|------------------|--------|
| Projetos de teste, frameworks, pacotes legados (`Mvc.Core`) | Glob `*Tests*`, Read csproj | §2, §4 |
| **Baseline** `dotnet test` (contagens) | Shell na solução | §2 |
| Gaps (sem integração, sem HTTP mock) | Read testes + predecessors | §4, §6 |
| Cenários P0/P1 por risco (Refit, EF, Kafka…) | Cruzar Auditor/Diplomata §8b + playbooks teste | §6 |
| Fases PrepararAmbiente→ValidarHomolog (**insumo** handoff) | Template estrategia faseada + padroes suite mínima | §6 / §12 |
| DoD verificável | §8 |
| Infra teste (BD HML, WireMock, etc.) | §5b |

**Recomendado:** `dotnet test` obrigatório na análise (Estratega §2).

---

## Orquestrador

Mesmo contrato: parecer, 3Rs finais, Canvas, handoff (plano faseado), coerência cross-persona. Lê **cinco reports** — seções em `parecer-sintese.md`.
