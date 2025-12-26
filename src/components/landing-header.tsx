'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './logo';

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '/browse', label: 'Browse' },
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto">
          <Logo />
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                <Logo />
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                 <Separator />
                <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/signup">Sign Up</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Separator() {
    return <div className="my-2 h-px w-full bg-border" />;
}
