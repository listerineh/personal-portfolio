'use client';

import { useTranslations } from 'next-intl';
import { Cookie } from 'lucide-react';
import { Button, ModalDescription, ModalHeader, ModalTitle, Switch } from '@/components/ds';

export interface CookieChoices {
  analytics: boolean;
  preferences: boolean;
}

interface CookiePreferencesPanelProps<T extends CookieChoices> {
  value: T;
  onChange: (next: T) => void;
  onSave: () => void;
  onCancel: () => void;
  /** Shown only where revoking makes sense (the settings link, after consent was given). */
  onRevokeAll?: () => void;
}

/**
 * The body of the cookie dialog, shared by the banner and the footer link: an icon and title, the choices as one
 * grouped list (settings style), and the actions. Necessary cookies read "Always on" instead of a dead switch.
 */
export function CookiePreferencesPanel<T extends CookieChoices>({
  value,
  onChange,
  onSave,
  onCancel,
  onRevokeAll,
}: CookiePreferencesPanelProps<T>) {
  const t = useTranslations('cookies');

  const rows = [
    { id: 'cookies-analytics', label: t('analyticsLabel'), desc: t('analyticsDescription'), key: 'analytics' as const },
    { id: 'cookies-preferences', label: t('preferencesCookiesLabel'), desc: t('preferencesCookiesDescription'), key: 'preferences' as const },
  ];

  return (
    <>
      <ModalHeader>
        <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
          <Cookie className="h-6 w-6" />
        </span>
        <div className="mt-5">
          <ModalTitle>{t('preferencesTitle')}</ModalTitle>
        </div>
        <ModalDescription>{t('settingsDescription')}</ModalDescription>
      </ModalHeader>

      <ul className="divide-y divide-border overflow-hidden rounded-lg bg-background">
        <li className="flex items-start justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <p className="text-[0.9375rem] font-medium text-foreground">{t('necessaryLabel')}</p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{t('necessaryDescription')}</p>
          </div>
          <span className="shrink-0 pt-0.5 text-[0.8125rem] font-medium text-muted-foreground">{t('alwaysOn')}</span>
        </li>
        {rows.map((row) => (
          <li key={row.id} className="flex items-start justify-between gap-4 px-4 py-4">
            <div className="min-w-0">
              <label htmlFor={row.id} className="cursor-pointer text-[0.9375rem] font-medium text-foreground">
                {row.label}
              </label>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{row.desc}</p>
            </div>
            <Switch
              id={row.id}
              checked={value[row.key]}
              onCheckedChange={(checked) => onChange({ ...value, [row.key]: checked })}
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onRevokeAll ? (
          <Button variant="ghost" size="sm" onClick={onRevokeAll} className="self-center text-muted-foreground hover:text-destructive sm:self-auto">
            {t('revokeAllButton')}
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
            {t('cancelButton')}
          </Button>
          <Button accent="amber" onClick={onSave} className="w-full sm:w-auto">
            {t('saveButton')}
          </Button>
        </div>
      </div>
    </>
  );
}
