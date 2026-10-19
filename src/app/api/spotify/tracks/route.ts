import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
  }

  try {
    // Spotify ids are 22 base62 characters; each one costs an outgoing request, so cap the batch.
    const trackIds = ids.split(',').map((id) => id.trim()).filter((id) => /^[A-Za-z0-9]{22}$/.test(id));
    if (trackIds.length === 0 || trackIds.length > 10) {
      return NextResponse.json({ error: 'Invalid ids' }, { status: 400 });
    }

    const results = await Promise.all(
      trackIds.map(async (id) => {
        const url = `https://open.spotify.com/track/${id}`;
        const res = await fetch(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`,
          { next: { revalidate: 86400 } }
        );
        if (!res.ok) return null;
        const data = await res.json();

        const rawTitle: string = data.title ?? '';
        const dashIndex = rawTitle.lastIndexOf(' - ');
        const name = dashIndex !== -1 ? rawTitle.slice(0, dashIndex) : rawTitle;
        const artistName = dashIndex !== -1 ? rawTitle.slice(dashIndex + 3) : '';

        return {
          id,
          name,
          artistName,
          albumArt: data.thumbnail_url ?? null,
          spotifyUrl: url,
        };
      })
    );

    const tracks = results.filter(Boolean);
    return NextResponse.json({ tracks });
  } catch (err) {
    console.error('[spotify/tracks]', err);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}
