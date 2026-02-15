import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export const RedirectBanner = () => {
  const { t } = useTranslation('common');
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-accent border-b border-border text-primary text-sm text-center py-2 px-4 relative">
      <span className="pr-8">{t('redirectBanner')}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
