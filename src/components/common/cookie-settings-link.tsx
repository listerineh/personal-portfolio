'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, ModalTrigger, ModalContent } from '@/components/ds';
import { CookiePreferencesPanel } from './cookie-preferences-panel';
import {
  getCookieConsent,
  saveCookieConsent,
  revokeAllCookies,
  type CookieConsent,
} from '@/lib/cookies';

export function CookieSettingsLink({ className }: { className?: string }) {
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
  };

  const handleRevokeAll = () => {
    revokeAllCookies();
    setPreferences({
      necessary: true,
      analytics: false,
      preferences: false,
    });
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <button className={className ?? 'text-xs text-muted-foreground underline transition-colors hover:text-primary'}>
          {t('cookieSettings')}
        </button>
      </ModalTrigger>
      <ModalContent>
        <CookiePreferencesPanel
          value={preferences}
          onChange={setPreferences}
          onSave={handleSavePreferences}
          onCancel={() => setOpen(false)}
          onRevokeAll={handleRevokeAll}
        />
      </ModalContent>
    </Modal>
  );
}
