'use client';

interface SpotifyPlayerProps {
  artistId: string;
  artistName?: string;
}

export function SpotifyPlayer({ artistId, artistName = 'Listerineh' }: SpotifyPlayerProps) {
  return (
    <div className="w-full">
      {/* Spotify Web Player Embed */}
      <iframe
        src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`}
        width="100%"
        height="480"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"
      />
    </div>
  );
}
