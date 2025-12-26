'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { CheckCircle, Users, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((img) => img.id === 'shop-logo-1');

export default function IntermediaryPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Aumenta il Traffico di Clienti',
      description: 'I nostri utenti verranno nel tuo locale per scambiare i libri, scoprendo la tua attività e diventando nuovi clienti abituali.',
    },
    {
      icon: CheckCircle,
      title: 'Diventa un Punto di Riferimento',
      description: 'Posizionati come un hub culturale nella tua zona. Associa il tuo brand alla lettura, alla cultura e alla comunità locale.',
    },
    {
      icon: Zap,
      title: 'Zero Sforzo, Massima Resa',
      description: 'Il nostro sistema è semplice. Ricevi un codice, lo convalidi e lo scambio è fatto. Niente inventario, niente complicazioni.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                    <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        PER LIBRERIE, BAR E BIBLIOTECHE
                    </span>
                  <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                    Porta Nuovi Clienti nel Tuo Negozio. Ogni Giorno.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Diventa un punto di scambio ufficiale di BookSwap. Attira una community di lettori appassionati, aumenta le tue vendite e diventa un cuore pulsante della cultura locale.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/intermediary/register">Attiva la Tua Prova Gratuita</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt="Un accogliente bar o libreria"
                        width={550}
                        height={550}
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                        data-ai-hint="cozy bookstore cafe"
                    />
                )}
             </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Trasforma i Lettori in Clienti Fedeli
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Essere un intermediario BookSwap non costa fatica e porta vantaggi reali.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12">
              {benefits.map((item, index) => (
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
        
        <section id="pricing" className="w-full bg-muted py-12 md:py-24">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Un Piano Semplice e Trasparente
            </h2>
            <p className="max-w-2xl text-muted-foreground md:text-xl">
              Nessun costo nascosto. Un unico abbonamento per avere accesso a tutti i vantaggi e far crescere la tua attività.
            </p>
            <div className="mt-8 w-full max-w-sm">
                <div className="rounded-xl border-2 border-primary bg-card p-8 text-left">
                    <h3 className="text-2xl font-bold">Piano Intermediario Pro</h3>
                    <p className="mt-4">
                        <span className="text-5xl font-bold">20€</span>
                        <span className="text-muted-foreground">/mese</span>
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">Prova gratuita di 30 giorni, disdici quando vuoi.</p>
                    <ul className="mt-6 space-y-3">
                        {['Visibilità sulla mappa', 'Dashboard con statistiche', 'Supporto dedicato', 'Accesso a eventi esclusivi'].map(feature => (
                             <li key={feature} className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-accent" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="mt-8 w-full bg-primary hover:bg-primary/90">
                        <Link href="/intermediary/register">Inizia la Prova Gratuita</Link>
                    </Button>
                </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
