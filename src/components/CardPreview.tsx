"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wifi, Zap, Dumbbell, ShoppingBag, Ticket, Star, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';

interface CardPreviewProps {
  data: {
    label: string;
    name: string;
    color: string;
    textColor: string;
    secondaryColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    id: string;
    type: string;
    payload?: string;
    finish: string;
    icon: string;
    techType: 'nfc' | 'qr';
    qrContent: string;
    layout: 'standard' | 'compact' | 'minimal';
    customFields: Array<{ label: string; value: string }>;
  };
}

const CardPreview = ({ data }: CardPreviewProps) => {
  const getIcon = () => {
    switch (data.icon) {
      case 'dumbbell': return <Dumbbell className="w-5 h-5" />;
      case 'shopping-bag': return <ShoppingBag className="w-5 h-5" />;
      case 'ticket': return <Ticket className="w-5 h-5" />;
      case 'star': return <Star className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const maskedSerial = data.id 
    ? `•••• ${data.id.slice(-4)}` 
    : '•••• ••••';

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Live Preview</div>
      
      <motion.div 
        layout
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          layout: { duration: 0.4 }
        }}
        className={cn(
          "relative w-full max-w-[340px] shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-500",
          data.layout === 'standard' ? 'aspect-[1.58/1] p-6' : 
          data.layout === 'compact' ? 'aspect-[2/1] p-4' : 'aspect-[1.58/1] p-8'
        )}
        style={{ 
          backgroundColor: data.color || '#2563eb',
          color: data.textColor || '#ffffff',
          borderColor: data.borderColor || 'transparent',
          borderWidth: `${data.borderWidth}px`,
          borderRadius: `${data.borderRadius}px`,
          borderStyle: 'solid'
        }}
      >
        {/* Finish Effects */}
        {data.finish === 'glossy' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" 
          />
        )}
        {data.finish === 'metallic' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.2)_40%,transparent_60%)] bg-[length:200%_100%] animate-shimmer pointer-events-none" 
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <motion.div layout className={cn("flex justify-between items-start relative z-10", data.layout === 'minimal' && 'flex-col gap-4')}>
          <motion.div layout className="flex items-center gap-3">
            <motion.div 
              layout
              className="p-2 rounded-lg backdrop-blur-md"
              style={{ backgroundColor: `${data.secondaryColor}40` || 'rgba(255,255,255,0.2)' }}
            >
              {getIcon()}
            </motion.div>
            <motion.div layout>
              <div className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">{data.type || 'Generic Pass'}</div>
              <div className={cn("font-bold leading-tight", data.layout === 'compact' ? 'text-base' : 'text-lg')}>
                {data.label || 'My New Pass'}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div layout className={cn("flex items-center gap-2", data.layout === 'minimal' ? 'w-full justify-between' : 'flex-col items-end')}>
            {data.techType === 'nfc' ? (
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Wifi className="w-4 h-4 rotate-90" />
                </div>
                {data.payload && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-yellow-400/20 p-1 rounded-md backdrop-blur-sm border border-yellow-400/30"
                  >
                    <Zap className="w-3 h-3 text-yellow-400" />
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <QrCode className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Custom Fields Area */}
        <AnimatePresence>
          {data.layout === 'standard' && data.customFields.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-2 gap-2 relative z-10 my-2"
            >
              {data.customFields.slice(0, 2).map((field, i) => (
                <div key={i} className="overflow-hidden">
                  <div className="text-[8px] uppercase tracking-widest opacity-60">{field.label}</div>
                  <div className="text-[10px] font-semibold truncate">{field.value}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="flex justify-between items-end relative z-10">
          <motion.div layout className="flex-1">
            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Card Holder</div>
            <div className="font-medium truncate max-w-[120px]">{data.name || 'Your Name'}</div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {data.techType === 'qr' ? (
              <motion.div 
                key="qr"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white p-1 rounded-lg shadow-lg"
              >
                <QRCodeSVG 
                  value={data.qrContent || 'https://passly.app'} 
                  size={data.layout === 'compact' ? 48 : 56}
                  level="M"
                  includeMargin={false}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="serial"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-right"
              >
                <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Serial</div>
                <div className="font-mono text-[10px]">{maskedSerial}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Smartphone className="w-3 h-3" />
          Optimized for iPhone & Apple Watch
        </div>
      </motion.div>
    </div>
  );
};

export default CardPreview;