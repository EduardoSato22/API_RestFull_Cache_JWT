# Deploy na Vercel - Guia Completo

## 📋 Pré-requisitos

1. **Conta na Vercel**: [vercel.com](https://vercel.com)
2. **Projeto no Supabase**: [supabase.com](https://supabase.com)
3. **GitHub/GitLab/Bitbucket**: Para conectar o repositório

## 🚀 Passo a Passo

### 1. Preparar o Projeto

O projeto já está configurado para funcionar com Supabase e Vercel. As principais configurações:

- ✅ `vercel.json` configurado
- ✅ `package.json` com scripts otimizados
- ✅ CORS configurado no `app.js`
- ✅ Serviço Supabase implementado

### 2. Configurar Variáveis de Ambiente na Vercel

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

```bash
# Supabase Configuration
SUPABASE_URL=https://jnshddcfwtydlttkenoy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc2hkZGNmd3R5ZGx0dGtlbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NDE5MDQsImV4cCI6MjA3NTUxNzkwNH0.GWVtu7v1sTDKZKZiD1Xst3RBaygM8XpxfOcN2MGzLYQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc2hkZGNmd3R5ZGx0dGtlbm95Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTk0MTkwNCwiZXhwIjoyMDc1NTE3OTA0fQ.6rhZ926tUCpzRxQ0JDgTwl36ljSSuZ_A7HtETMT8pFo

# Authentication
JWT_SECRET=vXurZfjoCWPN4JZf/PTPXXOp8yU54c7cHIZ0vHvQJZ5EGx1A5tZYxWADALY71QJeiCKsbzmjEqu/GvJIZvO9FQ==

# Server Configuration
NODE_ENV=production
DATABASE_TYPE=supabase
```

### 3. Deploy via Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### 4. Deploy via GitHub (Alternativo)

1. **Conectar Repositório**:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu repositório GitHub

2. **Configurar Build**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `.` (raiz)
   - Install Command: `npm install`

3. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o processo completar

## 🔧 Configurações Importantes

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/app.js"
    },
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "DATABASE_TYPE": "supabase"
  },
  "functions": {
    "app.js": {
      "maxDuration": 30
    }
  }
}
```

### package.json
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "echo 'Build completed'",
    "vercel-build": "echo 'Vercel build completed'",
    "test-supabase": "node test-supabase.js"
  }
}
```

## 🧪 Testando Localmente

```bash
# Instalar dependências
npm install

# Testar conexão com Supabase
npm run test-supabase

# Executar localmente
npm start

# Acessar: http://localhost:3000
```

## 📊 Endpoints da API

Após o deploy, sua API estará disponível em:

- **Base URL**: `https://seu-projeto.vercel.app`
- **Status**: `GET /api/status`
- **Usuários**: `GET/POST/PUT/DELETE /api/users`
- **Produtos**: `GET/POST/PUT/DELETE /api/products`
- **Clientes**: `GET/POST/PUT/DELETE /api/clients`
- **Cache**: `GET/POST/DELETE /api/cache`

## 🔍 Troubleshooting

### Erro de Conexão com Supabase
- Verifique se as variáveis de ambiente estão configuradas
- Confirme se o projeto Supabase está ativo
- Teste localmente com `npm run test-supabase`

### Erro de Build na Vercel
- Verifique se todas as dependências estão no `package.json`
- Confirme se o `vercel.json` está correto
- Verifique os logs de build na Vercel

### CORS Issues
- O CORS já está configurado no `app.js`
- Se necessário, ajuste as origens permitidas

## 📝 Logs e Monitoramento

- **Vercel Dashboard**: Monitore deployments e logs
- **Supabase Dashboard**: Monitore queries e performance
- **Function Logs**: Acesse via Vercel CLI: `vercel logs`

## 🎯 Próximos Passos

1. ✅ Deploy na Vercel
2. ✅ Configurar domínio customizado (opcional)
3. ✅ Configurar CI/CD automático
4. ✅ Monitorar performance e logs
5. ✅ Configurar backup do Supabase

## 📞 Suporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Projeto Testado**: ✅ Funcionando com Supabase + Vercel


