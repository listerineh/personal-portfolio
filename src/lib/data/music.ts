export interface TrackPlatformLinks {
  spotifyId: string;
  youtube?: string;
  appleMusic?: string;
  soundcloud?: string;
}

export const musicLinks = {
  mn: {
    linktree: 'https://linktr.ee/margaritanugget',
    featuredVideoId: 's_YQWDwsnz8',
    topTracks: [
      {
        spotifyId: '1KB3Fw0lGbIPVXMd8S7qmj',
        youtube: 'https://youtu.be/qh5dCNUg9TE',
        appleMusic: 'https://music.apple.com/us/song/los-domingos-margarita-nugget-en-vivo/6796922244',
        soundcloud: 'https://soundcloud.com/margarita-nugget/los-domingos-margarita-nugget-svr-live-session-1',
      },
      {
        spotifyId: '5n2sybq605AfnNbpq4D0I4',
        youtube: 'https://youtu.be/0XizywqO1jY',
        appleMusic: 'https://music.apple.com/us/song/la-bicha-margarita-nugget-en-vivo/6796922238',
        soundcloud: 'https://soundcloud.com/margarita-nugget/la-bicha-margarita-nugget-svr-live-session-2',
      },
      {
        spotifyId: '6D9bPfYodRMkHF6JLGm6cV',
        youtube: 'https://youtu.be/O3k62dU5ir8',
        appleMusic: 'https://music.apple.com/us/song/estoy-perdiendo-el-semestre-en-vivo/6796922245',
        soundcloud: 'https://soundcloud.com/margarita-nugget/estoy-perdiendo-el-semestre-margarita-nugget-svr-live-session-3',
      },
    ] satisfies TrackPlatformLinks[],
  },
  ss: {
    spotifyUrl:      'https://open.spotify.com/artist/7zdc3lY28cLxwrB2mS3AhR?si=L9q2EKOKQRets5ANbLAazA',
    spotifyArtistId: '7zdc3lY28cLxwrB2mS3AhR',
    instagram:       'https://www.instagram.com/sofonessolares/',
    topTracks: [
      { spotifyId: '0QVpcOTHAkt0a6ePbFy2Lf', 
        appleMusic: 'https://music.apple.com/us/song/saudade/1813228038'
      },
      { spotifyId: '3atw9dXUvhJPG3Y1OuZvvh', 
        appleMusic: 'https://music.apple.com/us/song/christine/1744313691'
      },
      { 
        spotifyId: '6BzieLgJ0N5IH5EA1wBfbD',
        appleMusic: 'https://music.apple.com/us/song/ef%C3%ADmeros/1827378243'
      },
      { spotifyId: '0NxFNgR64B1IuLRL5DcYzZ', 
        appleMusic: 'https://music.apple.com/us/song/ut%C3%B3pica/1827378244'
      },
      { spotifyId: '7p1qQMRijhMYXuo4rFW2ld', 
        appleMusic: 'https://music.apple.com/us/song/quiero-ser/1827378242'
      },
    ] satisfies TrackPlatformLinks[],
  },
  solo: {
    spotifyUrl:      'https://open.spotify.com/artist/0BdmyZL99TkXwGT5FiPNmt?si=igQ5Eh2gS_6_xmBRPrmC8w',
    spotifyArtistId: '0BdmyZL99TkXwGT5FiPNmt',
    instagram:       'https://instagram.com/__listerineh',
    topTracks: [
      { 
        spotifyId: '6mvnUwGJfZq3ZzSkAiDg4t', 
        appleMusic: 'https://music.apple.com/us/song/tangerine/1821087821',
        youtube: 'https://youtu.be/-Uoz8WpF8fI',
      },
      { 
        spotifyId: '0mL12ecdOiTCLeoI4aElwe', 
        appleMusic: 'https://music.apple.com/us/song/scopolamine/1804698987',
        youtube: 'https://youtu.be/zy9ZAv5Y-Tk',
      },
      { 
        spotifyId: '7kGCXSXYOOLaLjfLzS9uXm',
        appleMusic: 'https://music.apple.com/us/song/katse/1804712612',
        youtube: 'https://youtu.be/S89nePZPVWE',
      },
      { 
        spotifyId: '614rgVSPE2VUjpg2VLfpw5',
        appleMusic: 'https://music.apple.com/us/song/grandma/1804712611',
        youtube: 'https://youtu.be/Bhg-I_JWBQ4',
      },
      { 
        spotifyId: '51TVSdDoqqlf13pxzlise6',
        appleMusic: 'https://music.apple.com/us/song/see-you-soon/1804712608',
        youtube: 'https://youtu.be/j5qHEDEtg_0',
      },
    ] satisfies TrackPlatformLinks[],
  },
} as const;
