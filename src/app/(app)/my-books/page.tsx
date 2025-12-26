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

const userBooks = mockBooks.filter((book) => book.ownerId === 'user-1');

export default function MyBooksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            My Books
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage the books you've made available for swapping.
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
                    {book.status}
                </Badge>
              </div>
              <BookActions />
            </CardHeader>
          </Card>
        ))}
        {userBooks.length === 0 && (
            <Card className="col-span-full flex flex-col items-center justify-center py-12">
                <CardHeader>
                    <CardTitle>No books yet!</CardTitle>
                    <CardDescription>Add your first book to start swapping.</CardDescription>
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Enter the details of the book you want to add to your swap library.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" placeholder="The Great Gatsby" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input id="author" placeholder="F. Scott Fitzgerald" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input id="isbn" placeholder="9780743273565 (Optional)" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input id="city" defaultValue={mockUsers[0].city} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-primary hover:bg-primary/90">Add Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BookActions() {
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Mark as Swapped</DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
