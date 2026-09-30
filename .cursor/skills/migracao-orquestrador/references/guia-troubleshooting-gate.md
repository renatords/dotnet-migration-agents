# Guia — troubleshooting gate (Gate Auditor)

> Usar quando **`gate-<persona>.md` = FAIL** ou piso de cobertura não cumprido.  
> Cotas de Glob/Grep/linhas **não** são critério — ver [piso-insumo-personas.md](piso-insumo-personas.md) e [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md).

## Por sintoma (rubrica ID)

| Sintoma | Rubrica | Ação |
|---------|---------|------|
| §12 linhas ≠ N (diretos+transitivos) | AU-03 | Completar §12; [guia-grep-exaustivo-auditor.md](guia-grep-exaustivo-auditor.md) |
| Uso vazio / transitivo sem resolução | AU-04, AU-05 | Path/padrão no direto; origem+ausência de uso justificada no transitivo |
| Pacote/versão não confirmados no alvo | AU-06, AU-07 | Cruzar csproj / central package / saída de resolução |
| CVE sem ação/fase/critério de encerramento | AU-08 | Preencher §6 encerramento; path em `evidence/` ou lacuna §11 com evidência da falha |
| Auditoria transitivos ausente / sem saída higienizada | AU-10 | Reexecutar `dotnet list package --vulnerable --include-transitive`; guardar evidência |
| N igual só à lista `--vulnerable`; Warning de compat/breaking fora de §12 | AU-02, AU-11 | Recalcular N = união §3/§4; uma linha §12 por identidade |
| ConfigurationManager “0 hits” com using | AU-12 | Grep `System.Configuration` — não remover se using existe |
| “Fechado” com major aberta, licença Verificar ou pin delegado ao Executor | AU-13, OR-06 | Marcar pendente; faixa e licença só após aceite humano |
| §7 sem confiança/limites ou omissão de mudança relevante | CA-03 | [heuristica-blast-radius-grep.md](heuristica-blast-radius-grep.md); agrupar com justificativa |
| Hotspots sem path e sem ausência demonstrada | CA-04 | Paths reais ou declarar ausência com evidência |
| §8b ausente / sem riscos de integração | DI-02 | Preencher §8b ou justificar ausência de integrações |
| Risco sem prioridade / evidência / asserção observável | DI-03 | Coluna `asserção_observável` (ou equivalente) + encaminhamento justificado |
| §12 antes de §10 | ES-02 | Reordenar report |
| `dotnet test` sem exit/contagens/path de saída | ES-03, ES-06 | Reexecutar; path em `evidence/`; lacuna §11 se impossível |
| Item de N ou risco §8b ausente no Estratega/handoff, ou prioridade reduzida sem motivo | ES-04, OR-06 | Linha com o que cobre e o que permanece, ou exclusão justificada |
| Risco encerrado com mock do chamador, evidência vazia ou homologação implícita | ES-07 | Evidência no nível do cliente/provider, ou residual com responsável, fase e aceite |
| Handoff sem mapa risco→decisão→cenário→fase→evidência | OR-06 | Completar §9b rastreabilidade; decisões humanas pendentes explícitas |
| Piso de cobertura FAIL | AN-06 / AU-10 / CA-07 / DI-06 / ES-06 | Completar evidências do [piso](piso-insumo-personas.md); **não** “fazer mais Greps” por cota |

## Anti-padrões

- Persona marcar PASS sem `gate-*.md`
- Gate Auditor PASS só com declaração da persona (sem amostra no repo / `evidence/`)
- Avançar persona seguinte com gate FAIL
- Tratar aviso (W) que compromete decisão obrigatória como não-bloqueante — promover a C
- Exigir quantidade mínima de ferramentas em vez de cobertura do risco

## Enforcement esperado

- **FAIL** → persona corrige → novo gate (**obrigatório**)
- Piloto “auto-OK” sem `gate-*.md` → **inválido** para conclusões de qualidade
