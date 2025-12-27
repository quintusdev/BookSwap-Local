
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LandingFooter } from '@/components/landing-footer';
import { LandingHeader } from '@/components/landing-header';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const donationOptions = [5, 10, 20];

export default function SupportUsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);
  const { toast } = useToast();

  const handleDonation = () => {
    // In a real app, this would trigger a payment flow (e.g., Stripe Checkout)
    toast({
      title: 'Grazie di cuore!',
      description: `La tua donazione di ${selectedAmount}€ ci aiuterà a far crescere la community.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-2xl py-12 px-6">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Supporta BookSwap Local
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                La tua donazione ci aiuta a mantenere la piattaforma gratuita per i lettori e a far crescere la nostra rete di partner locali.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <p>
                Scegli un importo per la tua donazione:
              </p>
              <div className="flex w-full justify-center gap-4">
                {donationOptions.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    className={cn(
                      'w-24 h-16 text-2xl font-bold',
                      selectedAmount === amount && 'bg-primary hover:bg-primary/90'
                    )}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    {amount}€
                  </Button>
                ))}
              </div>
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 mt-4"
                onClick={handleDonation}
                disabled={!selectedAmount}
              >
                Dona {selectedAmount}€
              </Button>
               <p className="text-xs text-muted-foreground text-center px-4">
                Nota: questa è una simulazione. Cliccando "Dona", non verrà addebitato alcun importo. In un'applicazione reale, verresti reindirizzato a un portale di pagamento sicuro.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
