export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

export function setCookie(name: string, value: string, days: number = COOKIE_EXPIRY_DAYS) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function saveCookieConsent(consent: CookieConsent) {
  setCookie(COOKIE_CONSENT_KEY, JSON.stringify(consent));
}

export function getCookieConsent(): CookieConsent | null {
  const consentStr = getCookie(COOKIE_CONSENT_KEY);
  if (!consentStr) return null;
  
  try {
    return JSON.parse(consentStr);
  } catch {
    return null;
  }
}

export function hasUserRespondedToCookies(): boolean {
  return getCookieConsent() !== null;
}

export function acceptAllCookies(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: true,
    preferences: true,
    timestamp: Date.now(),
  };
  saveCookieConsent(consent);
  return consent;
}

export function acceptNecessaryCookies(): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics: false,
    preferences: false,
    timestamp: Date.now(),
  };
  saveCookieConsent(consent);
  return consent;
}

export function revokeAllCookies() {
  deleteCookie(COOKIE_CONSENT_KEY);
  deleteCookie('_ga');
  deleteCookie('_gid');
  deleteCookie('_gat');
}
