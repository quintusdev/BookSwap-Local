
'use client';

import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                 <Skeleton className="h-8 w-24" />
                 <div className="flex-1 flex justify-center">
                    <div className='flex gap-2'>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                 </div>
                 <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </header>
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex items-center justify-between">
                <Skeleton className='h-10 w-1/3' />
                <Skeleton className='h-10 w-32' />
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                <Skeleton className='h-48 w-full' />
                <Skeleton className='h-48 w-full' />
                <Skeleton className='h-48 w-full' />
                <Skeleton className='h-48 w-full' />
             </div>
             <Skeleton className='h-64 w-full mt-8' />
          </div>
        </main>
      </div>
    );
  }


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
