import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpotifyTopTracks } from "@/components/ds/SpotifyTopTracks";
import type { TrackPlatformLinks } from "@/lib/data/music";

// Illustrative tracks for the story only.
const mockTracks = [
  {
    id: "a1",
    name: "Night Shift",
    artistName: "Listerineh",
    albumArt: null,
    spotifyUrl: "https://open.spotify.com/track/a1",
  },
  {
    id: "a2",
    name: "Deploy Friday",
    artistName: "Listerineh",
    albumArt: null,
    spotifyUrl: "https://open.spotify.com/track/a2",
  },
  {
    id: "a3",
    name: "Quito, 6 a.m.",
    artistName: "Listerineh",
    albumArt: null,
    spotifyUrl: "https://open.spotify.com/track/a3",
  },
];

const links: TrackPlatformLinks[] = [
  {
    spotifyId: "a1",
    youtube: "https://www.youtube.com/watch?v=a1",
    appleMusic: "https://music.apple.com/track/a1",
  },
  { spotifyId: "a2", soundcloud: "https://soundcloud.com/track/a2" },
  { spotifyId: "a3" },
];

/** Routes /api/spotify/tracks to fixtures so the real component renders without the network. */
function withMockedTracks(mode: "ok" | "error" | "pending"): Decorator {
  return function MockedTracks(Story) {
    if (typeof window !== "undefined") {
      const original = window.fetch.bind(window);
      window.fetch = (input, init) => {
        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.href
              : input.url;
        if (!url.includes("/api/spotify/tracks")) return original(input, init);
        if (mode === "pending") return new Promise<Response>(() => {});
        if (mode === "error")
          return Promise.resolve(new Response("{}", { status: 500 }));
        return Promise.resolve(
          new Response(JSON.stringify({ tracks: mockTracks }), { status: 200 }),
        );
      };
    }
    return <div className="w-[min(640px,92vw)]">
          <Story />
        </div>;
  };
}

const meta: Meta<typeof SpotifyTopTracks> = {
  title: "DS/SpotifyTopTracks",
  component: SpotifyTopTracks,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { tracks: links },
};

export default meta;
type Story = StoryObj<typeof SpotifyTopTracks>;

export const Default: Story = { decorators: [withMockedTracks("ok")] };

export const Loading: Story = { decorators: [withMockedTracks("pending")] };

export const ErrorState: Story = { decorators: [withMockedTracks("error")] };

export const Empty: Story = {
  args: { tracks: [] },
  decorators: [withMockedTracks("ok")],
};
