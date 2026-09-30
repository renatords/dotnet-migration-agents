# Relatório Analista — {{project_id}}

> Preencher **todas** as seções abaixo via **Glob/Grep/Read** no repo alvo — Write integral de `reports/analista.md`. Objetivos: [objetivos-negocio-personas.md](../../migracao-orquestrador/references/objetivos-negocio-personas.md#analista).

> Preencher no repositório **alvo**: `.migration-context/reports/analista.md`  
> **Sem classificação 3Rs** — decisão estratégica fica no Orquestrador (Canvas), após as personas 2–5.

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | |
| Raiz absoluta | |
| `source_framework` (resumo) | |
| `target_framework` | |
| Estratégia (hipótese) | Big Bang (ajustar se outro) |
| Gerado em (UTC) | |

## 2. Topologia

### Soluções (`.sln`)

- (Glob `**/*.sln` + Read)

### Projetos (`.csproj`)

| Projeto | Caminho relativo | TFM(s) | SDK | Tipo de saída | Web SDK |
|---------|------------------|--------|-----|---------------|---------|
| | | | | (`output_type`; marcar se inferido) | sim/não |

### Grafo de projetos (`project_graph`)

| De | Para | Tipo |
|----|------|------|
| | | ProjectReference |

Diagrama opcional (mermaid) — **opcional** se a tabela bastar.

### Layout do repositório (`folder_tree`)

Por projeto **in scope**, listar pastas com `.cs` (profundidade 1–2) e contagens — copiar/sintetizar de `projects[].folder_tree`:

**{{ProjetoPrincipal}}**

| Pasta (relativa) | Profundidade | Arquivos `.cs` (árvore) | Papel provável na migração |
|------------------|--------------|--------------------------|----------------------------|
| | | | (ex.: HTTP, EF, clientes externos — **hipótese**) |

### Entry points (`entry_points`)

| Projeto | Arquivo | Nota |
|---------|----------|------|
| | | ex.: `Startup.cs` — hosting ASP.NET Core legado |

### Camadas / pastas relevantes (síntese)

Bullets **alinhados** ao `folder_tree` — interpretação mínima para migração (não inventar microserviços):

- 

### Artefatos na raiz (`root_artifacts`)

| Path | Tipo | Implicação para migração |
|------|------|--------------------------|
| | | (CI, Docker, pin SDK…) |

## 3. Escopo provisório (hipótese)

> Candidato a in/out — **não** é decisão 3Rs nem aprovação final. O Orquestrador consolida após Auditor, Cartógrafo, Diplomata e Estratega.

### In scope (candidato)

| Módulo / projeto | Motivo factual |
|------------------|----------------|
| *(ex.: `MinhaApi`)* | *(ex.: único Web API na solução; `MinhaApi/MinhaApi.csproj` net472)* |
| | *(substituir — não copiar exemplo)* |

### Out of scope (candidato)

| Módulo / projeto | Motivo factual |
|------------------|----------------|
| | |

## 4. Perfil da solução

| Aspeto | Observação factual |
|--------|-------------------|
| Tipos de host (Web, API, worker, lib…) | |
| Multi-solução / multi-repo | |
| Legado (`legacy_signals`: packages.config, TFM EOL, multi-targeting) | |
| Paths longos (csproj ≥ ~200 chars / nomes concatenados) | |
| Solução principal considerada | |

## 5. Restrições e premissas

- TFM destino assumido:
- Premissas do pedido (texto do usuário):
- Restrições conhecidas (build, SO, CI — de `root_artifacts` ou visíveis no repo):

## 6. Perguntas abertas (para personas 2–5)

| # | Pergunta | Persona sugerida |
|---|----------|------------------|
| 1 | | Auditor / Cartógrafo / Diplomata / Estratega |
| 2 | | |

> Delegar pacotes/CVE, acoplamento, integrações externas e adequação de testes — **não** duplicar inventários completos aqui.

## 7. Superfície pública (candidatos in scope)

Projetos ou assemblies que **parecem** expor contrato (HTTP, lib pública, mensagens…) — sem classificar 3R:

| Projeto | Tipo (HTTP, lib, mensagens…) | Notas |
|---------|------------------------------|--------|
| | | |

Detalhe de consumidores externos → **Diplomata** / acoplamento → **Cartógrafo**.

## 8. Incertezas e lacunas

- Itens **não** cobertos pelo script (ex.: função de cada Controller):
- Ambiguidades (vários `.sln`, TFM ausente no `.csproj`):

## 9. Evidências

| Fonte | Path / comando |
|-------|----------------|
| Soluções e projetos | paths `.sln`/`.csproj` lidos |
| Entry points / hosting | `Startup.cs`, `Program.cs`, csproj Web SDK |
| Outros | |
