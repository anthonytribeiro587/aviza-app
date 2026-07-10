# Aviza

Painel para organizar grupos, contatos e lembretes automáticos enviados pelo WhatsApp. O produto foi pensado para igrejas, equipes, comunidades, escolas, associações e pequenos negócios.

## Stack

- Next.js 16 com App Router e TypeScript
- CSS responsivo sem biblioteca visual
- Supabase para autenticação e banco de dados
- Vercel para hospedagem e rotinas agendadas
- Evolution API para o WhatsApp, a ser conectada na etapa final

## O que já existe

- Dashboard compacto e responsivo
- Gestão visual de grupos e contatos
- Lista de automações
- Construtor interativo de lembretes com prévia da mensagem
- Histórico de envios
- Configurações e estado da integração
- Schema inicial multiempresa com RLS no Supabase

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Configurar o Supabase

1. Crie um projeto no Supabase.
2. Execute `supabase/migrations/20260710190000_initial_schema.sql` no SQL Editor.
3. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no Vercel.
4. Antes de liberar cadastros, adicione a rotina de onboarding que cria a organização e o perfil do primeiro usuário.

## Próximas etapas

1. Autenticação e onboarding real.
2. CRUD conectado ao Supabase.
3. Importação de contatos por CSV.
4. Agendador seguro via Vercel Cron.
5. Conexão com a instância Evolution API.
6. Webhooks de entrega, falha e leitura.

Nunca exponha `SUPABASE_SERVICE_ROLE_KEY`, `EVOLUTION_API_KEY` ou `CRON_SECRET` no navegador.
