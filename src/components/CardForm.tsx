"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface CardFormProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const CardForm = ({ data, onChange }: CardFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Pass generated! In a production environment, this would now download your .pkpass file.");
  };

  const colors = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Pink', value: '#db2777' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Black', value: '#18181b' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-3xl border border-border shadow-sm">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="label">Pass Label</Label>
          <Input 
            id="label" 
            placeholder="e.g. Gold's Gym Membership" 
            value={data.label}
            onChange={(e) => onChange('label', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Card Holder Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Pass Type</Label>
            <Select value={data.type} onValueChange={(v) => onChange('type', v)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Store Card">Store Card</SelectItem>
                <SelectItem value="Membership">Membership</SelectItem>
                <SelectItem value="Event Ticket">Event Ticket</SelectItem>
                <SelectItem value="Coupon">Coupon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="id">ID / Serial Number</Label>
            <Input 
              id="id" 
              placeholder="12345678" 
              value={data.id}
              onChange={(e) => onChange('id', e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Card Color</Label>
          <div className="flex flex-wrap gap-3 mt-1">
            {colors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange('color', c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${data.color === c.value ? 'border-primary scale-125 ring-2 ring-primary/20' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 rounded-xl gap-2 text-lg font-semibold mt-4">
        <Wallet className="w-5 h-5" />
        Add to Apple Wallet
      </Button>
      
      <p className="text-[10px] text-center text-muted-foreground px-4">
        By clicking "Add to Apple Wallet", you agree to our terms of service. This will generate a digital pass compatible with iOS devices.
      </p>
    </form>
  );
};

export default CardForm;