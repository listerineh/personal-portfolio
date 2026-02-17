'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { SpotifyPlayer } from '@/components/common/spotify-player';
import { ThemeToggleButton } from '@/components/common/theme-toggle-button';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MusicPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotifyButtonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = (navigator as any).hardwareConcurrency <= 2;
    const baseDuration = prefersReducedMotion ? 0 : (isLowEnd ? 0.3 : 0.5);
    
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: baseDuration,
    })
    .from(descriptionRef.current, {
      y: 25,
      opacity: 0,
      duration: baseDuration * 0.8,
    }, '-=0.2')
    .from(contentRef.current?.querySelectorAll('button, [role="button"]') || [], {
      y: 15,
      opacity: 0,
      stagger: 0.08,
      duration: baseDuration * 0.7,
    }, '-=0.15');

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: 100,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: isLowEnd ? 0 : 1,
        },
      });
    }
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup',
        '@id': 'https://listerineh.dev/why#musicgroup',
        name: 'Listerineh',
        alternateName: 'Sebastian Alvarez',
        description: 'Musician and software engineer exploring Lo-Fi Hip-Hop and experimental soundscapes',
        url: 'https://listerineh.dev/why',
        image: {
          '@type': 'ImageObject',
          url: 'https://listerineh.dev/images/sebastian_alvarez_photo.webp',
          width: 800,
          height: 800,
        },
        genre: ['Lo-Fi Hip-Hop', 'Electronic', 'Ambient'],
        sameAs: [
          'https://open.spotify.com/artist/0BdmyZL99TkXwGT5FiPNmt',
          'https://instagram.com/__listerineh',
        ],
        founder: {
          '@type': 'Person',
          '@id': 'https://listerineh.dev#person',
          name: 'Sebastian Alvarez',
          url: 'https://listerineh.dev',
          jobTitle: 'Musician & Software Engineer',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://listerineh.dev/why#webpage',
        name: 'Why Listerineh? | Lo-Fi Hip-Hop Artist & Software Engineer',
        description: 'Discover Listerineh - a musician and software engineer exploring Lo-Fi Hip-Hop, electronic, and ambient soundscapes.',
        url: 'https://listerineh.dev/why',
        isPartOf: {
          '@id': 'https://listerineh.dev#website',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': 'https://listerineh.dev#website',
        name: 'Listerineh',
        url: 'https://listerineh.dev',
        logo: {
          '@type': 'ImageObject',
          url: 'https://listerineh.dev/logo.png',
        },
      },
    ],
  };

  return (
    <div className="music-page flex flex-col min-h-screen bg-gradient-to-b from-white via-[#fafcfb] to-[#f5f8f6] dark:from-[#0a0f0d] dark:via-[#0f1410] dark:to-[#0a0f0d]">
      <Script
        id="music-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-[#1DB954] focus:text-white">
        Skip to main content
      </a>
      
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggleButton className="text-gray-600 dark:text-gray-300 hover:text-[#1DB954] hover:bg-transparent" />
      </div>

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="hero-section relative min-h-[90dvh] flex items-center justify-center py-20 pt-28 md:pt-20 overflow-hidden bg-gradient-to-b from-white via-[#fafcfb] to-transparent dark:from-[#0a0f0d] dark:via-[#0f1410] dark:to-transparent"
        >
          {/* Enhanced gradient background elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1DB954]/25 rounded-full blur-3xl opacity-20 -z-10 dark:opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1DB954]/15 rounded-full blur-3xl opacity-15 -z-10 dark:opacity-30" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#1DB954]/10 rounded-full blur-3xl opacity-10 -z-10 dark:opacity-20" />

          <div className="container mx-auto px-4 text-center z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[#1DB954] hover:text-[#1ed760] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </Link>

            <div className="flex justify-center mb-12">
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes pulse-glow {
                  0%, 100% { box-shadow: 0 0 20px rgba(29, 185, 84, 0.3); }
                  50% { box-shadow: 0 0 40px rgba(29, 185, 84, 0.5); }
                }
                .vinyl-record {
                  animation: spin 3s linear infinite;
                }
                .vinyl-container {
                  animation: pulse-glow 3s ease-in-out infinite;
                }
                :root {
                  --vinyl-main: #0d6b3a;
                  --vinyl-line: #ffffff;
                  --vinyl-center: #ffffff;
                  --vinyl-label: #0d6b3a;
                  --vinyl-dot: #ffffff;
                }
                :root.dark {
                  --vinyl-main: #1DB954;
                  --vinyl-line: #0a0f0d;
                  --vinyl-center: #0a0f0d;
                  --vinyl-label: #1DB954;
                  --vinyl-dot: #0a0f0d;
                }
              `}</style>
              <div className="vinyl-container p-6 bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 rounded-full border border-[#1DB954]/50 dark:bg-gradient-to-br dark:from-[#1DB954]/20 dark:to-[#1DB954]/10 dark:border-[#1DB954]/40 shadow-lg">
                <svg className="vinyl-record w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  {/* Vinyl record background */}
                  <circle cx="50" cy="50" r="48" fill="var(--vinyl-main)" />
                  
                  {/* Radial grooves pattern */}
                  <g strokeWidth="1" opacity="0.5">
                    <line x1="50" y1="2" x2="50" y2="10" stroke="var(--vinyl-line)" />
                    <line x1="70.7" y1="29.3" x2="66.5" y2="33.5" stroke="var(--vinyl-line)" />
                    <line x1="98" y1="50" x2="90" y2="50" stroke="var(--vinyl-line)" />
                    <line x1="70.7" y1="70.7" x2="66.5" y2="66.5" stroke="var(--vinyl-line)" />
                    <line x1="50" y1="98" x2="50" y2="90" stroke="var(--vinyl-line)" />
                    <line x1="29.3" y1="70.7" x2="33.5" y2="66.5" stroke="var(--vinyl-line)" />
                    <line x1="2" y1="50" x2="10" y2="50" stroke="var(--vinyl-line)" />
                    <line x1="29.3" y1="29.3" x2="33.5" y2="33.5" stroke="var(--vinyl-line)" />
                  </g>
                  
                  {/* Concentric circles for grooves */}
                  <circle cx="50" cy="50" r="42" fill="none" strokeWidth="1.5" opacity="0.5" stroke="var(--vinyl-line)" />
                  <circle cx="50" cy="50" r="36" fill="none" strokeWidth="1.5" opacity="0.5" stroke="var(--vinyl-line)" />
                  <circle cx="50" cy="50" r="30" fill="none" strokeWidth="1.5" opacity="0.5" stroke="var(--vinyl-line)" />
                  <circle cx="50" cy="50" r="24" fill="none" strokeWidth="1.5" opacity="0.5" stroke="var(--vinyl-line)" />
                  
                  {/* Center label */}
                  <circle cx="50" cy="50" r="18" fill="var(--vinyl-center)" />
                  <circle cx="50" cy="50" r="12" fill="var(--vinyl-label)" opacity="0.9" />
                  
                  {/* Rotation indicator dot */}
                  <circle cx="50" cy="15" r="2.5" fill="var(--vinyl-dot)" />
                  
                  {/* Center spindle */}
                  <circle cx="50" cy="50" r="4" fill="var(--vinyl-dot)" />
                </svg>
              </div>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-8xl font-headline font-bold bg-gradient-to-r from-gray-900 via-[#1DB954] to-gray-900 dark:from-white dark:via-[#1DB954] dark:to-white bg-clip-text text-transparent mb-8"
            >
              Why Listerineh?
            </h1>

            <p
              ref={descriptionRef}
              className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-relaxed font-light"
            >
              Beyond code and algorithms, I'm a passionate musician. <span className="text-[#1DB954] font-semibold">Listerineh</span> is my artistic identity—where creativity meets sound, and the same problem-solving mindset I apply to software is expressed through music.
            </p>

            <div
              ref={contentRef}
              className="flex flex-col sm:flex-row justify-center items-center gap-6"
            >
              <a
                ref={spotifyButtonRef}
                href="https://open.spotify.com/artist/0BdmyZL99TkXwGT5FiPNmt?si=igQ5Eh2gS_6_xmBRPrmC8w"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-black font-bold rounded-full hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"/>
                  <path fill="#1DB954" d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"/>
                </svg>
                Listen on Spotify
              </a>
              <a
                href="https://instagram.com/__listerineh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-[#1DB954] text-[#1DB954] font-bold rounded-full hover:bg-[#1DB954]/15 hover:border-[#1ed760] hover:text-[#1ed760] transition-all duration-300 dark:hover:bg-[#1DB954]/20 dark:hover:text-[#1ed760] shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
                Follow me on IG
              </a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="story-section py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-[#1DB954]/3 to-transparent dark:via-[#1DB954]/5">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="space-y-8">
                <div>
                  <span className="inline-block px-4 py-2 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-sm font-semibold mb-4">The Story</span>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-gray-900 dark:text-white">
                    The Artist Behind the Code
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Music and software development share the same DNA—both require precision, creativity, and the ability to solve complex problems in elegant ways. What started in 2020 as a simple escape during the pandemic has evolved into something much deeper.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  As Listerineh, I explore instrumental Lo-Fi Hip-Hop and experimental soundscapes that blend mellow vibes with nostalgia. Each track captures late-night thoughts and memories, crafted with the same attention to detail I bring to my engineering projects.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  It's about creating meaningful auditory experiences that resonate with people—still exploring, still figuring things out, and inviting you to be part of the journey.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/25 to-[#1DB954]/5 rounded-3xl blur-3xl opacity-40 dark:opacity-60" />
                <div className="relative bg-gradient-to-br from-[#1DB954]/8 via-[#1DB954]/3 to-transparent border border-[#1DB954]/30 rounded-3xl p-10 backdrop-blur-md dark:bg-gradient-to-br dark:from-[#1DB954]/15 dark:via-[#1DB954]/5 dark:to-transparent dark:border-[#1DB954]/40 shadow-xl">
                  <div className="space-y-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                      <div className="w-3 h-3 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-2">Instruments</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Guitar • Bass • Piano • Production</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Multiinstrumentalist with experience in rock bands</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                      <div className="w-3 h-3 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-2">Production Style</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Lo-Fi Hip-Hop • Electronic • Ambient</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Blending instrumental depth with experimental soundscapes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                      <div className="w-3 h-3 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-2">Inspiration</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tech • Nature • Human Connection • Late-night Thoughts</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Capturing emotions and memories through sound</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                      <div className="w-3 h-3 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full mt-1.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-2">Vision</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Creating meaningful auditory experiences</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Still exploring, still figuring things out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spotify Embed Section */}
        <section className="spotify-section py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-[#1DB954]/8 to-transparent dark:bg-gradient-to-b dark:from-transparent dark:via-[#1DB954]/10 dark:to-transparent">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-sm font-semibold mb-4">Music</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-gray-900 dark:text-white text-center mb-6">
                Top Tracks
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                Listen to my top tracks and explore my music on Spotify. Each release is a journey through sound and emotion.
              </p>
            </div>
            <div>
              
              <SpotifyPlayer artistId="0BdmyZL99TkXwGT5FiPNmt" artistName="Listerineh" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-[#1DB954]/5 to-transparent dark:via-[#1DB954]/8 relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1DB954]/15 rounded-full blur-3xl opacity-20 -z-10 dark:opacity-30" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1DB954]/10 rounded-full blur-3xl opacity-15 -z-10 dark:opacity-25" />
          
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-sm font-semibold mb-6">Let's Collaborate</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold bg-gradient-to-r from-gray-900 via-[#1DB954] to-gray-900 dark:from-white dark:via-[#1DB954] dark:to-white bg-clip-text text-transparent mb-6">
                Let's Create Something Together
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              Whether it's a software project or a musical collaboration, I'm always open to new opportunities. Let's build something meaningful together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-black font-bold hover:shadow-2xl transition-all duration-300 shadow-lg px-10 py-6 text-lg"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1DB954] text-[#1DB954] font-bold hover:bg-[#1DB954]/15 hover:border-[#1ed760] hover:text-[#1ed760] dark:hover:bg-[#1DB954]/20 dark:hover:text-[#1ed760] transition-all duration-300 shadow-md hover:shadow-lg px-10 py-6 text-lg"
                >
                  Back to Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
