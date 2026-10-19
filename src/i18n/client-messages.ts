import type { AbstractIntlMessages } from "next-intl";
import type { Locale } from "./config";

/**
 * Messages for a language switched to in the browser. The server already sends the visitor's language, so only the
 * other one is fetched, once, when it is first needed (or hovered). Browser-only: never touched during SSR.
 */
const loaded: Partial<Record<Locale, AbstractIntlMessages>> = {};
const pending: Partial<Record<Locale, Promise<AbstractIntlMessages>>> = {};

export function loadedMessages(
  locale: Locale,
): AbstractIntlMessages | undefined {
  return loaded[locale];
}

export function loadMessages(locale: Locale): Promise<AbstractIntlMessages> {
  const ready = loaded[locale];
  if (ready) return Promise.resolve(ready);
  pending[locale] ??= import(`../../messages/${locale}.json`).then((module) => {
    // The JSON includes arrays read via t.raw(), which AbstractIntlMessages does not model.
    const messages = module.default as unknown as AbstractIntlMessages;
    loaded[locale] = messages;
    return messages;
  });
  return pending[locale];
}
