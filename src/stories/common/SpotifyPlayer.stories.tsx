import type { Meta, StoryObj } from '@storybook/react';
import { SpotifyPlayer } from '../../components/common/spotify-player';

const meta: Meta<typeof SpotifyPlayer> = {
  title: 'Common/SpotifyPlayer',
  component: SpotifyPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpotifyPlayer>;

export const Default: Story = {
  render: () => <SpotifyPlayer artistId="4q3ewBCX7sLwd24euuV69X" artistName="Listerineh" />,
  parameters: {
    docs: {
      description: {
        story: 'SpotifyPlayer component embeds a Spotify artist player. This example uses a sample artist ID.',
      },
    },
  },
};

export const CustomArtist: Story = {
  render: () => <SpotifyPlayer artistId="0C8ZW7ezQVs4URj5XMiKlx" artistName="The Weeknd" />,
  parameters: {
    docs: {
      description: {
        story: 'Example with a different artist.',
      },
    },
  },
};
