
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
import { mockSwaps, mockUsers, mockBooks } from '@/lib/placeholder-data';
import { ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/context/language-context';

const currentUser = mockUsers[0];
const userSwaps = mockSwaps.filter(
  (s) => s.ownerId === currentUser.id || s.requesterId === currentUser.id
);

const pendingSwaps = userSwaps.filter((s) => s.status === 'pending');
const acceptedSwaps = userSwaps.filter((s) => s.status === 'accepted');
const pastSwaps = userSwaps.filter((s) => ['completed', 'cancelled'].includes(s.status));

export default function SwapsPage() {
    const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t('swaps_title')}</h1>
        <p className="mt-2 text-muted-foreground">
          {t('swaps_subtitle')}
        </p>
      </div>

      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">{t('swaps_tab_pending')}</TabsTrigger>
          <TabsTrigger value="accepted">{t('swaps_tab_accepted')}</TabsTrigger>
          <TabsTrigger value="history">{t('swaps_tab_history')}</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SwapList swaps={pendingSwaps} title={t('swaps_pending_title')} description={t('swaps_pending_desc')}/>
        </TabsContent>
        <TabsContent value="accepted">
          <SwapList swaps={acceptedSwaps} title={t('swaps_accepted_title')} description={t('swaps_accepted_desc')}/>
        </TabsContent>
        <TabsContent value="history">
            <SwapList swaps={pastSwaps} title={t('swaps_history_title')} description={t('swaps_history_desc')}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SwapList({ swaps, title, description }: { swaps: typeof mockSwaps, title: string, description: string }) {
    const { t } = useLanguage();
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


function SwapCard({ swap }: { swap: typeof mockSwaps[0] }) {
    const { t } = useLanguage();
    const isOwner = swap.ownerId === currentUser.id;
    const otherUser = isOwner ? mockUsers.find(u => u.id === swap.requesterId) : mockUsers.find(u => u.id === swap.ownerId);
    const myBook = isOwner ? mockBooks.find(b => b.id === swap.ownerBookId) : mockBooks.find(b => b.id === swap.requesterBookId);
    const theirBook = isOwner ? mockBooks.find(b => b.id === swap.requesterBookId) : mockBooks.find(b => b.id === swap.ownerBookId);
    
    const statusConfig = {
        pending: { icon: Clock, color: 'bg-yellow-500' },
        accepted: { icon: CheckCircle, color: 'bg-accent' },
        completed: { icon: CheckCircle, color: 'bg-blue-500' },
        cancelled: { icon: XCircle, color: 'bg-destructive' },
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{t('home_swap_with')} {otherUser?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(swap.swapDate, { addSuffix: true })}
                    </p>
                </div>
                <Badge className={`${statusConfig[swap.status].color} text-white`}>{t(`status_${swap.status}`)}</Badge>
            </div>
            
            <div className="flex items-center justify-around text-center">
                <div className="flex flex-col items-center gap-2">
                    <Image src={myBook?.coverImage.imageUrl || ''} alt={myBook?.title || ''} width={60} height={90} className="rounded-md object-cover" />
                    <p className="text-xs font-semibold max-w-[100px] truncate">{myBook?.title}</p>
                    <p className="text-xs text-muted-foreground">{t('swaps_you_give')}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                 <div className="flex flex-col items-center gap-2">
                    <Image src={theirBook?.coverImage.imageUrl || ''} alt={theirBook?.title || ''} width={60} height={90} className="rounded-md object-cover" />
                    <p className="text-xs font-semibold max-w-[100px] truncate">{theirBook?.title}</p>
                    <p className="text-xs text-muted-foreground">{t('swaps_you_get')}</p>
                </div>
            </div>

            {swap.status === 'accepted' && (
                 <Card className='bg-muted'>
                    <CardContent className='p-4 text-center'>
                        <p className='font-semibold'>{t('swaps_check_in_at')} {swap.shopName}</p>
                        <p className='text-sm text-muted-foreground'>{t('swaps_use_code')}</p>
                        <p className='font-mono text-2xl font-bold text-primary tracking-widest mt-2'>{swap.checkinCode}</p>
                    </CardContent>
                </Card>
            )}
             {swap.status === 'pending' && !isOwner && (
                 <div className='flex gap-2 pt-2'>
                    <Button className='w-full bg-accent hover:bg-accent/90'>{t('swaps_accept_button')}</Button>
                    <Button variant="outline" className='w-full'>{t('swaps_decline_button')}</Button>
                 </div>
            )}
        </div>
    )
}
