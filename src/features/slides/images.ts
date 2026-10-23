import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { getBucket } from '@/lib/server/firebase';

/**
 * Slide images. Every upload is re-encoded before it is stored: WebP, at most 2560px on its long side, orientation
 * applied and all metadata dropped (EXIF can carry the GPS position of a phone photo). Files live in Cloud Storage
 * under slides/<deck>/ and are served through a Firebase download URL, so no bucket is ever public.
 */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // under Vercel's 4.5 MB request body limit
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'] as const;
const MAX_SIDE = 2560;

export const STORAGE_HOST = 'firebasestorage.googleapis.com';

export class ImageRejectedError extends Error {
  constructor(readonly reason: 'type' | 'size' | 'unreadable') {
    super(`Image rejected: ${reason}`);
    this.name = 'ImageRejectedError';
  }
}

export interface ProcessedImage {
  data: Buffer;
  width: number;
  height: number;
}

/** Validates and normalizes an upload. Pure (no storage), so it can be tested directly. */
export async function processImage(input: Buffer, contentType: string): Promise<ProcessedImage> {
  if (!(ACCEPTED_TYPES as readonly string[]).includes(contentType)) throw new ImageRejectedError('type');
  if (input.byteLength > MAX_UPLOAD_BYTES) throw new ImageRejectedError('size');
  try {
    const { data, info } = await sharp(input, { animated: contentType === 'image/gif', limitInputPixels: 50_000_000 })
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.pageHeight ?? info.height };
  } catch {
    throw new ImageRejectedError('unreadable');
  }
}

export function downloadUrl(bucket: string, path: string, token: string): string {
  return `https://${STORAGE_HOST}/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
}

/** Stores a processed image for a deck and returns its public URL; null when Cloud Storage isn't configured. */
export async function storeDeckImage(slug: string, image: ProcessedImage): Promise<{ src: string; width: number; height: number } | null> {
  const bucket = getBucket();
  if (!bucket) return null;
  const path = `slides/${slug}/${randomUUID()}.webp`;
  const token = randomUUID();
  await bucket.file(path).save(image.data, {
    resumable: false,
    contentType: 'image/webp',
    metadata: {
      // Each upload gets its own path, so the bytes behind a URL never change.
      cacheControl: 'public, max-age=31536000, immutable',
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });
  return { src: downloadUrl(bucket.name, path, token), width: image.width, height: image.height };
}
