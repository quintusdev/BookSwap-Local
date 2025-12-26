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

const completedSwaps = mockSwaps.filter((s) => s.status === 'completed');

export default function DashboardPage() {
    // In a real app, this page would be protected and only visible to users with the 'shop' role.
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Shop Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome, The Reader's Corner! Here's your activity overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSwaps.length}</div>
            <p className="text-xs text-muted-foreground">
              exchanges completed at your location
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Footfall Generated</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSwaps.length * 2}</div>
            <p className="text-xs text-muted-foreground">
              customers brought in through swaps
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-muted-foreground" />
                    Validate a Swap
                </CardTitle>
                <CardDescription className='text-xs'>
                    Enter a user's code to check-in a swap.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="BSWAP-XXXXX" />
                    <Button type="submit">Validate</Button>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
          <CardDescription>
            A list of the most recent swaps completed at your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Swap Code</TableHead>
                <TableHead>Book 1</TableHead>
                <TableHead>Book 2</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="text-right">Date</TableHead>
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
