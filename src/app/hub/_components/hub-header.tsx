'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, QrCode, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { HubSidebarNav } from './hub-sidebar';

type LocationProfile = {
  name: string;
  subscription: {
    status: string;
  };
};

type UserProfile = {
  name?: string;
  email?: string;
  avatarUrl?: string;
  role?: 'reader' | 'intermediary' | 'admin';
  locationId?: string;
}

export function HubHeader() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  const locationDocRef = useMemoFirebase(() => {
    if (!userProfile?.locationId) return null;
    return doc(firestore, 'locations', userProfile.locationId);
  }, [firestore, userProfile]);
  const { data: locationProfile } = useDoc<LocationProfile>(locationDocRef);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <HubSidebarNav />
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold">{locationProfile?.name || 'Caricamento...'}</h1>
      </div>

      <Button asChild className="hidden md:flex">
        <Link href="/hub/confirm">
            <QrCode className='mr-2 h-4 w-4' />
            Conferma Scambio
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.name} />
              <AvatarFallback>{userProfile?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{userProfile?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/hub/settings">Impostazioni</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/support">Supporto</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/home">Torna all'app</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
