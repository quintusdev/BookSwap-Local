
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
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockWishlist } from '@/lib/placeholder-data';
import { useLanguage } from '@/context/language-context';

export default function WishlistPage() {
    const { t } = useLanguage();
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
        {mockWishlist.map((book) => (
          <Card key={book.id}>
            <CardHeader className="flex-row items-start justify-between gap-4">
               <div className="flex-shrink-0">
                <Image
                  src={book.coverImage.imageUrl}
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
              <WishActions />
            </CardHeader>
          </Card>
        ))}
         {mockWishlist.length === 0 && (
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('wishlist_add_to_wishlist_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('wishlist_dialog_title')}</DialogTitle>
          <DialogDescription>
            {t('wishlist_dialog_desc')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t('my_books_dialog_book_title_label')}
            </Label>
            <Input id="title" placeholder="Dune" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              {t('my_books_dialog_author_label')}
            </Label>
            <Input id="author" placeholder="Frank Herbert" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-primary hover:bg-primary/90">{t('wishlist_add_to_wishlist_button')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WishActions() {
    const { t } = useLanguage();
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
            <DropdownMenuItem className='text-destructive'>{t('wishlist_actions_remove')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
