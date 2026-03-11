import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Settings, Sword } from "lucide-react";

interface GameLayoutProps {
  children: ReactNode;
  header: ReactNode;
}

export default function GameLayout({ children, header }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top navigation bar */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Exit Shop</span>
        </Link>

        <div className="flex items-center gap-2">
          <Sword className="w-5 h-5 text-rust-400" />
          <h2 className="text-lg font-bold text-rust-400">RUST SHOP</h2>
          <Sword className="w-5 h-5 text-rust-400" />
        </div>

        <button className="p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Header with stats */}
      <div className="bg-card/50 border-b border-border/50">
        {header}
      </div>

      {/* Main game content area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
