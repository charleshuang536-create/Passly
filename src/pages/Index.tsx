"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Smartphone, Shield, Zap, CreditCard } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-blue-500" />,
      title: "Native Integration",
      description: "Seamlessly integrates with Apple Wallet on iPhone and Apple Watch."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Secure Storage",
      description: "Your data is encrypted and stored locally on your device's Secure Element."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Access",
      description: "Double-click the side button to access your passes instantly anywhere."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      title: "Custom Designs",
      description: "Personalize your passes with custom colors, logos, and information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 bg-background rounded-xl w-fit border border-border">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-8 h-8 bg-foreground rounded-lg" />
            <span className="font-bold text-xl">Passly</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Passly Inc. All rights reserved.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;