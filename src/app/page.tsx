'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // This page now permanently redirects to the new, comprehensive landing page.
    router.replace('/landing');
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Reindirizzamento...</p>
    </div>
  );
}
