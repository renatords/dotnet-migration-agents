# Canvas visual (Cursor) — proposta canónica

Entrega opcional, gerada quando solicitada. Ausência não bloqueia a análise; Canvas Markdown permanece obrigatório. Quando gerado, conferir paridade com o MD.

> Companheiro do **`canvas-migration.md`** (MD no repo alvo). Gerado pelo Orquestrador na síntese (passo **S6a**).

## Dois formatos

| Formato | Local | Papel |
|---------|-------|--------|
| **MD** | `<alvo>/.migration-context/canvas-migration.md` | Contrato, handoff, `canvas-approved.txt`, execução |
| **Visual** | `<workspace-cursor>/canvases/<project-id>-migration-canvas.canvas.tsx` | Revisão humana ao lado do chat |

O MD é **fonte da verdade**. O `.canvas.tsx` espelha o mesmo conteúdo — não substitui o MD.

## Quando gerar

- **Quando solicitado**, após Canvas MD e handoff e antes do gate da síntese/aprovação humana. Se não solicitado, omitir sem bloquear.
- Dados inline no componente (sem `fetch`) — extrair de `canvas-migration.md`, plano faseado do handoff e `estratega-testes.md`.

## Onde gravar

Path **obrigatório** (Cursor IDE):

```
C:\Users\<user>\.cursor\projects\<workspace-id>\canvases\<project-id>-migration-canvas.canvas.tsx
```

- `<workspace-id>`: pasta do project Cursor activo (ex. terminal/metadata do agente).
- `<project-id>`: slug do Analista (ex. `meu-app` → `meu-app-migration-canvas.canvas.tsx`).
- **Não** gravar no repo alvo nem em subpastas de `canvases/`.

Template de referência: [canvas-visual-template.canvas.tsx](canvas-visual-template.canvas.tsx)  
Exemplo preenchido: `canvases/<project-id>-migration-canvas.canvas.tsx` no workspace Cursor.

## Seções obrigatórias do layout

1. **Cabeçalho** — título, pills (estratégia, TFM origem→destino), data/fonte MD
2. **Callout parecer** — Viável / Ressalvas / Não recomendado (tone alinhado)
3. **Stats** — espelhar o perfil quantitativo do Canvas MD (projetos/controllers/clientes/DbContexts), com fontes e campos não levantados; acrescentar 3R/infra/suíte quando útil
4. **UsageBar** — esforço/regressão/integração/testes (L=1, M=2, H=3)
5. **Tabela 3Rs** — do Canvas MD
6. **TodoListCard PrepararAmbiente→ValidarHomolog** — do plano faseado do handoff (baseline na origem = CriarSuiteMinima + GuardiãoOrigem)
7. **Callout gate** — aprovação pendente (incl. contentores) ou `canvas-approved.txt`
8. **Tabela riscos** — top 6 do Canvas
9. **DoD testes** — qualidade da suite (piso + integrações auto; residual homolog); suite default sem Docker obrigatório

## SDK

- Imports **apenas** de `cursor/canvas`.
- Ler skill: `~/.cursor/skills-cursor/canvas/SKILL.md`.
- Sem gradientes, box-shadow, emojis decorativos; cores via `useHostTheme()`.

## Entrega ao humano

Incluir na resposta do Orquestrador link markdown com path absoluto do `.canvas.tsx` e convite a abrir ao lado do chat.

## Referência no MD

Opcional em `canvas-migration.md` §10:

```markdown
| Canvas visual (IDE) | `canvases/<project-id>-migration-canvas.canvas.tsx` (workspace Cursor) |
```
