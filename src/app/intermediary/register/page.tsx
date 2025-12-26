'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { useAuth, useUser, setDocumentNonBlocking, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Il nome dell\'attività è obbligatorio' }),
  email: z.string().email({ message: 'Inserisci un\'email valida.' }),
  password: z.string().min(8, { message: 'La password deve contenere almeno 8 caratteri.' }),
  city: z.string().min(2, { message: 'La città è obbligatoria.' }),
  address: z.string().min(5, { message: 'L\'indirizzo è obbligatorio.' }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Devi accettare i Termini e Condizioni.' }),
  }),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Devi accettare l\'Informativa sulla Privacy.' }),
  }),
});

export default function RegisterIntermediaryPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      email: '',
      password: '',
      city: '',
      address: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      
      if (newUser) {
        const userRef = doc(firestore, 'users', newUser.uid);
        
        await setDocumentNonBlocking(userRef, {
            id: newUser.uid,
            email: newUser.email,
            name: values.businessName,
            role: 'professional',
            userType: 'professional',
            city: values.city,
            address: values.address,
            avatarUrl: `https://avatar.vercel.sh/${values.businessName.replace(/\s/g, '')}.png`,
            subscriptionStatus: 'trialing',
            acceptedTermsAt: serverTimestamp(),
            acceptedPrivacyAt: serverTimestamp(),
        }, { merge: true });

        // In a real app, you would redirect to a Stripe Checkout session here.
        // For now, we'll just redirect to the dashboard.
        toast({
            title: "Registrazione completata!",
            description: `Benvenuto, ${values.businessName}! Il tuo periodo di prova è iniziato.`
        });
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        variant: "destructive",
        title: "Registrazione fallita",
        description: error.code === 'auth/email-already-in-use' 
            ? 'Questa email è già in uso. Prova ad accedere.'
            : 'Si è verificato un errore inaspettato.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || user) {
    return <div className="flex min-h-screen items-center justify-center">Caricamento...</div>;
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Registra la Tua Attività</CardTitle>
          <CardDescription>Inizia la tua prova gratuita di 30 giorni. Nessuna carta di credito richiesta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Attività</FormLabel>
                    <FormControl>
                      <Input placeholder="Es: La Feltrinelli" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Aziendale</FormLabel>
                    <FormControl>
                      <Input placeholder="contatti@esempio.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Città</FormLabel>
                        <FormControl>
                        <Input placeholder="Milano" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Indirizzo</FormLabel>
                        <FormControl>
                        <Input placeholder="Via Roma, 10" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

               <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isSubmitting} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                         Accetto i <Link href="/terms" target="_blank" className="underline hover:text-primary">Termini di Servizio</Link>.
                        </FormLabel>
                         <FormMessage />
                    </div>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="acceptPrivacy"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isSubmitting}/>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                         Ho letto e accetto l'<Link href="/privacy" target="_blank" className="underline hover:text-primary">Informativa sulla Privacy</Link>.
                        </FormLabel>
                         <FormMessage />
                    </div>
                    </FormItem>
                )}
                />
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? 'Creazione in corso...' : 'Crea Account Business'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
