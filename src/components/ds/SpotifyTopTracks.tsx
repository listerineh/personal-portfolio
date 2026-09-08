'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SpotifyIcon } from './SpotifyIcon';
import { YoutubeIcon } from './YoutubeIcon';
import { AppleMusicIcon } from './AppleMusicIcon';
import { SoundcloudIcon } from './SoundcloudIcon';
import type { TrackPlatformLinks } from '@/lib/data/music';

interface Track {
  id: string;
  name: string;
  artistName: string;
  albumArt: string | null;
  spotifyUrl: string;
  youtube?: string;
  appleMusic?: string;
  soundcloud?: string;
}

interface SpotifyTopTracksProps {
  tracks: readonly TrackPlatformLinks[];
  accentColor?: string;
}

interface PlatformButton {
  key: string;
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

function TrackSkeleton({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl animate-pulse"
      style={{ border: `1px solid ${accentColor}15` }}
    >
      <div className="shrink-0 rounded" style={{ width: '2rem', height: '1.25rem', background: `${accentColor}20` }} />
      <div className="w-14 h-14 rounded-xl shrink-0" style={{ background: `${accentColor}18` }} />
      <div className="flex-1 space-y-2.5 min-w-0">
        <div className="h-4 rounded-lg w-3/5" style={{ background: `${accentColor}18` }} />
        <div className="h-3 rounded w-2/5" style={{ background: `${accentColor}10` }} />
      </div>
      <div className="hidden sm:block h-3 rounded shrink-0" style={{ width: '9rem', background: `${accentColor}10` }} />
    </div>
  );
}

export function SpotifyTopTracks({
  tracks: trackLinks,
  accentColor = '#818cf8',
}: SpotifyTopTracksProps) {
  const t = useTranslations('why');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!trackLinks.length) {
      setLoading(false);
      setError(false);
      return;
    }
    setLoading(true);
    setError(false);
    let cancelled = false;
    const ids = trackLinks.map((t) => t.spotifyId);
    fetch(`/api/spotify/tracks?ids=${ids.join(',')}`)
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data?.tracks?.length) {
          const merged = data.tracks.map((track: Track) => {
            const links = trackLinks.find((t) => t.spotifyId === track.id);
            return {
              ...track,
              youtube: links?.youtube,
              appleMusic: links?.appleMusic,
              soundcloud: links?.soundcloud,
            };
          });
          setTracks(merged);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [trackLinks]);

  if (error) {
    return <p className="text-sm text-white/30 py-4">{t('topTracksError')}</p>;
  }

  return (
    <div className="space-y-2">
      {loading
        ? trackLinks.map((t) => <TrackSkeleton key={t.spotifyId} accentColor={accentColor} />)
        : tracks.map((track, index) => {
            const hovered = hoveredId === track.id;

            const platforms: PlatformButton[] = [
              {
                key: 'spotify',
                href: track.spotifyUrl,
                label: 'Spotify',
                color: '#1DB954',
                icon: <SpotifyIcon className="w-4 h-4" base />,
              },
              track.youtube && {
                key: 'youtube',
                href: track.youtube,
                label: 'YouTube',
                color: '#FF0000',
                icon: <YoutubeIcon className="w-4 h-4" accentColor="#FF0000" />,
              },
              track.appleMusic && {
                key: 'appleMusic',
                href: track.appleMusic,
                label: 'Apple Music',
                color: '#FA57C1',
                icon: <AppleMusicIcon className="w-4 h-4" accentColor="#FA57C1" />,
              },
              track.soundcloud && {
                key: 'soundcloud',
                href: track.soundcloud,
                label: 'SoundCloud',
                color: '#FF5500',
                icon: <SoundcloudIcon className="w-4 h-4" accentColor="#FF5500" />,
              },
            ].filter(Boolean) as PlatformButton[];

            return (
              <div
                key={track.id}
                className="group relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${hovered ? accentColor + '30' : accentColor + '15'}`,
                  transition: 'border-color 0.25s',
                }}
                onMouseEnter={() => setHoveredId(track.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}12, ${accentColor}04)`,
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                />

                {/* Track number */}
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

                {/* Album art */}
                <div className="relative z-10 shrink-0">
                  {track.albumArt ? (
                    <Image
                      src={track.albumArt}
                      alt={track.name}
                      width={56}
                      height={56}
                      className="rounded-xl object-cover"
                      unoptimized={false}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl" style={{ background: `${accentColor}20` }} />
                  )}
                </div>

                {/* Track info & platform buttons */}
                <div className="relative z-10 flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="min-w-0">
                    <p
                      className="font-headline font-bold truncate leading-tight text-white/[0.88] text-caption"
                    >
                      {track.name}
                    </p>
                    <p className="text-xs truncate mt-1 text-white/35">{track.artistName}</p>
                  </div>

                  {/* Platform buttons: only reveal on hover */}
                  <div className="flex items-center gap-2 flex-wrap sm:ml-auto sm:flex-nowrap opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 ease-out">
                    {platforms.map((platform) => (
                      <a
                        key={platform.key}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Escuchar "${track.name}" en ${platform.label}`}
                        title={platform.label}
                        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                        style={{
                          border: `1px solid ${platform.color}40`,
                          background: `${platform.color}12`,
                          transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${platform.color}25`;
                          e.currentTarget.style.borderColor = `${platform.color}80`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${platform.color}12`;
                          e.currentTarget.style.borderColor = `${platform.color}40`;
                        }}
                      >
                        {platform.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

      {/* Attribution */}
      <div className="pt-2 px-1 flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" style={{ fill: `${accentColor}40` }} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="text-xs" style={{ color: `${accentColor}40` }}>{t('topTracksAttribution')}</span>
      </div>
    </div>
  );
}
