
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookHeart, MapPin, Users } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-stone-50 text-stone-800 font-serif">
      {/* Header Semplice */}
      <header className="py-6 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
            <Logo />
            <Button variant="ghost" asChild>
                <Link href="/diventa-intermediario">Sei un libraio o un barista?</Link>
            </Button>
        </div>
      </header>

      <main>
        {/* 1. L'Invito (Hero Section) */}
        <section className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-100 px-4 py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl leading-tight">
            E se le storie, invece di finire,
            <br />
            ricominciassero da un altro lettore?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-700">
            BookSwap Local è un'idea semplice: i libri che hai amato non meritano di prendere polvere.
            Meritano nuove mani, nuovi occhi e nuovi caffè in cui essere sfogliati.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-stone-800 hover:bg-stone-700 text-white rounded-full px-8 py-6 text-lg font-sans"
              onClick={() => document.getElementById('resta-in-contatto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Resta in contatto
            </Button>
          </div>
        </section>

        {/* 2. Il Perché (La Nostra Idea) */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">La nostra idea, in poche parole.</h2>
            <div className="mt-6 space-y-4 text-lg text-stone-700">
              <p>
                Crediamo che i libri non debbano viaggiare per corriere, chiusi in una scatola.
                Devono viaggiare tra le persone, nei luoghi che animano le nostre città.
              </p>
              <p>
                BookSwap Local non è un'app, non è un marketplace. È un invito a riscoprire il piacere dello scambio,
                supportando le librerie indipendenti, i caffè e gli spazi culturali che rendono unico ogni quartiere.
              </p>
            </div>
          </div>
        </section>
        
        {/* 3. Il Come (Libri, Luoghi, Persone) */}
        <section className="bg-stone-100 py-16 md:py-24">
           <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">Libri, luoghi, persone.</h2>
              <p className="mt-4 text-lg text-stone-700">Non serve altro.</p>
            </div>
          <div className="container mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-800">
                <BookHeart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-sans">Il Libro</h3>
              <p className="mt-2 text-stone-700">
                Un libro che hai finito cerca un nuovo lettore. Un altro che desideri è in attesa, sullo scaffale di qualcuno vicino a te.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-800">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-sans">Il Luogo</h3>
              <p className="mt-2 text-stone-700">
                Lo scambio non avviene online, ma nel tuo caffè preferito, nella piccola libreria dietro l'angolo. Un luogo sicuro, accogliente, reale.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-stone-800">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-sans">Le Persone</h3>
              <p className="mt-2 text-stone-700">
                Dietro ogni libro c'è una persona. Un incontro, una chiacchiera, una nuova connessione nata da una storia in comune.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Il Prossimo Capitolo (Form) */}
        <section id="resta-in-contatto" className="py-16 md:py-24">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">Il prossimo capitolo lo scriviamo insieme.</h2>
            <p className="mt-4 text-lg text-stone-700">
              Stiamo costruendo la prima community di BookSwap, città per città.
              Lasciaci la tua email e la tua città: ti avviseremo quando saremo pronti a partire vicino a te.
              Nessuno spam, solo una notifica. Promesso.
            </p>
            <form className="mt-10 mx-auto max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input id="email" type="email" placeholder="La tua email" className="py-6 text-base font-sans" />
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="city" className="sr-only">Città</Label>
                    <Input id="city" type="text" placeholder="La tua città (es. Milano)" className="py-6 text-base font-sans" />
                </div>
              </div>
              <div className="mt-8">
                <Button type="submit" size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-white rounded-full px-8 py-6 text-lg font-sans">
                  Avvisami
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

       {/* Footer Semplice */}
      <footer className="bg-stone-100 py-8">
        <div className="container mx-auto text-center text-stone-600 font-sans">
          <p>&copy; {new Date().getFullYear()} BookSwap Local. Un progetto nato per amore dei libri e dei luoghi.</p>
        </div>
      </footer>
    </div>
  );
}
