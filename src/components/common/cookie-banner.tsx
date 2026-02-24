'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie, X, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  hasUserRespondedToCookies,
  acceptAllCookies,
  acceptNecessaryCookies,
  saveCookieConsent,
  type CookieConsent,
} from '@/lib/cookies';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [showBanner, setShowBanner] = useState(false);
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

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
    window.location.reload();
  };

  const handleRejectAll = () => {
    acceptNecessaryCookies();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const consent: CookieConsent = {
      ...preferences,
      timestamp: Date.now(),
    };
    saveCookieConsent(consent);
    setShowSettings(false);
    setShowBanner(false);
    window.location.reload();
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl">
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                {t('customize')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
              >
                {t('rejectAll')}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('preferencesTitle')}</DialogTitle>
            <DialogDescription>
              {t('preferencesDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label className="text-sm font-medium">{t('necessaryLabel')}</Label>
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
                <Label htmlFor="analytics" className="text-sm font-medium">
                  {t('analyticsLabel')}
                </Label>
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
                <Label htmlFor="preferences" className="text-sm font-medium">
                  {t('preferencesLabel')}
                </Label>
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
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSavePreferences}>
              {t('savePreferences')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
