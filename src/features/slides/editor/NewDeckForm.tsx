'use client';

import { useId, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { fieldBase } from '@/components/ds/Input';
import { cn } from '@/lib/utils';
import { createDeckAction, type CreateState } from '../actions';

const slugify = (title: string) =>
  title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

function Submit() {
  const t = useTranslations('slidesManage');
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-[0.9375rem] font-medium text-primary-foreground hover:brightness-[1.07] disabled:opacity-50"
    >
      <Plus aria-hidden="true" className="h-[18px] w-[18px]" />
      {t('create')}
    </button>
  );
}

/** New deck: a title, and the URL it will live at (suggested from the title until edited). */
export function NewDeckForm() {
  const t = useTranslations('slidesManage');
  const [state, action] = useFormState<CreateState, FormData>(createDeckAction, undefined);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const id = useId();
  const input = cn(fieldBase, 'min-h-11 px-4 text-[0.9375rem]');

  return (
    <form action={action} className="panel flex flex-col gap-4 p-5 sm:p-6">
      <h2 className="text-headline">{t('newDeck')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-title`} className="text-sm font-medium">{t("newTitle")}</label>
          <input
            id={`${id}-title`}
            name="title"
            required
            className={input}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-slug`} className="text-sm font-medium">{t("newSlug")}</label>
          <span className="flex items-center gap-2">
            <span className="text-meta shrink-0 text-muted-foreground">/slides/</span>
            <input
              id={`${id}-slug`}
              name="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              className={input}
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value);
              }}
            />
          </span>
        </div>
      </div>
      {state?.error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {t(`createError.${state.error}`)}
        </p>
      )}
      <Submit />
    </form>
  );
}
