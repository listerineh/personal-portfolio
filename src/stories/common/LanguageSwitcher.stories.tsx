import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from '../../components/common/language-switcher';
import { LocaleProvider } from '../../context/locale-context';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Common/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LocaleProvider>
        <Story />
      </LocaleProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
  render: () => <LanguageSwitcher />,
};

export const WithCustomClass: Story = {
  render: () => <LanguageSwitcher className="text-foreground/55 hover:text-foreground hover:bg-foreground/8" />,
};
