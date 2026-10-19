import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { hasBearerSecret } from '@/lib/server/security';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    if (!hasBearerSecret(request, process.env.REVALIDATE_SECRET)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { path, type = 'path' } = body;

    if (typeof path !== 'string' || !path.startsWith('/')) {
      return NextResponse.json(
        { message: 'Path is required' },
        { status: 400 }
      );
    }

    if (type === 'path') {
      revalidatePath(path);
    } else if (type === 'layout') {
      revalidatePath(path, 'layout');
    } else if (type === 'page') {
      revalidatePath(path, 'page');
    }

    if (path.startsWith('/blog/') && path !== '/blog') {
      revalidatePath('/blog');
    }

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
