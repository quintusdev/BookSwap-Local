
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useLanguage } from '@/context/language-context';

export default function SignupPage() {
    const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('signup_title')}</CardTitle>
          <CardDescription>
            {t('signup_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="first-name">{t('signup_first_name_label')}</Label>
                <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">{t('signup_last_name_label')}</Label>
                <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email_label')}</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password_label')}</Label>
            <Input id="password" type="password" required />
          </div>
           <div className="grid gap-2">
             <Label>{t('signup_i_am_a_label')}</Label>
            <RadioGroup defaultValue="reader" className="flex gap-4 pt-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reader" id="r1" />
                    <Label htmlFor="r1">{t('signup_reader_option')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="library" id="r2" />
                    <Label htmlFor="r2">{t('signup_library_option')}</Label>
                </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" asChild>
            <Link href="/home">{t('signup_create_account_button')}</Link>
          </Button>
        </CardContent>
        <div className="mt-4 p-6 pt-0 text-center text-sm">
          {t('signup_already_have_account_prompt')}{' '}
          <Link href="/login" className="underline">
            {t('sign_in_button')}
          </Link>
        </div>
      </Card>
    </div>
  );
}
