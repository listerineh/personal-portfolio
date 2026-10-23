import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GalleryPicker } from '@/components/ds/GalleryPicker';

const swatch = (background: string, text: string) => (
  <span className="flex h-full w-full items-end p-2 text-[0.6875rem] font-semibold" style={{ background }}>
    {text}
  </span>
);

const meta: Meta<typeof GalleryPicker> = {
  title: 'DS/GalleryPicker',
  component: GalleryPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Add slide',
    title: 'Choose a layout',
    side: 'bottom',
    onSelect: () => {},
    options: [
      { value: 'title', label: 'Title', preview: swatch('#F5F5F7', 'Title') },
      { value: 'bullets', label: 'Bullets', preview: swatch('#FFFFFF', '• • •') },
      { value: 'quote', label: 'Quote', preview: swatch('#FFFFFF', '“ ”') },
      { value: 'stats', label: 'Numbers', preview: swatch('#FFFFFF', '42') },
      { value: 'code', label: 'Code', preview: swatch('#F5F5F7', '</>') },
      { value: 'closing', label: 'Closing', preview: swatch('#FFFFFF', 'Thanks') },
    ],
  },
  render: (args) => (
    <div className="w-48">
      <GalleryPicker {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof GalleryPicker>;

export const Default: Story = {};
