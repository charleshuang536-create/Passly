"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, ScanLine, Info, Palette, Database, Dumbbell, ShoppingBag, Ticket, Star, QrCode, Wifi } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import NFCScanner from './NFCScanner';

interface CardFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const CardForm = ({ data, onChange }: CardFormProps) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Pass generated with ${data.techType.toUpperCase()}! Ready for Apple Wallet.`);
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
    { name: 'Slate', value: '#475569' },
  ];

  const icons = [
    { id: 'dumbbell', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'shopping-bag', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ticket', icon: <Ticket className="w-4 h-4" /> },
    { id: 'star', icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {data.techType === 'nfc' && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full h-14 rounded-2xl border-dashed border-2 gap-3 hover:bg-primary/5 hover:border-primary transition-all"
          onClick={() => setIsScannerOpen(true)}
        >
          <ScanLine className="w-5 h-5 text-primary" />
          Scan Physical NFC Card
        </Button>
      )}

      <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="w-full h-14 rounded-none border-b bg-muted/20 p-0">
            <TabsTrigger value="data" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none border-r">
              <Database className="w-4 h-4" />
              Card Data
            </TabsTrigger>
            <TabsTrigger value="design" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="data" className="p-8 space-y-6 mt-0">
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

                {data.techType === 'nfc' ? (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payload" className="flex items-center gap-1.5">
                        NFC Payload
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </Label>
                    </div>
                    <Input 
                      id="payload" 
                      placeholder="Data sent to NFC reader" 
                      value={data.payload || ''}
                      onChange={(e) => onChange('payload', e.target.value)}
                      className="rounded-xl font-mono text-sm bg-muted/30"
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="qrContent" className="flex items-center gap-1.5">
                        QR Code Content
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </Label>
                    </div>
                    <Input 
                      id="qrContent" 
                      placeholder="URL or text for QR code" 
                      value={data.qrContent || ''}
                      onChange={(e) => onChange('qrContent', e.target.value)}
                      className="rounded-xl font-mono text-sm bg-muted/30"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="design" className="p-8 space-y-6 mt-0">
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label>Card Color</Label>
                  <div className="flex flex-wrap gap-3">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Text Color</Label>
                    <div className="flex gap-2 p-1 bg-muted rounded-lg">
                      <button
                        type="button"
                        onClick={() => onChange('textColor', '#ffffff')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${data.textColor === '#ffffff' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                      >
                        White
                      </button>
                      <button
                        type="button"
                        onClick={() => onChange('textColor', '#000000')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${data.textColor === '#000000' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                      >
                        Black
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Finish</Label>
                    <Select value={data.finish} onValueChange={(v) => onChange('finish', v)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="glossy">Glossy</SelectItem>
                        <SelectItem value="metallic">Metallic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label>Pass Icon</Label>
                  <div className="flex gap-3">
                    {icons.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onChange('icon', item.id)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${data.icon === item.id ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-background hover:bg-muted'}`}
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="p-8 pt-0">
              <Button type="submit" className="w-full h-12 rounded-xl gap-2 text-lg font-semibold">
                <Wallet className="w-5 h-5" />
                Add to Apple Wallet
              </Button>
            </div>
          </form>
        </Tabs>
      </div>

      <NFCScanner 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScanComplete={handleScanComplete}
      />
    </div>
  );
};

export default CardForm;