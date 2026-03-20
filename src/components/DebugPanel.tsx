import { useMemo, useState } from "react";
import { Bug, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DebugPanelProps {
  title?: string;
  data: unknown;
}

const DebugPanel = ({ title = "Debug", data }: DebugPanelProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showStep, setShowStep] = useState(true);
  const [showCardData, setShowCardData] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);

  const filteredData = useMemo(() => {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return data;
    }

    const source = data as Record<string, unknown>;
    const next: Record<string, unknown> = {};

    if (showStep && "step" in source) {
      next.step = source.step;
    }

    if (showCardData && "cardData" in source) {
      next.cardData = source.cardData;
    }

    return next;
  }, [data, showCardData, showStep]);

  const formattedData = useMemo(
    () => JSON.stringify(filteredData, null, prettyPrint ? 2 : 0),
    [filteredData, prettyPrint],
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="h-14 w-14 rounded-full border border-border/70 bg-background/95 shadow-2xl backdrop-blur-xl hover:scale-105"
          >
            <Bug className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="end"
          sideOffset={12}
          className="w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/95 p-0 shadow-2xl backdrop-blur-xl"
        >
          <DropdownMenuLabel className="flex items-center justify-between gap-3 border-b border-border/60 bg-primary/5 px-4 py-3 text-sm font-semibold text-foreground">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Bug className="h-4 w-4" />
              </div>
              <span>{title}</span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setShowSettings((current) => !current);
              }}
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </DropdownMenuLabel>

          {showSettings && (
            <div className="space-y-3 border-b border-border/60 bg-muted/30 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Settings
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowStep((current) => !current)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    showStep
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  Show step
                </button>

                <button
                  type="button"
                  onClick={() => setShowCardData((current) => !current)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    showCardData
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  Show card data
                </button>

                <button
                  type="button"
                  onClick={() => setPrettyPrint((current) => !current)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    prettyPrint
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  Pretty print
                </button>
              </div>
            </div>
          )}

          <DropdownMenuSeparator className="m-0" />

          <div className="max-h-[24rem] overflow-auto bg-card/80 px-4 py-3">
            <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-5 text-muted-foreground">
              {formattedData}
            </pre>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DebugPanel;
