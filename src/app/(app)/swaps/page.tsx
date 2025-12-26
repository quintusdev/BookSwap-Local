'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, CheckCircle, XCircle, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useCollection, useMemoFirebase, updateDocumentNonBlocking, addDocumentNonBlocking, getDocument } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Swap = {
    id: string;
    bookOwnerId: string;
    bookOwnerName: string;
    bookId: string;
    bookTitle: string;
    bookCoverUrl: string;
    wishlistOwnerId: string;
    wishlistOwnerName: string;
    wishlistOwnerAvatar: string;
    wishlistItemId: string;
    wishlistItemTitle: string;
    wishlistItemCoverUrl: string;
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    swapCode: string;
    checkInLibraryId: string;
    checkInLibraryName: string;
    createdAt: any;
}


export default function SwapsPage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const swapsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(
            collection(firestore, 'swaps'),
            where('participantIds', 'array-contains', user.uid)
        );
    }, [firestore, user]);

    const { data: userSwaps, isLoading } = useCollection<Swap>(swapsQuery);

    const pendingSwaps = useMemo(() => userSwaps?.filter(s => s.status === 'pending') || [], [userSwaps]);
    const acceptedSwaps = useMemo(() => userSwaps?.filter(s => s.status === 'accepted') || [], [userSwaps]);
    const pastSwaps = useMemo(() => userSwaps?.filter(s => ['completed', 'cancelled'].includes(s.status)) || [], [userSwaps]);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t('swaps_title')}</h1>
        <p className="mt-2 text-muted-foreground">
          {t('swaps_subtitle')}
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">{t('swaps_tab_pending')}</TabsTrigger>
          <TabsTrigger value="accepted">{t('swaps_tab_accepted')}</TabsTrigger>
          <TabsTrigger value="history">{t('swaps_tab_history')}</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SwapList swaps={pendingSwaps} isLoading={isLoading} title={t('swaps_pending_title')} description={t('swaps_pending_desc')}/>
        </TabsContent>
        <TabsContent value="accepted">
          <SwapList swaps={acceptedSwaps} isLoading={isLoading} title={t('swaps_accepted_title')} description={t('swaps_accepted_desc')}/>
        </TabsContent>
        <TabsContent value="history">
            <SwapList swaps={pastSwaps} isLoading={isLoading} title={t('swaps_history_title')} description={t('swaps_history_desc')}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SwapList({ swaps, isLoading, title, description }: { swaps: Swap[], isLoading: boolean, title: string, description: string }) {
    const { t } = useLanguage();
    if (isLoading) {
        return (
             <Card className="mt-4">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        )
    }

    if (swaps.length === 0) {
        return (
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-center text-muted-foreground py-12'>{t('swaps_no_swaps_in_category')}</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {swaps.map(swap => <SwapCard key={swap.id} swap={swap} />)}
            </CardContent>
        </Card>
    )
}


function SwapCard({ swap }: { swap: Swap }) {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const isBookOwner = swap.bookOwnerId === user?.uid;
    const otherUserName = isBookOwner ? swap.wishlistOwnerName : swap.bookOwnerName;
    
    const myBook = { title: isBookOwner ? swap.bookTitle : swap.wishlistItemTitle, coverUrl: isBookOwner ? swap.bookCoverUrl : swap.wishlistItemCoverUrl };
    const theirBook = { title: isBookOwner ? swap.wishlistItemTitle : swap.bookTitle, coverUrl: isBookOwner ? swap.wishlistItemCoverUrl : swap.bookCoverUrl };
    
    const statusConfig = {
        pending: { icon: Clock, color: 'bg-yellow-500' },
        accepted: { icon: CheckCircle, color: 'bg-accent' },
        completed: { icon: CheckCircle, color: 'bg-blue-500' },
        cancelled: { icon: XCircle, color: 'bg-destructive' },
    }

    const handleDecline = () => {
        const swapRef = doc(firestore, 'swaps', swap.id);
        updateDocumentNonBlocking(swapRef, { status: 'cancelled' });
    }

    const handleAccept = async () => {
        const swapRef = doc(firestore, 'swaps', swap.id);
        updateDocumentNonBlocking(swapRef, { status: 'accepted' });

        // Create chat and send initial message
        if (!user) return;
        const bookOwnerId = swap.bookOwnerId;
        const wishlistOwnerId = swap.wishlistOwnerId;
        const chatId = [bookOwnerId, wishlistOwnerId].sort().join('_');
        const chatRef = doc(firestore, 'chats', chatId);
        const chatDoc = await getDocument(chatRef);

        const myProfile = await getDocument(doc(firestore, 'users', user.uid));
        const otherProfile = await getDocument(doc(firestore, 'users', isBookOwner ? wishlistOwnerId : bookOwnerId));
        const myProfileData = myProfile.data();
        const otherProfileData = otherProfile.data();


        if (!chatDoc.exists()) {
             addDocumentNonBlocking(chatRef, {
                users: [bookOwnerId, wishlistOwnerId],
                userNames: {
                    [bookOwnerId]: swap.bookOwnerName,
                    [wishlistOwnerId]: swap.wishlistOwnerName,
                },
                userAvatars: {
                    [bookOwnerId]: otherProfileData?.avatarUrl,
                    [wishlistOwnerId]: myProfileData?.avatarUrl
                }
            });
        }
        
        const messagesCol = collection(firestore, `chats/${chatId}/messages`);
        addDocumentNonBlocking(messagesCol, {
            senderId: 'system', // Or a specific system user ID
            text: `Hi! Your swap for '${swap.bookTitle}' has been accepted. Please arrange a time and place to meet at ${swap.checkInLibraryName}. Remember to be safe and respectful during your exchange. Once you agree, please confirm in this chat.`,
            timestamp: new Date(),
        });
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{t('home_swap_with')} {otherUserName}</h3>
                    {swap.createdAt && <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(swap.createdAt.toDate(), { addSuffix: true })}
                    </p>}
                </div>
                <Badge className={`${statusConfig[swap.status]?.color} text-white`}>{t(`status_${swap.status}`)}</Badge>
            </div>
            
            <div className="flex items-center justify-around text-center">
                <div className="flex flex-col items-center gap-2">
                    {myBook.coverUrl && <Image src={myBook.coverUrl} alt={myBook.title || ''} width={60} height={90} className="rounded-md object-cover" />}
                    <p className="text-xs font-semibold max-w-[100px] truncate">{myBook.title}</p>
                    <p className="text-xs text-muted-foreground">{t('swaps_you_give')}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                 <div className="flex flex-col items-center gap-2">
                    {theirBook.coverUrl && <Image src={theirBook.coverUrl} alt={theirBook.title || ''} width={60} height={90} className="rounded-md object-cover" />}
                    <p className="text-xs font-semibold max-w-[100px] truncate">{theirBook.title}</p>
                    <p className="text-xs text-muted-foreground">{t('swaps_you_get')}</p>
                </div>
            </div>

            {swap.status === 'accepted' && (
                 <Card className='bg-muted/50'>
                    <CardContent className='p-4 text-center'>
                        <div className="flex justify-center items-center gap-2">
                           <QrCode className="h-5 w-5 text-muted-foreground" />
                           <p className='font-semibold'>{t('swaps_check_in_at')} {swap.checkInLibraryName}</p>
                        </div>
                        <p className='text-sm text-muted-foreground mt-1'>{t('swaps_use_code')}</p>
                        <div className='bg-background border-2 border-dashed border-primary/50 rounded-lg p-3 mt-2 inline-block'>
                            <p className='font-mono text-3xl font-bold text-primary tracking-widest'>{swap.swapCode}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
             {swap.status === 'pending' && isBookOwner && (
                 <div className='flex gap-2 pt-2'>
                    <Button className='w-full bg-accent hover:bg-accent/90' onClick={handleAccept}>{t('swaps_accept_button')}</Button>
                    <Button variant="outline" className='w-full' onClick={handleDecline}>{t('swaps_decline_button')}</Button>
                 </div>
            )}
        </div>
    )
}
