import { HomePage } from '@/components/sections/home-page';
import { getHomeData } from '@/lib/data/home';
import { listPublishedDecks } from '@/features/slides/store';
import { deckSummariesByLocale } from '@/features/slides/summary';

/** Server entry: assembles slim, per-language home data so full posts and project stories stay off the client. */
export default async function Page() {
  const { byLocale, skills } = getHomeData();
  // Talks come from storage; if it's unreachable the home page simply goes without them.
  const talks = deckSummariesByLocale((await listPublishedDecks().catch(() => [])).slice(0, 6));
  return <HomePage byLocale={byLocale} skills={skills} talks={talks} />;
}
