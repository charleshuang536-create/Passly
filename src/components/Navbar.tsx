"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsDialog from '@/components/SettingsDialog';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-black/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5 transition-transform group-hover:scale-110">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Passly</span>
        </Link>

        <div className="flex items-center gap-3">
          <SettingsDialog />
          <Link to="/create">
            <Button variant="ghost" className="hidden sm:flex">
              My Passes
            </Button>
          </Link>
          <Link to="/create">
            <Button className="gap-2 rounded-full px-6">
              <PlusCircle className="h-4 w-4" />
              Create Pass
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
