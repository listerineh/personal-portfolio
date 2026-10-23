/**
 * The one person who may edit decks: a GitHub account, by its numeric id (logins can be renamed; ids can't).
 * Fails closed: with no SLIDES_OWNER_GITHUB_ID configured, nobody is the owner.
 */
export function isOwnerGithubId(githubId: string | number | null | undefined, ownerId = process.env.SLIDES_OWNER_GITHUB_ID): boolean {
  const expected = ownerId?.trim();
  if (!expected || !/^\d+$/.test(expected) || githubId == null) return false;
  return String(githubId) === expected;
}
