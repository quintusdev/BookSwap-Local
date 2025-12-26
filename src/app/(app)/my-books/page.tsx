
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
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useCollection, addDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
});

type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  city: string;
  status: 'available' | 'in-swap' | 'swapped';
  coverImage: { imageUrl: string; };
  userId: string;
}

export default function MyBooksPage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const booksCollectionRef = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, 'users', user.uid, 'books');
    }, [firestore, user]);

    const { data: userBooks, isLoading } = useCollection<Book>(booksCollectionRef);

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
        {isLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
        {userBooks && userBooks.map((book) => (
          <Card key={book.id} className="flex flex-col">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div className="flex-shrink-0">
                 <Image
                  src={book.coverImage?.imageUrl || "https://picsum.photos/seed/1/80/120"}
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
              <BookActions bookId={book.id}/>
            </CardHeader>
          </Card>
        ))}
        {!isLoading && userBooks?.length === 0 && (
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
    const { user } = useUser();
    const firestore = useFirestore();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            author: '',
            isbn: '',
        }
    });

    async function onSubmit(values: z.infer<typeof bookSchema>) {
        if (!user) return;

        const booksCollection = collection(firestore, 'users', user.uid, 'books');
        
        // In a real app, we'd get user's city from their profile
        const userCity = 'New York'; 
        const randomImageId = Math.floor(Math.random() * 10) + 1;

        addDocumentNonBlocking(booksCollection, {
            ...values,
            userId: user.uid,
            city: userCity,
            status: 'available',
            coverImage: { imageUrl: `https://picsum.photos/seed/book${randomImageId}/200/300` }
        });

        form.reset();
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">{t('my_books_dialog_book_title_label')}</FormLabel>
                        <FormControl className="col-span-3">
                            <Input placeholder="The Great Gatsby" {...field} />
                        </FormControl>
                         <FormMessage className="col-span-4" />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="author" render={({field}) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">{t('my_books_dialog_author_label')}</FormLabel>
                        <FormControl className="col-span-3">
                            <Input placeholder="F. Scott Fitzgerald" {...field} />
                        </FormControl>
                        <FormMessage className="col-span-4" />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="isbn" render={({field}) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">{t('my_books_dialog_isbn_label')}</FormLabel>
                        <FormControl className="col-span-3">
                            <Input placeholder="9780743273565 (Optional)" {...field} />
                        </FormControl>
                         <FormMessage className="col-span-4" />
                    </FormItem>
                )} />
                 <DialogFooter>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">{t('my_books_dialog_add_book_button')}</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function BookActions({ bookId }: { bookId: string }) {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    const handleDelete = () => {
        if (!user) return;
        const bookRef = doc(firestore, 'users', user.uid, 'books', bookId);
        deleteDocumentNonBlocking(bookRef);
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
            <DropdownMenuItem>{t('my_books_actions_mark_swapped')}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className='text-destructive focus:text-destructive focus:bg-destructive/10'>
                {t('my_books_actions_delete')}
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

