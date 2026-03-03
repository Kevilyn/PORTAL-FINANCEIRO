/**
 * Configuração centralizada de variáveis de ambiente
 * Permite que o projeto seja independente e configurável
 */

export const config = {
  // Origens permitidas para comunicação com iframe pai
  allowedParentOrigins: parseOrigins(
    import.meta.env.VITE_ALLOWED_PARENT_ORIGINS || 'http://localhost:5173'
  ),

  // URL base do CDN
  cdnBaseUrl: import.meta.env.VITE_CDN_BASE_URL || window.location.origin,

  // Configurações da Hostinger (opcionais)
  horizons: {
    enabled: import.meta.env.VITE_ENABLE_HORIZONS_HANDLERS === 'true',
    templateBannerScriptUrl: import.meta.env.TEMPLATE_BANNER_SCRIPT_URL,
    templateRedirectUrl: import.meta.env.TEMPLATE_REDIRECT_URL,
  },

  // Modo desenvolvimento
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  // Controlar inline editing
  disableInlineEditing: import.meta.env.VITE_DISABLE_INLINE_EDITING === 'true',
};

/**
 * Converte string de origens (separadas por vírgula) em array
 */
function parseOrigins(originsString) {
  return originsString
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);
}

/**
 * Construir URL do CDN
 */
export function getCdnUrl(path) {
  const baseUrl = config.cdnBaseUrl.endsWith('/') 
    ? config.cdnBaseUrl.slice(0, -1)
    : config.cdnBaseUrl;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Verificar se uma origem é permitida
 */
export function isOriginAllowed(origin) {
  return config.allowedParentOrigins.includes(origin);
}

export default config;
