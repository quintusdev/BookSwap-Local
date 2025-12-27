
'use client';

import { Logo } from '@/components/logo';
import { IdentityChoiceForm } from '@/components/identity-choice-form';

export default function IdentityPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-stone-50 text-stone-900 font-serif">
      <div className="text-center w-full max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="inline-block">
            <Logo />
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
            Dove le storie trovano una nuova casa.
            <br />
            E tu, una nuova community.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-stone-700">
            BookSwap Local unisce lettori appassionati e luoghi unici. Vogliamo sapere chi sei per raccontarti la parte di storia che ti interessa di più.
          </p>
        </header>

        <IdentityChoiceForm />

        <footer className="mt-16">
            <p className="text-sm text-stone-500">
                &copy; {new Date().getFullYear()} BookSwap Local. Un progetto nato per amore dei libri e dei luoghi.
            </p>
        </footer>
      </div>
    </main>
  );
}
