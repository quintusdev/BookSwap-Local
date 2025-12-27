'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { HubSidebar } from './_components/hub-sidebar';
import { HubHeader } from './_components/hub-header';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
  name?: string;
  role?: 'reader' | 'intermediary' | 'admin';
  locationId?: string;
};

// This component acts as a guard for the hub routes
function HubAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    const isLoading = isUserLoading || isProfileLoading;
    if (!isLoading) {
      if (!user || (userProfile?.role !== 'intermediary' && userProfile?.role !== 'admin')) {
        router.replace('/home'); // Redirect non-intermediaries
      }
    }
  }, [user, userProfile, isLoading, router, isUserLoading, isProfileLoading]);

  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full">
         <div className="hidden border-r bg-muted/40 md:block w-64">
            <div className="flex h-full max-h-screen flex-col gap-2 p-4">
                 <Skeleton className="h-10 w-32 mb-4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
         </div>
        <div className="flex flex-col flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
             <Skeleton className="h-8 w-8 md:hidden" />
             <div className="w-full flex-1">
                <Skeleton className="h-8 w-1/2" />
             </div>
              <Skeleton className="h-10 w-10 rounded-full" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </main>
        </div>
      </div>
    );
  }

  if (user && (userProfile?.role === 'intermediary' || userProfile?.role === 'admin')) {
    return <>{children}</>;
  }

  // Fallback, though useEffect should have redirected
  return null;
}

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <HubAuthGuard>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <HubSidebar />
        <div className="flex flex-col">
          <HubHeader />
          {children}
        </div>
      </div>
    </HubAuthGuard>
  );
}
