'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, Lock, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const milestones = [
    { level: 1, name: "Partner Bronzo", swaps: 100, reward: "Badge sul profilo", unlocked: true },
    { level: 2, name: "Partner Argento", swaps: 500, reward: "Visibilità aumentata nella mappa", unlocked: true },
    { level: 3, name: "Partner Oro", swaps: 1500, reward: "Accesso a statistiche avanzate", unlocked: false },
    { level: 4, name: "Partner Platino", swaps: 5000, reward: "5% di sconto sull'abbonamento", unlocked: false },
]

export default function HubMilestonesPage() {
  const currentLevel = 2;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Milestone e Premi</h1>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Il Tuo Percorso</CardTitle>
          <CardDescription>
            Sblocca premi esclusivi e fai crescere il tuo status nella community di BookSwap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {milestones.map(m => (
                <Card key={m.level} className={m.unlocked ? 'border-primary' : ''}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className={m.unlocked ? 'text-primary' : 'text-muted-foreground'} />
                                {m.name}
                            </CardTitle>
                            <CardDescription>Richiede {m.swaps} scambi totali</CardDescription>
                        </div>
                        {m.unlocked ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : (
                            <Lock className="h-8 w-8 text-muted-foreground" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Premio: <Badge variant="outline">{m.reward}</Badge></p>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}
