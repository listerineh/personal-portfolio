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

function TrackSkeleton() {
  return (
    <li className="flex items-center gap-4 px-3 py-3" aria-hidden="true">
      <div className="h-4 w-6 rounded-full bg-foreground/10" />
      <div className="h-14 w-14 shrink-0 rounded-[12px] bg-foreground/10" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="h-4 w-3/5 rounded-full bg-foreground/10" />
        <div className="h-3 w-2/5 rounded-full bg-foreground/[0.07]" />
      </div>
    </li>
  );
}

export function SpotifyTopTracks({
  tracks: trackLinks,
  accentColor = '#D97706',
}: SpotifyTopTracksProps) {
  const t = useTranslations('why');
  // Results are keyed by the requested ids, so loading/error are derived instead of set in the effect.
  const requestKey = trackLinks.map((link) => link.spotifyId).join(',');
  const [result, setResult] = useState<{ key: string; tracks: Track[] } | { key: string; error: true } | null>(null);
  const current = result?.key === requestKey ? result : null;
  const loading = trackLinks.length > 0 && current === null;
  const error = current !== null && 'error' in current;
  const tracks = current !== null && 'tracks' in current ? current.tracks : [];

  useEffect(() => {
    if (!requestKey) return;
    let cancelled = false;
    fetch(`/api/spotify/tracks?ids=${requestKey}`)
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data?.tracks?.length) {
          const merged = data.tracks.map((track: Track) => {
            const links = trackLinks.find((link) => link.spotifyId === track.id);
            return { ...track, youtube: links?.youtube, appleMusic: links?.appleMusic, soundcloud: links?.soundcloud };
          });
          setResult({ key: requestKey, tracks: merged });
        } else {
          setResult({ key: requestKey, error: true });
        }
      })
      .catch(() => {
        if (!cancelled) setResult({ key: requestKey, error: true });
      });
    return () => {
      cancelled = true;
    };
    // trackLinks is identified by requestKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey]);

  if (error) {
    return <p className="py-4 text-base text-muted-foreground">{t('topTracksError')}</p>;
  }

  return (
    <div style={{ '--track-accent': accentColor } as React.CSSProperties}>
      <ol className="panel grid gap-0.5 p-2" aria-busy={loading || undefined}>
        {loading
          ? trackLinks.map((link) => <TrackSkeleton key={link.spotifyId} />)
          : tracks.map((track, index) => {
              const platforms: PlatformButton[] = [
                {
                  key: 'spotify',
                  href: track.spotifyUrl,
                  label: 'Spotify',
                  color: '#1DB954',
                  icon: <SpotifyIcon className="h-4 w-4" base />,
                },
                track.youtube && {
                  key: 'youtube',
                  href: track.youtube,
                  label: 'YouTube',
                  color: '#FF0000',
                  icon: <YoutubeIcon className="h-4 w-4" accentColor="#FF0000" />,
                },
                track.appleMusic && {
                  key: 'appleMusic',
                  href: track.appleMusic,
                  label: 'Apple Music',
                  color: '#FA57C1',
                  icon: <AppleMusicIcon className="h-4 w-4" accentColor="#FA57C1" />,
                },
                track.soundcloud && {
                  key: 'soundcloud',
                  href: track.soundcloud,
                  label: 'SoundCloud',
                  color: '#FF5500',
                  icon: <SoundcloudIcon className="h-4 w-4" accentColor="#FF5500" />,
                },
              ].filter(Boolean) as PlatformButton[];

              return (
                <li key={track.id} className="group flex items-center gap-4 rounded-[16px] px-3 py-3 transition-colors duration-snap ease-snap hover:bg-foreground/[0.04]">
                  <span className="text-meta w-6 shrink-0 text-right text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {track.albumArt ? (
                    <Image src={track.albumArt} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-[12px] object-cover shadow-card" />
                  ) : (
                    <div className="h-14 w-14 shrink-0 rounded-[12px] bg-[var(--track-accent)] opacity-30" />
                  )}

                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold leading-tight text-foreground">{track.name}</p>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{track.artistName}</p>
                    </div>

                    {/* Always visible on touch; revealed on hover or focus where hover exists. */}
                    <div className="flex flex-wrap items-center gap-1 sm:ml-auto sm:flex-nowrap [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-snap [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
                      {platforms.map((platform) => (
                        <a
                          key={platform.key}
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('listenOn', { track: track.name, platform: platform.label })}
                          title={platform.label}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-snap hover:bg-foreground/[0.08]"
                        >
                          {platform.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
      </ol>

      <p className="text-meta mt-3 flex items-center gap-2 text-muted-foreground">
        <SpotifyIcon className="h-3 w-3 shrink-0" base />
        {t('topTracksAttribution')}
      </p>
    </div>
  );
}
