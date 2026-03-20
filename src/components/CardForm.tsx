"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Wallet, ScanLine, Info } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import NFCScanner from './NFCScanner';

interface CardFormProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const CardForm = ({ data, onChange }: CardFormProps) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Pass generated with NFC payload! Ready for Apple Wallet.");
  };

  const handleScanComplete = (scannedData: any) => {
    onChange('label', scannedData.label);
    onChange('id', scannedData.id);
    onChange('payload', scannedData.payload);
    onChange('color', scannedData.color);
    showSuccess("Card data imported successfully!");
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
    <div className="space-y-6">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full h-14 rounded-2xl border-dashed border-2 gap-3 hover:bg-primary/5 hover:border-primary transition-all"
        onClick={() => setIsScannerOpen(true)}
      >
        <ScanLine className="w-5 h-5 text-primary" />
        Scan Physical NFC Card
      </Button>

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
              <Label htmlFor="id">Serial Number</Label>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="payload" className="flex items-center gap-1.5">
                NFC Payload
                <Info className="w-3 h-3 text-muted-foreground" />
              </Label>
              <span className="text-[10px] text-muted-foreground font-mono">VAS Protocol</span>
            </div>
            <Input 
              id="payload" 
              placeholder="Data sent to NFC reader" 
              value={data.payload || ''}
              onChange={(e) => onChange('payload', e.target.value)}
              className="rounded-xl font-mono text-sm bg-muted/30"
            />
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
      </form>

      <NFCScanner 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScanComplete={handleScanComplete}
      />
    </div>
  );
};

export default CardForm;