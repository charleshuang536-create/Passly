"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CardPreview from '@/components/CardPreview';
import CardForm from '@/components/CardForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, QrCode, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Create = () => {
  const [step, setStep] = useState<'select' | 'design'>('select');
  const [cardData, setCardData] = useState({
    label: '',
    name: '',
    color: '#2563eb',
    textColor: '#ffffff',
    secondaryColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 16,
    id: '',
    type: 'Membership',
    payload: '',
    qrContent: '',
    finish: 'standard',
    icon: 'star',
    techType: 'nfc' as 'nfc' | 'qr',
    layout: 'standard' as 'standard' | 'compact' | 'minimal',
    customFields: [] as Array<{ label: string; value: string }>
  });

  const handleUpdate = (field: string, value: any) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const selectTech = (type: 'nfc' | 'qr') => {
    handleUpdate('techType', type);
    setStep('design');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'select' ? (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-center"
              >
                <h1 className="text-4xl font-bold mb-4">Choose Technology</h1>
                <p className="text-muted-foreground mb-12">Select how your digital pass will be scanned at terminals.</p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectTech('nfc')}
                    className="group p-8 bg-card rounded-[2.5rem] border-2 border-border hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Wifi className="w-32 h-32" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Wifi className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">NFC Pass</h3>
                    <p className="text-sm text-muted-foreground mb-6">Contactless scanning using Apple VAS protocol. Best for gym and loyalty cards.</p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      Select NFC <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectTech('qr')}
                    className="group p-8 bg-card rounded-[2.5rem] border-2 border-border hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <QrCode className="w-32 h-32" />
                    </div>
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <QrCode className="w-7 h-7 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">QR Code</h3>
                    <p className="text-sm text-muted-foreground mb-6">Visual scanning using a 2D barcode. Compatible with all optical scanners.</p>
                    <div className="flex items-center gap-2 text-purple-500 font-semibold text-sm">
                      Select QR <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="text-center md:text-left">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mb-4 -ml-2 gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setStep('select')}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to selection
                    </Button>
                    <h1 className="text-4xl font-bold mb-2">Digitize Your Card</h1>
                    <p className="text-muted-foreground">
                      Creating a {cardData.techType.toUpperCase()} enabled pass.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <CardForm data={cardData} onChange={handleUpdate} />

                  <div className="sticky top-32">
                    <CardPreview data={cardData} />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10"
                    >
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {cardData.techType === 'nfc' ? 'NFC Value Added Services' : 'Optical Scanning'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cardData.techType === 'nfc' 
                          ? `This pass uses the Apple VAS protocol. The payload "${cardData.payload || '...'}" will be transmitted securely.`
                          : `This pass will display a high-contrast QR code containing "${cardData.qrContent || '...'}" for optical scanners.`}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Create;