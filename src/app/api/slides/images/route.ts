import { NextResponse } from 'next/server';
import { ownerOnly } from '@/features/slides/auth';
import { ImageRejectedError, processImage, storeDeckImage } from '@/features/slides/images';
import { SLUG_PATTERN } from '@/features/slides/schema';

export const runtime = 'nodejs';

/**
 * Owner-only image upload for the slides editor: multipart `file` + `slug`. Responds with the stored image's URL and
 * size, or an error code the editor turns into a message (type, size, unreadable, storage, slug).
 */
export async function POST(request: Request) {
  const denied = await ownerOnly();
  if (denied) return denied;

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  const slug = String(form?.get('slug') ?? '');
  if (!SLUG_PATTERN.test(slug)) return NextResponse.json({ error: 'slug' }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ error: 'type' }, { status: 400 });

  try {
    const image = await processImage(Buffer.from(await file.arrayBuffer()), file.type);
    const stored = await storeDeckImage(slug, image);
    if (!stored) return NextResponse.json({ error: 'storage' }, { status: 503 });
    return NextResponse.json(stored);
  } catch (error) {
    if (error instanceof ImageRejectedError) {
      return NextResponse.json({ error: error.reason }, { status: error.reason === 'size' ? 413 : 415 });
    }
    console.error('[slides] image upload failed', error);
    return NextResponse.json({ error: 'storage' }, { status: 500 });
  }
}
