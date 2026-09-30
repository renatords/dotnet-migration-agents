/**
 * Template — Canvas visual de migração (Cursor IDE).
 * Copiar para: <workspace>/canvases/<project-id>-migration-canvas.canvas.tsx
 * Preencher a partir de canvas-migration.md + plano faseado do handoff.
 * Ver: canvas-visual-proposta.md
 */
import {
  Callout,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  TodoListCard,
  UsageBar,
  useHostTheme,
} from "cursor/canvas";

// Baseline na origem = CriarSuiteMinima + GuardiãoOrigem
const PHASES = [
  { id: "PrepararAmbiente", content: "PrepararAmbiente — duas worktrees + build origem", status: "pending" as const },
  { id: "CriarSuiteMinima", content: "CriarSuiteMinima — suite mínima no TFM origem", status: "pending" as const },
  { id: "GuardiãoOrigem", content: "GuardiãoOrigem — baseline (suite default)", status: "pending" as const },
  { id: "MigrarVersao", content: "MigrarVersao — ondas Canvas na destino", status: "pending" as const },
  { id: "ValidarMigracao", content: "ValidarMigracao — mesmos testes", status: "pending" as const },
  { id: "ValidarHomolog", content: "ValidarHomolog — residual", status: "pending" as const },
];

export default function MigrationCanvas() {
  const theme = useHostTheme();

  return (
    <Stack
      gap={20}
      style={{ padding: 24, background: theme.bg.editor, minHeight: "100%" }}
    >
      <Stack gap={8}>
        <Row gap={8} wrap align="center">
          <H1 style={{ margin: 0 }}>{/* PROJECT_ID */} — Canvas de migração</H1>
          <Pill tone="info">{/* STRATEGY */}</Pill>
          <Pill tone="neutral">{/* SOURCE_TFM → TARGET_TFM */}</Pill>
        </Row>
        <Text tone="tertiary">
          Fonte: `.migration-context/canvas-migration.md` · Orquestrador · {/* ISO_DATE */}
        </Text>
      </Stack>

      <Callout tone="warning" title="{/* Viável | Viável com ressalvas | Não recomendado */}">
        {/* Parágrafo resumo do parecer (Canvas MD) */}
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value="/* N */" label="Projetos no escopo" />
        <Stat value="/* 3R hub */" label="Projeto hub" tone="warning" />
        <Stat value="/* N */" label="Cenários P0 a criar" tone="warning" />
        <Stat value="/* N ou — */" label="Suite mínima / anti-regressão" tone="info" />
      </Grid>

      <Stack gap={8}>
        <H2>Perfil de risco (qualitativo)</H2>
        <UsageBar
          total={12}
          topLeftLabel="Esforço global: /* L/M/H */"
          topRightLabel="Escala L=1 · M=2 · H=3"
          segments={[
            { id: "effort", value: 2, color: "blue" },
            { id: "regression", value: 3, color: "orange" },
            { id: "integration", value: 3, color: "pink" },
            { id: "tests", value: 2, color: "purple" },
          ]}
        />
      </Stack>

      <Stack gap={8}>
        <H2>Plano 3Rs (decisão final)</H2>
        <Table
          headers={["Projeto", "3R", "Esforço", "Ordem", "Notas"]}
          rows={[
            /* ["Projeto", "Revise", "H", "1", "…"], */
          ]}
          striped
        />
      </Stack>

      <Stack gap={8}>
        <H2>Fases de execução (plano faseado)</H2>
        <TodoListCard todos={PHASES} defaultExpanded />
        <Callout tone="info" title="Gate">
          Revisar e aprovar Canvas MD — `canvas-approved.txt` ou confirmação no chat.
        </Callout>
      </Stack>

      <Stack gap={8}>
        <H2>Principais riscos</H2>
        <Table
          headers={["Risco", "Sev.", "Mitigação"]}
          rows={[
            /* ["…", "H", "…"], */
          ]}
          rowTone={["danger", "danger", "warning"]}
          striped
        />
      </Stack>

      <Stack gap={8}>
        <H3>DoD testes (qualidade, não quantidade)</H3>
        <Text tone="secondary">
          {/* Resumo DoD — P0 baseline→migrado, Guardião, suite mínima */}
        </Text>
      </Stack>
    </Stack>
  );
}
