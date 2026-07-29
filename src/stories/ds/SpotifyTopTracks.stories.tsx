import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SpotifyTopTracks } from '@/components/ds/SpotifyTopTracks';

const meta: Meta<typeof SpotifyTopTracks> = {
  title: 'DS/SpotifyTopTracks',
  component: SpotifyTopTracks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpotifyTopTracks>;

// Mock component that bypasses API calls
function MockSpotifyTopTracks({ trackIds, accentColor }: { trackIds: readonly string[]; accentColor?: string }) {
  const mockTracks = [
    {
      id: '1',
      name: 'Blinding Lights',
      artistName: 'The Weeknd',
      albumArt: null,
      spotifyUrl: 'https://open.spotify.com/track/1',
    },
    {
      id: '2',
      name: 'Levitating',
      artistName: 'Dua Lipa',
      albumArt: null,
      spotifyUrl: 'https://open.spotify.com/track/2',
    },
    {
      id: '3',
      name: 'Stay',
      artistName: 'The Kid LAROI, Justin Bieber',
      albumArt: null,
      spotifyUrl: 'https://open.spotify.com/track/3',
    },
    {
      id: '4',
      name: 'Good 4 U',
      artistName: 'Olivia Rodrigo',
      albumArt: null,
      spotifyUrl: 'https://open.spotify.com/track/4',
    },
    {
      id: '5',
      name: 'Peaches',
      artistName: 'Justin Bieber',
      albumArt: null,
      spotifyUrl: 'https://open.spotify.com/track/5',
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const displayTracks = mockTracks.slice(0, trackIds.length);

  return (
    <div className="space-y-2">
      {displayTracks.map((track, index) => {
        const hovered = hoveredId === track.id;
        return (
          <a
            key={track.id}
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${hovered ? accentColor + '30' : accentColor + '15'}`,
              transition: 'border-color 0.25s',
            }}
            onMouseEnter={() => setHoveredId(track.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${accentColor}12, ${accentColor}04)`,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.25s',
              }}
            />
            <span
              className="relative z-10 font-headline font-black tabular-nums shrink-0 leading-none"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: `${accentColor}50`,
                minWidth: '2rem',
                textAlign: 'right',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="relative z-10 shrink-0">
              {track.albumArt ? (
                <img src={track.albumArt} alt={track.name} className="w-14 h-14 rounded-xl object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-xl" style={{ background: `${accentColor}20` }} />
              )}
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <p
                className="font-headline font-bold truncate leading-tight"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'rgba(255,255,255,0.88)' }}
              >
                {track.name}
              </p>
              <p className="text-xs truncate mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{track.artistName}</p>
            </div>
            <span
              className="relative z-10 hidden sm:inline shrink-0 text-xs font-headline font-semibold"
              style={{
                color: '#1DB954',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.25s',
                whiteSpace: 'nowrap',
              }}
            >
              Reproducir en Spotify ↗
            </span>
          </a>
        );
      })}
      <div className="pt-2 px-1 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" style={{ fill: `${accentColor}40` }} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="text-xs" style={{ color: `${accentColor}40` }}>Top tracks via Spotify</span>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1', '2']} accentColor="#818cf8" />,
};

export const AmberAccent: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1', '2']} accentColor="#f59e0b" />,
};

export const GreenAccent: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1', '2']} accentColor="#1DB954" />,
};

export const CustomColor: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1', '2']} accentColor="#ff6b6b" />,
};

export const SingleTrack: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1']} accentColor="#818cf8" />,
};

export const MultipleTracks: Story = {
  render: () => <MockSpotifyTopTracks trackIds={['1', '2', '3', '4', '5']} accentColor="#818cf8" />,
};
