
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type Choice = 'reader' | 'intermediary' | null;

export function IdentityChoiceForm() {
  const [choice, setChoice] = useState<Choice>(null);

  const handleReset = () => setChoice(null);

  if (choice === 'reader') {
    return <ReaderForm onBack={handleReset} />;
  }
  if (choice === 'intermediary') {
    return <IntermediaryForm onBack={handleReset} />;
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


function ReaderForm({ onBack }: { onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !city) {
            toast({ variant: 'destructive', title: 'Per favore, compila tutti i campi.' });
            return;
        }
        setIsSubmitting(true);

        const leadsCollection = collection(firestore, 'leads_readers');
        
        try {
            // 1. Save lead to Firestore
            await addDocumentNonBlocking(leadsCollection, {
                email,
                city,
                status: 'pending',
                source: 'landing_page',
                createdAt: serverTimestamp(),
            });

            toast({ title: 'Grazie!', description: 'Ti avviseremo non appena BookSwap sarà attivo nella tua città.' });
            setEmail('');
            setCity('');
        } catch (error) {
            console.error("Error submitting reader form:", error);
            toast({ variant: 'destructive', title: 'Qualcosa è andato storto', description: 'Non siamo riusciti a registrare il tuo interesse. Riprova più tardi.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto text-left">
        <h3 className="text-2xl font-bold text-center mb-2 font-sans">Sei dei nostri.</h3>
        <p className="text-center text-stone-700 mb-6">
            Lasciaci la tua email e la tua città. Ti avviseremo non appena BookSwap sarà attivo nella tua zona.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
            <Label htmlFor="reader-email" className="font-sans">La tua email</Label>
            <Input id="reader-email" type="email" placeholder="mario.rossi@email.com" className="py-6 text-base font-sans" value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmitting}/>
            </div>
            <div className="space-y-2">
            <Label htmlFor="reader-city" className="font-sans">La tua città</Label>
            <Input id="reader-city" type="text" placeholder="Es: Milano" className="py-6 text-base font-sans" value={city} onChange={e => setCity(e.target.value)} disabled={isSubmitting}/>
            </div>
            <Button type="submit" size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-white rounded-full px-8 py-6 text-lg font-sans" disabled={isSubmitting}>
                {isSubmitting ? 'Invio in corso...' : 'Avvisami'}
            </Button>
            <Button variant="link" size="sm" className="w-full text-stone-600 font-sans" onClick={onBack}>
                Torna alla scelta
            </Button>
        </form>
        </div>
    );
}

function IntermediaryForm({ onBack }: { onBack: () => void }) {
    const firestore = useFirestore();
    const { toast } = useToast();
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!businessName || !email || !city) {
            toast({ variant: 'destructive', title: 'Per favore, compila tutti i campi.' });
            return;
        }
        setIsSubmitting(true);
        
        const leadsCollection = collection(firestore, 'leads_partners');
        
        try {
            // 1. Save partner lead
            await addDocumentNonBlocking(leadsCollection, {
                businessName,
                contactEmail: email,
                city,
                status: 'pending_review',
                source: 'landing_page',
                createdAt: serverTimestamp(),
            });

            toast({ title: 'Candidatura inviata!', description: 'Grazie! Ti abbiamo inviato un\'email di conferma.' });
            setBusinessName('');
            setEmail('');
            setCity('');
        } catch (error) {
             console.error("Error submitting partner form:", error);
            toast({ variant: 'destructive', title: 'Qualcosa è andato storto', description: 'Non siamo riusciti a inviare la tua candidatura. Riprova più tardi.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto text-left">
        <h3 className="text-2xl font-bold text-center mb-2 font-sans">Porta nuove persone nel tuo locale.</h3>
        <p className="text-center text-stone-700 mb-6">
            Candidati al nostro programma Founding Partner. È gratuito, senza vincoli e riservato ai primi 15 locali per città.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="business-name" className="font-sans">Nome del locale</Label>
                <Input id="business-name" placeholder="Caffè Letterario" className="py-6 text-base font-sans" value={businessName} onChange={e => setBusinessName(e.target.value)} disabled={isSubmitting}/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="business-email" className="font-sans">Email di contatto</Label>
                <Input id="business-email" type="email" placeholder="contatti@caffe.it" className="py-6 text-base font-sans" value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmitting}/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="partner-city" className="font-sans">Città</Label>
                <Input id="partner-city" type="text" placeholder="Es: Firenze" className="py-6 text-base font-sans" value={city} onChange={e => setCity(e.target.value)} disabled={isSubmitting}/>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-sans" disabled={isSubmitting}>
                {isSubmitting ? 'Invio in corso...' : 'Invia la candidatura'}
            </Button>
            <Button variant="link" size="sm" className="w-full text-stone-600 font-sans" onClick={onBack}>
                Torna alla scelta
            </Button>
        </form>
        </div>
    );
}
