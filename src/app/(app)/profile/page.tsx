import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const currentUser = mockUsers[0];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          My Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name and location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={currentUser.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={currentUser.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue={currentUser.city} />
                    </div>
                </CardContent>
                <CardFooter className='border-t pt-6'>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

             <Card className='mt-8'>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        For security, you will be logged out after changing your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className='border-t pt-6'>
                    <Button>Update Password</Button>
                </CardFooter>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="text-center">
                <CardContent className='pt-6'>
                    <Avatar className='mx-auto h-24 w-24 mb-4'>
                        <AvatarImage src={currentUser.avatar.imageUrl} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Button variant="outline">Change Avatar</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-sm font-semibold'>You are on the <span className='text-primary'>{currentUser.subscription}</span> plan.</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                        {currentUser.subscription === 'Free' ? 'Upgrade to unlock more swaps.' : 'Thank you for your support!'}
                    </p>
                    <Button variant="outline" className="w-full mt-4" asChild>
                       <Link href="/pricing">Manage Subscription</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
