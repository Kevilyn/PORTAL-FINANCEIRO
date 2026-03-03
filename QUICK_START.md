# 🏃 Quick Start - Desacoplamento

Comece em menos de 5 minutos.

---

## 1️⃣ Setup (2 minutos)

```bash
# Copiar configuração
cp .env.example .env

# Instalar
npm install
```

---

## 2️⃣ Rodar (1 minuto)

```bash
npm run dev
```

Acesse: `http://localhost:5173` ✅

---

## 3️⃣ Verificar (1 minuto)

No Console do navegador (F12):
```javascript
window.__CONFIG_ALLOWED_ORIGINS__
// Output esperado: ["http://localhost:3000", "http://localhost:5173"]
```

✅ Se mostra isso, está funcionando!

---

## 4️⃣ Build para Produção (1 minuto)

```bash
npm run build
npm run preview
```

Acesse: `http://localhost:4173` ✅

---

## 📚 Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| **DESACOPLAMENTO_HOSTINGER.md** | Guia completo com FAQ |
| **EXEMPLOS_AMBIENTE.md** | 5 exemplos (local, prod, Hostinger, GitHub, Docker) |
| **GUIA_ASSETS.md** | Como gerenciar imagens e CDN |
| **RESUMO_DESACOPLAMENTO.md** | Resumo detalhado das mudanças |
| **VALIDACAO_DESACOPLAMENTO.md** | Testes e validação |

---

## 🔧 Configurações Rápidas

### Para GitHub Pages

```bash
VITE_CDN_BASE_URL=https://seu-username.github.io/PORTAL-FINANCEIRO
npm run build
```

### Para Outro Servidor

```bash
VITE_CDN_BASE_URL=https://seu-dominio.com
npm run build
```

### Para Hostinger (se ainda usar)

```bash
VITE_ENABLE_HORIZONS_HANDLERS=true
VITE_CDN_BASE_URL=https://horizons-cdn.hostinger.com
npm run build
```

---

## ✅ Resultado

```
✅ Projeto independente
✅ Sem dependências da Hostinger
✅ Funciona em localhost
✅ Pronto para produção
✅ Configurável por ambiente
```

---

## 📖 Precisa de Mais?

- 📋 Guia completo: `DESACOPLAMENTO_HOSTINGER.md`
- 💡 Exemplos: `EXEMPLOS_AMBIENTE.md`
- 🖼️ Assets: `GUIA_ASSETS.md`
- ✔️ Validação: `VALIDACAO_DESACOPLAMENTO.md`

---

**Pronto! 🚀 Seu projeto está desacoplado e funcionando!**
