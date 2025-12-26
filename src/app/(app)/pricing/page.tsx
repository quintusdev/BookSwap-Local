import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { pricingTiers } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Swap Pass Plans
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Choose the perfect plan to fuel your reading habits. More swaps, more stories.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              'flex flex-col',
              tier.isFeatured && 'border-primary ring-2 ring-primary'
            )}
          >
            {tier.isFeatured && (
              <div className="w-full bg-primary py-1.5 text-center text-sm font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.pricePeriod}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <ul className="space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={cn(
                  'w-full',
                  tier.isFeatured ? 'bg-primary hover:bg-primary/90' : ''
                )}
                variant={tier.isFeatured ? 'default' : 'outline'}
              >
                {tier.price === 'Free' ? 'Current Plan' : 'Choose Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
