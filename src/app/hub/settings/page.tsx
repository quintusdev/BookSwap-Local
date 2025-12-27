'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function HubSettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Impostazioni</h1>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Profilo Locale</CardTitle>
          <CardDescription>
            Gestisci le informazioni pubbliche del tuo locale.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="location-name">Nome Locale</Label>
                <Input id="location-name" defaultValue="Caffè Letterario" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="location-address">Indirizzo</Label>
                <Input id="location-address" defaultValue="Via Roma 1, 20121 Milano MI" />
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Salva Modifiche</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abbonamento</CardTitle>
          <CardDescription>
            Visualizza lo stato del tuo abbonamento BookSwap Hub.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm">Stato attuale: <strong className='text-green-600'>ATTIVO</strong></p>
             <p className="text-sm text-muted-foreground">Prossimo rinnovo: 25 Agosto 2024</p>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button variant="outline">Gestisci Abbonamento</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
