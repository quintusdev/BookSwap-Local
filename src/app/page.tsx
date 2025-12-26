import Image from 'next/image';
import Link from 'next/link';
import {
  Book,
  Heart,
  MapPin,
  Repeat,
  Search,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

const howItWorks = [
  {
    icon: Search,
    title: 'Find & Wishlist',
    description: 'Browse books available in your city. Add your favorite books to your wishlist.',
  },
  {
    icon: Repeat,
    title: 'Propose a Swap',
    description: 'Found a book you want? Propose a swap with one of your available books.',
  },
  {
    icon: MapPin,
    title: 'Meet & Exchange',
    description: 'Meet at a partner library to safely exchange your books using a unique swap code.',
  },
];

const features = [
  {
    icon: Book,
    title: 'Vast Library',
    description: 'Access a diverse collection of books from readers all over your city.',
  },
  {
    icon: Users,
    title: 'Community Focused',
    description: 'Connect with fellow book lovers and support local independent bookstores.',
  },
  {
    icon: Heart,
    title: 'Build Your Collection',
    description: 'Discover new authors and genres without spending a fortune. Your next favorite book is a swap away.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative h-[60vh] w-full md:h-[70vh]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <div className="container px-4 md:px-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Rediscover Reading. Swap Locally.
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl">
                Join a community of book lovers. Trade your read books for new adventures and support local bookstores in the process.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/browse">Browse Books</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Swapping books is as easy as 1-2-3.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full bg-muted py-12 md:py-24">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why You'll Love BookSwap
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're more than just a platform; we're a community built on the love for reading and local culture.
              </p>
            </div>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="w-full py-12 md:py-24">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Swap?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Sign up today and start your next reading adventure. It's free to join!
            </p>
            <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90">
              <Link href="/signup">Create Your Account</Link>
            </Button>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
