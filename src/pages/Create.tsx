"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CardPreview from '@/components/CardPreview';
import CardForm from '@/components/CardForm';
import { motion } from 'framer-motion';

const Create = () => {
  const [cardData, setCardData] = useState({
    label: '',
    name: '',
    color: '#2563eb',
    textColor: '#ffffff',
    id: '',
    type: 'Membership',
    payload: '',
    finish: 'standard',
    icon: 'star'
  });

  const handleUpdate = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Digitize Your Card</h1>
            <p className="text-muted-foreground">Customize the look and feel of your digital pass.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardForm data={cardData} onChange={handleUpdate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-32"
            >
              <CardPreview data={cardData} />
              
              <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  NFC Value Added Services (VAS)
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This pass uses the Apple VAS protocol. When you hold your device near a terminal, the payload <strong>{cardData.payload || '...'}</strong> will be transmitted securely.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;