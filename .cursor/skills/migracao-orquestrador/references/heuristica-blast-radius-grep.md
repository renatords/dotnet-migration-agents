# Heurística blast radius — Grep

> Blast radius = **hipótese** com nível de confiança — marcar no report do Cartógrafo.

## Entradas

- `reports/auditor.md` §4 + **§12** (pacote → grep → paths)
- `reports/analista.md` §2 (projetos, `folder_tree` se existir)
- Grafo §4 Cartógrafo (`ProjectReference`)

## Algoritmo (LLM)

Cobrir cada mudança relevante in scope. Priorizar Critical, mas não omitir riscos restantes: agrupar caminhos equivalentes com justificativa ou registrar limitação e encaminhamento. Para transitivos sem uso direto, partir da dependência consumidora. Amostras de paths abaixo são técnicas de inspeção, não cotas de aprovação:

| Passo | Ação |
|-------|--------|
| 1 | Tomar 1–3 paths de §12 Auditor para o pacote |
| 2 | **Read** trecho (~50 linhas) em cada path — identificar tipos/classes usados |
| 3 | **Grep** nome do tipo/classe no repo (`rg "ClassName" --glob "*.cs"`) |
| 4 | Mapear arquivos encontrados → projeto (path sob pasta `.csproj`) |
| 5 | Cruzar com grafo §4: projetos downstream/upstream |
| 6 | Preencher tabela §7 com **confiança** |

## Níveis de confiança

| Nível | Critério |
|-------|----------|
| **Alta** | Grep tipo + path Auditor coincide; mesmo projeto ou `ProjectReference` directo |
| **Média** | Grep tipo; ligação via 1 hop ProjectReference |
| **Baixa** | Só namespace/`using`; ou inferência sem hit grep adicional |

## Tabela (copiar para `cartografo.md` §7)

| Pacote Critical | Projetos afetados | Arquivos amostra (Auditor §12 + grep) | Confiança | Notas |
|-----------------|-------------------|----------------------------------------|-----------|-------|
| | | | Alta/Média/Baixa | |

## Instanciação estática (complemento §6/§9)

Grep adicional (Cartógrafo):

- `new HttpClient`, `new ProducerBuilder`, `new KafkaProducer`
- `static readonly` + tipos de pacote Critical

## Limitações (declarar em §10 Incertezas)

- Sem Roslyn: **não** afirmar fan-in de símbolos NuGet across assemblies.
- Interfaces dinâmicas/reflection → marcar **Baixa** ou Incerteza.
