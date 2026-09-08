'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, Switch } from '@/components/ds';
import { Cookie, X, Settings } from 'lucide-react';
import {
  hasUserRespondedToCookies,
  acceptAllCookies,
  acceptNecessaryCookies,
  saveCookieConsent,
  type CookieConsent,
} from '@/lib/cookies';

const DRAWER_DURATION = 400;

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const hasResponded = hasUserRespondedToCookies();
    setShowBanner(!hasResponded);
  }, []);

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
      setShowBanner(false);
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
      setShowBanner(false);
    }, DRAWER_DURATION);
  };

  if (!showBanner) return null;

  return (
    <>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl',
          'transition-transform duration-500',
          isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ transitionTimingFunction: 'var(--ease-drawer)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{t('bannerTitle')}</p>
                <p className="text-xs text-muted-foreground">
                  {t('bannerDescription')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="ghost" accent="neutral" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4" />{t('customize')}
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
          <ModalHeader>
            <ModalTitle>{t('preferencesTitle')}</ModalTitle>
            <ModalDescription>{t('preferencesDescription')}</ModalDescription>
          </ModalHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <label htmlFor="cookies-necessary" className="text-sm font-medium">{t('necessaryLabel')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('necessaryDescription')}
                </p>
              </div>
              <Switch
                id="cookies-necessary"
                checked={true}
                disabled
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <label htmlFor="analytics" className="text-sm font-medium">
                  {t('analyticsLabel')}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t('analyticsDescription')}
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <label htmlFor="preferences" className="text-sm font-medium">
                  {t('preferencesLabel')}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t('preferencesDescription')}
                </p>
              </div>
              <Switch
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, preferences: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" accent="neutral" size="md" onClick={() => setShowSettings(false)}>
              {t('cancel')}
            </Button>
            <Button variant="primary" accent="amber" size="md" onClick={handleSavePreferences}>
              {t('savePreferences')}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
