# Guia de Assets e CDN

## 📦 Assets Necessários

O projeto usa as seguintes imagens que estavam no CDN da Hostinger:

### 1. Logo Casas Bahia
- **Localização anterior:** `https://horizons-cdn.hostinger.com/.../b97d75d5af4d4c83d4b3eb621887a8bc.png`
- **Usado em:** `src/components/Logo.jsx`
- **Resolução:** ~120x100px
- **Formato:** PNG
- **Localização local:** `public/assets/logo-casas-bahia.png`

### 2. Imagem Hero da Home
- **Localização anterior:** `https://horizons-cdn.hostinger.com/.../cb-reproducao-768x333-rcB0r.webp`
- **Usado em:** `src/pages/Home.jsx`
- **Resolução:** ~768x333px
- **Formato:** WebP
- **Localização local:** `public/assets/app-hero-image.webp`

---

## 🔧 Configuração de Assets Locais

### Opção 1: Armazenar localmente (Recomendado para GitHub)

```bash
# Criar diretório de assets
mkdir -p public/assets

# Baixar ou criar os assets e colocá-los lá
# - logo-casas-bahia.png
# - app-hero-image.webp
```

Assim, os assets são servidos por:
- Desenvolvimento: `http://localhost:5173/assets/...`
- Produção: `https://seu-dominio.com/assets/...`

### Opção 2: Usar CDN externo

Configure `.env`:
```bash
VITE_CDN_BASE_URL=https://seu-cdn.com
```

Coloque os assets em `https://seu-cdn.com/assets/`

### Opção 3: URL Inline (Fallback)

Se quiser manter URLs específicas por asset:

**Em `src/components/Logo.jsx`:**
```jsx
const logoUrl = import.meta.env.VITE_LOGO_URL || 
  `${import.meta.env.VITE_CDN_BASE_URL}/assets/logo-casas-bahia.png`;
```

**Em `.env`:**
```bash
VITE_LOGO_URL=https://exemplo.com/logo.png
VITE_CDN_BASE_URL=http://localhost:5173
```

---

## 📥 Como Baixar Assets Originais

### Se quiser manter as imagens originais da Hostinger:

```bash
# Logo
curl -o public/assets/logo-casas-bahia.png \
  'https://horizons-cdn.hostinger.com/5f5fd64d-365a-43a8-ad0d-f030cca0a0f7/b97d75d5af4d4c83d4b3eb621887a8bc.png'

# Hero Image
curl -o public/assets/app-hero-image.webp \
  'https://horizons-cdn.hostinger.com/5f5fd64d-365a-43a8-ad0d-f030cca0a0f7/cb-reproducao-768x333-rcB0r.webp'
```

---

## 🎨 Substituir com Imagens Próprias

### 1. Logo
- Dimensão recomendada: 120x100px
- Formatos: PNG, SVG, WebP
- Nome: `public/assets/logo-casas-bahia.png`

### 2. Hero Image
- Dimensão recomendada: 768x333px (ou maior para 2x)
- Formatos: WebP, JPEG
- Nome: `public/assets/app-hero-image.webp`
- Nome alternativo: `public/assets/app-hero-image-2x.webp` (para Retina)

---

## 🚀 Deploy com Assets

### GitHub (Recomendado)

```bash
# Adicionar assets ao repositório
git add public/assets/*
git commit -m "Add project assets"
git push

# Os assets serão servidos do repositório
```

### Vercel

```bash
# Assets são incluídos automaticamente
npm run build
vercel deploy
```

### Netlify

```bash
# Configure no netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

# Assets são incluídos automaticamente
```

### Docker

```dockerfile
# Assets e código são incluídos na imagem
COPY public/ ./public/
COPY src/ ./src/
```

---

## 📊 Otimização de Assets

### Converter para WebP (Melhor compressão)

```bash
# Instalar ImageMagick ou similar
brew install imagemagick

# Converter PNG para WebP
convert input.png -quality 80 output.webp

# Converter JPEG para WebP
cwebp -q 80 input.jpg -o output.webp
```

### Criar versões 2x (Retina)

```bash
# Para logo
convert logo.png -resize 240x200 logo-2x.png

# Para hero
convert hero.webp -resize 1536x666 hero-2x.webp
```

---

## 🔍 Verificação

### Verificar se assets estão carregando

**Dev:**
```bash
npm run dev
# Abra http://localhost:5173
# Inspecione elementos de imagem
# URLs devem ser: http://localhost:5173/assets/...
```

**Produção:**
```bash
npm run build
npm run preview
# URLs devem ser: /assets/... (relativo ao domínio)
```

---

## 📝 Checklist para Novo Ambiente

- [ ] Criar diretório `public/assets/`
- [ ] Adicionar `logo-casas-bahia.png`
- [ ] Adicionar `app-hero-image.webp`
- [ ] Configurar `VITE_CDN_BASE_URL` em `.env`
- [ ] Testar com `npm run dev`
- [ ] Verificar DevTools se imagens carregam
- [ ] Build: `npm run build`
- [ ] Testar preview: `npm run preview`

---

## 🎯 Resumo Rápido

**Para GitHub (Independente):**
1. Coloque imagens em `public/assets/`
2. Use `VITE_CDN_BASE_URL=http://localhost:5173` em dev
3. Build automático referencia `/assets/`
4. Tudo funciona!

**Para Hostinger:**
1. Configure `VITE_CDN_BASE_URL=https://horizons-cdn.hostinger.com`
2. Projeto aponta para CDN original
3. Sem mudanças de código

**Para Outro CDN:**
1. Configure `VITE_CDN_BASE_URL=https://seu-cdn.com`
2. Coloque assets lá
3. Pronto!
