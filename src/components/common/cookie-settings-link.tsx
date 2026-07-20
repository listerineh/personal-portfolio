'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, Switch } from '@/components/ds';
import { Cookie } from 'lucide-react';
import {
  getCookieConsent,
  saveCookieConsent,
  revokeAllCookies,
  type CookieConsent,
} from '@/lib/cookies';

export function CookieSettingsLink() {
  const t = useTranslations('cookies');
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const consent = getCookieConsent();
    return {
      necessary: true,
      analytics: consent?.analytics ?? false,
      preferences: consent?.preferences ?? false,
    };
  });

  const handleSavePreferences = () => {
    const consent: CookieConsent = {
      ...preferences,
      timestamp: Date.now(),
    };
    saveCookieConsent(consent);
    setOpen(false);
    window.location.reload();
  };

  const handleRevokeAll = () => {
    revokeAllCookies();
    setPreferences({
      necessary: true,
      analytics: false,
      preferences: false,
    });
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors underline">
          {t('cookieSettings')}
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            <span className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              {t('preferencesTitle')}
            </span>
          </ModalTitle>
          <ModalDescription>{t('settingsDescription')}</ModalDescription>
        </ModalHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium">{t('necessaryLabel')}</label>
              <p className="text-xs text-muted-foreground">
                {t('necessaryDescription')}
              </p>
            </div>
            <Switch
              checked={true}
              disabled
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <label htmlFor="analytics-settings" className="text-sm font-medium">
                {t('analyticsLabel')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('analyticsDescription')}
              </p>
            </div>
            <Switch
              id="analytics-settings"
              checked={preferences.analytics}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, analytics: checked })
              }
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <label htmlFor="preferences-settings" className="text-sm font-medium">
                {t('preferencesCookiesLabel')}
              </label>
              <p className="text-xs text-muted-foreground">
                {t('preferencesCookiesDescription')}
              </p>
            </div>
            <Switch
              id="preferences-settings"
              checked={preferences.preferences}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, preferences: checked })
              }
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <Button variant="ghost" accent="neutral" size="md" onClick={handleRevokeAll}>
            {t('revokeAllButton')}
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" accent="neutral" size="md" onClick={() => setOpen(false)}>
              {t('cancelButton')}
            </Button>
            <Button variant="primary" accent="indigo" size="md" onClick={handleSavePreferences}>
              {t('saveButton')}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
