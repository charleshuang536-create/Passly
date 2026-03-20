"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] // Custom Apple-style ease
            }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              The Future of Digital Wallets
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Your Physical Cards, <br />
              <span className="text-primary">Digitized in Seconds.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Create custom NFC-enabled passes for Apple Wallet. From gym memberships to loyalty cards, keep everything in one secure place.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95">
                  Get Started Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full hover:bg-muted transition-all duration-300">
                How it works
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: 0.4, 
              duration: 1, 
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="mt-20 relative"
          >
            <div className="relative z-10 mx-auto max-w-[300px] aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-800 rounded-b-2xl" />
              <div className="p-4 pt-12 h-full bg-zinc-900 flex flex-col gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="w-full aspect-[1.6/1] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4 flex flex-col justify-between shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 bg-white/20 rounded-full" />
                    <Smartphone className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="text-white/60 text-[10px] uppercase tracking-widest">Member Pass</div>
                    <div className="text-white font-bold">Alex Johnson</div>
                  </div>
                </motion.div>
                <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl p-4 flex flex-col justify-between opacity-50">
                  <div className="w-8 h-8 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Floating elements with smoother animations */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 -left-4 md:-left-20 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-border flex items-center gap-3"
            >
              <div className="p-2 bg-green-500/10 rounded-full">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Secure Encryption</div>
                <div className="text-[10px] text-muted-foreground">End-to-end protection</div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ 
                y: [0, 15, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-1/4 -right-4 md:-right-20 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-border flex items-center gap-3"
            >
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">Instant Sync</div>
                <div className="text-[10px] text-muted-foreground">Ready in seconds</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;