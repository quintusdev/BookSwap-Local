'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function HubEventsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Gestione Eventi</h1>
        <Button className="ml-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          Crea Nuovo Evento
        </Button>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>I Tuoi Eventi</CardTitle>
          <CardDescription>
            Crea e gestisci eventi speciali per la community di BookSwap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Non hai ancora creato nessun evento.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
