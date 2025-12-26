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

const currentUser = mockUsers[0];
const userSwaps = mockSwaps.filter(
  (s) => s.ownerId === currentUser.id || s.requesterId === currentUser.id
);

const pendingSwaps = userSwaps.filter((s) => s.status === 'pending');
const acceptedSwaps = userSwaps.filter((s) => s.status === 'accepted');
const pastSwaps = userSwaps.filter((s) => ['completed', 'cancelled'].includes(s.status));

export default function SwapsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">My Swaps</h1>
        <p className="mt-2 text-muted-foreground">
          Track your pending, active, and completed book swaps.
        </p>
      </div>

      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SwapList swaps={pendingSwaps} title="Pending Swaps" description="Awaiting response from other users."/>
        </TabsContent>
        <TabsContent value="accepted">
          <SwapList swaps={acceptedSwaps} title="Accepted Swaps" description="Ready for check-in at a partner library."/>
        </TabsContent>
        <TabsContent value="history">
            <SwapList swaps={pastSwaps} title="Swap History" description="Your record of past swaps."/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SwapList({ swaps, title, description }: { swaps: typeof mockSwaps, title: string, description: string }) {
    if (swaps.length === 0) {
        return (
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-center text-muted-foreground py-12'>No swaps in this category.</p>
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
    const isOwner = swap.ownerId === currentUser.id;
    const otherUser = isOwner ? mockUsers.find(u => u.id === swap.requesterId) : mockUsers.find(u => u.id === swap.ownerId);
    const myBook = isOwner ? mockBooks.find(b => b.id === swap.ownerBookId) : mockBooks.find(b => b.id === swap.requesterBookId);
    const theirBook = isOwner ? mockBooks.find(b => b.id === swap.requesterBookId) : mockBooks.find(b => b.id === swap.ownerBookId);
    
    const statusConfig = {
        pending: { icon: Clock, color: 'bg-yellow-500', text: 'Pending' },
        accepted: { icon: CheckCircle, color: 'bg-accent', text: 'Accepted' },
        completed: { icon: CheckCircle, color: 'bg-blue-500', text: 'Completed' },
        cancelled: { icon: XCircle, color: 'bg-destructive', text: 'Cancelled' },
    }

    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">Swap with {otherUser?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(swap.swapDate, { addSuffix: true })}
                    </p>
                </div>
                <Badge className={`${statusConfig[swap.status].color} text-white`}>{statusConfig[swap.status].text}</Badge>
            </div>
            
            <div className="flex items-center justify-around text-center">
                <div className="flex flex-col items-center gap-2">
                    <Image src={myBook?.coverImage.imageUrl || ''} alt={myBook?.title || ''} width={60} height={90} className="rounded-md object-cover" />
                    <p className="text-xs font-semibold max-w-[100px] truncate">{myBook?.title}</p>
                    <p className="text-xs text-muted-foreground">You give</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                 <div className="flex flex-col items-center gap-2">
                    <Image src={theirBook?.coverImage.imageUrl || ''} alt={theirBook?.title || ''} width={60} height={90} className="rounded-md object-cover" />
                    <p className="text-xs font-semibold max-w-[100px] truncate">{theirBook?.title}</p>
                    <p className="text-xs text-muted-foreground">You get</p>
                </div>
            </div>

            {swap.status === 'accepted' && (
                 <Card className='bg-muted'>
                    <CardContent className='p-4 text-center'>
                        <p className='font-semibold'>Check-in at {swap.shopName}</p>
                        <p className='text-sm text-muted-foreground'>Use this code at the counter:</p>
                        <p className='font-mono text-2xl font-bold text-primary tracking-widest mt-2'>{swap.checkinCode}</p>
                    </CardContent>
                </Card>
            )}
             {swap.status === 'pending' && !isOwner && (
                 <div className='flex gap-2 pt-2'>
                    <Button className='w-full bg-accent hover:bg-accent/90'>Accept Swap</Button>
                    <Button variant="outline" className='w-full'>Decline</Button>
                 </div>
            )}
        </div>
    )
}
