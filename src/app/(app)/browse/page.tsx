import { BookCard } from '@/components/book-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { allCities, mockBooks } from '@/lib/placeholder-data';
import { Search } from 'lucide-react';

export default function BrowsePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Browse Books
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover thousands of books waiting for a new home. Filter by city to find swaps near you.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by title, author, or ISBN..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {allCities.map((city) => (
              <SelectItem key={city} value={city.toLowerCase().replace(' ', '-')}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
