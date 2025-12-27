'use client';

import { BarChart, Book, Calendar, Download, QrCode, TrendingUp, Users, ChevronsRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { LineChart } from '@/app/hub/_components/line-chart';

// Mock Data
const kpiData = {
  totalSwaps: 1256,
  swaps30d: 184,
  swapsToday: 7,
  confirmRate: 98.7,
  uniqueUsers30d: 92,
  returningUsers30d: 34,
};

const recentActivity = [
  { id: 'SWAP-KJ89', status: 'confirmed', date: '2 ore fa', book1: 'The Midnight Library', book2: 'Project Hail Mary' },
  { id: 'SWAP-PLM3', status: 'confirmed', date: '5 ore fa', book1: 'Dune', book2: 'Klara and the Sun' },
  { id: 'SWAP-BGT5', status: 'pending', date: '1 giorno fa', book1: 'The Vanishing Half', book2: 'Circe' },
];

const nextMilestone = {
  name: 'Partner Argento',
  target: 1500,
  reward: 'Accesso a statistiche avanzate',
};

export default function HubDashboardPage() {
  const progress = (kpiData.totalSwaps / nextMilestone.target) * 100;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <KpiCard title="Scambi Totali" value={kpiData.totalSwaps} icon={Book} />
        <KpiCard title="Scambi (30 giorni)" value={kpiData.swaps30d} icon={TrendingUp} />
        <KpiCard title="Utenti Unici (30 giorni)" value={kpiData.uniqueUsers30d} icon={Users} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Andamento Scambi</CardTitle>
            <CardDescription>Ultimi 30 giorni.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart />
          </CardContent>
        </Card>

        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Prossimo Traguardo: {nextMilestone.name}</CardTitle>
                    <CardDescription>
                        Mancano {nextMilestone.target - kpiData.totalSwaps} scambi per sbloccare: <strong>{nextMilestone.reward}</strong>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="w-full" />
                    <div className="mt-2 flex justify-between text-sm font-medium">
                        <span>{kpiData.totalSwaps}</span>
                        <span>{nextMilestone.target}</span>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Azioni Rapide</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline"><Link href="/hub/confirm"><QrCode />Conferma Scambio</Link></Button>
                    <Button asChild variant="outline"><Link href="/hub/events"><Calendar />Crea Evento</Link></Button>
                    <Button asChild variant="secondary" className="col-span-2"><Link href="/hub/materials"><Download />Scarica Materiali QR</Link></Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Attività Recente</CardTitle>
            <CardDescription>
              Gli ultimi scambi avvenuti o richiesti presso il tuo locale.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/hub/swaps">
              Vedi Tutti
              <ChevronsRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codice Scambio</TableHead>
                <TableHead className="hidden sm:table-cell">Libri</TableHead>
                <TableHead className="text-right">Data</TableHead>
                <TableHead className="text-right">Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((swap) => (
                <TableRow key={swap.id}>
                  <TableCell>
                    <div className="font-medium">{swap.id.replace(/-.*/, '-****')}</div>
                  </TableCell>
                   <TableCell className="hidden sm:table-cell">{swap.book1} ↔ {swap.book2}</TableCell>
                  <TableCell className="text-right">{swap.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={swap.status === 'confirmed' ? 'default' : 'secondary'} className='capitalize'>{swap.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}


function KpiCard({ title, value, icon: Icon }: { title: string; value: string | number, icon: React.ElementType }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
    )
}
