'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { confirmSwap } from '../_actions/confirm-swap';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

type SwapDetails = {
    id: string;
    bookTitle: string;
    userFromName: string;
    userToName: string;
    status: string;
};

type UserProfile = {
    locationId?: string;
}

export default function ConfirmSwapPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);
    const { data: userProfile } = useDoc<UserProfile>(userDocRef);

    const [swapCode, setSwapCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ swap: SwapDetails, message: string } | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!swapCode || !userProfile?.locationId) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await confirmSwap(swapCode, userProfile.locationId);
            if (response.error) {
                setError(response.error);
            } else {
                setResult({
                    swap: response.swap as SwapDetails,
                    message: response.message || 'Scambio confermato con successo!'
                });
            }
        } catch (e: any) {
            setError(e.message || 'Si è verificato un errore imprevisto.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Conferma uno Scambio</CardTitle>
                    <CardDescription>
                        Inserisci il codice di scambio fornito dall'utente per confermare la transazione. Il codice è nel formato XXXX-1234.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="swap-code"
                                placeholder="Es: BSWP-5678"
                                value={swapCode}
                                onChange={(e) => setSwapCode(e.target.value.toUpperCase())}
                                disabled={isLoading}
                                className="text-center text-lg tracking-widest font-mono h-12"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading || !swapCode}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Conferma Scambio'}
                        </Button>
                    </form>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Errore di Conferma</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {result && (
                        <Alert variant="default" className="mt-4 border-green-500 text-green-700">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <AlertTitle>Successo!</AlertTitle>
                            <AlertDescription>
                                {result.message} (ID: {result.swap.id.substring(0,6)}...)
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
