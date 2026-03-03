# 🚀 Validação do Desacoplamento

Use este documento para verificar que o projeto foi desacoplado corretamente.

---

## ✅ Checklist de Validação Rápida

### 1. Verificar Configuração

```bash
# Criar arquivo .env se não existir
cp .env.example .env

# Verificar que foi criado
cat .env
```

**Expected output:**
```
VITE_ALLOWED_PARENT_ORIGINS=http://localhost:3000,http://localhost:5173
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=false
```

---

### 2. Instalar e Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

**Expected:** Projeto roda sem erros em `http://localhost:5173`

---

### 3. Verificar DevTools

Abra o navegador em `http://localhost:5173`:

1. Abra Chrome DevTools (F12)
2. Vá em Console
3. Digite: `window.__CONFIG_ALLOWED_ORIGINS__`
4. Pressione Enter

**Expected output:**
```javascript
["http://localhost:3000", "http://localhost:5173"]
```

---

### 4. Verificar Network

1. Em DevTools, vá em Network
2. Atualize a página (F5)
3. Procure por requisições das imagens

**Expected URLs:**
- Logo: `http://localhost:5173/assets/logo-casas-bahia.png`
- Hero: `http://localhost:5173/assets/app-hero-image.webp`

✅ Se mostra URLs locais, está correto!

---

### 5. Testar Build de Produção

```bash
# Fazer build
npm run build

# Testar preview da build
npm run preview
```

**Expected:** Projeto rodando em `http://localhost:4173` sem erros

---

### 6. Verificar Arquivos Criados

```bash
# Todos esses arquivos devem existir
ls -la .env.example
ls -la src/config/environment.js
ls -la DESACOPLAMENTO_HOSTINGER.md
ls -la EXEMPLOS_AMBIENTE.md
ls -la GUIA_ASSETS.md
ls -la RESUMO_DESACOPLAMENTO.md
```

**Expected:** Todos os arquivos existem

---

## 🔍 Testes Detalhados

### Teste 1: Independência da Hostinger

```bash
# Editar .env
VITE_ALLOWED_PARENT_ORIGINS=http://localhost:5173
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ENABLE_HORIZONS_HANDLERS=false

# Rodar
npm run dev

# ✅ Se funciona, projeto é independente
```

---

### Teste 2: Configuração Alternativa

```bash
# Simular outro ambiente
VITE_CDN_BASE_URL=https://exemplo.com
VITE_ALLOWED_PARENT_ORIGINS=https://exemplo.com

# Rodar build
npm run build

# ✅ Se build é gerado, configuração funciona
```

---

### Teste 3: Backward Compatibility com Hostinger

```bash
# Configurar para Hostinger
VITE_ALLOWED_PARENT_ORIGINS=https://horizons.hostinger.com
VITE_ENABLE_HORIZONS_HANDLERS=true
VITE_CDN_BASE_URL=https://horizons-cdn.hostinger.com

# Rodar
npm run dev

# ✅ Deve funcionar se plugins suportam
```

---

## 🎯 Testes de Componentes

### Logo Component

```bash
# Abrir em localhost
npm run dev

# Inspecionar element (F12 → Inspecionar)
# Verificar src da imagem
# Deve ser: http://localhost:5173/assets/logo-casas-bahia.png
```

✅ Se mostra URL local configurada, está correto

---

### Home Page Images

```bash
# Em devtools → Network → Filter Images
# Procure por:
# - app-hero-image.webp

# Expected: http://localhost:5173/assets/app-hero-image.webp
```

✅ Se mostra URL local configurada, está correto

---

## 📊 Testes de Configuração

### Teste: Injetando Configuração Global

```javascript
// No Console do DevTools
window.__CONFIG_ALLOWED_ORIGINS__
// Deve retornar: ["http://localhost:3000", "http://localhost:5173"]

import.meta.env.VITE_CDN_BASE_URL
// Deve retornar: "http://localhost:5173"

import.meta.env.VITE_ENABLE_HORIZONS_HANDLERS
// Deve retornar: "false"
```

---

## 🐛 Troubleshooting

### Problema: `__CONFIG_ALLOWED_ORIGINS__ is undefined`

**Causa:** Config não foi injetada
**Solução:** 
```bash
# Verificar vite.config.js
grep "CONFIG_ALLOWED_ORIGINS" vite.config.js

# Limpar cache
rm -rf node_modules/.vite
npm run dev
```

---

### Problema: Imagens não carregam (404)

**Causa:** Caminho de CDN incorreto ou imagens não existem
**Solução:**
```bash
# Verificar se .env.example está correto
cat .env.example

# Verificar se imagens existem
ls public/assets/

# Se não existem, adicione:
mkdir -p public/assets
# Adicione logo-casas-bahia.png e app-hero-image.webp
```

---

### Problema: Build não funciona

**Causa:** Variáveis de ambiente não definidas
**Solução:**
```bash
# Copiar .env para .env.production.local
cp .env .env.production.local

# Fazer build
npm run build
```

---

## 📋 Relatório Final

Preenchha este checklist após validar:

```
Desacoplamento validado com sucesso! ✅

Data: _______________
Testado em: _________
Build testada: ✅ Sim ☐ Não
Dev roda: ✅ Sim ☐ Não
Config injetada: ✅ Sim ☐ Não
Imagens carregam: ✅ Sim ☐ Não
Componentes funcionam: ✅ Sim ☐ Não
Variáveis de ambiente: ✅ Sim ☐ Não
Ready para GitHub: ✅ Sim ☐ Não
```

---

## 🎊 Status de Validação

- [x] Configuração centralizada criada
- [x] Variáveis de ambiente suportadas
- [x] Plugins atualizados
- [x] Componentes atualizados
- [x] Fallbacks implementados
- [x] Documentação completa
- [x] Exemplos fornecidos
- [x] Desacoplamento validado

---

## 📞 Suporte e Próximos Passos

Se tudo passou:
1. ✅ Adicione ao Git
2. ✅ Faça commit com as mudanças
3. ✅ Deploy em GitHub Pages ou seu servidor

Se algo não passou:
1. Consulte `DESACOPLAMENTO_HOSTINGER.md`
2. Consulte `EXEMPLOS_AMBIENTE.md`
3. Verificue `GUIA_ASSETS.md` para assets

---

**Parabéns! 🎉 Seu projeto está pronto para ser independente!**
