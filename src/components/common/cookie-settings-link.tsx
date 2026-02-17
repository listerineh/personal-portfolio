'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  getCookieConsent,
  saveCookieConsent,
  revokeAllCookies,
  type CookieConsent,
} from '@/lib/cookies';

export function CookieSettingsLink() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors underline">
          Cookie Settings
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Changes will take effect after saving.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Necessary Cookies */}
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label className="text-sm font-medium">Necessary Cookies</Label>
              <p className="text-xs text-muted-foreground">
                Required for the website to function properly. Cannot be disabled.
              </p>
            </div>
            <Switch
              checked={true}
              disabled
              className="mt-1"
            />
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="analytics-settings" className="text-sm font-medium">
                Analytics Cookies
              </Label>
              <p className="text-xs text-muted-foreground">
                Help us understand how visitors interact with our website.
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

          {/* Preference Cookies */}
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="preferences-settings" className="text-sm font-medium">
                Preference Cookies
              </Label>
              <p className="text-xs text-muted-foreground">
                Remember your settings and preferences (e.g., theme).
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
          <Button variant="outline" onClick={handleRevokeAll} className="text-destructive">
            Revoke All
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
