# ⚡ Folha de Cola - Desacoplamento

Referência rápida com todos os comandos e configurações.

---

## 🚀 Comandos Essenciais

```bash
# Development
npm run dev              # Rodar em localhost:5173

# Build
npm run build            # Fazer build otimizado
npm run preview          # Preview da build em localhost:4173

# Lint/Format
npm run lint             # Se existir
```

---

## 📝 Configuração Rápida

### Copiar Template
```bash
cp .env.example .env
```

### Editar `.env`
```bash
# Abrir em VS Code
code .env

# Ou editar direto
echo "VITE_CDN_BASE_URL=http://localhost:5173" >> .env
```

---

## 🔧 Variáveis de Ambiente

### Development (Localhost)
```bash
VITE_ALLOWED_PARENT_ORIGINS=http://localhost:3000,http://localhost:5173
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=false
```

### Production (Seu Domínio)
```bash
VITE_ALLOWED_PARENT_ORIGINS=https://seu-dominio.com
VITE_CDN_BASE_URL=https://seu-dominio.com
VITE_ENABLE_HORIZONS_HANDLERS=false
```

### GitHub Pages
```bash
VITE_ALLOWED_PARENT_ORIGINS=https://seu-username.github.io
VITE_CDN_BASE_URL=https://seu-username.github.io/PORTAL-FINANCEIRO
VITE_ENABLE_HORIZONS_HANDLERS=false
```

### Hostinger (Se Ainda Usar)
```bash
VITE_ALLOWED_PARENT_ORIGINS=https://horizons.hostinger.com
VITE_CDN_BASE_URL=https://horizons-cdn.hostinger.com
VITE_ENABLE_HORIZONS_HANDLERS=true
```

---

## 🖼️ Assets

### Criar Diretório
```bash
mkdir -p public/assets
```

### Adicionar Imagens
```bash
# Logo (PNG, ~120x100)
cp seu-logo.png public/assets/logo-casas-bahia.png

# Hero (WebP ou JPEG, ~768x333)
cp seu-hero.webp public/assets/app-hero-image.webp
```

### Verificar
```bash
ls -la public/assets/
# Deve listar as 2 imagens
```

---

## ✔️ Verificação Rápida

### No Console do Navegador (F12)
```javascript
// Verificar configuração
window.__CONFIG_ALLOWED_ORIGINS__

// Verificar CDN
import.meta.env.VITE_CDN_BASE_URL

// Verificar handlers
import.meta.env.VITE_ENABLE_HORIZONS_HANDLERS
```

---

## 📱 DevTools Network

1. Abrir DevTools (F12)
2. Ir em Network
3. Filtrar "img" para imagens
4. URLs devem ser:
   - Dev: `http://localhost:5173/assets/...`
   - Prod: Seu domínio configurado

---

## 🔍 Debug

### Ver que variáveis foram carregadas
```bash
# Durante desenvolvimento
npm run dev

# No console do navegador
console.log(import.meta.env)
```

### Limpar cache do Vite
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 📊 Build pela Linha de Comando

```bash
# Build simples
npm run build

# Build com variável de ambiente
VITE_CDN_BASE_URL=https://seu-dominio.com npm run build

# Build para GitHub Pages
VITE_CDN_BASE_URL=https://seu-username.github.io/PORTAL-FINANCEIRO npm run build
```

---

## 🐳 Docker

```bash
# Build
docker build \
  --build-arg VITE_CDN_BASE_URL=https://seu-dominio.com \
  -t portal-financeiro .

# Run
docker run -p 5173:5173 portal-financeiro
```

---

## 🌍 Git

### Não versionar .env
```bash
# Já deve estar em .gitignore, mas verificar
cat .gitignore | grep "^\.env"
```

### Adicionar documentação
```bash
git add .env.example
git add QUICK_START.md
git add DESACOPLAMENTO_HOSTINGER.md
git add EXEMPLOS_AMBIENTE.md
git add GUIA_ASSETS.md
git add RESUMO_DESACOPLAMENTO.md
git add VALIDACAO_DESACOPLAMENTO.md
git add INDICE_DOCUMENTACAO.md
git add ARQUITETURA.md
git commit -m "Desacoplar de Hostinger - Projeto independente"
```

---

## 📋 Checklist de Deploy

- [ ] `.env` configurado para produção
- [ ] `npm run build` sem erros
- [ ] `npm run preview` funciona
- [ ] Assets em `public/assets/`
- [ ] `VITE_CDN_BASE_URL` correto
- [ ] Testar em navegador
- [ ] Verificar network (F12)
- [ ] Commit e push
- [ ] Deploy!

---

## 🆘 Troubleshooting Rápido

| Problema | Comando/Solução |
|----------|-----------------|
| Imagens 404 | Verificar `VITE_CDN_BASE_URL` em `.env` |
| Config undefined | `rm -rf node_modules/.vite && npm run dev` |
| Build falha | `npm install` e tentar novamente |
| DevTools erro | Verificar console do navegador (F12) |
| Ports ocupadas | `npm run dev -- --port 3000` |

---

## 🔄 Fluxo Típico

```bash
# 1. Setup (primeira vez)
cp .env.example .env
npm install

# 2. Development
npm run dev

# 3. Testing
# Abrir http://localhost:5173
# Verificar em DevTools (F12)

# 4. Build
npm run build

# 5. Preview
npm run preview

# 6. Deploy
git add .
git commit -m "Ready for production"
git push
```

---

## 📞 Documentos Equivalentes

| Nível | Comando | Documentação |
|-------|---------|--------------|
| ⚡ Rápido | `npm run dev` | QUICK_START.md |
| 🔄 Normal | `npm run build` | DESACOPLAMENTO_HOSTINGER.md |
| 🎯 Específico | Ver exemplos | EXEMPLOS_AMBIENTE.md |
| 🖼️ Assets | Gerenciar imagens | GUIA_ASSETS.md |
| ✔️ Testar | Validação | VALIDACAO_DESACOPLAMENTO.md |

---

## 🎓 Variáveis em Foco

```javascript
// Em componentes React
import.meta.env.VITE_CDN_BASE_URL        // "http://localhost:5173"
import.meta.env.VITE_ALLOWED_PARENT_ORIGINS  // undefined (use global)
import.meta.env.VITE_ENABLE_HORIZONS_HANDLERS // "false"

// Variável global (em scripts e window)
window.__CONFIG_ALLOWED_ORIGINS__        // ["http://localhost:3000", ...]
```

---

## 🔗 Mapeamento de Arquivos

```
.env
 ├─ Lido por vite.config.js
 ├─ Usado em build time
 └─ Injetado em window.__CONFIG_*

src/config/environment.js
 ├─ Config centralizada
 ├─ Exporta helpers
 └─ Opcional para uso em componentes

vite.config.js
 ├─ Injeta variáveis
 ├─ Carrega plugins
 └─ Condiciona handlers

src/components/Logo.jsx
src/pages/Home.jsx
 └─ Usam import.meta.env.VITE_CDN_BASE_URL
```

---

## 🎯 Quick Decision Matrix

```
Pergunta: Qual arquivo editar?

├─ "Quero mudar CDN em toda aplicação"
│  └─ Editar: .env (VITE_CDN_BASE_URL)

├─ "Quero adicionar variável nova"
│  ├─ Editar: .env.example (documentar)
│  ├─ Editar: vite.config.js (injetar)
│  └─ Usar: import.meta.env.VITE_NOVA_VAR

├─ "Encontrei bug em componente"
│  └─ Editar: src/components/Logo.jsx ou src/pages/Home.jsx

├─ "Quero alterar handlers Horizons"
│  └─ Editar: .env (VITE_ENABLE_HORIZONS_HANDLERS)

└─ "Quero documentar algo"
   └─ Editar: Documentos na raiz (*.md)
```

---

## 💡 Snippets de Código

### Adicionar variável nova

**Em `.env.example`:**
```bash
VITE_NOVA_VARIAVEL=seu-valor
```

**Em `vite.config.js`:**
```javascript
const novaVariavel = process.env.VITE_NOVA_VARIAVEL || 'default';
```

**Em componente:**
```javascript
const valor = import.meta.env.VITE_NOVA_VARIAVEL || 'default';
```

---

## 🚀 Deploy One-Liner

```bash
# GitHub Pages
npm run build && git add dist && git commit -m "Deploy" && git push
```

---

## ✅ Status

```
✅ Projeto Desacoplado
✅ Funciona Localmente
✅ Pronto para Produção
✅ Documentado Completamente
✅ Testado e Validado
```

**Você está pronto! 🎉**
