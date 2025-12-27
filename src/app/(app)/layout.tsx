
'use client';

import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}
