# Relatório Auditor — {{project_id}}

> Write integral via Grep/Read no repo + `dotnet list package --vulnerable`. Objetivos: [objetivos-negocio-personas.md](../../migracao-orquestrador/references/objetivos-negocio-personas.md#auditor).

> `.migration-context/reports/auditor.md` no repositório **alvo**  
> **Pré-requisito:** `reports/analista.md` (§2 topologia, §3 escopo provisório).

## 1. Identidade

| Campo | Valor |
|-------|--------|
| `project_id` | |
| Raiz absoluta | |
| `target_framework` | |
| Gerado em (UTC) | |

## 2. Resumo executivo

- Total de pacotes distintos:
- Critical / Warning / Info:
- `dotnet list package --vulnerable`: (OK / falhou / sem vulnerabilidades reportadas)

## 3. Escopo (cruzamento com Analista)

Cruzar §3 Analista com pacotes Critical/Warning — projetos **in scope** vs fora (RETAIN).

### Pacotes Critical/Warning × projetos

> **Contagem (obrigatória):** Critical/Warning in scope: **N=** *(união de segurança, compatibilidade, suporte e breaking — diretos e transitivos)* — deve igualar linhas §12. A contagem de vulnerabilidades fica em §6 e **não** substitui N. N=0 permitido com evidência.

| Pacote | Versão | Projeto(s) in scope | Risco |
|--------|--------|---------------------|-------|
| *(ex.: Refit)* | *(ex.: 5.2.4)* | *(ex.: MinhaApi)* | *(ex.: Critical — CVE)* |

Fora de escopo (RETAIN): listar só se risco Critical e projeto explicitamente out of scope.

## 4. Inventário — prioridade alta

| Pacote | Versão atual | `target_version` | Porquê (rationale) | Hint 3R | Risco | Uso detectado / resolução transitiva |
|--------|--------------|------------------|--------------------|---------|-------|---------------|
| *(ex.: Refit)* | *(5.2.4)* | *(7.x)* | *(CVE + net8)* | Revise | Critical | `Services/ApiClient.cs:28` |

> **Hint 3R** ≠ decisão final — Orquestrador consolida no Canvas.

## 4b. Avaliação de migração (pacotes bloqueantes / Critical)

Para cada pacote **in scope** com `tfm_destino: incompativel` ou risco Critical:

| Pacote | Versão alvo | Como é usado | Breaking / descontinuado | Paridade de comportamento | Como validar |
|--------|-------------|--------------|--------------------------|---------------------------|--------------|
| | versão alvo | Grep `using`/tipos no repo | breaking Grep + docs | risco paridade | teste/cenário → Estratega |

Perguntas que esta seção deve responder (migração, não inventário):

1. **Para onde ir e porquê?** → `target_version` + `target_version_rationale`
2. **Como é usado?** → Grep no repo (path:linha) + hotspots Cartógrafo quando existirem
3. **O que quebra no nosso repo?** → padrões deprecados + arquivos afetados
4. **Perdemos funcionalidade?** → breaking summary + risco paridade
5. **Como garantir o mesmo comportamento?** → hint de verificação (Estratega; Guardião mede)

### Decisão por pacote relevante

Comparar alternativas sem pressupor upgrade. Ver [qualidade das decisões](../../migracao-orquestrador/references/qualidade-decisoes-evidencias.md).

| Pacote / direto ou transitivo | Manter / atualizar / substituir | Candidata (fonte) / aprovada (faixa) / validação | Compatibilidade / segurança / suporte | Breaking no uso real / paridade | Esforço código + testes (L/M/H) | Licença/custo para o uso e alternativa gratuita | Estado: pendente ou critério de patch |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## 5. Compatibilidade com TFM destino

Para pacotes **in scope** que bloqueiam o TFM destino:

| Pacote | Funciona no destino? | Evidência | Ação |
|--------|----------------------|-----------|------|
| | Sim / Não / Desconhecido | | |

> Usar `dotnet list package`, documentação NuGet ou notas do script; não afirmar sem fonte.

## 6. Vulnerabilidades (CVE / advisory)

| Pacote | Versão | Severidade | Referência (URL ou dotnet) |
|--------|--------|------------|---------------------------|
| | | | |

Se `dotnet list package --vulnerable` **não** correu ou falhou:

1. **Não** inventar CVE na §6.
2. Documentar limitação em **§6** e repetir em **§11 Incertezas**.
3. Pacotes Critical/Warning → marcar **Verificar** manualmente.

### Encerramento de vulnerabilidades

| Pacote / versão / origem direta ou transitiva | Ação ou mitigação proposta | Responsável / fase | Evidência de reauditoria exigida | Residual / decisão humana |
|---|---|---|---|---|
| | | | | |

## 7. Licenciamento

Regra de migração: na versão alvo, o pacote continua **gratuito** para o nosso uso? Se a última versão é paga, qual a **última versão free** ainda compatível com o TFM destino?

| Pacote | Licença (`license_spdx`) | Continua free no destino? | Última free compatível | Decisão |
|--------|--------------------------|---------------------------|------------------------|---------|
| | nuget.org / release notes | sim/não/Verificar | última free compatível | Manter / Upgrade / Substituir / Escalar humano |

> Fontes: nuget.org, release notes. Pacotes desconhecidos → **Verificar** ou §11.

## 8. Descontinuado / EOL / breaking changes

| Pacote | Situação | Versão recomendada | Breaking no repo (`breaking_in_repo[]`) |
|--------|----------|-------------------|-------------------------------------------|
| | Ativo / Deprecated / EOL | | padrão → arquivos afetados |

## 9. Recomendações

1. 
2. 

## 10. Perguntas abertas (para personas downstream)

| # | Pergunta | Persona sugerida |
|---|----------|------------------|
| 1 | | Cartógrafo / Diplomata / Estratega |
| 2 | | |

> Delegar acoplamento, integrações ou testes — **não** duplicar inventário NuGet aqui.

## 11. Incertezas

- 

## 12. Evidências

> Sequência exaustiva: [guia-grep-exaustivo-auditor.md](../../migracao-orquestrador/references/guia-grep-exaustivo-auditor.md) — **N linhas = N** do universo Critical/Warning (§3/§4), não só da lista de vulnerabilidades.

| Pacote (Critical/Warning in scope) | Grep / resolução executada | Hits / origem transitiva | Playbook lido |
|------------------------------------|----------------|---------------|---------------|
| *(ex.: Refit)* | `AddRefitClient\|\[(Get\|Post)` | `ApiClientExtensions.cs:28` | refit.md |

| Fonte | Path / comando |
|-------|----------------|
| Sessão / base / SDK / comandos / saídas higienizadas | `.migration-context/evidence/<sessao>/` — ver contrato de qualidade |
| Catálogo | [mapeamento-pacote-playbook.md](../../migracao-orquestrador/references/mapeamento-pacote-playbook.md) |
| Padrões | [grep-patterns-migracao.md](../../migracao-orquestrador/references/grep-patterns-migracao.md) |
| Escopo predecessor | `reports/analista.md` §2–§3 — [guia-leitura-predecessor.md](../../migracao-orquestrador/references/guia-leitura-predecessor.md#auditor-passo-2) |
| Inventário pacotes | Grep `*.csproj` |
| CVE | `dotnet list package --vulnerable` (ou lacuna documentada) |
