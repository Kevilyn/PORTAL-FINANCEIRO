# 🏗️ Arquitetura - Desacoplamento

Visualização da arquitetura da solução de desacoplamento.

---

## 🔄 Fluxo de Configuração

```
┌─────────────────────────────────────────────────────────┐
│  Arquivo .env (Ambiente Específico)                     │
├─────────────────────────────────────────────────────────┤
│ VITE_ALLOWED_PARENT_ORIGINS=...                         │
│ VITE_CDN_BASE_URL=...                                   │
│ VITE_ENABLE_HORIZONS_HANDLERS=...                       │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Vite Config (vite.config.js)                           │
├─────────────────────────────────────────────────────────┤
│ 1. Lê variáveis de .env                                 │
│ 2. Injeta window.__CONFIG_ALLOWED_ORIGINS__             │
│ 3. Injeta handlers (se habilitados)                     │
│ 4. Injeta transform plugins                             │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ├─────────────────────────────┬──────────────────┐
                  ▼                             ▼                  ▼
        ┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
        │ Scripts de Dev   │    │ Componentes JSX  │   │ Config Central   │
        ├──────────────────┤    ├──────────────────┤   ├──────────────────┤
        │ - iframe-route   │    │ - Logo.jsx       │   │ src/config/      │
        │ - selection-mode │    │ - Home.jsx       │   │ environment.js   │
        │ - edit-mode      │    └──────────────────┘   └──────────────────┘
        └──────────────────┘
```

---

## 📦 Estrutura de Arquivo

```
PORTAL-FINANCEIRO/
│
├─ 🔧 Configuração
│  ├─ .env.example          ← Template de variáveis
│  ├─ vite.config.js        ← Injetor de config
│  └─ src/config/
│     └─ environment.js      ← Config centralizada
│
├─ 🎨 Componentes
│  ├─ src/components/
│  │  └─ Logo.jsx           ← Usa VITE_CDN_BASE_URL
│  └─ src/pages/
│     └─ Home.jsx           ← Usa VITE_CDN_BASE_URL
│
├─ 🔌 Plugins
│  ├─ plugins/
│  │  ├─ vite-plugin-iframe-route-restoration.js
│  │  ├─ selection-mode/selection-mode-script.js
│  │  └─ visual-editor/edit-mode-script.js
│  └─ Todos usam: ALLOWED_PARENT_ORIGINS
│
└─ 📚 Documentação
   ├─ QUICK_START.md
   ├─ DESACOPLAMENTO_HOSTINGER.md
   ├─ EXEMPLOS_AMBIENTE.md
   ├─ GUIA_ASSETS.md
   ├─ RESUMO_DESACOPLAMENTO.md
   ├─ VALIDACAO_DESACOPLAMENTO.md
   ├─ INDICE_DOCUMENTACAO.md
   └─ ARQUITETURA.md (este arquivo)
```

---

## 🔌 Fluxo de Injeção de Configuração

```
DESENVOLVIMENTO (npm run dev)
─────────────────────────────────

.env
  │ VITE_ALLOWED_PARENT_ORIGINS=http://localhost:5173
  │ VITE_CDN_BASE_URL=http://localhost:5173
  │
  ▼
vite.config.js
  │ Lê valores de process.env
  │ Cria configInjection JavaScript
  │
  ▼
index.html (transformado)
  │ <script>window.__CONFIG_ALLOWED_ORIGINS__ = [...]</script>
  │ <script>window.__CONFIG_CDN_BASE_URL = ...</script>
  │
  ▼
Plugins de Dev (injetam scripts inline)
  │ Scripts usam window.__CONFIG_ALLOWED_ORIGINS__
  │
  ▼
Componentes React (carregam em navegador)
  │ Logo.jsx: import.meta.env.VITE_CDN_BASE_URL
  │ Home.jsx: import.meta.env.VITE_CDN_BASE_URL
  │
  ▼
Aplicação Funcionando ✅
```

---

## 🌀 Ciclo de Resolução de URLs

```
LOCALHOST
─────────────────────────────────────────────────────

Componente solicita:
  import.meta.env.VITE_CDN_BASE_URL
        │
        ▼
Vite fornece (de .env):
  http://localhost:5173
        │
        ▼
Componente constrói URL:
  http://localhost:5173/assets/logo-casas-bahia.png
        │
        ▼
Navegador carrega de:
  http://localhost:5173/public/assets/logo-casas-bahia.png
        │
        ▼
Imagem exibida ✅


PRODUÇÃO (GitHub Pages)
─────────────────────────────────────────────────────

Componente solicita:
  import.meta.env.VITE_CDN_BASE_URL
        │
        ▼
Vite fornece (de .env.production):
  https://seu-username.github.io/PORTAL-FINANCEIRO
        │
        ▼
Componente constrói URL:
  https://seu-username.github.io/PORTAL-FINANCEIRO/assets/logo.png
        │
        ▼
Navegador carrega de:
  https://seu-username.github.io/PORTAL-FINANCEIRO/public/assets/logo.png
        │
        ▼
Imagem exibida ✅
```

---

## 📡 Comunicação de Iframe (Com Segurança)

```
ANTES (Hardcoded)
─────────────────────────────────────────────────────
const ALLOWED_PARENT_ORIGINS = [
  "https://horizons.hostinger.com",    ← Hardcoded
  "https://horizons.hostinger.dev",    ← Hardcoded
];

DEPOIS (Dinâmico)
─────────────────────────────────────────────────────
const ALLOWED_PARENT_ORIGINS = window.__CONFIG_ALLOWED_ORIGINS__ || [
  "http://localhost:3000",              ← Fallback seguro
  "http://localhost:5173",              ← Fallback seguro
];

// Em vite.config.js:
const allowedOrigins = process.env.VITE_ALLOWED_PARENT_ORIGINS?.split(',') || [fallback];
```

---

## 🚀 Diferentes Ambientes

```
┌─────────────────────────────────────────────────────┐
│  Desenvolvimento Local (.env)                       │
├─────────────────────────────────────────────────────┤
│  VITE_ALLOWED_PARENT_ORIGINS=http://localhost:5173 │
│  VITE_CDN_BASE_URL=http://localhost:5173            │
│  VITE_ENABLE_HORIZONS_HANDLERS=false                │
└─────────────────────────────────────────────────────┘
                      │
          ┌───────────┼───────────┬─────────────┐
          ▼           ▼           ▼             ▼
    ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────┐
    │Production│ │Hostinger│ │GitHub    │ │Docker   │
    │(.env.prod)│ │(.env.h) │ │Pages(.env)│ │(args)   │
    └─────────┘ └─────────┘ └──────────┘ └─────────┘
```

---

## 🔄 Ciclo de Desenvolvimento

```
1. SETUP
   npm install
   cp .env.example .env
         │
         ▼
2. DESENVOLVIMENTO
   npm run dev
   localhost:5173
   (Hot reload ativo)
         │
         ▼
3. TESTES
   Browser DevTools (F12)
   Verificar window.__CONFIG_*
         │
         ▼
4. BUILD
   npm run build
   sem dependências
         │
         ▼
5. PREVIEW
   npm run preview
   localhost:4173
         │
         ▼
6. DEPLOY
   git push
   para GitHub Pages
```

---

## 🎯 Arquitetura de Configuração

```
MULTI-LEVEL CONFIG SYSTEM
─────────────────────────────────────────────────────

Nível 1: ARQUIVO .env
         ↓
         Específico para ambiente
         (não versionado)

Nível 2: VITE CONFIG (vite.config.js)
         ↓
         Lê do Nível 1
         Validação e defaults
         Injeção em HTML

Nível 3: WINDOW GLOBALS
         ↓
         __CONFIG_ALLOWED_ORIGINS__
         __CONFIG_CDN_BASE_URL__

Nível 4: IMPORT.META.ENV
         ↓
         VITE_CDN_BASE_URL (para componentes)
         VITE_ALLOWED_PARENT_ORIGINS

Nível 5: APLICAÇÃO
         ↓
         Componentes usam valores finais
```

---

## 📊 Dependências Antes vs Depois

```
ANTES
─────────────────────────────────────────
Aplicação
    ↓
Hardcoded URLs
    ↓
Versendida a Hostinger
    ├─ CDN
    ├─ Iframe Parent
    └─ Handlers de Erro

DEPOIS
─────────────────────────────────────────
.env (Configuração)
    ↓
Vite Config (Processamento)
    ├─ Injeção de Configuração
    └─ Condicional de Handlers
        ↓
Aplicação
    ├─ Scripts (usam window.__CONFIG__)
    ├─ Componentes (usam import.meta.env)
    └─ Funciona em qualquer lugar ✅
```

---

## 🛡️ Camadas de Segurança

```
Nível de Injeção
│
├─ .env (Arquivo local, não versionado)
│  └─ Segurança: Não expõe em repositório
│
├─ vite.config.js (Processamento em build time)
│  └─ Segurança: Valores injetados apenas em build
│
├─ window.__CONFIG_* (Variável global)
│  └─ Segurança: Apenas para scripts internos
│
└─ import.meta.env (Apenas em código bundled)
   └─ Segurança: Apenas para módulos React
```

---

## 🔀 Roteamento de Configuração

```
Entrada: VITE_CDN_BASE_URL

Paths Possíveis:
├─ Localhost
│  └─ http://localhost:5173/assets/logo.png
│
├─ GitHub Pages
│  └─ https://user.github.io/repo/assets/logo.png
│
├─ Domínio Próprio
│  └─ https://seu-dominio.com/assets/logo.png
│
├─ CDN Externo
│  └─ https://cdn-provider.com/assets/logo.png
│
└─ Hostinger
   └─ https://horizons-cdn.hostinger.com/.../logo.png
```

---

## 📈 Escalabilidade

```
A Estrutura Suporta:

✅ Múltiplos Ambientes
   (dev, staging, prod, hostinger, github)

✅ Múltiplos CDNs
   (Cloudflare, AWS S3, Digital Ocean, etc)

✅ Múltiplas Origens de Iframe
   (localhost, produção, diferentes dominios)

✅ Handlers Opcionais
   (Hostinger, custom, none)

✅ Fácil de Estender
   (Adicionar nova variável = Adicionar linha no .env)
```

---

## 🎯 Casos de Uso

```
CASO 1: Dev Local
├─ .env → localhost
├─ Plugins funcionam com local
└─ npm run dev ✅

CASO 2: GitHub Pages
├─ .env.github → github.io/repo
├─ Assets em public/
└─ npm run build ✅

CASO 3: Produção (Seu Domínio)
├─ .env.production → seu-dominio.com
├─ Assets em seu CDN
└─ npm run build ✅

CASO 4: Hostinger (Still Works!)
├─ .env.hostinger → horizons-cdn
├─ Handlers habilitados
└─ npm run build ✅
```

---

## 💾 Hierarquia de Fallbacks

```
1º Prioridade: Variáveis de Ambiente (.env)
   Se não encontrar → 
2º Prioridade: Valores em vite.config.js (processo)
   Se não encontrar →
3º Prioridade: Valores padrão em plugins
   Se não encontrar →
4º Prioridade: window.location.origin (navegador)
   ← Sempre tem um valor seguro!
```

---

## 🔗 Dependências Entre Arquivos

```
vite.config.js
    ├─ Lê .env
    ├─ Injeta em index.html
    └─ Carrega plugins

index.html (gerado)
    ├─ Scripts inline (de vite.config.js)
    ├─ Componentes React
    └─ main.jsx

main.jsx
    ├─ App.jsx
    ├─ Logo.jsx (usa import.meta.env)
    └─ Home.jsx (usa import.meta.env)

src/config/environment.js
    └─ Exporta helpers para uso em componentes
```

---

## 🎊 Resultado Final

```
┌─────────────────────────────────────────────┐
│  ✅ Projeto Independente                    │
├─────────────────────────────────────────────┤
│  • Sem hardcodes                            │
│  • Dinâmico e configurável                  │
│  • Funciona em qualquer lugar               │
│  • Suporta qualquer CDN                     │
│  • Suporta qualquer origem de iframe        │
│  • Pronto para GitHub                       │
│  • Documentação completa                    │
│  • Fácil de manter                          │
└─────────────────────────────────────────────┘
```

---

**Esta arquitetura segue boas práticas de:**
- ✅ Separation of Concerns
- ✅ Configuration Management
- ✅ Scalability
- ✅ Security by Default
- ✅ Ease of Maintenance
