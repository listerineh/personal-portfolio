import { HomePage } from '@/components/sections/home-page';
import { getHomeData } from '@/lib/data/home';

/** Server entry: assembles slim, per-language home data so full posts and project stories stay off the client. */
export default function Page() {
  const { byLocale, skills } = getHomeData();
  return <HomePage byLocale={byLocale} skills={skills} />;
}
