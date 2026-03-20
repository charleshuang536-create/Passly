"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Zap } from 'lucide-react';

interface CardPreviewProps {
  data: {
    label: string;
    name: string;
    color: string;
    id: string;
    type: string;
    payload?: string;
  };
}

const CardPreview = ({ data }: CardPreviewProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Live Preview</div>
      
      <motion.div 
        layout
        className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col justify-between text-white"
        style={{ backgroundColor: data.color || '#2563eb' }}
      >
        {/* Gloss effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">{data.type || 'Generic Pass'}</div>
            <div className="text-xl font-bold leading-tight">{data.label || 'My New Pass'}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Wifi className="w-5 h-5 rotate-90" />
            </div>
            {data.payload && (
              <div className="bg-yellow-400/20 p-1 rounded-md backdrop-blur-sm border border-yellow-400/30">
                <Zap className="w-3 h-3 text-yellow-400" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end relative z-10">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Card Holder</div>
            <div className="font-medium">{data.name || 'Your Name'}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Serial Number</div>
            <div className="font-mono text-sm">{data.id || '•••• ••••'}</div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Smartphone className="w-3 h-3" />
          Optimized for iPhone & Apple Watch
        </div>
        
        {data.payload && (
          <div className="text-[10px] font-mono text-primary bg-primary/5 px-3 py-1 rounded-md border border-primary/10">
            NFC Payload: {data.payload}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;