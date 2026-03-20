"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-black/70">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">Passly</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/create">
            <Button variant="ghost" className="hidden sm:flex">My Passes</Button>
          </Link>
          <Link to="/create">
            <Button className="gap-2 rounded-full px-6">
              <PlusCircle className="w-4 h-4" />
              Create Pass
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;