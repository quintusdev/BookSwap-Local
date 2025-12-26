
'use client';

import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { mockBooks, mockUsers } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

const userBooks = mockBooks.filter((book) => book.ownerId === 'user-1');

export default function MyBooksPage() {
    const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('my_books_title')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('my_books_subtitle')}
          </p>
        </div>
        <AddBookDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userBooks.map((book) => (
          <Card key={book.id} className="flex flex-col">
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
                <Badge variant={book.status === 'available' ? 'default' : 'secondary'} className='capitalize'>
                    {t(`status_${book.status}`)}
                </Badge>
              </div>
              <BookActions />
            </CardHeader>
          </Card>
        ))}
        {userBooks.length === 0 && (
            <Card className="col-span-full flex flex-col items-center justify-center py-12">
                <CardHeader>
                    <CardTitle>{t('my_books_no_books_title')}</CardTitle>
                    <CardDescription>{t('my_books_no_books_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddBookDialog />
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

function AddBookDialog() {
    const { t } = useLanguage();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('my_books_add_new_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('my_books_dialog_title')}</DialogTitle>
          <DialogDescription>
            {t('my_books_dialog_desc')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t('my_books_dialog_book_title_label')}
            </Label>
            <Input id="title" placeholder="The Great Gatsby" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              {t('my_books_dialog_author_label')}
            </Label>
            <Input id="author" placeholder="F. Scott Fitzgerald" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              {t('my_books_dialog_isbn_label')}
            </Label>
            <Input id="isbn" placeholder="9780743273565 (Optional)" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              {t('my_books_dialog_city_label')}
            </Label>
            <Input id="city" defaultValue={mockUsers[0].city} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-primary hover:bg-primary/90">{t('my_books_dialog_add_book_button')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BookActions() {
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
            <DropdownMenuItem>{t('my_books_actions_mark_swapped')}</DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>{t('my_books_actions_delete')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
