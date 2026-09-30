# Rubrica — gate externo

> Usada pela skill **`migracao-gate-auditor`** — juiz **independente** da persona.  
> Cada critério: **PASS** só com evidência verificável (Read/Grep repo ou report).

## Como aplicar

1. Ler `reports/<persona>.md` (para `estratega`, `estratega-testes.md`) + [piso-insumo-personas.md](piso-insumo-personas.md). Para `orquestrador`, ler os cinco reports, seus gates e os artefatos atuais da síntese.
2. **Verificar no repo** amostras — não confiar só no texto do report.
3. Emitir `reports/gate-<persona>.md` — ver template skill Gate Auditor.
4. **Qualquer FAIL crítico** → veredito **FAIL** global.

Legenda: **C** = crítico (bloqueia); **W** = aviso (registrar impacto e ação, sem reprovar por quantidade). Se um aviso comprometer uma decisão obrigatória, classificá-lo como C e explicar o impacto. Não rebaixar falhas críticas para obter PASS.

N/A exige condição não aplicável e evidência; não equivale a PASS. PASS global exige todos os C aplicáveis satisfeitos. Uma lacuna só satisfaz um critério quando ele admite explicitamente essa alternativa; nunca comprova compatibilidade, teste ou licença. Seguir [qualidade das decisões e evidências](qualidade-decisoes-evidencias.md).

---

## Analista

| ID | Critério | Sev |
|----|----------|-----|
| AN-01 | Arquivo existe; §1–§3 presentes | C |
| AN-02 | §2: cada `.csproj` in scope existe no disco (Glob) | C |
| AN-03 | §2 TFM coincide com csproj (Read) | C |
| AN-04 | §3 lista **todos** os projetos da `.sln` (não omitir Tests) | C |
| AN-05 | §3 marcado provisório/hipótese | W |
| AN-06 | Piso A: soluções, projetos, entry points e build/CI cobertos por evidências, sem cota de chamadas | C |
| AN-07 | Sem secrets em claro | C |

---

## Auditor

| ID | Critério | Sev |
|----|----------|-----|
| AU-01 | §1–§4, §12 presentes | C |
| AU-02 | §3 N = união de todos os Critical/Warning (segurança, compatibilidade, suporte, breaking), diretos e transitivos, com categorias; contagem de vulnerabilidades em §6 não substitui N | C |
| AU-03 | §12 linhas tabela = **N** (contagem) | C |
| AU-04 | Cada linha §12: uso com path/padrão, ou origem/resolução transitiva e ausência de uso direto justificada | C |
| AU-05 | §4 uso detectado ou condição transitiva justificada para cada Critical/Warning | C |
| AU-06 | Pacote §4 confirmado em declaração direta/central ou resolução transitiva | C |
| AU-07 | Versão efetiva §4 confirmada na declaração/resolução do alvo | C |
| AU-08 | §6 vulnerabilidade com evidência preservada, ação/fase e critério de encerramento; falha da auditoria explicitada em §11 | C |
| AU-09 | Escopo §3 sobrepõe Analista §3 | C |
| AU-10 | Auditoria incluindo transitivos executada, com saída higienizada; impossibilidade/falha documentada com evidência e lacuna | C |
| AU-11 | Todo pacote Critical/Warning de §3 ou §4 está em §12; omissão reprova. N não se reduz à saída `--vulnerable` | C |
| AU-12 | ConfigurationManager: se no csproj, grep `System.Configuration` — não marcar “0 hits” se houver using | C |
| AU-13 | Decisão distingue versão candidata, decisão aprovada e validação ainda não executada. Major ou licença indefinida fica pendente; não delegar pin de major ao Executor | C |

---

## Cartógrafo

| ID | Critério | Sev |
|----|----------|-----|
| CA-01 | §1–§3, §7 presentes | C |
| CA-02 | §4 ProjectReference com evidência csproj | C |
| CA-03 | §7 cobre mudanças relevantes com confiança e limites; agrupamentos justificados, sem mínimo artificial de linhas | C |
| CA-04 | §5 hotspots reais dos caminhos afetados com paths, ou ausência demonstrada | C |
| CA-05 | §3 alinhado Analista in scope | C |
| CA-06 | Se grep `new HttpClient` >0 no repo → mencionado §5/§7 | W |
| CA-07 | Piso C: referências e caminhos afetados examinados com evidência | C |

---

## Diplomata

| ID | Critério | Sev |
|----|----------|-----|
| DI-01 | §1–§3 presentes | C |
| DI-02 | §8b cobre riscos das integrações em escopo; ausência de integrações justificada | C |
| DI-03 | Cada risco relevante de integração tem prioridade, evidência e verificação observável, ou encaminhamento justificado | C |
| DI-04 | Config higienizada (sem valores secretos) | C |
| DI-05 | Sem re-inventário NuGet completo (Auditor) | W |
| DI-06 | Piso D: código e estrutura de config cruzados para as integrações, sem cota de buscas | C |

---

## Estratega

| ID | Critério | Sev |
|----|----------|-----|
| ES-01 | §1–§2, §8, §10, §11, §12 presentes | C |
| ES-02 | §10 **antes** de §12 | C |
| ES-03 | §2 exit_code, contagens e path da saída de testes; falha/ausência de testes registrada como lacuna, sem presumir sucesso | C |
| ES-04 | §6/§6b cobre cada item de N e cada risco relevante do Diplomata, dizendo o que cobre e o que permanece; agrupamento, adiamento ou retirada com justificativa; redução de prioridade sem fundamento reprova | C |
| ES-05 | §8 DoD preenchido | C |
| ES-06 | Piso E: testes do escopo executados com saída; impossibilidade registrada e plano para resolução antes do upgrade | C |
| ES-07 | Mock valida o chamador e não encerra risco de cliente/provider. Residual tem responsável, fase e aceite. Evidência vazia, mock insuficiente ou homologação só implícita reprova | C |

---

## Orquestrador (síntese)

| ID | Critério | Sev |
|----|----------|-----|
| OR-01 | Cinco reports + gates analista/auditor/cartografo/diplomata/estratega PASS (não exige PASS prévio do próprio gate da síntese) | C |
| OR-02 | [checklist-gate-negocio-orquestrador.md](checklist-gate-negocio-orquestrador.md) itens críticos das **etapas 1 e 2** (insumos + artefatos da síntese) | C |
| OR-03 | complementos + canvas + handoff existem | C |
| OR-04 | §8 telemetria: gate_externo, gate_failures, Read/Grep | W |
| OR-05 | Parecer explícito; 3Rs com evidência cruzada | C |
| OR-06 | Cada item de N e cada risco relevante de integração chega ao handoff (ou sai com justificativa). Estado fechado só com faixa/licença decididas e evidência ou residual com responsável; escolha material ainda no Executor reprova | C |

---

## Mapeamento critérios strict-business → rubrica

| validate TS (`BUSINESS:`) | Rubrica |
|---------------------------|---------|
| missing section | *-01 |
| N §12 mismatch | AU-03 |
| empty uso detectado | AU-05 |
| csproj cross-check | AU-06, AU-07 |
| §3 scope overlap | AU-09, CA-05 |
| dotnet test §2 | ES-03, ES-06 |
| §7 confiança | CA-03 |
| §8b Critical / asserção observável | DI-02, DI-03 |
| §10 before §12 | ES-02 |

Falhas → [guia-troubleshooting-gate.md](guia-troubleshooting-gate.md).
