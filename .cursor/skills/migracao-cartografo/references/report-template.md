# Relatório Cartógrafo — {{project_id}}

> Write integral via Grep/Read no repo + predecessors. Objetivos: [objetivos-negocio-personas.md](../../migracao-orquestrador/references/objetivos-negocio-personas.md#cartógrafo).

> `.migration-context/reports/cartografo.md` no repositório **alvo**  
> **Pré-requisitos:** `reports/analista.md`, `reports/auditor.md`.

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | |
| Raiz absoluta | |
| `target_framework` | |
| Gerado em (UTC) | |

## 2. Resumo

- Projetos no grafo:
- Arestas (referências projeto-a-projeto):
- Hub principal (maior acoplamento):
- Grafo: Read `ProjectReference` em csproj (hipótese — marcar incerteza se ambíguo)

## 3. Escopo (cruzamento Analista / Auditor)

Cruzar §3 Analista com pacotes Critical Auditor §4 — projetos e pacotes **in scope**.

## 4. Grafo de dependências (projetos)

### Entrada da análise

- Fonte: `ProjectReference` em `*.csproj` + Analista §2
- Entry point da solução:

### Resumo de arestas

| De | Para | Notas |
|----|------|--------|
| | | |

> Listar subconjunto representativo; detalhar hubs em §5.

## 5. Hotspots / hubs

| Projeto | fan-out | fan-in | Sinal (Revise/Retain) | Papel no grafo |
|---------|---------|--------|------------------------|----------------|
| | | | | |

Base: Grep/Read em Startup, DI, repositórios, controllers.

## 6. APIs públicas in-repo e referências

Contratos expostos **dentro do repositório** (libs, DTOs, interfaces partilhadas):

| Projeto / assembly | Tipo de superfície | Referências in-repo (projetos) | Notas |
|--------------------|-------------------|-------------------------------|--------|
| | | | |

Consumidores **fora do repo** → **Diplomata** (não detalhar aqui).

> Complementar com Grep `MapGet`, `[Route`, interfaces públicas quando necessário.

## 7. Impacto por mudança prevista (alto nível)

> Heurística grep (sem Roslyn): [heuristica-blast-radius-grep.md](../../migracao-orquestrador/references/heuristica-blast-radius-grep.md) — coluna **Confiança** obrigatória.

### Mudança de pacote (escopo Auditor)

Cruzar uso Auditor §4 + §12 com grafo §4.

| Pacote / upgrade | Projetos afetados | Arquivos amostra (Auditor §12 + grep) | Confiança | Blast radius resumido |
|------------------|-------------------|----------------------------------------|-----------|------------------------|
| | | | Alta/Média/Baixa | manifest + grafo + uso Grep |

### Mudança de API/contrato in-repo

| Superfície | Quem referencia | Risco de quebra |
|------------|-----------------|-----------------|
| | | |

## 8. Arquivos / projetos tocáveis

Cruzar `usage_sites` Auditor com pastas Analista §2.

| Pacote / pasta | Pastas com `.cs` | Arquivos amostra |
|----------------|-------------------|-------------------|
| | | |

## 9. Perguntas abertas (para personas downstream)

| # | Pergunta | Persona sugerida |
|---|----------|------------------|
| 1 | | Diplomata / Estratega |
| 2 | | |

> Delegar integrações externas ou testes de contrato — **não** duplicar grafo completo aqui.

## 10. Incertezas

- Limitações da heurística grep/read (sem Roslyn):

## 11. Evidências

| Fonte | Path / comando |
|-------|----------------|
| Predecessors | `reports/analista.md`, `reports/auditor.md` — [guia-leitura-predecessor.md](../../migracao-orquestrador/references/guia-leitura-predecessor.md#cartógrafo-passo-3) |
| Blast radius | [heuristica-blast-radius-grep.md](../../migracao-orquestrador/references/heuristica-blast-radius-grep.md) |
| Grafo | Grep `ProjectReference` em `*.csproj` |
| Hotspots / HTTP | Grep controllers, `MapGet`, `new HttpClient`, etc. |
