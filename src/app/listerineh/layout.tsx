import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Why Listerineh? | Lo-Fi Hip-Hop Artist & Software Engineer',
  description: 'Discover Listerineh - a musician and software engineer exploring Lo-Fi Hip-Hop, electronic, and ambient soundscapes. Listen to original tracks on Spotify. Artist portfolio blending code and creativity.',
  keywords: [
    'Listerineh',
    'Lo-Fi Hip-Hop',
    'electronic music',
    'ambient music',
    'music producer',
    'software engineer',
    'artist portfolio',
    'independent musician',
    'Spotify artist',
    'music streaming',
  ],
  authors: [{ name: 'Sebastian Alvarez', url: 'https://listerineh.dev' }],
  creator: 'Sebastian Alvarez',
  publisher: 'Listerineh',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://listerineh.dev/listerineh',
    siteName: 'Listerineh - Musician & Developer',
    title: 'Why Listerineh? | Lo-Fi Hip-Hop Artist & Software Engineer',
    description: 'Discover Listerineh - exploring Lo-Fi Hip-Hop, electronic, and ambient soundscapes. Listen on Spotify.',
    images: [
      {
        url: '/images/sebastian_alvarez_photo.webp',
        width: 800,
        height: 800,
        alt: 'Listerineh - Music & Artist Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@listerineh',
    creator: '@listerineh',
    title: 'Why Listerineh? | Lo-Fi Hip-Hop Artist & Software Engineer',
    description: 'Discover Listerineh - exploring Lo-Fi Hip-Hop, electronic, and ambient soundscapes. Listen on Spotify.',
    images: ['/images/sebastian_alvarez_photo.webp'],
  },
  alternates: {
    canonical: 'https://listerineh.dev/listerineh',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Listerineh',
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
