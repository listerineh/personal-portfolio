import { notFound } from 'next/navigation';

// Any path no page matches renders this language's not-found page (app/[locale]/not-found.tsx).
export default function CatchAll() {
  notFound();
}
