"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Folder, PlusCircle, Settings, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsDialog from '@/components/SettingsDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-black/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="group flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1.5 transition-transform group-hover:scale-110">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Passly</span>
          </Link>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 rounded-full px-6">
                  <PlusCircle className="h-4 w-4" />
                  Create Pass
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-56 rounded-3xl border-border/70 p-2 shadow-xl"
              >
                <Link to="/create">
                  <DropdownMenuItem className="rounded-2xl px-3 py-3 font-medium">
                    <PlusCircle className="mr-2 h-4 w-4 text-primary" />
                    Create Pass
                  </DropdownMenuItem>
                </Link>
                <Link to="/passes">
                  <DropdownMenuItem className="rounded-2xl px-3 py-3 font-medium">
                    <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                    My Passes
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="rounded-2xl px-3 py-3 font-medium"
                  onSelect={() => setIsSettingsOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
};

export default Navbar;