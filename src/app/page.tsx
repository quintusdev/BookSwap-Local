
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, BookHeart, Building, CheckCircle, Heart, MapPin, Sparkles, Users, Zap } from 'lucide-react';
import { Logo } from '@/components/logo';
import { IdentityChoiceForm } from '@/components/identity-choice-form';
import Image from 'next/image';

// Sezione 1: Hero
const HeroSection = () => (
  <section className="relative flex min-h-[90vh] items-center bg-stone-100 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start">
            <Logo />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Dai una seconda vita ai tuoi libri.
            <br />
            <span className="text-primary">E alla tua città.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-700 md:text-xl mx-auto md:mx-0">
            BookSwap Local è un invito a riscoprire il piacere dello scambio, supportando i luoghi che animano il tuo quartiere. I libri non meritano di prendere polvere. Meritano nuove mani.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="bg-stone-800 hover:bg-stone-700 text-white rounded-full px-8 py-6 text-lg font-sans transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Scopri Come Funziona <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
            <Image 
                src="https://picsum.photos/seed/BSL-Hero/600/600" 
                alt="Una persona che sceglie un libro da uno scaffale in un caffè accogliente" 
                width={600}
                height={600}
                className="rounded-xl shadow-2xl"
                data-ai-hint="cozy cafe bookshelf"
            />
        </div>
      </div>
    </div>
  </section>
);

// Sezione 2: Come Funziona
const HowItWorks = () => {
    const steps = [
        { icon: BookHeart, title: "Il Libro", description: "Un libro che hai amato cerca un nuovo lettore. Un altro che desideri è sullo scaffale di qualcuno vicino a te." },
        { icon: MapPin, title: "Il Luogo", description: "Lo scambio non avviene online, ma nel tuo caffè preferito o nella piccola libreria dietro l'angolo. Un luogo sicuro, accogliente, reale." },
        { icon: Users, title: "Le Persone", description: "Dietro ogni libro c'è una persona. Un incontro, una chiacchiera, una nuova connessione nata da una storia in comune." }
    ];
    return (
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-stone-900">Libri, luoghi, persone.</h2>
          <p className="mt-4 text-lg text-stone-700">Non serve altro.</p>
        </div>
        <div className="container mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold font-sans">{step.title}</h3>
                    <p className="mt-2 text-stone-700">{step.description}</p>
                </div>
            ))}
        </div>
      </section>
    );
};

// Sezione 3: Benefici per i Lettori
const BenefitsReaders = () => {
    const benefits = [
        "**Risparmia e leggi di più**: Accedi a un catalogo infinito di libri gratuitamente.",
        "**Scopri tesori nascosti**: Trova edizioni rare o autori che non conoscevi.",
        "**Incontra la tua comunità**: Conosci altri lettori con le tue stesse passioni.",
        "**Sostieni il tuo quartiere**: Ogni scambio aiuta le attività commerciali locali a prosperare."
    ];
    
    const BenefitItem = ({ text }: { text: string }) => {
        const parts = text.split('**');
        return (
            <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent" />
                <p className="text-gray-800">
                    {parts.map((part, i) => i % 2 === 1 ? <span key={i} className="font-semibold">{part}</span> : part)}
                </p>
            </div>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-stone-100">
            <div className="container mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold tracking-tight text-stone-900">Per te, che ami leggere.</h2>
                        <p className="mt-4 text-lg text-stone-700">BookSwap Local è pensato per darti di più. Più storie, più incontri, più valore.</p>
                        <div className="mt-8 space-y-4">
                           {benefits.map((benefit, i) => <BenefitItem key={i} text={benefit} />)}
                        </div>
                    </div>
                    <div className="flex justify-center">
                         <Image 
                            src="https://picsum.photos/seed/BSL-Reader/500/500" 
                            alt="Una lettrice sorridente in un caffè con un libro in mano"
                            width={500}
                            height={500}
                            className="rounded-xl shadow-lg"
                            data-ai-hint="happy reader cafe"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sezione 4: Benefici per i Locali
const BenefitsLocals = () => {
     const benefits = [
        "**Aumenta il traffico di clienti**: Ogni scambio porta persone di qualità nel tuo locale.",
        "**Diventa un hub culturale**: Associa il tuo brand alla lettura e alla comunità.",
        "**Zero sforzo, massima resa**: Nessun inventario, nessuna gestione. Solo vantaggi.",
        "**Fidelizza i clienti**: Gli utenti tornano dove si sentono a casa."
    ];
    
    const BenefitItem = ({ text }: { text: string }) => {
        const parts = text.split('**');
        return (
            <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 flex-shrink-0 text-primary" />
                <p className="text-gray-800">
                    {parts.map((part, i) => i % 2 === 1 ? <span key={i} className="font-semibold">{part}</span> : part)}
                </p>
            </div>
        );
    }
    
    return (
        <section className="py-16 md:py-24 bg-white">
             <div className="container mx-auto max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center md:order-2">
                         <Image 
                            src="https://picsum.photos/seed/BSL-Local/500/500" 
                            alt="L'interno di un bar o libreria accogliente e ben arredato"
                            width={500}
                            height={500}
                            className="rounded-xl shadow-lg"
                            data-ai-hint="cozy bookstore interior"
                        />
                    </div>
                    <div className="md:order-1">
                        <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">PER BAR, LIBRERIE E SPAZI CULTURALI</span>
                        <h2 className="font-headline text-3xl font-bold tracking-tight text-stone-900 mt-2">Porta nuovi clienti. Ogni giorno.</h2>
                        <p className="mt-4 text-lg text-stone-700">Trasforma la passione per la cultura in una fonte di crescita per la tua attività.</p>
                        <div className="mt-8 space-y-4">
                           {benefits.map((benefit, i) => <BenefitItem key={i} text={benefit} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sezione 5: CTA Finale con Form
const SignupCTA = () => (
    <section id="signup-cta" className="py-16 md:py-24 bg-primary/90 text-white">
        <div className="container mx-auto max-w-3xl text-center">
             <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Il Prossimo Capitolo Inizia Qui</span>
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Unisciti alla rivoluzione del book-sharing locale.</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
                Scegli il tuo ruolo e lascia i tuoi dati. Ti avviseremo non appena BookSwap sarà attivo nella tua città. Nessuno spam, solo una notifica. Promesso.
            </p>
            <div className="mt-10">
                <IdentityChoiceForm />
            </div>
        </div>
    </section>
);


// Sezione 6: Footer
const Footer = () => (
  <footer className="bg-stone-800 text-stone-300 font-sans">
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Logo />
        </div>
        <div>
          <h3 className="font-semibold text-white tracking-wider">Progetto</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">Come Funziona</a></li>
            <li><a href="/support-us" className="hover:text-white transition-colors">Supportaci</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white tracking-wider">Legale</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Termini di Servizio</a></li>
          </ul>
        </div>
         <div>
          <h3 className="font-semibold text-white tracking-wider">Social</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-stone-700 pt-8 text-center text-sm text-stone-400">
        <p>&copy; {new Date().getFullYear()} BookSwap Local. Un progetto nato per amore dei libri e dei luoghi.</p>
      </div>
    </div>
  </footer>
);


export default function Page() {
    return (
        <div className="flex min-h-screen flex-col bg-stone-50 font-serif">
            <main className="flex-1">
                <HeroSection />
                <HowItWorks />
                <BenefitsReaders />
                <BenefitsLocals />
                <SignupCTA />
            </main>
            <Footer />
        </div>
    );
}

    