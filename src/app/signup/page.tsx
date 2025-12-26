import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Join the community. Create your account to start swapping.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
           <div className="grid gap-2">
             <Label>I am a...</Label>
            <RadioGroup defaultValue="reader" className="flex gap-4 pt-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reader" id="r1" />
                    <Label htmlFor="r1">Reader</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="library" id="r2" />
                    <Label htmlFor="r2">Library</Label>
                </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            <Link href="/home">Create an account</Link>
          </Button>
        </CardContent>
        <div className="mt-4 p-6 pt-0 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
