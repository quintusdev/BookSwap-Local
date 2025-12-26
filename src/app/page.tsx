
'use client';

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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { useLanguage } from '@/context/language-context';

const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');

export default function Home() {
    const { t } = useLanguage();

    const howItWorks = [
      {
        icon: Search,
        title: t('how_it_works_step1_title'),
        description: t('how_it_works_step1_desc'),
      },
      {
        icon: Repeat,
        title: t('how_it_works_step2_title'),
        description: t('how_it_works_step2_desc'),
      },
      {
        icon: MapPin,
        title: t('how_it_works_step3_title'),
        description: t('how_it_works_step3_desc'),
      },
    ];

    const features = [
      {
        icon: Book,
        title: t('features_item1_title'),
        description: t('features_item1_desc'),
      },
      {
        icon: Users,
        title: t('features_item2_title'),
        description: t('features_item2_desc'),
      },
      {
        icon: Heart,
        title: t('features_item3_title'),
        description: t('features_item3_desc'),
      },
    ];

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
                {t('landing_title')}
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg md:text-xl">
                {t('landing_subtitle')}
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/signup">{t('get_started')}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/browse">{t('browse_books')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                {t('how_it_works_title')}
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                {t('how_it_works_subtitle')}
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
                {t('features_title')}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('features_subtitle')}
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
              {t('join_title')}
            </h2>
            <p className="max-w-md text-muted-foreground">
              {t('join_subtitle')}
            </p>
            <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90">
              <Link href="/signup">{t('create_your_account')}</Link>
            </Button>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
