
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DiventaIntermediarioRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main landing page, which is now the root
    router.replace('/');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Reindirizzamento...</p>
    </div>
  );
}

    