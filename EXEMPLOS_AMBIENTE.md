# Exemplos de Configuração por Ambiente

## 🏠 Ambiente Local (Padrão - Independente)

### Arquivo: `.env.local`

```bash
NODE_ENV=development
VITE_ALLOWED_PARENT_ORIGINS=http://localhost:3000,http://localhost:5173
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=false
```

### Comando
```bash
npm run dev
```

**Resultado:**
- Projeto roda em `http://localhost:5173`
- Sem dependências externas
- Recursos servidos localmente
- Perfeito para desenvolvimento

---

## 🚀 Build de Produção (Independente)

### Arquivo: `.env.production`

```bash
NODE_ENV=production
VITE_ALLOWED_PARENT_ORIGINS=https://seu-dominio.com
VITE_CDN_BASE_URL=https://seu-dominio.com
VITE_ENABLE_HORIZONS_HANDLERS=false
VITE_DISABLE_INLINE_EDITING=true
```

### Comando
```bash
npm run build
npm run preview
```

**Resultado:**
- Build otimizado
- Sem recursos de desenvolvimento (inline editing, visual editor)
- Pronto para deployment
- Completamente independente

---

## 🏢 Integração com Hostinger

### Arquivo: `.env.hostinger`

```bash
NODE_ENV=production
VITE_ALLOWED_PARENT_ORIGINS=https://horizons.hostinger.com,https://horizons.hostinger.dev,https://horizons-frontend-local.hostinger.dev,http://localhost:5173
VITE_CDN_BASE_URL=https://horizons-cdn.hostinger.com
VITE_ENABLE_HORIZONS_HANDLERS=true
TEMPLATE_BANNER_SCRIPT_URL=https://horizons.hostinger.com/banner.js
TEMPLATE_REDIRECT_URL=https://horizons.hostinger.com/redirect
```

### Comando
```bash
NODE_ENV=production npm run build
```

**Resultado:**
- Integrado com sistema de erro Horizons
- Usa CDN da Hostinger
- Handlers de iframe habilitados
- Suporta banner e redirect da Hostinger

---

## 🐙 GitHub Pages / Deployment

### Arquivo: `.env.github`

```bash
NODE_ENV=production
VITE_ALLOWED_PARENT_ORIGINS=https://seu-username.github.io
VITE_CDN_BASE_URL=https://seu-username.github.io/PORTAL-FINANCEIRO
VITE_ENABLE_HORIZONS_HANDLERS=false
```

### Comando
```bash
npm run build
# Deploy a dist/ para GitHub Pages
```

**Resultado:**
- Funciona em GitHub Pages
- Assets servidos corretamente com base
- Sem dependências de terceiros
- Público e acessível

---

## 🔄 Integração com Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build com variáveis de ambiente
ARG VITE_ALLOWED_PARENT_ORIGINS=http://localhost:5173
ARG VITE_CDN_BASE_URL=http://localhost:5173
ARG VITE_ENABLE_HORIZONS_HANDLERS=false

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

### Build
```bash
docker build \
  --build-arg VITE_CDN_BASE_URL=https://seu-dominio.com \
  --build-arg VITE_ENABLED_HANDLERS=false \
  -t portal-financeiro .
```

---

## 📋 Checklist de Migração

Ao migrar para um novo ambiente:

- [ ] Copiar `.env.example` para `.env`
- [ ] Atualizar `VITE_ALLOWED_PARENT_ORIGINS` com suas origens
- [ ] Atualizar `VITE_CDN_BASE_URL` com seu CDN/domínio
- [ ] Definir `VITE_ENABLE_HORIZONS_HANDLERS` conforme necessário
- [ ] Testar em desenvolvimento: `npm run dev`
- [ ] Fazer build: `npm run build`
- [ ] Testar preview: `npm run preview`
- [ ] Deploy!

---

## 🔍 Verificação

Para verificar que o projeto está configurado corretamente:

1. Abra DevTools (F12)
2. Console → digite: `window.__CONFIG_ALLOWED_ORIGINS__`
3. Deve mostrar: `["http://localhost:5173"]` (ou suas origens configuradas)

Se mostrar `undefined`, verifique se o `.env` está carregado corretamente.

---

## 🐛 Troubleshooting

**Problema:** URLs de CDN retornam 404
- **Solução:** Verifique se `VITE_CDN_BASE_URL` está correto

**Problema:** Projeto não carrega quando em iframe
- **Solução:** Adicione origem do pai em `VITE_ALLOWED_PARENT_ORIGINS`

**Problema:** Inline editing não funciona
- **Solução:** Verifique se `VITE_DISABLE_INLINE_EDITING=false` em desenvolvimento

**Problema:** Erro de CORS
- **Solução:** Configure `VITE_ALLOWED_PARENT_ORIGINS` com a origem do parent
