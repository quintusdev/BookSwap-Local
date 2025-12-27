
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown, CheckCircle, Heart, Users, Sparkles } from 'lucide-react';

export default function DiventaIntermediarioPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-muted px-4 py-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Porta più persone nel tuo locale.
          <br />
          <span className="text-primary">Con i libri.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Diventa un punto di scambio ufficiale per la nostra community di lettori. Trasforma la passione per la cultura in nuovi clienti fedeli, senza sforzo.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            onClick={() => document.getElementById('founding-partner')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Candidati come Founding Partner <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Come funziona, in pratica?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Tre semplici passi. Zero complicazioni.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold">Esponi il QR Code</h3>
              <p className="mt-2 text-muted-foreground">
                Ti forniamo un QR code da esporre nel tuo locale. È il tuo simbolo di benvenuto per i lettori di BookSwap.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                 <span className="font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold">Accogli i Lettori</h3>
              <p className="mt-2 text-muted-foreground">
                I nostri utenti vengono da te per scambiare i loro libri in un ambiente sicuro e accogliente: il tuo.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                 <span className="font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold">Convalida lo Scambio</h3>
              <p className="mt-2 text-muted-foreground">
                Confermi lo scambio in due clic dalla tua dashboard. Nessun inventario, nessuna gestione. Solo persone.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why It Works Section */}
      <section className="bg-muted py-16 md:py-24">
         <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Perché il tuo locale ci guadagna?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Non vendi libri. Porti persone.</p>
          </div>
        <div className="container mx-auto mt-12 grid max-w-5xl items-start gap-10 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 flex-shrink-0 text-accent" />
            <div>
              <h3 className="text-xl font-bold">Più Clienti, Più Spesso</h3>
              <p className="mt-1 text-muted-foreground">
                Ogni scambio è una persona che entra, scopre il tuo locale e, molto probabilmente, consuma. È traffico fisico di qualità, non solo virtuale.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Heart className="h-8 w-8 flex-shrink-0 text-accent" />
            <div>
              <h3 className="text-xl font-bold">Un Cuore Culturale</h3>
              <p className="mt-1 text-muted-foreground">
                Diventi un punto di riferimento per la cultura nel tuo quartiere. Il tuo brand si lega alla lettura, alla socialità e a una community appassionata.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="h-8 w-8 flex-shrink-0 text-accent" />
            <div>
              <h3 className="text-xl font-bold">Semplice e a Rischio Zero</h3>
              <p className="mt-1 text-muted-foreground">
                Aderire al programma Founding Partner è gratuito e senza vincoli. Non gestisci libri, non hai costi nascosti. Solo vantaggi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Partner Section */}
      <section id="founding-partner" className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Programma Esclusivo</span>
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">Entra nel programma Founding Partner.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stiamo selezionando **10-15 locali** per lanciare BookSwap Local. I partner fondatori otterranno **6 mesi di servizio Pro gratuito**, visibilità massima sulla piattaforma e parteciperanno attivamente all'evoluzione del servizio.
          </p>
          <div className="mt-10 rounded-xl border-2 border-primary bg-card p-8 shadow-lg">
            <h3 className="text-2xl font-bold">Invia la tua candidatura</h3>
            <p className="mt-2 text-muted-foreground">
              Compila il modulo. Valuteremo ogni richiesta e ti contatteremo personalmente entro 48 ore.
            </p>
            <form className="mt-6 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nome del Locale</Label>
                <Input id="business-name" placeholder="Es: Caffè Letterario" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Nome del Referente</Label>
                <Input id="contact-name" placeholder="Mario Rossi" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email di Contatto</Label>
                <Input id="email" type="email" placeholder="contatti@caffeletterario.it" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Invia la mia candidatura
                </Button>
              </div>
            </form>
             <p className="mt-4 text-xs text-muted-foreground">
                Candidandoti, accetti di essere ricontattato per esplorare la partnership. Nessun vincolo, nessuna sorpresa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

    