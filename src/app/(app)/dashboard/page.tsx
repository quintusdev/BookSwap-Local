
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockSwaps, mockUsers } from '@/lib/placeholder-data';
import { format } from 'date-fns';
import { Book, Users, QrCode, Trophy, TrendingUp, Star, Award } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Progress } from '@/components/ui/progress';

// --- Dati di Esempio per l'Hub ---
const hubStats = {
    totalSwaps: 42,
    monthlySwaps: 15,
    recurringUsers: [
        { name: mockUsers[0].name, swaps: 8, avatar: mockUsers[0].avatar.imageUrl },
        { name: mockUsers[1].name, swaps: 5, avatar: mockUsers[1].avatar.imageUrl },
        { name: mockUsers[3].name, swaps: 3, avatar: mockUsers[3].avatar?.imageUrl || '' },
    ],
    currentMilestone: { name: 'Punto Attivo', threshold: 10, icon: Award },
    nextMilestone: { name: 'Hub di Comunità', threshold: 50, icon: Star },
    activeBenefits: ["Badge 'Punto Attivo'", "Visibilità sulla mappa"],
};

const completedSwaps = mockSwaps.filter((s) => s.status === 'completed');

export default function DashboardPage() {
    const { t } = useLanguage();
    // In a real app, this page would be protected and only visible to users with the 'shop' or 'professional' role.
    
    const progressToNextMilestone = (hubStats.totalSwaps / hubStats.nextMilestone.threshold) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-3">
          <Trophy className="h-8 w-8 text-primary" />
          BookSwap Hub
        </h1>
        <p className="mt-2 text-muted-foreground">
          La tua dashboard per monitorare la crescita della community nel tuo locale.
        </p>
      </div>

      {/* --- Sezione Milestone --- */}
      <Card className="border-2 border-primary/50">
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
                <hubStats.nextMilestone.icon className='h-6 w-6 text-primary' />
                Prossima Ricompensa: {hubStats.nextMilestone.name}
            </CardTitle>
            <CardDescription>
                Raggiungi {hubStats.nextMilestone.threshold} scambi totali per sbloccare un mese di abbonamento gratuito e il badge esclusivo!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-between items-center mb-2">
                <div className='flex items-center gap-2'>
                    <hubStats.currentMilestone.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground">{hubStats.currentMilestone.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <hubStats.nextMilestone.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">{hubStats.nextMilestone.name}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Progress value={progressToNextMilestone} className="flex-1 h-3" />
                <span className='font-bold text-lg'>{hubStats.totalSwaps} / {hubStats.nextMilestone.threshold}</span>
            </div>
        </CardContent>
      </Card>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scambi Totali Verificati</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hubStats.totalSwaps}</div>
            <p className="text-xs text-muted-foreground">
              dall'inizio della tua attività.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scambi questo Mese</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hubStats.monthlySwaps}</div>
            <p className="text-xs text-muted-foreground">
              + {Math.round(hubStats.monthlySwaps / (hubStats.totalSwaps || 1) * 100)}% rispetto alla media
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clienti Fidelizzati</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{hubStats.recurringUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              utenti che hanno scambiato più di una volta qui.
            </p>
          </CardContent>
        </Card>
      </div>
      
       <div className='grid gap-4 lg:grid-cols-2'>
        <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-muted-foreground" />
                        Convalida uno Scambio
                    </CardTitle>
                    <CardDescription>
                       L'utente deve mostrarti il QR code dell'app e comunicarti il suo codice scambio.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="BSWAP-XXXXX" />
                        <Button type="submit">Conferma Scambio</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <Star className='h-5 w-5 text-yellow-500 fill-yellow-400'/>
                        I Tuoi Benefici Attivi
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='list-disc list-inside space-y-1 text-sm'>
                        {hubStats.activeBenefits.map(benefit => <li key={benefit}>{benefit}</li>)}
                    </ul>
                </CardContent>
            </Card>
       </div>


      <Card>
        <CardHeader>
          <CardTitle>Cronologia Scambi Verificati</CardTitle>
          <CardDescription>
            Elenco degli scambi confermati fisicamente nel tuo locale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('dashboard_table_swap_code')}</TableHead>
                <TableHead>{t('dashboard_table_book1')}</TableHead>
                <TableHead>{t('dashboard_table_book2')}</TableHead>
                <TableHead>{t('dashboard_table_users')}</TableHead>
                <TableHead className="text-right">{t('dashboard_table_date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedSwaps.map((swap) => (
                <TableRow key={swap.id}>
                  <TableCell>
                    <Badge variant="outline">{swap.checkinCode}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{swap.ownerBookTitle}</TableCell>
                  <TableCell className="font-medium">{swap.requesterBookTitle}</TableCell>
                  <TableCell>{swap.ownerName} & {swap.requesterName}</TableCell>
                  <TableCell className="text-right">{format(swap.swapDate, 'PPP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
