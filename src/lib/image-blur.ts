export function getBlurDataURL(width: number = 10, height: number = 10): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(59,130,246);stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:rgb(147,51,234);stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export function getShimmerDataURL(width: number = 700, height: number = 475): string {
  const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="rgba(59,130,246,0.1)" />
          <stop offset="50%" stop-color="rgba(147,51,234,0.2)" />
          <stop offset="100%" stop-color="rgba(59,130,246,0.1)" />
          <animate attributeName="x1" values="-1;2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0;3" dur="2s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer)" />
    </svg>
  `;

  const base64 = Buffer.from(shimmer).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export function getBlogImageBlur(): string {
  return getShimmerDataURL(1200, 630);
}

export function getProjectImageBlur(): string {
  return getShimmerDataURL(800, 600);
}
