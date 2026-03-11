import { Lock } from "lucide-react";

export type Gamemode = "mainland" | "ocean" | "deepsea";

interface GamemodeSelectorProps {
  selectedGamemode: Gamemode;
  onGamemodeChange: (gamemode: Gamemode) => void;
}

const gamemodes = [
  {
    id: "mainland" as const,
    name: "Mainland",
    description: "The classic Rust experience on dry land. Build your shop, survive, and dominate the wasteland.",
    icon: "🏜️",
    enabled: true,
  },
  {
    id: "ocean" as const,
    name: "Ocean",
    description: "Establish your trading post on a floating platform amidst endless waters.",
    icon: "🌊",
    enabled: false,
    status: "Work In Progress",
  },
  {
    id: "deepsea" as const,
    name: "Deep Sea",
    description: "Build an underground facility in the depths. Survive strange creatures and treasure hunters.",
    icon: "🌌",
    enabled: false,
    status: "Work In Progress",
  },
];

export default function GamemodeSelector({
  selectedGamemode,
  onGamemodeChange,
}: GamemodeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">GAMEMODE</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gamemodes.map((gamemode) => (
          <button
            key={gamemode.id}
            onClick={() => gamemode.enabled && onGamemodeChange(gamemode.id)}
            disabled={!gamemode.enabled}
            className={`relative group rounded-sm border-2 p-4 transition-all duration-200 text-left
              ${selectedGamemode === gamemode.id && gamemode.enabled
                ? "border-rust-500 bg-rust-900/30"
                : "border-border/50 bg-card/30 hover:border-border"
              }
              ${!gamemode.enabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-rust-500/10"}
            `}
          >
            {/* Icon */}
            <div className="text-3xl mb-3">{gamemode.icon}</div>

            {/* Content */}
            <h4 className="font-bold text-foreground mb-1 flex items-center justify-between gap-2">
              {gamemode.name}
              {!gamemode.enabled && <Lock className="w-4 h-4 text-muted-foreground" />}
            </h4>

            <p className="text-sm text-muted-foreground mb-2">{gamemode.description}</p>

            {/* Status badge */}
            {gamemode.status && (
              <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-1 rounded inline-block">
                {gamemode.status}
              </span>
            )}

            {/* Selection indicator */}
            {selectedGamemode === gamemode.id && gamemode.enabled && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-rust-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
