# Desacoplamento do Ambiente Hostinger

Este documento descreve como desacoplar o projeto das dependências específicas da Hostinger e deixá-lo funcional de forma independente.

## 📋 Visão Geral

O projeto estava originalmente vinculado ao ambiente Hostinger através de:

1. **ALLOWED_PARENT_ORIGINS** - URLs hardcoded da Hostinger em plugins de desenvolvimento (agora centralizados em utilitário global)
2. **Handlers de Erro da Hostinger** - Scripts para comunicação com iframe pai
3. **URLs de CDN** - Referências hardcoded a CDN da Hostinger para recursos estáticos

A solução implementada torna todas essas dependências **opcionais** e **configuráveis**.

## 🔧 Configuração Inicial

### 1. Criar arquivo `.env` local (cópia do `.env.example`)

```bash
cp .env.example .env
```

### 2. Para ambiente independente (padrão)

Deixe o arquivo `.env` com as configurações padrão:

```bash
VITE_ALLOWED_PARENT_ORIGINS=http://localhost:3000,http://localhost:5173
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=false
```

**Isso permite:**
- ✅ Projeto rodando em localhost
- ✅ Sem dependências da Hostinger
- ✅ Funcional no GitHub
- ✅ Sem handlers de erro específicos da Hostinger

### 3. Para integração com Hostinger (se necessário)

Se você ainda precisa integrar com Hostinger, configure:

```bash
VITE_ALLOWED_PARENT_ORIGINS=https://horizons.hostinger.com,https://horizons.hostinger.dev,http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=true
TEMPLATE_BANNER_SCRIPT_URL=https://seu-url/banner.js
TEMPLATE_REDIRECT_URL=https://seu-url/redirect
```

## 📦 Componentes Modificados

### Plugins de Desenvolvimento

Todos os plugins agora usam um **utilitário global** (`window.__UTILS__`) para lógica comum como origens permitidas e obtenção da origem do pai. Isso elimina duplicação e garante comportamento consistente.

Todos os 3 plugins agora suportam configuração dinâmica:

1. **`plugins/vite-plugin-iframe-route-restoration.js`**
   - Usa `VITE_ALLOWED_PARENT_ORIGINS`
   - Fallback para localhost se não configurado

2. **`plugins/selection-mode/selection-mode-script.js`**
   - Usa variável global `__CONFIG_ALLOWED_ORIGINS__`
   - Fallback para localhost

3. **`plugins/visual-editor/edit-mode-script.js`**
   - Usa variável global `__CONFIG_ALLOWED_ORIGINS__`
   - Fallback para localhost

### Vite Config

**`vite.config.js`** foi atualizado para:
- Injetar `__CONFIG_ALLOWED_ORIGINS__` globalmente
- Tornar handlers Horizons opcionais (controlado por `VITE_ENABLE_HORIZONS_HANDLERS`)
- Suportar configuração de CDN

### Componentes React

1. **`src/components/Logo.jsx`**
   - Usa `VITE_CDN_BASE_URL` para carregar logo
   - Fallback para `window.location.origin`

2. **`src/pages/Home.jsx`**
   - Usa `VITE_CDN_BASE_URL` para imagens hero
   - Fallback para `window.location.origin`

### Configuração Centralizada

Novo arquivo: **`src/config/environment.js`**

Exporta:
- `config` - Objeto com todas as configurações
- `getCdnUrl(path)` - Helper para construir URLs do CDN
- `isOriginAllowed(origin)` - Verificar se origem é permitida

## 🚀 Como Usar

### Desenvolvimento Local (Independente)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (sem dependências da Hostinger)
npm run dev
```

Acesse `http://localhost:5173`

### Build para Produção

```bash
# Build do projeto
npm run build

# Preview da build
npm run preview
```

## 📝 Variáveis de Ambiente Disponíveis

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `VITE_ALLOWED_PARENT_ORIGINS` | `http://localhost:3000,http://localhost:5173` | Origens permitidas para iframe |
| `VITE_CDN_BASE_URL` | `http://localhost:5173` | URL base do CDN para recursos |
| `VITE_ENABLE_HORIZONS_HANDLERS` | `false` | Habilitar handlers de erro Horizons |
| `TEMPLATE_BANNER_SCRIPT_URL` | ` ` | URL do script de banner (Hostinger) |
| `TEMPLATE_REDIRECT_URL` | ` ` | URL de redirect (Hostinger) |
| `VITE_DISABLE_INLINE_EDITING` | `false` | Desabilitar edição inline |

## 🔐 Segurança

- ✅ Origens permitidas podem ser configuradas por ambiente
- ✅ Handlers de erro são opcionais
- ✅ Não há URLs hardcoded da Hostinger no build final
- ✅ Configuração via variáveis de ambiente (melhor prática)

## 📚 Recursos Adicionais

- [Documentação Vite - Env Variables](https://vitejs.dev/guide/env-and-mode)
- [Documentação postMessage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/postMessage)
- [Iframe Security Cross-Origin](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

## ❓ Perguntas Frequentes

### P: Como adicionar novos CDN?
R: Configure `VITE_CDN_BASE_URL` no `.env` e use em componentes com `import.meta.env.VITE_CDN_BASE_URL`

### P: O projeto pode rodar sem as dependências da Hostinger?
R: **Sim!** Com as configurações padrão, projeto roda 100% independente

### P: Como migrar para outro provedor?
R: Basta atualizar as variáveis de ambiente - código não precisa de alterações

### P: Posso usar isso em GitHub Pages?
R: Sim! Configure `VITE_CDN_BASE_URL` para apontar seu CDN ou GitHub raw content

## 🤝 Contribuindo

Se adicionar mais dependências externas, siga este padrão:

1. Adicione variável de ambiente no `.env.example`
2. Importe em `src/config/environment.js` se necessário
3. Use fallback para localhost ou `window.location.origin`
4. Documente na tabela de variáveis de ambiente acima
