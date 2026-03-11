import { ReactNode } from "react";

interface Stat {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: "rust" | "burnt" | "accent";
}

interface HeaderProps {
  stats: Stat[];
}

export default function Header({ stats }: HeaderProps) {
  const getStatColor = (color?: string) => {
    switch (color) {
      case "rust":
        return "text-rust-400";
      case "burnt":
        return "text-burnt-400";
      case "accent":
        return "text-accent";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-background/50 border border-border/50 rounded-sm p-3 backdrop-blur-sm"
          >
            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${getStatColor(stat.color)}`}>
              {stat.icon && <span className="flex-shrink-0">{stat.icon}</span>}
              <span>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
