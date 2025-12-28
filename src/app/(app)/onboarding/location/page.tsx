
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { City, CityAutocomplete } from '@/components/city-autocomplete';
import { useUser, useFirestore, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { doc, serverTimestamp } from 'firebase/firestore';

export default function LocationOnboardingPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [primaryCity, setPrimaryCity] = useState<City | null>(null);
  const [secondaryCity, setSecondaryCity] = useState<City | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const handleSave = async () => {
    if (!userDocRef || !primaryCity) {
      toast({ variant: 'destructive', title: 'Città Principale Obbligatoria', description: 'Per favore, seleziona la tua città principale.' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const profileData = {
        'profile.primaryCity': primaryCity,
        'profile.secondaryCity': secondaryCity || null,
        'profile.activeCity': 'primary',
        'profile.updatedAt': serverTimestamp(),
      };

      setDocumentNonBlocking(userDocRef, profileData, { merge: true });
      
      toast({ title: 'Profilo aggiornato!', description: 'Ti abbiamo portato alla tua nuova home page.' });
      router.push('/home');
    } catch (error) {
      console.error('Failed to update user cities:', error);
      toast({ variant: 'destructive', title: 'Errore', description: 'Non è stato possibile salvare le tue città. Riprova.' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Benvenuto in BookSwap!</CardTitle>
          <CardDescription>Per iniziare, dicci dove scambi i tuoi libri. Potrai sempre cambiare queste impostazioni dal tuo profilo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium">Città Principale (Obbligatoria)</label>
            <CityAutocomplete
              selectedCity={primaryCity}
              onSelectCity={setPrimaryCity}
              placeholder="Es. Milano, Lombardia"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Seconda Città (Opzionale)</label>
            <CityAutocomplete
              selectedCity={secondaryCity}
              onSelectCity={setSecondaryCity}
              placeholder="Es. Roma, Lazio"
            />
             <p className="text-xs text-muted-foreground">
              Utile se vivi o lavori in due posti diversi.
            </p>
          </div>
          <Button onClick={handleSave} className="w-full" disabled={!primaryCity || isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salva e Inizia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    