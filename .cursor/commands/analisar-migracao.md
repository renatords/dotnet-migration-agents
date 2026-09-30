---
description: Análise de migração no repo alvo (source + TFMO→TFMD) — personas com gate, Canvas e handoff; sem executar código
---

Analisa o alvo e gera reports, Canvas e handoff. **Para** para aprovação humana, incluindo contentores; execução via `/executar-migracao`.

**Referências:**

- Encadeamento: [encadeamento-analise.md](../skills/migracao-orquestrador/references/encadeamento-analise.md)
- Piso insumo: [piso-insumo-personas.md](../skills/migracao-orquestrador/references/piso-insumo-personas.md)
- Rubrica gate: [rubrica-gate-externo.md](../skills/migracao-orquestrador/references/rubrica-gate-externo.md)
- Rules: `migracao-orquestrador` + `migracao-gate-auditor` · Skills: personas + `migracao-gate-auditor`

## Invocação obrigatória

```text
/analisar-migracao source:<caminho> TFMO:<TFM_ORIGEM> TFMD:<TFM_DESTINO>
```

| Chave | Obrigatório | Significado |
|-------|-------------|-------------|
| `source:` | sim | Caminho do repo .NET alvo |
| `TFMO:` | sim | TFM atual declarado (ex. `netcoreapp3.1`) |
| `TFMD:` | sim | TFM destino (ex. `net10.0`) |

- Chaves **case-insensitive**; ordem **livre**.
- Path com espaços: `source:"C:\path with spaces"`.
- **Não** aceitar só argumentos posicionais.

### Validação inicial (antes de qualquer persona)

1. Extrair `source`, `TFMO`, `TFMD` de `$ARGUMENTS` / texto após o comando.
2. Chave ausente/vazia → **PARAR** imediatamente, sem criar `.migration-context/` nem anunciar sequência:

```text
Erro: /analisar-migracao exige source:, TFMO: e TFMD:.
Uso: /analisar-migracao source:<caminho> TFMO:<TFM_ORIGEM> TFMD:<TFM_DESTINO>
Exemplo: /analisar-migracao source:C:\repos\MeuApp TFMO:netcoreapp3.1 TFMD:net10.0
```

3. Se `source` não existir no disco → **PARAR** com erro de path.
4. **Não** perguntar valores em falta; **não** default para `net8.0`.

### Propagação

- `source` → raiz do alvo (Glob/Grep/Read/Shell `dotnet`).
- `TFMD` → `target_framework` nos reports / Canvas / handoff.
- `TFMO` → handoff/Canvas (origem→destino); metadado declarado — sem substituir TFMs inventariados.

## Pré-requisito

`dotnet` no PATH (Estratega — `dotnet test`).

## Passo 0 — Orquestrador

1. Após validação inicial OK: criar `<source>/.migration-context/reports/`.
2. Anunciar sequência **persona → gate → persona** (Gate Auditor).

## Encadeamento (passos 1–5)

| Passo | Persona | Gate | Saídas |
|-------|---------|------|--------|
| 1 | Analista | `/gate-auditor analista` | `analista.md`, `gate-analista.md` |
| 2 | Auditor | `/gate-auditor auditor` | `auditor.md`, `gate-auditor.md` |
| 3 | Cartógrafo | `/gate-auditor cartografo` | `cartografo.md`, `gate-cartografo.md` |
| 4 | Diplomata | `/gate-auditor diplomata` | `diplomata.md`, `gate-diplomata.md` |
| 5 | Estratega | `/gate-auditor estratega` | `estratega-testes.md`, `gate-estratega.md` |

Cada passo: cumprir [piso-insumo-personas.md](../skills/migracao-orquestrador/references/piso-insumo-personas.md) **antes** do Write.
Estratega: **Shell `dotnet test` obrigatório** (sem skip em `/analisar-migracao`).

## Validação entre passos

1. Pré-check: [checklist-gate-persona.md](../skills/migracao-orquestrador/references/checklist-gate-persona.md).
2. Gate Auditor → `gate-<papel>.md` = **PASS** (a persona **não** declara PASS).
3. **FAIL** → corrigir report; repetir gate; **não** avançar.

Troubleshooting: [guia-troubleshooting-gate.md](../skills/migracao-orquestrador/references/guia-troubleshooting-gate.md)

## Passo 6 — Síntese e gate humano

1. Confirmar os cinco gates das personas = PASS.
2. Cumprir a **etapa 1** de [checklist-gate-negocio-orquestrador.md](../skills/migracao-orquestrador/references/checklist-gate-negocio-orquestrador.md), validando os insumos antes da síntese.
3. Produzir `orquestrador-complementos.md`, `canvas-migration.md`, Canvas visual (opcional, quando solicitado) e `handoff-execucao.md` (TFMO→TFMD; plano faseado e matriz de contentores).
4. Preencher §8 Telemetria de complementos (`gate_externo = pendente`, `gate_failures`, Glob/Grep/Read/Shell).
5. Cumprir a **etapa 2** do checklist de negócio; com os itens críticos OK, invocar Gate Auditor `orquestrador` sobre os artefatos produzidos → `gate-orquestrador.md`. FAIL → Orquestrador corrige os artefatos e repete o gate; não avançar.
6. Atualizar a telemetria com o veredito e as tentativas. Só após `gate-orquestrador.md` PASS, **PARAR** e pedir aprovação explícita do Canvas, **incluindo estratégia de contentores** (aceita / rejeitada + alternativas `container_auto` / `alt_auto` / `manual_homolog`).

## Não fazer neste comando

- Não iniciar worktree, alterações de código nem Guardião.
- Não invocar `/executar-migracao` sem aprovação humana do Canvas.

## Próximo passo

Após aprovação: **`/executar-migracao`**.
