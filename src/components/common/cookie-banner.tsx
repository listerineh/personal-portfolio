'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button, Modal, ModalContent } from '@/components/ds';
import { CookiePreferencesPanel } from './cookie-preferences-panel';
import { Cookie, Settings } from 'lucide-react';
import {
  hasUserRespondedToCookies,
  acceptAllCookies,
  acceptNecessaryCookies,
  saveCookieConsent,
  type CookieConsent,
} from '@/lib/cookies';

const DRAWER_DURATION = 400;

const noopSubscribe = () => () => {};

export function CookieBanner() {
  const t = useTranslations('cookies');
  // Consent lives in cookies (an external store); read it without a mount effect.
  const needsConsent = useSyncExternalStore(noopSubscribe, () => !hasUserRespondedToCookies(), () => false);
  const [dismissed, setDismissed] = useState(false);
  const showBanner = needsConsent && !dismissed;
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    if (!showBanner || isClosing) return;
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [showBanner, isClosing]);

  const handleAcceptAll = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptAllCookies();
      window.location.reload();
    }, DRAWER_DURATION);
  };

  const handleRejectAll = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptNecessaryCookies();
      setDismissed(true);
    }, DRAWER_DURATION);
  };

  const handleSavePreferences = () => {
    setIsClosing(true);
    setShowSettings(false);
    setTimeout(() => {
      const consent: CookieConsent = {
        ...preferences,
        timestamp: Date.now(),
      };
      saveCookieConsent(consent);
      setDismissed(true);
    }, DRAWER_DURATION);
  };

  if (!showBanner) return null;

  return (
    <>
      <div
        role="region"
        aria-label={t('bannerTitle')}
        className={cn(
          'panel fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-3xl bg-popover px-5 py-5 shadow-float sm:inset-x-6 md:px-6 print:hidden',
          'transition-transform duration-500',
          isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ transitionTimingFunction: 'var(--ease-drawer)' }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <p className="text-base font-semibold">{t('bannerTitle')}</p>
                <p className="max-w-[64ch] text-sm leading-relaxed text-muted-foreground">
                  {t('bannerDescription')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="ghost" accent="neutral" size="sm" onClick={() => setShowSettings(true)}>
                <Settings aria-hidden="true" className="h-4 w-4" />{t('customize')}
              </Button>
              <Button variant="secondary" accent="neutral" size="sm" onClick={handleRejectAll}>
                {t('rejectAll')}
              </Button>
              <Button variant="primary" accent="amber" size="sm" onClick={handleAcceptAll}>
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showSettings} onOpenChange={setShowSettings}>
        <ModalContent>
          <CookiePreferencesPanel
            value={preferences}
            onChange={setPreferences}
            onSave={handleSavePreferences}
            onCancel={() => setShowSettings(false)}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
