"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wifi, Zap, Dumbbell, ShoppingBag, Ticket, Star, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface CardPreviewProps {
  data: {
    label: string;
    name: string;
    color: string;
    textColor: string;
    id: string;
    type: string;
    payload?: string;
    finish: string;
    icon: string;
    techType: 'nfc' | 'qr';
    qrContent: string;
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

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Live Preview</div>
      
      <motion.div 
        layout
        className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col justify-between transition-colors duration-500"
        style={{ 
          backgroundColor: data.color || '#2563eb',
          color: data.textColor || '#ffffff'
        }}
      >
        {/* Finish Effects */}
        {data.finish === 'glossy' && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none" />
        )}
        {data.finish === 'metallic' && (
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.2)_40%,transparent_60%)] bg-[length:200%_100%] animate-shimmer pointer-events-none" />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              {getIcon()}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-70 mb-0.5">{data.type || 'Generic Pass'}</div>
              <div className="text-lg font-bold leading-tight">{data.label || 'My New Pass'}</div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {data.techType === 'nfc' ? (
              <>
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Wifi className="w-5 h-5 rotate-90" />
                </div>
                {data.payload && (
                  <div className="bg-yellow-400/20 p-1 rounded-md backdrop-blur-sm border border-yellow-400/30">
                    <Zap className="w-3 h-3 text-yellow-400" />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <QrCode className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Card Holder</div>
            <div className="font-medium truncate max-w-[120px]">{data.name || 'Your Name'}</div>
          </div>
          
          <AnimatePresence mode="wait">
            {data.techType === 'qr' ? (
              <motion.div 
                key="qr"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-1.5 rounded-lg shadow-lg"
              >
                <QRCodeSVG 
                  value={data.qrContent || 'https://passly.app'} 
                  size={64}
                  level="M"
                  includeMargin={false}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="serial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-right"
              >
                <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Serial Number</div>
                <div className="font-mono text-sm">{data.id || '•••• ••••'}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Smartphone className="w-3 h-3" />
          Optimized for iPhone & Apple Watch
        </div>
      </div>
    </div>
  );
};

export default CardPreview;