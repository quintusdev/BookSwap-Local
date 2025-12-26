
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { useUser, useFirestore, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type UserProfile = {
    id: string;
    name: string;
    email: string;
    city: string;
    subscription: string;
    avatarUrl: string;
}

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
})


export default function ProfilePage() {
    const { t } = useLanguage();
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading } = useDoc<UserProfile>(userDocRef);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if (userProfile) {
            form.reset({
                name: userProfile.name,
                city: userProfile.city,
            });
        }
    }, [userProfile, form]);

    function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        if (!userDocRef) return;
        setDocumentNonBlocking(userDocRef, values, { merge: true });
        toast({ title: "Profile updated successfully!" });
    }

    if (isLoading || !userProfile) {
        return (
             <div className="space-y-8">
                <div>
                    <Skeleton className='h-10 w-1/3' />
                    <Skeleton className='h-4 w-1/2 mt-2' />
                </div>
                 <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        <Skeleton className='h-64 w-full' />
                        <Skeleton className='h-56 w-full' />
                    </div>
                    <div className="space-y-8">
                        <Skeleton className='h-40 w-full' />
                        <Skeleton className='h-32 w-full' />
                    </div>
                </div>
            </div>
        )
    }


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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                        <CardHeader>
                            <CardTitle>{t('profile_info_title')}</CardTitle>
                            <CardDescription>{t('profile_info_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>{t('profile_info_name_label')}</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('email_label')}</Label>
                                <Input id="email" type="email" defaultValue={userProfile.email} disabled />
                            </div>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>{t('profile_info_city_label')}</FormLabel>
                                    <FormControl>
                                    <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className='border-t pt-6'>
                            <Button type="submit">{t('profile_info_save_button')}</Button>
                        </CardFooter>
                    </form>
                </Form>
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
                        <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                        <AvatarFallback>{userProfile.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <Button variant="outline">{t('profile_avatar_change_button')}</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('profile_subscription_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-sm font-semibold'>{t('profile_subscription_on_plan_1')} <span className='text-primary'>{t((userProfile.subscription || 'free').toLowerCase())}</span> {t('profile_subscription_on_plan_2')}</p>
                    <p className='text-xs text-muted-foreground mt-1'>
                        {userProfile.subscription === 'Free' ? t('profile_subscription_upgrade_prompt') : t('profile_subscription_thank_you')}
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
