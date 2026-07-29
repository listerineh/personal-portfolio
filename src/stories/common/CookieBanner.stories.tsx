import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, Switch } from '../../components/ds';
import { Cookie, Settings } from 'lucide-react';

// Mock CookieBanner for Storybook that forces visibility
function MockCookieBanner() {
  const [showSettings, setShowSettings] = React.useState(false);
  const [preferences, setPreferences] = React.useState({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  const handleAcceptAll = () => {
    console.log('Accept all cookies');
  };

  const handleRejectAll = () => {
    console.log('Reject all cookies');
  };

  const handleSavePreferences = () => {
    console.log('Save preferences:', preferences);
    setShowSettings(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">We use cookies</p>
                <p className="text-xs text-muted-foreground">
                  We use cookies to improve your experience and analyze site usage.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="ghost" accent="neutral" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4" />Customize
              </Button>
              <Button variant="secondary" accent="neutral" size="sm" onClick={handleRejectAll}>
                Reject All
              </Button>
              <Button variant="primary" accent="amber" size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showSettings} onOpenChange={setShowSettings}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Cookie Preferences</ModalTitle>
            <ModalDescription>Choose which cookies to accept</ModalDescription>
          </ModalHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium">Necessary</label>
                <p className="text-xs text-muted-foreground">
                  Required for the site to function
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
                <label htmlFor="analytics" className="text-sm font-medium">
                  Analytics
                </label>
                <p className="text-xs text-muted-foreground">
                  Help us improve our site
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
                  Preferences
                </label>
                <p className="text-xs text-muted-foreground">
                  Remember your settings
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
              Cancel
            </Button>
            <Button variant="primary" accent="amber" size="md" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

const meta: Meta<typeof MockCookieBanner> = {
  title: 'Common/CookieBanner',
  component: MockCookieBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockCookieBanner>;

export const Default: Story = {
  render: () => <MockCookieBanner />,
  parameters: {
    docs: {
      description: {
        story: 'CookieBanner component uses localStorage to check if user has responded. This mock version forces the banner to be visible for Storybook demonstration.',
      },
    },
  },
};

