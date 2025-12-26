import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real app, you would have a server-side check here to protect routes.
  // If the user is not authenticated, you would redirect them to the login page.
  // For this scaffold, we assume the user is authenticated.

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}
