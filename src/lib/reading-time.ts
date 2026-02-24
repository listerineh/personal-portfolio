export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

export function formatReadingTime(minutes: number, locale: string = 'en'): string {
  const isSpanish = locale === 'es';
  
  if (minutes === 1) {
    return isSpanish ? '1 min de lectura' : '1 min read';
  }
  
  return isSpanish ? `${minutes} min de lectura` : `${minutes} min read`;
}
