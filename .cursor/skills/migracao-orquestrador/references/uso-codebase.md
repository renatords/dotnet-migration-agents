# Uso de `@codebase` — regra transversal

> Aplica-se a **todas** as personas (análise) e ao Executor/Guardião (execução).

## Pode usar `@codebase` quando

| Situação | Exemplo |
|----------|---------|
| Pacote fora do catálogo / avaliação manual | Confirmar uso no `.cs` |
| Seção **Incertezas** do report | Cartógrafo: confirmar Controller público |
| Lacuna no handoff (seção Lacunas) | Executor: `grep FromSql` em Repositories |
| Implementação (ondas / suite mínima) | Paths de clients HTTP, DI, csproj de testes |
| Síntese Orquestrador | Fechar 3R ou viabilidade quando reports divergem |

## Como usar (bom)

- Leitura **pontual** de paths citados ou suspeitos (`Startup.cs`, `Client/`, `*Tests*.csproj`).
- Grep com padrão estreito (`FromSql`, `AddDbContext`, `Refit`).
- Citar path + linha no report ou complementos.

## Evitar (mau)

- Revarrer o repo inteiro por precaução.
- Substituir o inventário sistemático da persona (Glob/Grep planeado) por varredura aleatória do repo.
- Na **execução**, re-rodar Auditor/Cartógrafo/Diplomata completos fora das Lacunas do handoff.
- Inventar pacotes, CVE ou integrações sem arquivo no repo.

## Onde registrar

| Fase | Onde |
|------|------|
| Análise (persona N) | Report — evidências / fechar Incertezas |
| Síntese | `orquestrador-complementos.md` |
| Execução | `reports/execucao.md` ou resolver Lacunas do handoff |

Referência global: `.cursor/rules/migracao-globais.mdc`.
