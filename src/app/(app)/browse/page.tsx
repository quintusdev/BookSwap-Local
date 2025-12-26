
'use client';

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
import { useLanguage } from '@/context/language-context';

export default function BrowsePage() {
    const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('browse_title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('browse_subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder={t('browse_search_placeholder')} className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder={t('browse_filter_by_city')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('browse_all_cities')}</SelectItem>
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
