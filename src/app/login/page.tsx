
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
import { useLanguage } from '@/context/language-context';
import { useAuth, useUser, setDocumentNonBlocking, useFirestore } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, UserCredential } from 'firebase/auth';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M15.226 15.226C15.341 15.013 15.5 14.805 15.5 14.805C15.5 14.805 15.509 14.801 15.522 14.793C15.535 14.786 15.547 14.779 15.558 14.773C16.143 14.225 16.5 13.565 16.5 12.825C16.5 12.005 16.079 11.238 15.419 10.743C15.531 10.598 15.633 10.443 15.723 10.28C16.484 9.143 16.174 7.643 15.934 7.043C15.144 5.043 13.564 4.503 12.964 4.503C12.364 4.503 11.514 4.883 10.824 4.883C10.134 4.883 9.224 4.463 9.224 4.463C7.454 5.433 6.504 7.423 6.504 9.323C6.504 11.963 8.354 13.883 9.774 14.793C10.424 15.193 11.014 15.503 11.754 15.503C12.434 15.503 12.634 15.283 13.624 15.283C14.614 15.283 14.814 15.503 15.504 15.503C15.504 15.503 15.385 15.378 15.226 15.226ZM12.004 2.503C12.504 2.503 13.314 3.013 13.914 3.013C14.054 3.013 14.414 2.933 14.674 2.823C14.784 2.773 14.934 2.703 15.064 2.653C14.394 2.113 13.554 1.833 12.834 1.833C11.554 1.833 10.224 2.613 9.474 3.533C8.724 4.453 8.304 5.753 8.304 5.753C8.424 5.783 9.384 6.303 10.154 6.303C10.924 6.303 11.854 5.753 12.004 5.753C12.004 5.753 12.084 3.093 12.004 2.503Z" fill='currentColor'/>
    </svg>
);

const MicrosoftIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#F25022" d="M1 1h10.5v10.5H1z"/>
        <path fill="#7FBA00" d="M12.5 1h10.5v10.5H12.5z"/>
        <path fill="#00A4EF" d="M1 12.5h10.5v10.5H1z"/>
        <path fill="#FFB900" d="M12.5 12.5h10.5v10.5H12.5z"/>
    </svg>
);


export default function LoginPage() {
  const { t } = useLanguage();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    initiateEmailSignIn(auth, values.email, values.password);
  }

  const handleSocialLogin = (provider: 'google' | 'apple' | 'microsoft') => {
    let authProvider: GoogleAuthProvider | OAuthProvider;
    if (provider === 'google') {
      authProvider = new GoogleAuthProvider();
    } else if (provider === 'apple') {
      authProvider = new OAuthProvider('apple.com');
    } else {
      authProvider = new OAuthProvider('microsoft.com');
    }
    
    signInWithPopup(auth, authProvider)
      .then((result) => handleSuccessfulLogin(result))
      .catch(error => {
        console.error(`${provider} login error:`, error);
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "Impossibile completare l'accesso con questo provider."
        });
    })
  };

  const handleSuccessfulLogin = (userCredential: UserCredential) => {
    const loggedInUser = userCredential.user;
    if (loggedInUser) {
      const userRef = doc(firestore, 'users', loggedInUser.uid);
      setDocumentNonBlocking(userRef, {
        id: loggedInUser.uid,
        email: loggedInUser.email,
        name: loggedInUser.displayName,
        role: 'reader',
        userType: 'reader',
        avatarUrl: loggedInUser.photoURL || `https://avatar.vercel.sh/${loggedInUser.email}.png`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  };


  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/home');
    }
  }, [user, isUserLoading, router]);


  if (isUserLoading || user) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <p>Loading...</p>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
          <CardDescription>{t('login_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-2 mb-4">
                <Button variant="outline" onClick={() => handleSocialLogin('google')}>
                    <GoogleIcon />
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('apple')}>
                    <AppleIcon />
                </Button>
                 <Button variant="outline" onClick={() => handleSocialLogin('microsoft')}>
                    <MicrosoftIcon />
                </Button>
            </div>
            <div className="relative mb-4">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs text-muted-foreground">OR</span>
            </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email_label')}</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
                    <FormLabel>{t('password_label')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {t('sign_in_button')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="mt-4 p-6 pt-0 text-center text-sm">
          {t('login_no_account_prompt')}{' '}
          <Link href="/signup" className="underline">
            {t('login_sign_up_link')}
          </Link>
        </div>
      </Card>
    </div>
  );
}
