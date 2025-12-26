
'use client';

import Image from 'next/image';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useCollection, addDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const wishSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
});

type WishlistItem = {
    id: string;
    title: string;
    author: string;
    coverImage: { imageUrl: string; };
    userId: string;
};

export default function WishlistPage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const wishlistCollectionRef = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, 'users', user.uid, 'wishlist');
    }, [firestore, user]);

    const { data: wishlistItems, isLoading } = useCollection<WishlistItem>(wishlistCollectionRef);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('wishlist_title_page')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('wishlist_subtitle')}
          </p>
        </div>
        <AddWishDialog />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
        {wishlistItems && wishlistItems.map((book) => (
          <Card key={book.id}>
            <CardHeader className="flex-row items-start justify-between gap-4">
               <div className="flex-shrink-0">
                <Image
                  src={book.coverImage.imageUrl || "https://picsum.photos/seed/wish1/80/120"}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow space-y-1">
                <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
                <Button variant="outline" size="sm" className="mt-2">
                    <Search className="mr-2 h-4 w-4" />
                    {t('wishlist_find_match_button')}
                </Button>
              </div>
              <WishActions wishId={book.id} />
            </CardHeader>
          </Card>
        ))}
         {!isLoading && wishlistItems?.length === 0 && (
            <Card className="col-span-full flex flex-col items-center justify-center py-12">
                <CardHeader>
                    <CardTitle>{t('wishlist_empty_title')}</CardTitle>
                    <CardDescription>{t('wishlist_empty_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddWishDialog />
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

function AddWishDialog() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof wishSchema>>({
        resolver: zodResolver(wishSchema),
        defaultValues: { title: '', author: '' }
    });

    async function onSubmit(values: z.infer<typeof wishSchema>) {
        if (!user) return;
        const wishlistCollection = collection(firestore, 'users', user.uid, 'wishlist');
        const randomImageId = Math.floor(Math.random() * 10) + 1;
        
        addDocumentNonBlocking(wishlistCollection, {
            ...values,
            userId: user.uid,
            coverImage: { imageUrl: `https://picsum.photos/seed/wish${randomImageId}/200/300` }
        });

        form.reset();
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('wishlist_add_to_wishlist_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('wishlist_dialog_title')}</DialogTitle>
          <DialogDescription>{t('wishlist_dialog_desc')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="title" render={({field}) => (
                     <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">{t('my_books_dialog_book_title_label')}</FormLabel>
                        <FormControl className="col-span-3">
                            <Input placeholder="Dune" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4" />
                    </FormItem>
                )} />
                <FormField control={form.control} name="author" render={({field}) => (
                     <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">{t('my_books_dialog_author_label')}</FormLabel>
                        <FormControl className="col-span-3">
                            <Input placeholder="Frank Herbert" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4" />
                    </FormItem>
                )} />
                <DialogFooter>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">{t('wishlist_add_to_wishlist_button')}</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function WishActions({ wishId }: { wishId: string }) {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const handleRemove = () => {
        if (!user) return;
        const wishRef = doc(firestore, 'users', user.uid, 'wishlist', wishId);
        deleteDocumentNonBlocking(wishRef);
    }

    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('my_books_actions_label')}</DropdownMenuLabel>
            <DropdownMenuItem>{t('my_books_actions_edit')}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemove} className='text-destructive focus:text-destructive focus:bg-destructive/10'>
                {t('wishlist_actions_remove')}
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
