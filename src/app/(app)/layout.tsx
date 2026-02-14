
'use client';

import React, { useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { doc, getFirestore } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
  profile?: {
    primaryCity?: any;
  }
}

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = getFirestore();
    const pathname = usePathname();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);
    
    useEffect(() => {
        const isLoading = isUserLoading || isProfileLoading;
        if (!isLoading) {
            if (!user) {
                router.replace('/login');
            } else if (!userProfile?.profile?.primaryCity && pathname !== '/onboarding/location') {
                router.replace('/onboarding/location');
            }
        }
    }, [user, isUserLoading, userProfile, isProfileLoading, router, pathname]);

    const isLoading = isUserLoading || isProfileLoading;

    if ((isLoading || !user || !userProfile?.profile?.primaryCity) && pathname !== '/onboarding/location') {
        return (
             <div className="flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-16 items-center">
                         <Skeleton className="h-10 w-32" />
                         <div className="flex-1" />
                         <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                </header>
                <main className="flex-1">
                    <div className="container py-8">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-64" />
                                    <Skeleton className="h-4 w-80" />
                                </div>
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-40 w-full" />
                                ))}
                            </div>
                            <Skeleton className="h-64 w-full" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return <>{children}</>;
}


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
        <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1">
            <div className="container py-8">{children}</div>
        </main>
        <AppFooter />
        </div>
    </AuthGuard>
  );
}
