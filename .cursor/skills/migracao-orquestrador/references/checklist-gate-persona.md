# Checklist gate — pré-check persona

> Pré-check **antes** do Gate Auditor. **Não** substitui `gate-<persona>.md` PASS.  
> Juiz final: skill **`migracao-gate-auditor`** + [rubrica-gate-externo.md](rubrica-gate-externo.md).  
> Piso: [piso-insumo-personas.md](piso-insumo-personas.md) · Contrato: [qualidade-decisoes-evidencias.md](qualidade-decisoes-evidencias.md).

## Analista {#analista}

- [ ] `reports/analista.md` existe; seções **§1–§3** presentes
- [ ] §2: paths reais `.sln` / `.csproj`; TFM coincide com csproj (AN-02, AN-03)
- [ ] §3 lista **todos** os projetos da solução (incl. Tests); marcado provisório/hipótese (AN-04, AN-05)
- [ ] Piso A: soluções, projetos, entry points e build/CI com evidência — sem cota de chamadas (AN-06)
- [ ] §6 perguntas reais ou ausência declarada; §8 incertezas se ambíguo
- [ ] Sem segredos em claro (AN-07)

## Auditor {#auditor}

- [ ] `reports/auditor.md` existe; seções **§1–§4**, **§12** presentes (AU-01)
- [ ] §3: **N=** união Critical/Warning de segurança, compatibilidade, suporte e breaking; CVE em §6 não substitui N (AU-02)
- [ ] §12: **N linhas = N** de §3/§4; Warning sem advisory também entra (AU-03, AU-04, AU-11)
- [ ] §4: uso/condição transitiva; pacote e versão efetiva confirmados no alvo (AU-05–AU-07, AU-11)
- [ ] §6: CVE com evidência (path `evidence/` ou trecho higienizado); **ação, fase e critério de encerramento** por vulnerável — ou falha/lacuna em §11 (AU-08, AU-10)
- [ ] §4b: manter/atualizar/substituir; candidata ≠ aprovada ≠ validada; major ou licença indefinida = pendente (AU-13)
- [ ] §3 escopo sobrepõe Analista §3 (AU-09)
- [ ] ConfigurationManager: se no csproj, não marcar “0 hits” se houver `using` (AU-12)
- [ ] Sem 3Rs finais; sem grafo completo (Cartógrafo)

## Cartógrafo {#cartografo}

- [ ] `reports/cartografo.md` existe; seções **§1–§3**, **§7** presentes
- [ ] §4: grafo com evidência `ProjectReference` (CA-02)
- [ ] §7: mudanças relevantes com **Confiança** e limites; agrupamentos justificados — sem mínimo artificial de linhas (CA-03)
- [ ] §5: hotspots com **path** **ou** ausência demonstrada (CA-04)
- [ ] §3 alinhado Analista in scope (CA-05)
- [ ] Se `new HttpClient` no repo → mencionado §5/§7 (CA-06)
- [ ] Piso C: referências e caminhos afetados examinados com evidência (CA-07)

## Diplomata {#diplomata}

- [ ] `reports/diplomata.md` existe; seções **§1–§3** presentes
- [ ] [checklist-config-higienizada.md](checklist-config-higienizada.md) cumprida (DI-04)
- [ ] §8b cobre riscos das integrações em escopo **ou** ausência justificada (DI-02)
- [ ] Cada linha §8b: prioridade, evidência e **asserção observável** (ou encaminhamento justificado) (DI-03)
- [ ] Piso D: código + estrutura de config cruzados — sem cota de buscas (DI-06)
- [ ] Sem re-inventário NuGet completo (DI-05)

## Estratega {#estratega}

- [ ] `reports/estratega-testes.md` existe; seções **§1–§2**, **§8**, **§10**, **§11**, **§12** presentes
- [ ] **Ordem:** `## 10.` antes de `## 12.` (ES-02)
- [ ] §2: `exit_code` + contagens + **path da saída** (`evidence/` ou equivalente); falha/ausência = lacuna §11, sem presumir sucesso (ES-03, ES-06)
- [ ] §6/§6b: cada item de N e cada risco relevante do Diplomata, com o que cobre e o que permanece; exclusão justificada (ES-04)
- [ ] Mock do chamador não encerra cliente/provider; residual com responsável, fase e aceite (ES-07)
- [ ] §8 DoD preenchido (ES-05)

## Orquestrador (passo 6) {#orquestrador}

Ordem obrigatória — [checklist-gate-negocio-orquestrador.md](checklist-gate-negocio-orquestrador.md) em **duas etapas** (OR-02):

1. `gate-analista` … `gate-estratega` = **PASS** (OR-01)
2. **Etapa 1** do checklist de negócio (insumos das personas) — **antes** de escrever Canvas/handoff/complementos
3. Produzir complementos (§8 Telemetria com `gate_externo = pendente`), Canvas MD e handoff; Canvas visual **opcional** quando solicitado (OR-03)
4. **Etapa 2** do checklist: handoff §9b (OR-06), parecer + 3Rs (OR-05), telemetria OR-04 — **depois** dos artefatos, **antes** do gate
5. Gate Auditor → `gate-orquestrador.md` **PASS**; atualizar telemetria; só então gate humano

## Verificações de qualidade

Aplicar [qualidade das decisões e evidências](qualidade-decisoes-evidencias.md). IDs e severidades são os da rubrica, não contagens de ferramentas. Aviso (W) que comprometer decisão obrigatória → tratar como C.
