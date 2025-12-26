
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useLanguage } from '@/context/language-context';

export default function LoginPage() {
    const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login_title')}</CardTitle>
          <CardDescription>
            {t('login_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email_label')}</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password_label')}</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" asChild>
             <Link href="/home">{t('sign_in_button')}</Link>
          </Button>
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
