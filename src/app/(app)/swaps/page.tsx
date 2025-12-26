
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
import { ArrowRight, Clock, CheckCircle, XCircle, QrCode, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useCollection, useMemoFirebase, updateDocumentNonBlocking, addDocumentNonBlocking, getDocument, setDocumentNonBlocking } from '@/firebase';
import { collection, query, where, doc, writeBatch, increment } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
    status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'confirmed';
    swapCode: string;
    checkInLibraryId: string;
    checkInLibraryName: string;
    createdAt: any;
    participantIds: string[];
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
    const confirmedSwaps = useMemo(() => userSwaps?.filter(s => s.status === 'confirmed') || [], [userSwaps]);
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">{t('swaps_tab_pending')}</TabsTrigger>
          <TabsTrigger value="accepted">{t('swaps_tab_accepted')}</TabsTrigger>
          <TabsTrigger value="confirmed">{t('swaps_tab_confirmed')}</TabsTrigger>
          <TabsTrigger value="history">{t('swaps_tab_history')}</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SwapList swaps={pendingSwaps} isLoading={isLoading} title={t('swaps_pending_title')} description={t('swaps_pending_desc')}/>
        </TabsContent>
        <TabsContent value="accepted">
          <SwapList swaps={acceptedSwaps} isLoading={isLoading} title={t('swaps_accepted_title')} description={t('swaps_accepted_desc')}/>
        </TabsContent>
         <TabsContent value="confirmed">
          <SwapList swaps={confirmedSwaps} isLoading={isLoading} title={t('swaps_confirmed_title')} description={t('swaps_confirmed_desc')}/>
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
    const otherUser = {
        id: isBookOwner ? swap.wishlistOwnerId : swap.bookOwnerId,
        name: isBookOwner ? swap.wishlistOwnerName : swap.bookOwnerName,
    };
    
    const myBook = { title: isBookOwner ? swap.bookTitle : swap.wishlistItemTitle, coverUrl: isBookOwner ? swap.bookCoverUrl : swap.wishlistItemCoverUrl };
    const theirBook = { title: isBookOwner ? swap.wishlistItemTitle : swap.bookTitle, coverUrl: isBookOwner ? swap.wishlistItemCoverUrl : swap.bookCoverUrl };
    
    const statusConfig = {
        pending: { icon: Clock, color: 'bg-yellow-500' },
        accepted: { icon: CheckCircle, color: 'bg-green-500' },
        confirmed: { icon: CheckCircle, color: 'bg-accent' },
        completed: { icon: CheckCircle, color: 'bg-blue-500' },
        cancelled: { icon: XCircle, color: 'bg-destructive' },
    }

    const handleDecline = () => {
        const swapRef = doc(firestore, 'swaps', swap.id);
        updateDocumentNonBlocking(swapRef, { status: 'cancelled' });
    }

    const handleAccept = async () => {
        const swapRef = doc(firestore, 'swaps', swap.id);
        updateDocumentNonBlocking(swapRef, { status: 'confirmed' });

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
             setDocumentNonBlocking(chatRef, {
                id: chatId,
                users: [bookOwnerId, wishlistOwnerId],
                userNames: {
                    [bookOwnerId]: swap.bookOwnerName,
                    [wishlistOwnerId]: swap.wishlistOwnerName,
                },
                userAvatars: {
                    [bookOwnerId]: otherProfileData?.avatarUrl,
                    [wishlistOwnerId]: myProfileData?.avatarUrl
                }
            }, { merge: true });
        }
        
        const messagesCol = collection(firestore, `chats/${chatId}/messages`);
        addDocumentNonBlocking(messagesCol, {
            senderId: 'system',
            text: `Hi! Your swap for '${swap.bookTitle}' has been accepted. Please arrange a time and place to meet at ${swap.checkInLibraryName}. Remember to be safe and respectful during your exchange. Once you agree, please confirm in this chat.`,
            timestamp: new Date(),
        });
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{t('home_swap_with')} {otherUser.name}</h3>
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

            {swap.status === 'confirmed' && (
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
                         <CompleteSwapDialog swap={swap} otherUser={otherUser} />
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

function CompleteSwapDialog({ swap, otherUser }: { swap: Swap, otherUser: { id: string; name: string } }) {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleCompleteSwap = async () => {
        if (!user || rating === 0) {
            toast({
                variant: 'destructive',
                title: t('swaps_rating_required_title'),
                description: t('swaps_rating_required_desc'),
            });
            return;
        }

        const batch = writeBatch(firestore);

        // 1. Update swap status
        const swapRef = doc(firestore, 'swaps', swap.id);
        batch.update(swapRef, { status: 'completed' });

        // 2. Add review
        const reviewRef = doc(collection(firestore, 'reviews'));
        batch.set(reviewRef, {
            id: reviewRef.id,
            swapId: swap.id,
            reviewerId: user.uid,
            revieweeId: otherUser.id,
            rating: rating,
            comment: comment,
            createdAt: new Date(),
        });

        // 3. Update user's average rating (this is a simplified approach)
        // A more robust solution would use a Cloud Function to calculate the average
        const userRef = doc(firestore, 'users', otherUser.id);
        // For simplicity, we just set the rating, but ideally you'd average it.
        // This is a placeholder for a more complex aggregation logic.
        const userDoc = await getDocument(userRef);
        const userData = userDoc.data();
        const currentRating = userData?.rating || 0;
        const reviewCount = userData?.reviewCount || 0;
        const newAverageRating = (currentRating * reviewCount + rating) / (reviewCount + 1);

        batch.update(userRef, {
            rating: newAverageRating,
            reviewCount: increment(1)
        });

        await batch.commit();

        toast({
            title: t('swaps_review_submitted_title'),
            description: t('swaps_review_submitted_desc'),
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full mt-4">{t('swaps_complete_button')}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('swaps_review_dialog_title')} {otherUser.name}</DialogTitle>
                    <DialogDescription>{t('swaps_review_dialog_desc')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label>{t('swaps_rating_label')}</Label>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <Star
                                        key={starValue}
                                        className={cn(
                                            "h-8 w-8 cursor-pointer",
                                            starValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                                        )}
                                        onClick={() => setRating(starValue)}
                                        onMouseEnter={() => setHover(starValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment">{t('swaps_comment_label')}</Label>
                        <Textarea
                            id="comment"
                            placeholder={t('swaps_comment_placeholder')}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCompleteSwap}>{t('swaps_submit_review_button')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

    