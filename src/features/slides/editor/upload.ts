'use client';

import { createContext, useContext } from 'react';

export type UploadError = 'type' | 'size' | 'unreadable' | 'storage' | 'slug' | 'unauthorized' | 'network';
export type UploadResult = { ok: true; src: string } | { ok: false; error: UploadError };

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
export const ACCEPT_ATTRIBUTE = ACCEPTED.join(',');
// The server takes up to 4 MB; bigger photos are shrunk here first (it re-encodes everything anyway).
const SEND_LIMIT = 3.5 * 1024 * 1024;
const MAX_SIDE = 2560;

/** Big stills are scaled to 2560px and re-encoded as WebP in the browser, so phone photos fit the upload limit. */
async function shrink(file: File): Promise<File> {
  if (file.size <= SEND_LIMIT || file.type === 'image/gif') return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9));
  return blob ? new File([blob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' }) : file;
}

export async function uploadDeckImage(slug: string, original: File): Promise<UploadResult> {
  if (!ACCEPTED.includes(original.type)) return { ok: false, error: 'type' };
  const file = await shrink(original).catch(() => original);
  if (file.size > 4 * 1024 * 1024) return { ok: false, error: 'size' };

  const body = new FormData();
  body.set('slug', slug);
  body.set('file', file);
  try {
    const response = await fetch('/api/slides/images', { method: 'POST', body });
    if (response.status === 401) return { ok: false, error: 'unauthorized' };
    const json = (await response.json().catch(() => ({}))) as { src?: string; error?: UploadError };
    return response.ok && json.src ? { ok: true, src: json.src } : { ok: false, error: json.error ?? 'storage' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/** The deck being edited, so nested image fields know where their uploads belong. */
const DeckSlugContext = createContext<string | null>(null);
export const DeckSlugProvider = DeckSlugContext.Provider;
export const useDeckSlug = () => useContext(DeckSlugContext);

/** The deck's look, so fields that render (diagrams) can match the slide. */
const DeckLookContext = createContext<{ accent: string; theme: 'light' | 'dark'; lang: string }>({ accent: '#d97706', theme: 'light', lang: 'en' });
export const DeckLookProvider = DeckLookContext.Provider;
export const useDeckLook = () => useContext(DeckLookContext);
