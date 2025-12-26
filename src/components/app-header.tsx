'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Book,
  Heart,
  Home,
  LogOut,
  Menu,
  Repeat,
  Search,
  User,
  LayoutDashboard,
  Crown
} from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Mock user for demonstration
const mockUser = {
  name: 'Alice',
  email: 'alice@example.com',
  avatarUrl: 'https://picsum.photos/seed/BSAvatar1/200/200',
  role: 'user', // can be 'user' or 'shop'
};

export function AppHeader() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(mockUser.role); // 'user' or 'shop'

  const navLinks = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/browse', label: 'Browse', icon: Search },
    { href: '/my-books', label: 'My Books', icon: Book },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/swaps', label: 'Swaps', icon: Repeat },
  ];

  const NavLink = ({ href, label, icon: Icon }: (typeof navLinks)[0]) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="hidden md:inline">{label}</span>
      </Link>
    );
  };

  const MobileNavLink = ({ href, label, icon: Icon }: (typeof navLinks)[0]) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
        )}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Link>
    );
  };
  
  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{mockUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {mockUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {userRole === 'shop' && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Shop Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
         <DropdownMenuItem asChild>
          <Link href="/pricing">
            <Crown className="mr-2 h-4 w-4" />
            <span>Upgrade</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-4">
                <Logo />
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <MobileNavLink key={link.href} {...link} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-center">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className='text-sm text-muted-foreground'>
            Role: 
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className='ml-1 bg-transparent'>
                <option value="user">User</option>
                <option value="shop">Shop</option>
            </select>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
