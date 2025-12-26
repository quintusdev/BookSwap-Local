
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
import { mockSwaps } from '@/lib/placeholder-data';
import { format } from 'date-fns';
import { Book, Users, QrCode } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const completedSwaps = mockSwaps.filter((s) => s.status === 'completed');

export default function DashboardPage() {
    const { t } = useLanguage();
    // In a real app, this page would be protected and only visible to users with the 'shop' role.
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('dashboard_title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('dashboard_subtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_total_swaps')}</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSwaps.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard_total_swaps_desc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard_footfall')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSwaps.length * 2}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard_footfall_desc')}
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-muted-foreground" />
                    {t('dashboard_validate_swap')}
                </CardTitle>
                <CardDescription className='text-xs'>
                    {t('dashboard_validate_swap_desc')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="BSWAP-XXXXX" />
                    <Button type="submit">{t('dashboard_validate_button')}</Button>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard_recent_checkins')}</CardTitle>
          <CardDescription>
            {t('dashboard_recent_checkins_desc')}
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
