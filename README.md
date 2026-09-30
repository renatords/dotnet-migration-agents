# Kit de migração .NET (Cursor)

Kit de migração assistida para o [Cursor](https://cursor.com): personas em sequência, gate externo por etapa, Canvas de aprovação e handoff para execução local (`dotnet test`, worktrees).

Os artefatos da análise ficam em `.migration-context/` no repositório **alvo** (não neste kit).

## Começar

| Documento | Uso |
|-----------|-----|
| [AGENTS.md](AGENTS.md) | Mapa do kit: comandos, personas, evidência |
| [agents/RUNBOOK.md](agents/RUNBOOK.md) | Como correr análise e execução |

### Comandos principais

```text
/analisar-migracao source:<caminho> TFMO:<TFM_ORIGEM> TFMD:<TFM_DESTINO>
/executar-migracao
```

Exemplo: `/analisar-migracao source:C:\repos\MeuApp TFMO:netcoreapp3.1 TFMD:net10.0`

## O que inclui

- **Rules e skills** por persona (Analista → Auditor → Cartógrafo → Diplomata → Estratega → Orquestrador)
- **Gate Auditor** (PASS/FAIL em `gate-*.md`) antes de avançar
- **Commands** Cursor: `/analisar-migracao`, `/gate-auditor`, `/executar-migracao`
- Contrato de qualidade (decisões, transitivos, mock ≠ contrato de cliente)

## Pré-requisitos

- [Cursor](https://cursor.com) com Agent
- .NET SDK no PATH
- Repositório alvo .NET acessível no disco

## Autor

**Renato Silva** — [LinkedIn](https://www.linkedin.com/in/renatords/)

