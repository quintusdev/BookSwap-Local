
'use client';

import React, { useState, useEffect } from 'react';
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CITIES } from '@/lib/cities'; // Your city dataset

export interface City {
  name: string;
  provinceCode: string;
  region: string;
  lat: number;
  lng: number;
  placeId: string;
}

interface CityAutocompleteProps {
  selectedCity: City | null;
  onSelectCity: (city: City | null) => void;
  placeholder?: string;
}

export function CityAutocomplete({ selectedCity, onSelectCity, placeholder }: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCities = search.length > 2
    ? CITIES.filter(city =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.provinceCode.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCity ? `${selectedCity.name}, ${selectedCity.provinceCode}` : placeholder || 'Seleziona città...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder="Inizia a scrivere una città..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>
            {search.length <= 2 ? 'Scrivi almeno 3 lettere per cercare.' : 'Nessuna città trovata.'}
          </CommandEmpty>
          <CommandList>
            {filteredCities.slice(0, 50).map((city) => (
              <CommandItem
                key={city.placeId}
                value={`${city.name}, ${city.provinceCode}`}
                onSelect={() => {
                  onSelectCity(city);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedCity?.placeId === city.placeId ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {city.name}, {city.provinceCode}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
