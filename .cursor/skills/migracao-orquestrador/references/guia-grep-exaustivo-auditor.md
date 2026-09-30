# Guia Grep exaustivo — Auditor (substituto package-usage-sites)

> Para **cada** pacote Critical/Warning **in scope**: sequência abaixo **antes** de Write §4/§12.  
> Cruzar com [mapeamento-pacote-playbook.md](mapeamento-pacote-playbook.md) e [grep-patterns-migracao.md](grep-patterns-migracao.md).

## Sequência por pacote (obrigatória)

| # | Grep | Se 0 hits |
|---|------|-----------|
| 1 | Linha no mapeamento (pacote → padrões) | Passo 2 |
| 2 | `using <NamespacePrincipal>;` (NuGet / docs) | Passo 3 |
| 3 | Nome do tipo API (ex. `DbContext`, `ProducerBuilder`, `AddRefitClient`) | Passo 4 |
| 4 | Nome do pacote sem versão em `*.cs` | §11 Incerteza — **não** deixar §4 vazio silencioso |
| 5 | (Opcional) Read playbook `specializations/` se mapeado | Breaking §4b |

## Completude §12

- **N linhas audit trail = N** do universo Critical/Warning (segurança, compatibilidade, suporte, breaking). A saída `--vulnerable` não define N.
- Colunas: pacote | grep ou resolução transitiva | hits/path ou ausência de uso direto justificada | playbook | confiança sustentada na fonte.

## Pacotes transitivos / metapackage

- Incluir diretos e transitivos Critical/Warning em N, §4 e §12. Para transitivo sem uso direto, evidenciar resolução e cadeia/origem quando conhecida; não exigir grep fictício. Ver [contrato de qualidade](qualidade-decisoes-evidencias.md).

## Monorepo grande

- Restringir Grep a pastas **in scope** (Analista §2 + §3).
- Se >50 hits: listar **top 10** + “+N arquivos” — não omitir uso.

## Anti-padrões

- Só versão no §4 sem uso/resolução evidenciada → **fail** Validation; transitivos não exigem uso direto fictício.
- “Provavelmente usado em DI” sem path → §11 ou grep `Add*` no Startup.
