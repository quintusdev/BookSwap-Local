
'use client';

import Link from 'next/link';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

export function LandingFooter() {
    const { t } = useLanguage();
  return (
    <footer className="border-t bg-muted">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <Logo />
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} BookSwap Local. {t('footer_rights_reserved')}
        </p>
        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {t('footer_terms')}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {t('footer_privacy')}
          </Link>
           <Link href="/support-us" className="transition-colors hover:text-foreground">
            Supportaci
          </Link>
        </nav>
      </div>
    </footer>
  );
}
