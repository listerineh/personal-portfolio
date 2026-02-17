import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

export type ReactionType = 'like' | 'love' | 'fire' | 'idea';

interface Reactions {
  like: number;
  love: number;
  fire: number;
  idea: number;
}

const mockReactions = new Map<string, Reactions>();

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

async function getReactions(slug: string): Promise<Reactions> {
  const redis = getRedisClient();
  
  if (redis) {
    const reactions = await redis.get<Reactions>(`blog:${slug}:reactions`);
    return reactions || { like: 0, love: 0, fire: 0, idea: 0 };
  } else {
    return mockReactions.get(`blog:${slug}:reactions`) || { like: 0, love: 0, fire: 0, idea: 0 };
  }
}

async function incrementReaction(slug: string, reaction: ReactionType): Promise<Reactions> {
  const redis = getRedisClient();
  
  if (redis) {
    const current = await getReactions(slug);
    current[reaction]++;
    await redis.set(`blog:${slug}:reactions`, current);
    return current;
  } else {
    const current = mockReactions.get(`blog:${slug}:reactions`) || { like: 0, love: 0, fire: 0, idea: 0 };
    current[reaction]++;
    mockReactions.set(`blog:${slug}:reactions`, current);
    return current;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const reactions = await getReactions(slug);
    
    return NextResponse.json(reactions, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5',
      },
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json({ like: 0, love: 0, fire: 0, idea: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { reaction } = body as { reaction: ReactionType };
    
    if (!['like', 'love', 'fire', 'idea'].includes(reaction)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }
    
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const reactionKey = `reaction:${slug}:${reaction}:${ip}`;
    const redis = getRedisClient();
    
    if (redis) {
      const hasReacted = await redis.get(reactionKey);
      
      if (hasReacted) {
        const reactions = await getReactions(slug);
        return NextResponse.json({ ...reactions, alreadyReacted: true });
      }
      
      await redis.set(reactionKey, '1', { ex: 86400 });
    }
    
    const reactions = await incrementReaction(slug, reaction);
    
    return NextResponse.json({ ...reactions, alreadyReacted: false });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return NextResponse.json({ error: 'Failed to add reaction' }, { status: 500 });
  }
}
