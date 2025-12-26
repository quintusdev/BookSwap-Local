
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Repeat } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLanguage } from '@/context/language-context';

type BookCardProps = {
  book: {
    id: string;
    title: string;
    author: string;
    city: string;
    ownerName: string;
    status: 'available' | 'in-swap' | 'swapped';
    coverImage: (typeof PlaceHolderImages)[0];
  };
};

export function BookCard({ book }: BookCardProps) {
    const { t } = useLanguage();
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={book.coverImage.imageUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={book.coverImage.imageHint}
          />
           {book.status !== 'available' && (
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant={book.status === 'in-swap' ? 'secondary' : 'destructive' } className="capitalize">
                    {t(`status_${book.status}`)}
                </Badge>
             </div>
           )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{book.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{book.author}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t('book_card_available_in')} {book.city} {t('book_card_from')} {book.ownerName}
          </p>
          <Button 
            className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" 
            disabled={book.status !== 'available'}
          >
            <Repeat className="mr-2 h-4 w-4" />
            {t('book_card_request_swap')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
