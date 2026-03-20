import { useMemo } from "react";
import { Bug } from "lucide-react";
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
  const formattedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

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
          <DropdownMenuLabel className="flex items-center gap-2 border-b border-border/60 bg-primary/5 px-4 py-3 text-sm font-semibold text-foreground">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Bug className="h-4 w-4" />
            </div>
            <span>{title}</span>
          </DropdownMenuLabel>

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