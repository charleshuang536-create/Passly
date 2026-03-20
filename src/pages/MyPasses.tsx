import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, PlusCircle, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CardPreview from '@/components/CardPreview';
import { Button } from '@/components/ui/button';
import { deletePass, getSavedPasses, SavedPass } from '@/lib/pass-store';
import { showSuccess } from '@/utils/toast';

const MyPasses = () => {
  const [passes, setPasses] = useState<SavedPass[]>([]);

  useEffect(() => {
    setPasses(getSavedPasses());
  }, []);

  const handleDelete = (savedId: string) => {
    deletePass(savedId);
    setPasses(getSavedPasses());
    showSuccess('Pass removed.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pb-20 pt-32">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Library</p>
              <h1 className="text-4xl font-bold tracking-tight">My Passes</h1>
              <p className="max-w-2xl text-muted-foreground">
                Your saved passes live here so you can review, manage, and reuse them any time.
              </p>
            </div>

            <Link to="/create" className="self-center md:self-auto">
              <Button className="gap-2 rounded-full px-6">
                <PlusCircle className="h-4 w-4" />
                Create another pass
              </Button>
            </Link>
          </div>

          {passes.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-border/70 bg-card/60 px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-7 w-7" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold">No passes yet</h2>
              <p className="mx-auto mb-6 max-w-md text-muted-foreground">
                Create your first pass and it will show up here automatically.
              </p>
              <Link to="/create">
                <Button className="rounded-full px-6">Create your first pass</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {passes.map((pass) => (
                <div
                  key={pass.savedId}
                  className="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-sm"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{pass.label || 'Untitled Pass'}</p>
                      <p className="text-xs text-muted-foreground">
                        Saved {new Date(pass.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(pass.savedId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardPreview data={pass} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyPasses;
