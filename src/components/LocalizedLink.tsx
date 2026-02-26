import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguagePrefix } from '@/hooks/useLanguagePrefix';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

/**
 * A Link component that automatically prepends the current language prefix.
 * Use this instead of react-router-dom's Link for all internal navigation.
 * External URLs (starting with http) are passed through unchanged.
 */
const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ to, ...props }, ref) => {
    const { localizedPath } = useLanguagePrefix();

    // Don't localize external URLs or anchor links
    const resolvedTo = to.startsWith('http') || to.startsWith('#') || to.startsWith('mailto:')
      ? to
      : localizedPath(to);

    return <Link ref={ref} to={resolvedTo} {...props} />;
  }
);

LocalizedLink.displayName = 'LocalizedLink';

export { LocalizedLink };
export type { LocalizedLinkProps };
