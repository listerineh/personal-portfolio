import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isOwnerGithubId } from './owner';

/**
 * Owner checks for every write path. The sign-in callback already refuses anyone else, but each check here re-reads
 * the session and compares against the configured id, so a stale cookie or a changed env var can't keep access.
 */

export async function isOwner(): Promise<boolean> {
  const session = await auth();
  return isOwnerGithubId(session?.githubId);
}

export class NotOwnerError extends Error {
  constructor() {
    super('Only the owner can do this');
    this.name = 'NotOwnerError';
  }
}

/** For server actions: throws unless the owner is signed in. */
export async function requireOwner(): Promise<void> {
  if (!(await isOwner())) throw new NotOwnerError();
}

/** For route handlers: a 401 response to return early, or null when the owner is signed in. */
export async function ownerOnly(): Promise<NextResponse | null> {
  return (await isOwner()) ? null : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
