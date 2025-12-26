
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
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { generateGeohash } from '@/lib/geo-utils';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  publicationYear: z.coerce.number().optional(),
  publisher: z.string().optional(),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
  notes: z.string().optional(),
});

type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  status: 'available' | 'in-swap' | 'swapped';
  imageUrls: string[];
  ownerId: string;
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
}

const bookConditions = [
    { value: 'new', label: 'New' },
    { value: 'like_new', label: 'Like New' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
];

export default function MyBooksPage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();

    // Querying the global 'books' collection for books owned by the current user.
    const booksCollectionRef = useMemoFirebase(() => {
        if (!user) return null;
        // This query is illustrative. For performance, you might not want to query the entire
        // global collection on the client. A backend function or more specific query is better.
        // For this example, we proceed.
        return query(collection(firestore, 'books'), where('ownerId', '==', user.uid));
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
                  src={book.imageUrls?.[0] || "https://picsum.photos/seed/1/80/120"}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow space-y-1">
                <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
                <div className='flex flex-col items-start gap-1 mt-1'>
                    <Badge variant={book.status === 'available' ? 'default' : 'secondary'} className='capitalize'>
                        {t(`status_${book.status}`)}
                    </Badge>
                     {book.condition && (
                        <Badge variant="outline" className='capitalize'>
                            {t(`condition_${book.condition}`)}
                        </Badge>
                    )}
                </div>
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
            publicationYear: undefined,
            publisher: '',
            condition: 'good',
            notes: '',
        }
    });

    async function onSubmit(values: z.infer<typeof bookSchema>) {
        if (!user) return;

        const booksCollection = collection(firestore, 'books');
        
        // In a real app, you'd get the user's location from their profile or GPS.
        // For now, we'll use a mock location for New York.
        const userLat = 40.7128;
        const userLng = -74.0060;
        const userCity = 'New York';
        
        // Simulate multiple image uploads
        const imageUrls = Array.from({ length: 3 }, (_, i) => 
            `https://picsum.photos/seed/book${Math.random() * 1000}/${200 + i*10}/${300 + i*10}`
        );
        
        const newBookRef = doc(booksCollection);

        addDocumentNonBlocking(booksCollection, {
            id: newBookRef.id,
            ownerId: user.uid,
            status: 'available',
            ...values,
            location: {
                lat: userLat,
                lng: userLng,
                city: userCity,
                geohash: generateGeohash(userLat, userLng),
            },
            imageUrls: imageUrls,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_book_title_label')}</FormLabel>
                        <FormControl>
                            <Input placeholder="The Great Gatsby" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="author" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_author_label')}</FormLabel>
                        <FormControl>
                            <Input placeholder="F. Scott Fitzgerald" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('my_books_dialog_condition_label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={t('my_books_dialog_condition_placeholder')} />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {bookConditions.map(c => (
                                <SelectItem key={c.value} value={c.value}>{t(`condition_${c.value}`)}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField control={form.control} name="publicationYear" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_publication_year_label')} (Optional)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="1925" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="publisher" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_publisher_label')} (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="Charles Scribner's Sons" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="isbn" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_isbn_label')} (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="9780743273565" {...field} />
                        </FormControl>
                         <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="notes" render={({field}) => (
                    <FormItem>
                        <FormLabel>{t('my_books_dialog_notes_label')} (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t('my_books_dialog_notes_placeholder')} {...field} />
                        </FormControl>
                         <FormMessage />
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
        const bookRef = doc(firestore, 'books', bookId);
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
