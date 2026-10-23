import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Github, LogOut, Pencil } from 'lucide-react';
import { signIn, signOut } from '@/auth';
import { PageShell } from '@/components/layout';
import { Button, PageHeader, Pill } from '@/components/ds';
import { isOwner } from '@/features/slides/auth';
import { listDecksForOwner } from '@/features/slides/store';
import { NewDeckForm } from '@/features/slides/editor/NewDeckForm';
import { requestLocale } from '@/lib/metadata';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Slides',
  robots: { index: false, follow: false },
};

const HOME = '/slides/manage';

async function signInWithGithub() {
  'use server';
  await signIn('github', { redirectTo: HOME });
}

async function signOutOwner() {
  'use server';
  await signOut({ redirectTo: HOME });
}

/** The owner's desk: sign in with GitHub, then every deck, drafts included. Anyone else only sees the sign-in. */
export default async function ManageSlidesPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const t = await getTranslations('slidesManage');
  const owner = await isOwner();

  if (!owner) {
    const { error } = await searchParams;
    return (
      <PageShell>
        <PageHeader title={t('title')} titleSize="section" intro={t('signInIntro')}>
          <form action={signInWithGithub} className="mt-8">
            <Button type="submit">
              <Github aria-hidden="true" className="h-[18px] w-[18px]" />
              {t('signIn')}
            </Button>
          </form>
          {error && (
            <p role="alert" className="text-caption mt-6 text-destructive">
              {error === 'AccessDenied' ? t('accessDenied') : t('signInFailed')}
            </p>
          )}
        </PageHeader>
      </PageShell>
    );
  }

  const [decks, locale] = await Promise.all([listDecksForOwner(), requestLocale()]);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <PageShell>
      <PageHeader title={t('title')} titleSize="section" intro={t('ownerIntro', { count: decks.length })}>
        <form action={signOutOwner} className="mt-8">
          <Button type="submit" variant="secondary">
            <LogOut aria-hidden="true" className="h-[18px] w-[18px]" />
            {t('signOut')}
          </Button>
        </form>
      </PageHeader>
      <section className="px-gutter pb-24" aria-label={t('decks')}>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
          <NewDeckForm />
          <ul className="flex flex-col gap-3">
            {decks.map((deck) => (
              <li key={deck.slug} className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="min-w-0">
                  <Link href={`/slides/${deck.slug}/edit`} className="text-headline hover:underline">
                    {deck.title}
                  </Link>
                  <p className="text-meta mt-1 truncate text-muted-foreground">
                    <Link href={`/slides/${deck.slug}`} className="hover:underline">
                      /slides/{deck.slug}
                    </Link>{' '}
                    · v{deck.version} · {t('updated', { date: date.format(new Date(deck.updatedAt)) })}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <Pill size="sm" accent={deck.status === 'published' ? 'amber' : undefined}>
                    {t(`status.${deck.status}`)}
                  </Pill>
                  <Button href={`/slides/${deck.slug}/edit`} variant="secondary" size="sm">
                    <Pencil aria-hidden="true" className="h-4 w-4" />
                    {t('edit')}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
