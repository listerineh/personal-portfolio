import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageDropzone } from '@/components/ds/ImageDropzone';

const labels = {
  prompt: 'Drop an image here',
  hint: 'JPG, PNG, WebP, AVIF or GIF · up to 4 MB',
  choose: 'Choose image',
  replace: 'Replace image',
  busy: 'Uploading…',
};

const meta: Meta<typeof ImageDropzone> = {
  title: 'DS/ImageDropzone',
  component: ImageDropzone,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { labels, onFile: () => {} },
  render: function Render(args) {
    const [src, setSrc] = useState(args.src);
    return (
      <div className="w-80">
        <ImageDropzone {...args} src={src} onFile={(file) => setSrc(URL.createObjectURL(file))} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof ImageDropzone>;

export const Empty: Story = {};

export const WithImage: Story = { args: { src: '/images/sebas-playing.webp', alt: 'Sebastian playing guitar' } };

export const Uploading: Story = { args: { src: '/images/sebas-playing.webp', busy: true } };

export const Error: Story = { args: { error: 'That file is larger than 4 MB.' } };
