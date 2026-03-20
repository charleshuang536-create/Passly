"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, ScanLine, Palette, Database, 
  Dumbbell, ShoppingBag, Ticket, Star, 
  Layout as LayoutIcon, Settings2, Plus, Trash2, RotateCcw 
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import NFCScanner from './NFCScanner';
import AppleColorPicker from './AppleColorPicker';

interface CardFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const CardForm = ({ data, onChange }: CardFormProps) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  const defaultTypes = ['Store Card', 'Membership', 'Event Ticket', 'Coupon'];

  // Initialize custom mode if the initial type isn't in defaults
  useEffect(() => {
    if (data.type && !defaultTypes.includes(data.type) && !isCustomMode) {
      setIsCustomMode(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Pass generated with custom configuration! Ready for Apple Wallet.`);
  };

  const handleScanComplete = (scannedData: any) => {
    onChange('label', scannedData.label);
    onChange('id', scannedData.id);
    onChange('payload', scannedData.payload);
    onChange('color', scannedData.color);
    showSuccess("Card data imported successfully!");
  };

  const addField = () => {
    const newFields = [...data.customFields, { label: 'New Field', value: 'Value' }];
    onChange('customFields', newFields);
  };

  const removeField = (index: number) => {
    const newFields = data.customFields.filter((_: any, i: number) => i !== index);
    onChange('customFields', newFields);
  };

  const updateField = (index: number, key: 'label' | 'value', val: string) => {
    const newFields = [...data.customFields];
    newFields[index][key] = val;
    onChange('customFields', newFields);
  };

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
          <TabsList className="w-full h-12 rounded-none border-b bg-muted/20 p-0 flex overflow-x-auto scrollbar-hide">
            <TabsTrigger value="data" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none border-r text-xs">
              <Database className="w-3 h-3" /> Data
            </TabsTrigger>
            <TabsTrigger value="design" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none border-r text-xs">
              <Palette className="w-3 h-3" /> Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none border-r text-xs">
              <LayoutIcon className="w-3 h-3" /> Layout
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1 h-full gap-2 data-[state=active]:bg-background rounded-none text-xs">
              <Settings2 className="w-3 h-3" /> Extra
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="data" className="p-6 space-y-6 mt-0">
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
                    <Label htmlFor="type">Pass Category</Label>
                    <Select 
                      value={isCustomMode ? "custom" : data.type} 
                      onValueChange={(v) => {
                        if (v === 'custom') {
                          setIsCustomMode(true);
                          if (defaultTypes.includes(data.type)) {
                            onChange('type', 'Custom Pass');
                          }
                        } else {
                          setIsCustomMode(false);
                          onChange('type', v);
                        }
                      }}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {defaultTypes.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                        <SelectItem value="custom">Custom...</SelectItem>
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

                <AnimatePresence initial={false}>
                  {isCustomMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="grid gap-2 overflow-hidden"
                    >
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 space-y-2">
                        <Label htmlFor="customType" className="text-xs text-primary font-bold uppercase tracking-wider">Custom Pass Type</Label>
                        <Input 
                          id="customType" 
                          placeholder="e.g. Library Card" 
                          value={data.type}
                          onChange={(e) => onChange('type', e.target.value)}
                          className="rounded-xl bg-background border-primary/20 focus-visible:ring-primary/30"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {data.techType === 'nfc' ? (
                  <div className="grid gap-2">
                    <Label htmlFor="payload">NFC Payload</Label>
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
                    <Label htmlFor="qrContent">QR Code Content</Label>
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

            <TabsContent value="design" className="p-6 space-y-6 mt-0">
              <div className="space-y-6">
                <AppleColorPicker 
                  label="Primary Card Color"
                  value={data.color}
                  onChange={(color) => onChange('color', color)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Text Color</Label>
                    <div className="flex gap-2 p-1 bg-muted rounded-lg">
                      {['#ffffff', '#000000'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onChange('textColor', c)}
                          className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${data.textColor === c ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                        >
                          {c === '#ffffff' ? 'White' : 'Black'}
                        </button>
                      ))}
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

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label>Corner Radius</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{data.borderRadius}px</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-primary/10 hover:text-primary" 
                          onClick={() => onChange('borderRadius', 16)}
                          title="Reset to default (16px)"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Slider 
                      value={[data.borderRadius]} 
                      onValueChange={([v]) => onChange('borderRadius', v)} 
                      max={40} 
                      step={1} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label>Border Width</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{data.borderWidth}px</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-primary/10 hover:text-primary" 
                          onClick={() => onChange('borderWidth', 0)}
                          title="Reset to default (0px)"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Slider 
                      value={[data.borderWidth]} 
                      onValueChange={([v]) => onChange('borderWidth', v)} 
                      max={8} 
                      step={1} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="p-6 space-y-6 mt-0">
              <div className="grid gap-4">
                <Label>Card Layout</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', label: 'Standard' },
                    { id: 'compact', label: 'Compact' },
                    { id: 'minimal', label: 'Minimal' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onChange('layout', l.id)}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${data.layout === l.id ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-background hover:bg-muted'}`}
                    >
                      {l.label}
                    </button>
                  ))}
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

            <TabsContent value="advanced" className="p-6 space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Custom Fields</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addField} className="h-8 gap-1 text-xs">
                    <Plus className="w-3 h-3" /> Add Field
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {data.customFields.map((field: any, i: number) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="grid gap-1 flex-1">
                        <Input 
                          placeholder="Label" 
                          value={field.label} 
                          onChange={(e) => updateField(i, 'label', e.target.value)}
                          className="h-8 text-xs rounded-lg"
                        />
                        <Input 
                          placeholder="Value" 
                          value={field.value} 
                          onChange={(e) => updateField(i, 'value', e.target.value)}
                          className="h-8 text-xs rounded-lg"
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeField(i)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  {data.customFields.length === 0 && (
                    <p className="text-xs text-center text-muted-foreground py-4 border border-dashed rounded-xl">
                      No custom fields added yet.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <div className="p-6 pt-0">
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