import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { RedirectBanner } from './RedirectBanner';
import SchemaJsonLd from '@/components/SchemaJsonLd';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaJsonLd />
      <RedirectBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
