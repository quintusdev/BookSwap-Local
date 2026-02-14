
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // This page's content has been moved to the root page.
    // Redirect to '/' to ensure consistent access.
    router.replace('/');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Reindirizzamento...</p>
    </div>
  );
}

    