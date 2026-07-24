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
        <button className={className ?? 'text-xs text-muted-foreground hover:text-primary transition-colors underline'}>
          {t('cookieSettings')}
        </button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            <span className="flex items-center gap-2.5">
              <Cookie className="h-4 w-4 text-amber-500" />
              <span className="font-headline font-black">{t('preferencesTitle')}</span>
            </span>
          </ModalTitle>
          <ModalDescription>
            {t('settingsDescription')}
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-5 py-4">
          {[
            {
              id: undefined,
              label: t('necessaryLabel'),
              desc: t('necessaryDescription'),
              checked: true,
              disabled: true,
              onChange: undefined,
            },
            {
              id: 'analytics-settings',
              label: t('analyticsLabel'),
              desc: t('analyticsDescription'),
              checked: preferences.analytics,
              disabled: false,
              onChange: (c: boolean) => setPreferences({ ...preferences, analytics: c }),
            },
            {
              id: 'preferences-settings',
              label: t('preferencesCookiesLabel'),
              desc: t('preferencesCookiesDescription'),
              checked: preferences.preferences,
              disabled: false,
              onChange: (c: boolean) => setPreferences({ ...preferences, preferences: c }),
            },
          ].map(({ id, label, desc, checked, disabled, onChange }) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-foreground/[0.06] last:border-0">
              <div className="flex-1 space-y-1">
                <label htmlFor={id} className="text-sm font-headline font-semibold text-foreground/80 cursor-pointer">
                  {label}
                </label>
                <p className="text-xs text-foreground/40 leading-relaxed">{desc}</p>
              </div>
              <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
                accentColor="#f59e0b"
                className="mt-0.5 shrink-0"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={handleRevokeAll}
            className="text-xs font-headline tracking-wide text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            {t('revokeAllButton')}
          </button>
          <div className="flex gap-2">
            <Button variant="secondary" accent="neutral" size="sm" onClick={() => setOpen(false)}>
              {t('cancelButton')}
            </Button>
            <Button variant="primary" accent="amber" size="sm" onClick={handleSavePreferences} className="text-black font-bold">
              {t('saveButton')}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
