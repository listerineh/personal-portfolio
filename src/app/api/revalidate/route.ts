import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { hasBearerSecret } from '@/lib/server/security';
import { locales } from '@/i18n/config';

// Pages live under app/[locale] (the middleware rewrites /blog to /es/blog), so a public path is revalidated once per
// language: /blog -> /en/blog and /es/blog.
const localized = (path: string) => locales.map((locale) => `/${locale}${path === '/' ? '' : path}`);

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

    const paths = localized(path);
    if (path.startsWith('/blog/') && path !== '/blog') paths.push(...localized('/blog'));
    for (const target of paths) {
      if (type === 'layout') revalidatePath(target, 'layout');
      else if (type === 'page') revalidatePath(target, 'page');
      else revalidatePath(target);
    }

    return NextResponse.json({
      revalidated: true,
      path,
      paths,
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
