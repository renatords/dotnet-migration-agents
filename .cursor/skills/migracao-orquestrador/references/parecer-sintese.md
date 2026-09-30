# Parecer de síntese — Orquestrador (passo 6)

Após os cinco reports (`analista` … `estratega-testes`), produzir **parecer técnico e 3Rs finais** no Canvas e handoff; um resumo genérico não basta.

## Entradas obrigatórias

1. Ler **na ordem** os **reports** — seções principais:

| Report | Seções (Orquestrador) |
|--------|------------------------|
| `analista.md` | §2 Topologia, §3 Escopo, §5 Restrições e premissas, §6 «Perguntas abertas», §8 Incertezas |
| `auditor.md` | §2 Resumo, §3 Escopo, §4 Inventário, §4b Avaliação, §8 Descontinuado/EOL, §9 Recomendações, §11 Incertezas |
| `cartografo.md` | §2 Resumo, §3 Escopo, §5 Hotspots, §6–§7 Impacto, §10 Incertezas |
| `diplomata.md` | §2 Resumo, §3 Escopo, §4–§8 Integrações/riscos, §11 Incertezas |
| `estratega-testes.md` | §2 Resumo (`dotnet test`), §4–§5, §5b matriz contentores, §6 Faseamento, §7 residual, §8 DoD, §10 Incertezas, §11 Evidências, §12 Roadmap PrepararAmbiente→ValidarHomolog |

> **Nota numeração:** «Perguntas abertas» (§10 Auditor, §9 Cartógrafo, §10 Diplomata) são delegação **downstream** — o Orquestrador **pode** skim §6 Analista «Perguntas abertas»; **Incertezas** antecedem Evidências; no Estratega, o Roadmap (§12) vem após ambas.
2. Decidir a partir dos **reports MD** — §3 Escopo, «Perguntas abertas», Incertezas.
3. **Baseline `dotnet test`:** usar **só** `estratega-testes.md` §2 (exit code, contagens). Excepção: `@codebase` ou grep pontual quando Incerteza **bloqueie** decisão 3R.
4. **Complementar com evidência pontual** (`@codebase`, grep, arquivos citados) quando:
   - um report marcar Incerteza que bloqueie decisão 3R;
   - houver divergência entre personas;
   - o parecer de viabilidade depender de um padrão não descrito nos MDs.
5. **Registrar** cada complemento no relatório macro [report-template-orquestrador-complementos.md](report-template-orquestrador-complementos.md) — mesmo que a lista seja curta.

**Proibido:** inventar pacotes, CVE, integrações ou projetos não listados nos reports ou no repo.  
**Proibido:** re-varrer o repo inteiro — só o mínimo para fechar parecer/3Rs; o resto vira sugestão em §4 do relatório de complementos.

## O que produzir (além do resumo)

| Bloco | Conteúdo |
|-------|----------|
| **Viabilidade** | A migração para o TFM destino é **viável**, **viável com ressalvas** ou **não recomendada** sem mitigação — com motivo explícito |
| **Principais desafios** | 3–7 itens com evidência (report + path ou seção citada) |
| **Cuidados** | O que não fazer, ordem sensível, dependências externas, testes bloqueantes |
| **3Rs finais** | Tabela módulo → Rehost / Revise / Retain + esforço L/M/H + justificativa **cruzando** os cinco reports |
| **Ondas** | Sequência executável alinhada a 3Rs + blast radius (Cartógrafo) + breaking (Auditor) |

## Rubrica 3Rs (decisão final)

Para cada projeto **in scope** (consolidar escopo a partir de `analista.md` §3 + respostas nas «Perguntas abertas»):

| 3R | Quando usar (sinais) |
|----|----------------------|
| **Rehost** | TFM/pacotes atualizáveis; baixo acoplamento; sem breaking crítico; testes cobrem |
| **Revise** | Breaking de pacotes/API; hotspots ou fan-in alto; integrações a revalidar; gaps de teste médios |
| **Retain** | Fora de escopo acordado; custo >> benefício; legado intocável sem mitigação; hub que não entra na 1ª onda |

**Esforço L/M/H:** qualitativo — combinar TFM gap, pacotes (Auditor), grafo (Cartógrafo), testes (Estratega).

Citar em cada linha: pelo menos uma evidência (`auditor.md` §…, `cartografo.md` §…, etc.).

## Sinais por persona (checklist mental)

| Persona | Usar no parecer para… |
|---------|------------------------|
| Analista | Topologia, escopo §3, perfil legado, «Perguntas abertas» |
| Auditor | Pacotes bloqueantes, CVE, breaking, licenciamento |
| Cartógrafo | Ordem de ataque, hubs, blast radius, hints pacote→projeto |
| Diplomata | Risco de integração, persistência, contratos externos |
| Estratega | DoD testes, gaps, faseamento §6, matriz §5b (`container_auto`/`alt_auto`/`manual_homolog`), insumos §9b |

## Onde gravar

- **Complementos** (`reports/orquestrador-complementos.md`): delta obtido no codebase + sugestões para personas — [report-template-orquestrador-complementos.md](report-template-orquestrador-complementos.md)
- **Canvas** (`canvas-migration.md`): seções Parecer + 3Rs + riscos + ondas — [report-template-canvas.md](report-template-canvas.md)
- **Canvas visual IDE (opcional, quando solicitado)** (`canvases/<project-id>-migration-canvas.canvas.tsx`): espelho para revisão humana — [canvas-visual-proposta.md](canvas-visual-proposta.md)
- **Handoff** (`handoff-execucao.md`): plano 3Rs operacional + **§9 Passos** + **§9b Plano faseado PrepararAmbiente→ValidarHomolog** (copiar/adaptar de `estratega-testes.md` §5b, §6, §8); §11 **Melhorias de persona** — [report-template-handoff.md](report-template-handoff.md)

### §9b — como consolidar

1. Ler `estratega-testes.md` §5b (infra), §6 (faseamento por cenário), §8 (DoD).
2. Preencher tabela PrepararAmbiente→ValidarHomolog do template handoff com **ações concretas** (paths de teste, Shell `dotnet test` Guardião).
3. Copiar decisões `container_auto` / `alt_auto` / `manual_homolog` — inventário **fechado** para o Executor.
4. Alinhar **MigrarVersao** com ondas do Canvas §6; **GuardiãoOrigem obrigatório** antes de mudar TFM se DoD §8 exige baseline (suite default sem flag de contentor).
5. Copiar matriz “Detalhe por cenário” e “Infra de teste” do Estratega — não deixar vazio salvo lacuna explícita em §10.

## Gate

Após produzir os artefatos e cumprir a etapa 2 do checklist de negócio, solicitar Gate Auditor `orquestrador`. Em FAIL, corrigir e repetir. Aprovação humana somente após PASS; atualizar §8 Telemetria conforme o template de complementos.

- [ ] [checklist-gate-negocio-orquestrador.md](checklist-gate-negocio-orquestrador.md) — itens críticos das duas etapas OK (falha de insumo → persona responsável e revalidação; falha da síntese → Orquestrador corrige os artefatos)
- [ ] `reports/orquestrador-complementos.md` existe (mesmo que “nenhum complemento”)
- [ ] Parecer de viabilidade é conclusão explícita (não neutro)
- [ ] Cada 3R final tem justificativa com evidência de ≥2 dimensões (ex. pacotes + grafo)
- [ ] Lacunas restantes listadas no handoff (lista fechada)
- [ ] **§9b** preenchido ou lacuna documentada em §10 com plano mínimo indicado
- [ ] §11 do handoff reflete sugestões do relatório de complementos (ou “nenhuma”)
- [ ] Sem contradizer reports sem explicar divergência
- [ ] Decisão baseada nos cinco reports MD (sem facts JSON)
- [ ] `gate-orquestrador.md` PASS sobre a síntese atual; §8 Telemetria atualizada

## Coerência das decisões

Aplicar [qualidade das decisões e evidências](qualidade-decisoes-evidencias.md): a síntese mantém os tradeoffs de esforço, breaking e licença do Auditor, sem converter candidato em upgrade obrigatório nem em decisão fechada. Cada item de N e cada risco relevante de integração chega ao handoff, ou sai com justificativa. Consolidar perfil quantitativo existente no Canvas; decisões humanas pendentes não autorizam execução.
