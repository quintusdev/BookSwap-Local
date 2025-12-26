
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { useAuth, useUser, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookGenres } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['reader', 'library']),
  avatarFile: z.instanceof(File).optional(),
  favoriteGenres: z.array(z.string()).max(5, "You can select up to 5 genres.").optional(),
});

export default function SignupPage() {
  const { t } = useLanguage();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'reader',
      favoriteGenres: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      
      if (newUser) {
        // In a real app, you would upload the avatarFile to Firebase Storage and get the URL
        const avatarUrl = avatarPreview || `https://avatar.vercel.sh/${newUser.email}.png`;

        const userRef = doc(firestore, 'users', newUser.uid);
        await setDocumentNonBlocking(userRef, {
            id: newUser.uid,
            email: newUser.email,
            name: `${values.firstName} ${values.lastName}`,
            role: values.role,
            city: 'Not set',
            subscription: 'Free',
            avatarUrl: avatarUrl,
            favoriteGenres: values.favoriteGenres || [],
        }, { merge: true });
        router.push('/home');
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred."
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/home');
    }
  }, [user, isUserLoading, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('avatarFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isUserLoading || user) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t('signup_title')}</CardTitle>
          <CardDescription>{t('signup_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="avatarFile"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel htmlFor="avatar-upload">
                      <div className="relative h-24 w-24 rounded-full cursor-pointer group">
                        <img
                          src={avatarPreview || `https://avatar.vercel.sh/placeholder.png`}
                          alt="Avatar preview"
                          className="h-full w-full rounded-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs text-center">{t('signup_change_avatar')}</span>
                        </div>
                      </div>
                    </FormLabel>
                    <FormControl>
                        <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('signup_first_name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('signup_last_name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Robinson" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email_label')}</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} disabled={isSubmitting} />
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
                      <Input type="password" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="favoriteGenres"
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel>{t('signup_favorite_genres_label')}</FormLabel>
                        <GenrePicker field={field} />
                        <FormMessage />
                    </FormItem>
                )}
            />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('signup_i_am_a_label')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4 pt-1"
                        disabled={isSubmitting}
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="reader" id="r1" />
                          </FormControl>
                          <FormLabel htmlFor="r1" className='font-normal'>{t('signup_reader_option')}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="library" id="r2" />
                          </FormControl>
                          <FormLabel htmlFor="r2" className='font-normal'>{t('signup_library_option')}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? t('signup_creating_account_button') : t('signup_create_account_button')}
              </Button>
            </form>
          </Form>
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


function GenrePicker({ field }: { field: any }) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const handleSelect = (currentValue: string) => {
    const newValue = field.value?.includes(currentValue)
      ? field.value?.filter((v: string) => v !== currentValue)
      : [...(field.value || []), currentValue]
    
    if (newValue.length > 5) {
        // toast or message
        return;
    }
    field.onChange(newValue)
  }

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={field.value?.length >= 5}
        >
          {field.value?.length > 0 ? `${field.value.length} ${t('genres_selected')}` : t('signup_select_genres_placeholder')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={t('profile_genres_search_placeholder')} />
          <CommandEmpty>{t('profile_genres_not_found')}</CommandEmpty>
          <CommandGroup>
            {bookGenres.map((genre) => (
              <CommandItem
                key={genre}
                onSelect={handleSelect}
                value={genre}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value?.includes(genre) ? "opacity-100" : "opacity-0"
                  )}
                />
                {genre}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    <div className="flex flex-wrap gap-1 mt-2">
        {field.value?.map((genre: string) => (
            <Badge key={genre} variant="secondary">
                {genre}
            </Badge>
        ))}
    </div>
    </>
  )
}
