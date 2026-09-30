# Guia — leitura de predecessors

> **Ler só as seções listadas** dos predecessores. Reler reports inteiros apenas por lacuna documentada.

## Por persona

### Auditor (passo 2)

| Ler | Seções | Para quê |
|-----|---------|----------|
| `reports/analista.md` | **§2** Topologia, **§3** Escopo provisório | Filtrar pacotes/projetos in scope |
| Opcional | §6 Perguntas abertas, §8 Incertezas | Só se bloquear §3 |

**Ignorar:** resto do Analista (não reler após S0 salvo lacuna).

### Cartógrafo (passo 3)

| Ler | Seções | Para quê |
|-----|---------|----------|
| `analista.md` | **§2** Topologia, §3 escopo | Projetos in scope |
| `auditor.md` | **§3** Escopo, **§4** Inventário Critical, **§12** Evidências (paths) | Pacotes + arquivos amostra |
| Opcional | §4b breaking | Hotspots por pacote |

**Ignorar:** CVE §6–§8 Auditor (não duplicar).

### Diplomata (passo 4)

| Ler | Seções | Para quê |
|-----|---------|----------|
| `analista.md` | **§3** Escopo | Projetos in scope |
| `auditor.md` | **§4**, **§4b**, **§12** | Pacotes integração + uso |
| `cartografo.md` | **§5–§7** Hotspots, impacto | Onde vive integração no código |
| Opcional | §9 Perguntas abertas do Cartógrafo | Delegação |

**Ignorar:** grafo completo §4 Cartógrafo se §5–§7 bastarem.

### Estratega (passo 5)

| Ler | Seções | Para quê |
|-----|---------|----------|
| `auditor.md` | **§4b** Avaliação, **§12** | Riscos + paths testáveis |
| `diplomata.md` | **§5–§6**, **§8b** Fila de homologação | P0 homolog + infra |
| `cartografo.md` | **§5** Hotspots | Onde testar |
| `analista.md` | **§3** Escopo | Cobertura vs escopo |
| Opcional | §2 Analista | Comandos `dotnet test` entrada |

**Ignorar:** narrativa longa; CVE detalhado.

### Orquestrador (passo 6)

Ler seções em [parecer-sintese.md](parecer-sintese.md) — **não** reler repo inteiro.

## Regras

1. **Uma passagem** por predecessor por persona — anotar citações (§ + bullet).
2. Lacuna em seção obrigatória → **Incertezas** da persona, não inventar.
