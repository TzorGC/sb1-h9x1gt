'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brand } from '@/lib/types';

interface BrandSwitcherProps {
  brands: Brand[];
  currentBrand: string;
  onBrandChange: (brandId: string) => void;
}

export default function BrandSwitcher({
  brands,
  currentBrand,
  onBrandChange,
}: BrandSwitcherProps) {
  return (
    <Select value={currentBrand} onValueChange={onBrandChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select brand" />
      </SelectTrigger>
      <SelectContent>
        {brands.map((brand) => (
          <SelectItem key={brand.id} value={brand.id}>
            <div className="flex items-center gap-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-4 h-4 rounded-full"
              />
              <span>{brand.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}