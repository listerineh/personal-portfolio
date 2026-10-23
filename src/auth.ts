import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { isOwnerGithubId } from '@/features/slides/owner';

declare module 'next-auth' {
  interface Session {
    /** Numeric GitHub id of the signed-in account. */
    githubId?: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    githubId?: string;
  }
}

/**
 * Owner sign-in for the slides editor. Only one GitHub account gets a session at all: everyone else is turned away at
 * sign-in. Sessions are JWT cookies (no database); every write still re-checks the owner (src/features/slides/auth.ts).
 * Env: AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, SLIDES_OWNER_GITHUB_ID.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: '/slides/manage', error: '/slides/manage' },
  callbacks: {
    signIn: ({ account, profile }) => account?.provider === 'github' && isOwnerGithubId(profile?.id as number | undefined),
    jwt({ token, account, profile }) {
      if (account?.provider === 'github' && profile?.id != null) token.githubId = String(profile.id);
      return token;
    },
    session({ session, token }) {
      session.githubId = token.githubId;
      return session;
    },
  },
});
