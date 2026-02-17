import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

const mockKV = new Map<string, number>();

function getRedisClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (url && token) {
    return new Redis({
      url,
      token,
    });
  }
  return null;
}

async function getViews(slug: string): Promise<number> {
  const redis = getRedisClient();
  
  if (redis) {
    const views = await redis.get<number>(`blog:${slug}:views`);
    return views || 0;
  } else {
    return mockKV.get(`blog:${slug}:views`) || 0;
  }
}

async function incrementViews(slug: string): Promise<number> {
  const redis = getRedisClient();
  
  if (redis) {
    return await redis.incr(`blog:${slug}:views`);
  } else {
    const current = mockKV.get(`blog:${slug}:views`) || 0;
    const newValue = current + 1;
    mockKV.set(`blog:${slug}:views`, newValue);
    return newValue;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const views = await getViews(slug);
    
    return NextResponse.json({ views }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedisClient();
    
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const viewKey = `view:${slug}:${ip}`;
    
    if (redis) {
      const hasViewed = await redis.get(viewKey);
      
      if (hasViewed) {
        const views = await getViews(slug);
        return NextResponse.json({ views, incremented: false });
      }
      
      await redis.set(viewKey, '1', { ex: 3600 });
    }
    
    const views = await incrementViews(slug);
    
    return NextResponse.json({ views, incremented: true });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ views: 0, incremented: false }, { status: 500 });
  }
}
