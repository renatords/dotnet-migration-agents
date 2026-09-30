# Checklist — config higienizada (substituto sanitize-secrets TS)

> **Diplomata:** integrações em config **sem vazar segredos** no report ou chat.

## Permitido no report

- **Nome da chave** (path JSON): `ConnectionStrings:Default`, `Kafka:BootstrapServers`
- Tipo de secret: `(connection string)`, `(API key)`, `(password)` — **sem valor**
- Ambiente: `Development`, `Production` — se relevante

## Proibido

- Valores após `:` em connection strings
- Tokens, API keys, passwords, certificados PEM
- `Read`/`Glob` **integral** de `appsettings*.json`, `secrets.json`, `*.pfx`
- Colar output de `dotnet user-secrets`

## Grep seguro (Shell)

```bash
# Listar chaves — NÃO copiar linhas completas para o chat se contiverem valores
rg '"ConnectionStrings"' --glob "appsettings*.json" -l
rg 'BootstrapServers|Redis|Password|Secret|ApiKey' --glob "appsettings*.json" -n
```

**No report:** transcrever só **identificador** + projeto/hosting onde a chave é lida (Startup, Program, extension).

## Validation Diplomata (gate)

- [ ] §5 connection strings = `(higienizada)` ou nome da chave — **nunca** valor
- [ ] §4/§5 sem padrões `@`, `Password=`, `AccountKey=`, JWT longos
- [ ] §11 documenta se config não foi inspecionada (arquivo ignorado por risco)

## Se valor aparecer acidentalmente

1. **Não** repetir no chat.
2. Redigir report: manter só chave.
3. Nota em §11 Incertezas — sem reproduzir o secret.
