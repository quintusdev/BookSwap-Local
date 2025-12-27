
'use client';

import Link from 'next/link';
import { ArrowRight, Book, Heart, Repeat, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockBooks, mockSwaps, mockUsers } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import { useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { BookCard } from '@/components/book-card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserProfile = {
    name?: string;
    favoriteGenres?: string[];
}

export default function HomePage() {
  const { t } = useLanguage();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  // The loading skeleton is now in the (app) layout, so we can just return null
  if (isUserLoading || !user) {
    return null;
  }

  const currentUser = mockUsers[0];
  const userSwaps = mockSwaps.filter(
    (swap) => swap.ownerId === currentUser.id || swap.requesterId === currentUser.id
  );
  const suggestedBooks = mockBooks.filter(book => userProfile?.favoriteGenres?.includes(book.genre) && book.status === 'available');


  const quickLinks = [
    {
      href: '/browse',
      title: t('home_quicklink_browse_title'),
      description: t('home_quicklink_browse_desc'),
      icon: Search,
    },
    {
      href: '/my-books',
      title: t('home_quicklink_mybooks_title'),
      description: t('home_quicklink_mybooks_desc'),
      icon: Book,
    },
    {
      href: '/wishlist',
      title: t('home_quicklink_wishlist_title'),
      description: t('home_quicklink_wishlist_desc'),
      icon: Heart,
    },
    {
      href: '/swaps',
      title: t('home_quicklink_swaps_title'),
      description: t('home_quicklink_swaps_desc'),
      icon: Repeat,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className='space-y-1'>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                {t('home_welcome')}, {userProfile?.name || user?.email}!
            </h1>
            <p className='text-muted-foreground'>{t('home_subtitle')}</p>
        </div>
        <Button asChild>
          <Link href="/browse">
            {t('home_new_swap_button')} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Card key={link.href} className="flex flex-col hover:bg-muted/50 transition-colors">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
              <div className="rounded-lg bg-primary/10 p-3">
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{link.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex-grow'>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </CardContent>
            <CardContent>
               <Button variant="outline" asChild className="w-full">
                    <Link href={link.href}>{t('home_go_to')} {link.title}</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>

       {suggestedBooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('home_suggested_books_title')}</CardTitle>
            <CardDescription>{t('home_suggested_books_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {suggestedBooks.slice(0, 5).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </CardContent>
        </Card>
      )}


      <Card>
        <CardHeader>
          <CardTitle>{t('home_recent_activity_title')}</CardTitle>
          <CardDescription>
            {t('home_recent_activity_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userSwaps.length > 0 ? (
              userSwaps.slice(0, 3).map((swap) => (
                <div
                  key={swap.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={currentUser.id === swap.ownerId ? mockUsers.find(u=>u.id === swap.requesterId)?.avatar.imageUrl : mockUsers.find(u=>u.id === swap.ownerId)?.avatar.imageUrl} />
                        <AvatarFallback>{(currentUser.id === swap.ownerId ? swap.requesterName : swap.ownerName).charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {t('home_swap_with')} {currentUser.id === swap.ownerId ? swap.requesterName : swap.ownerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {swap.ownerBookTitle} {t('home_swap_for')} {swap.requesterBookTitle}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <Badge variant={swap.status === 'completed' ? 'default' : 'secondary'} className='capitalize mb-1'>{t(`status_${swap.status}`)}</Badge>
                    <p className='text-xs text-muted-foreground'>{format(swap.swapDate, 'PPP')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                {t('home_no_recent_activity')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
