"use client";

import React, { useRef } from 'react';
import { Pipette, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppleColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const AppleColorPicker = ({ value, onChange, label }: AppleColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const appleColors = [
    // Row 1: Grayscale
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    // Row 2: Reds/Pinks
    '#FF3B30', '#FF2D55', '#FF375F', '#FF9F0A', '#FFD60A', '#FFCC00',
    // Row 3: Greens/Blues
    '#34C759', '#28CD41', '#00C7BE', '#30B0C7', '#32ADE6', '#007AFF',
    // Row 4: Purples/Indigos
    '#5856D6', '#AF52DE', '#BF5AF2', '#5E5CE6', '#64D2FF', '#70D7FF',
  ];

  const isCustomColor = !appleColors.includes(value.toUpperCase()) && value !== '';

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
      
      <div className="grid grid-cols-6 gap-2 p-3 bg-muted/30 rounded-2xl border border-border/50">
        {appleColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={cn(
              "w-full aspect-square rounded-full border-2 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm",
              value.toUpperCase() === color.toUpperCase() 
                ? "border-primary ring-2 ring-primary/20 scale-110 z-10" 
                : "border-white/10"
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full aspect-square rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 hover:border-primary hover:bg-primary/5 group",
            isCustomColor ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-muted-foreground/30"
          )}
          style={isCustomColor ? { backgroundColor: value } : {}}
        >
          {isCustomColor ? (
            <Pipette className="w-3 h-3 text-primary-foreground mix-blend-difference" />
          ) : (
            <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          )}
        </button>
      </div>

      <input 
        ref={inputRef}
        type="color" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      
      {isCustomColor && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10 w-fit">
          <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: value }} />
          <span className="text-[10px] font-mono font-medium text-primary uppercase">{value}</span>
        </div>
      )}
    </div>
  );
};

export default AppleColorPicker;