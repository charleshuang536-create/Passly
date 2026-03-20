import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { showSuccess } from '@/utils/toast';
import { Bell, Palette, Shield } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [privatePreview, setPrivatePreview] = useState(true);

  const handleSave = () => {
    showSuccess('Settings saved.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pb-20 pt-32">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Preferences</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Settings</h1>
            <p className="max-w-2xl text-muted-foreground">
              Manage the way your pass builder feels and behaves.
            </p>
          </div>

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
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                  <div className="space-y-1">
                    <Label htmlFor="privatePreview">Private preview mode</Label>
                    <p className="text-sm text-muted-foreground">Keep sensitive card details masked in previews by default.</p>
                  </div>
                  <Switch id="privatePreview" checked={privatePreview} onCheckedChange={setPrivatePreview} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="rounded-full px-6">
              Save settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
