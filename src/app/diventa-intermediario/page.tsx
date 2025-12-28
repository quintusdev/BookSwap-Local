'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DiventaIntermediarioRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main landing page, which now includes the intermediary CTA
    router.replace('/landing');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Reindirizzamento...</p>
    </div>
  );
}
