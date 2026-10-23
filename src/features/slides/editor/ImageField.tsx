'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ImageDropzone } from '@/components/ds';
import { fieldBase } from '@/components/ds/Input';
import { cn } from '@/lib/utils';
import { ACCEPT_ATTRIBUTE, uploadDeckImage, useDeckSlug, type UploadError } from './upload';

type ImageValue = { src?: string; alt?: string };

/** Drop, pick or paste an image (uploaded to the deck's storage), or type a path; plus its alt text. */
export function ImageField({
  label,
  value,
  errors,
  onChange,
}: {
  label: string;
  value: ImageValue;
  errors: { src?: string; alt?: string };
  onChange: (value: ImageValue) => void;
}) {
  const t = useTranslations('slidesEditor');
  const slug = useDeckSlug();
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState<UploadError | null>(null);
  const [showUrl, setShowUrl] = useState(false);
  const input = cn(fieldBase, 'min-h-10 px-3 text-sm');

  const upload = async (file: File) => {
    if (!slug) return;
    setBusy(true);
    setUploadError(null);
    const result = await uploadDeckImage(slug, file);
    setBusy(false);
    if (result.ok) onChange({ ...value, src: result.src });
    else setUploadError(result.error);
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1.5 text-sm font-medium">{label}</legend>
      <ImageDropzone
        src={value.src || undefined}
        alt={value.alt}
        accept={ACCEPT_ATTRIBUTE}
        busy={busy}
        error={uploadError ? t(`upload.error.${uploadError}`) : errors.src}
        onFile={(file) => void upload(file)}
        labels={{
          prompt: t('upload.prompt'),
          hint: t('upload.hint'),
          choose: t('upload.choose'),
          replace: t('upload.replace'),
          busy: t('upload.busy'),
        }}
      />
      <button
        type="button"
        aria-expanded={showUrl}
        onClick={() => setShowUrl(!showUrl)}
        className="self-start text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
      >
        {showUrl ? t('upload.hideUrl') : t('upload.useUrl')}
      </button>
      {showUrl && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-src`} className="text-sm font-medium">
            {t('field.src')}
          </label>
          <input id={`${id}-src`} className={input} value={value.src ?? ''} onChange={(e) => onChange({ ...value, src: e.target.value })} />
          <p className="text-xs text-muted-foreground">{t('imageHint')}</p>
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-alt`} className="text-sm font-medium">
          {t('field.alt')}
        </label>
        <input id={`${id}-alt`} className={input} value={value.alt ?? ''} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
        {errors.alt ? <p className="text-xs font-medium text-destructive">{errors.alt}</p> : <p className="text-xs text-muted-foreground">{t('altHint')}</p>}
      </div>
    </fieldset>
  );
}
