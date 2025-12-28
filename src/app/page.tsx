
'use client';

import { Button } from '@/components/ui/button';
import { LandingFooter } from '@/components/landing-footer';
import { LandingHeader } from '@/components/landing-header';
import { ArrowRight, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NewLandingPage() {
  
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full">
          <div className="container mx-auto grid min-h-[80vh] grid-cols-1 items-center gap-12 px-4 py-12 md:grid-cols-2 md:px-6">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
                Le storie non finiscono.
                <br />
                Cambiano mani.
              </h1>
              <p className="max-w-xl text-lg text-stone-700 md:text-xl">
                BookSwap Local è l'idea semplice che i libri che hai amato meritano nuove avventure. Scambiali nella tua città, riscopri i luoghi del cuore e incontra altri lettori come te.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/browse">
                    Sfoglia i libri <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                   <Link href="/diventa-intermediario">
                    <Store className="mr-2 h-5 w-5" /> Sei un intermediario?
                  </Link>
                </Button>
              </div>
            </div>
             <div className="flex items-center justify-center">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt="Una persona che legge un libro in un ambiente accogliente"
                  width={600}
                  height={600}
                  priority
                  className="aspect-square w-full max-w-md rounded-2xl object-cover shadow-2xl"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
