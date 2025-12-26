
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

const currentUser = mockUsers[0];

export default function ProfilePage() {
    const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('profile_title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('profile_subtitle')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t('profile_info_title')}</CardTitle>
                    <CardDescription>{t('profile_info_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('profile_info_name_label')}</Label>
                        <Input id="name" defaultValue={currentUser.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('email_label')}</Label>
                        <Input id="email" type="email" defaultValue={currentUser.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">{t('profile_info_city_label')}</Label>
                        <Input id="city" defaultValue={currentUser.city} />
                    </div>
                </CardContent>
                <CardFooter className='border-t pt-6'>
                    <Button>{t('profile_info_save_button')}</Button>
                </CardFooter>
            </Card>

             <Card className='mt-8'>
                <CardHeader>
                    <CardTitle>{t('profile_password_title')}</CardTitle>
                    <CardDescription>
                        {t('profile_password_desc')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">{t('profile_password_current_label')}</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">{t('profile_password_new_label')}</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className='border-t pt-6'>
                    <Button>{t('profile_password_update_button')}</Button>
                </CardFooter>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="text-center">
                <CardContent className='pt-6'>
                    <Avatar className='mx-auto h-24 w-24 mb-4'>
                        <AvatarImage src={currentUser.avatar.imageUrl} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Button variant="outline">{t('profile_avatar_change_button')}</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('profile_subscription_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-sm font-semibold'>{t('profile_subscription_on_plan_1')} <span className='text-primary'>{t(currentUser.subscription.toLowerCase())}</span> {t('profile_subscription_on_plan_2')}</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                        {currentUser.subscription === 'Free' ? t('profile_subscription_upgrade_prompt') : t('profile_subscription_thank_you')}
                    </p>
                    <Button variant="outline" className="w-full mt-4" asChild>
                       <Link href="/pricing">{t('profile_subscription_manage_button')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
