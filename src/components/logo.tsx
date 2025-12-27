import { BookHeart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)} aria-label="BookSwap Home">
      <BookHeart className="h-12 w-12 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg" />
      <span className="text-4xl font-bold text-foreground font-headline transition-colors duration-300 group-hover:text-primary">
        BookSwap
      </span>
    </Link>
  );
}
