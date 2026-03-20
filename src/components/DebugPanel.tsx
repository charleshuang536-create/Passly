import { useMemo, useState } from "react";
import { Bug, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DebugPanelProps {
  title?: string;
  data: unknown;
}

const DebugPanel = ({ title = "Debug", data }: DebugPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const formattedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
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
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="max-h-[24rem] overflow-auto bg-card/80 px-4 py-3">
          <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-5 text-muted-foreground">
            {formattedData}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
