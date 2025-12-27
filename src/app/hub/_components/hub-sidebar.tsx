'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, QrCode, Trophy, Calendar, Settings, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

const navItems = [
    { href: '/hub', label: 'Panoramica', icon: Home },
    { href: '/hub/confirm', label: 'Conferma Scambi', icon: QrCode },
    { href: '/hub/milestones', label: 'Milestone & Premi', icon: Trophy },
    { href: '/hub/events', label: 'Eventi', icon: Calendar },
    { href: '/hub/materials', label: 'Materiali QR', icon: Download },
    { href: '/hub/settings', label: 'Impostazioni', icon: Settings },
];

export function HubSidebarNav() {
    const pathname = usePathname();
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map(item => (
                <Link
                key={item.label}
                href={item.href}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === item.href && 'bg-muted text-primary'
                )}
                >
                <item.icon className="h-4 w-4" />
                {item.label}
                </Link>
            ))}
        </nav>
    );
}


export function HubSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/hub" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6" />
            <span>BookSwap Hub</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <HubSidebarNav />
        </div>
      </div>
    </div>
  );
}
