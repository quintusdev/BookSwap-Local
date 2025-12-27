'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, HardDriveUpload } from 'lucide-react';
import Image from 'next/image';

export default function HubMaterialsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Materiali e QR Code</h1>
        </div>
       <Card>
        <CardHeader>
          <CardTitle>Il Tuo QR Code Univoco</CardTitle>
          <CardDescription>
            Esponi questo QR code nel tuo locale. Gli utenti lo scannerizzeranno per avviare la procedura di scambio.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-muted p-8">
                <Image src="https://placehold.co/256x256/000000/FFFFFF/png?text=IL_TUO%0AQR_CODE" alt="QR Code" width={256} height={256}/>
                <p className="text-sm text-muted-foreground text-center">Codice Locale: L0C-M1LAN-123</p>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Cartello da Banco</CardTitle>
                        <CardDescription>Un PDF pronto da stampare e posizionare sul bancone o su un tavolo.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Scarica PDF
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Istruzioni per lo Staff</CardTitle>
                        <CardDescription>Tre semplici passaggi per gestire uno scambio.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-decimal list-inside space-y-2 text-sm">
                            <li>L'utente mostra la schermata "Conferma Scambio".</li>
                            <li>Inserisci il codice che ti fornisce nella sezione "Conferma Scambi".</li>
                            <li>Se il codice è valido, lo scambio è confermato. Fatto!</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
