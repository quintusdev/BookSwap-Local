
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BookHeart, Store, User, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Choice = 'reader' | 'intermediary' | null;

export function IdentityChoiceForm() {
  const [choice, setChoice] = useState<Choice>(null);

  const handleReset = () => setChoice(null);

  const ReaderForm = () => (
    <div className="w-full max-w-lg mx-auto text-left">
      <h3 className="text-2xl font-bold text-center mb-2 font-sans">Sei dei nostri.</h3>
      <p className="text-center text-stone-700 mb-6">
        Lasciaci la tua email e la tua città. Ti avviseremo non appena BookSwap sarà attivo nella tua zona.
      </p>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reader-email" className="font-sans">La tua email</Label>
          <Input id="reader-email" type="email" placeholder="mario.rossi@email.com" className="py-6 text-base font-sans" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reader-city" className="font-sans">La tua città</Label>
          <Input id="reader-city" type="text" placeholder="Es: Milano" className="py-6 text-base font-sans" />
        </div>
        <Button type="submit" size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-white rounded-full px-8 py-6 text-lg font-sans">
          Avvisami
        </Button>
         <Button variant="link" size="sm" className="w-full text-stone-600 font-sans" onClick={handleReset}>
            Torna alla scelta
        </Button>
      </form>
    </div>
  );

  const IntermediaryForm = () => (
    <div className="w-full max-w-lg mx-auto text-left">
       <h3 className="text-2xl font-bold text-center mb-2 font-sans">Porta nuove persone nel tuo locale.</h3>
      <p className="text-center text-stone-700 mb-6">
        Candidati al nostro programma Founding Partner. È gratuito, senza vincoli e riservato ai primi 15 locali per città.
      </p>
       <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name" className="font-sans">Nome del locale</Label>
          <Input id="business-name" placeholder="Caffè Letterario" className="py-6 text-base font-sans"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="business-email" className="font-sans">Email di contatto</Label>
          <Input id="business-email" type="email" placeholder="contatti@caffe.it" className="py-6 text-base font-sans"/>
        </div>
        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-sans">
          Invia la candidatura
        </Button>
         <Button variant="link" size="sm" className="w-full text-stone-600 font-sans" onClick={handleReset}>
            Torna alla scelta
        </Button>
      </form>
    </div>
  );
  
  if (choice) {
    return choice === 'reader' ? <ReaderForm /> : <IntermediaryForm />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
        <Card 
            className="text-center p-8 md:p-10 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 ease-in-out border-2 border-transparent hover:border-stone-800"
            onClick={() => setChoice('reader')}
        >
            <CardContent className="p-0">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-800">
                    <User className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold font-sans">Sono un lettore</h2>
                <p className="mt-2 text-stone-600">
                    Voglio scambiare i miei libri, scoprire nuove storie e vivere la mia città.
                </p>
            </CardContent>
        </Card>

        <Card 
            className="text-center p-8 md:p-10 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 ease-in-out border-2 border-transparent hover:border-primary"
            onClick={() => setChoice('intermediary')}
        >
            <CardContent className="p-0">
                 <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Building className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold font-sans">Ho un locale</h2>
                <p className="mt-2 text-stone-600">
                    Ho un bar, una libreria o uno spazio e voglio attirare una community di lettori.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}

