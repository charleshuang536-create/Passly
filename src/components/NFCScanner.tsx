"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wifi, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NFCScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (data: any) => void;
}

const NFCScanner = ({ isOpen, onClose, onScanComplete }: NFCScannerProps) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      setStatus('scanning');
      const timer = setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          onScanComplete({
            label: "Scanned Membership",
            id: "NFC-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            payload: "VAS-7721-9901",
            color: "#4f46e5"
          });
          onClose();
          setStatus('idle');
        }, 1500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl border border-border relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mt-8 mb-12 relative flex justify-center">
              <AnimatePresence mode="wait">
                {status === 'scanning' ? (
                  <motion.div 
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                      <Smartphone className="w-12 h-12 text-primary" />
                    </div>
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 border-2 border-primary rounded-full"
                    />
                    <motion.div 
                      animate={{ 
                        scale: [1, 2, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                      className="absolute inset-0 border-2 border-primary rounded-full"
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {status === 'scanning' ? 'Ready to Scan' : 'Card Detected!'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {status === 'scanning' 
                ? 'Hold your physical NFC card near the top of your device.' 
                : 'Successfully extracted card data and NFC payload.'}
            </p>

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-primary bg-primary/5 py-2 px-4 rounded-full w-fit mx-auto">
              <Wifi className="w-3 h-3" />
              NFC READER ACTIVE
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NFCScanner;