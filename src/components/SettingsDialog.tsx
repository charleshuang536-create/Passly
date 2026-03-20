import { useState } from 'react';
import { Bell, Palette, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { showSuccess } from '@/utils/toast';

const SettingsDialog = () => {
  const [notifications, setNotifications] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [privatePreview, setPrivatePreview] = useState(true);

  const handleSave = () => {
    showSuccess('Settings saved.');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hidden rounded-full border border-border/60 bg-background/60 sm:inline-flex"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] max-w-3xl overflow-hidden rounded-[2rem] border-border/70 p-0">
        <div className="max-h-[85vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <DialogHeader className="mb-8 space-y-3 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Preferences</p>
            <DialogTitle className="text-4xl font-bold tracking-tight">Settings</DialogTitle>
            <DialogDescription className="max-w-2xl text-base">
              Manage the way your pass builder feels and behaves.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <Card className="rounded-[2rem] border-border/70 shadow-sm">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose if you want alerts and helpful reminders.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 px-4 py-4">
                  <div className="space-y-1 pr-4">
                    <Label htmlFor="notifications">Project notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about saved passes and product changes.</p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border/70 shadow-sm">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-2xl bg-purple-500/10 p-3 text-purple-500">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Interface</CardTitle>
                  <CardDescription>Adjust motion and visual comfort inside the builder.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 px-4 py-4">
                  <div className="space-y-1 pr-4">
                    <Label htmlFor="reducedMotion">Reduced motion</Label>
                    <p className="text-sm text-muted-foreground">Use gentler transitions while editing your pass.</p>
                  </div>
                  <Switch id="reducedMotion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-border/70 shadow-sm">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Privacy</CardTitle>
                  <CardDescription>Control how much data stays visible while designing.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 px-4 py-4">
                  <div className="space-y-1 pr-4">
                    <Label htmlFor="privatePreview">Private preview mode</Label>
                    <p className="text-sm text-muted-foreground">Keep sensitive card details masked in previews by default.</p>
                  </div>
                  <Switch id="privatePreview" checked={privatePreview} onCheckedChange={setPrivatePreview} />
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="mt-8">
            <Button onClick={handleSave} className="rounded-full px-6">
              Save settings
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
