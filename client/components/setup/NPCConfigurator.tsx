import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export type NPCType = "hostile" | "defensive" | "friendly" | "trader";
export type DistributionMode = "random" | "split" | "custom";

interface NPCConfig {
  count: number;
  distributionMode: DistributionMode;
  selectedTypes: NPCType[];
  customAssignments: NPCType[];
}

interface NPCConfiguratorProps {
  config: NPCConfig;
  onConfigChange: (config: NPCConfig) => void;
}

const npcTypes: Array<{
  id: NPCType;
  name: string;
  description: string;
  color: string;
}> = [
  {
    id: "hostile",
    name: "Hostile",
    description: "Raid other NPCs, attack any NPC or player on sight, raid player base",
    color: "text-destructive",
  },
  {
    id: "defensive",
    name: "Defensive",
    description: "Carries weapons everywhere, defends base frequently, only attacks when attacked",
    color: "text-rust-400",
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Rarely carries weapons, attacks when attacked, minimal aggression",
    color: "text-burnt-400",
  },
  {
    id: "trader",
    name: "Trader",
    description: "Same as defensive but brings more loot to trade, profit-oriented",
    color: "text-accent",
  },
];

export default function NPCConfigurator({ config, onConfigChange }: NPCConfiguratorProps) {
  const [expandedType, setExpandedType] = useState<NPCType | null>(null);

  const toggleNPCType = (type: NPCType) => {
    const isSelected = config.selectedTypes.includes(type);
    const newSelectedTypes = isSelected
      ? config.selectedTypes.filter((t) => t !== type)
      : [...config.selectedTypes, type];

    onConfigChange({
      ...config,
      selectedTypes: newSelectedTypes,
    });
  };

  const handleCountChange = (newCount: number) => {
    const clampedCount = Math.max(0, Math.min(20, newCount));
    onConfigChange({
      ...config,
      count: clampedCount,
      customAssignments: Array(clampedCount)
        .fill(null)
        .map((_, i) => config.customAssignments[i] || "friendly"),
    });
  };

  const handleDistributionChange = (mode: DistributionMode) => {
    const newConfig = { ...config, distributionMode: mode };

    if (mode === "split" && config.selectedTypes.length > 0) {
      // Distribute NPCs evenly across selected types
      const newAssignments: NPCType[] = [];
      for (let i = 0; i < config.count; i++) {
        newAssignments[i] = config.selectedTypes[i % config.selectedTypes.length];
      }
      newConfig.customAssignments = newAssignments;
    } else if (mode === "random" && config.selectedTypes.length > 0) {
      // Random assignment
      const newAssignments: NPCType[] = [];
      for (let i = 0; i < config.count; i++) {
        newAssignments[i] =
          config.selectedTypes[Math.floor(Math.random() * config.selectedTypes.length)];
      }
      newConfig.customAssignments = newAssignments;
    }

    onConfigChange(newConfig);
  };

  const handleCustomAssignment = (index: number, type: NPCType) => {
    const newAssignments = [...config.customAssignments];
    newAssignments[index] = type;
    onConfigChange({
      ...config,
      customAssignments: newAssignments,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">NPC CONFIGURATION</h3>

      {/* NPC Count */}
      <div className="bg-card/50 border border-border/50 rounded-sm p-4 space-y-3">
        <h4 className="font-semibold text-foreground">Number of NPCs</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCountChange(config.count - 1)}
            className="p-2 bg-muted hover:bg-muted/80 rounded-sm transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-1 bg-background/50 border border-border/50 rounded-sm px-4 py-2 text-center">
            <span className="text-2xl font-bold text-foreground">{config.count}</span>
          </div>
          <button
            onClick={() => handleCountChange(config.count + 1)}
            className="p-2 bg-muted hover:bg-muted/80 rounded-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Select between 0-20 NPCs</p>
      </div>

      {config.count > 0 && (
        <>
          {/* NPC Types Selection */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Select NPC Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {npcTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleNPCType(type.id)}
                  className={`p-3 rounded-sm border-2 transition-all text-left ${
                    config.selectedTypes.includes(type.id)
                      ? "border-accent bg-accent/10"
                      : "border-border/50 bg-card/30 hover:border-border"
                  }`}
                >
                  <h5 className={`font-semibold ${type.color}`}>{type.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  {config.selectedTypes.includes(type.id) && (
                    <div className="mt-2 w-3 h-3 bg-accent rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            {config.selectedTypes.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                Select at least one NPC type to continue
              </p>
            )}
          </div>

          {/* Distribution Mode */}
          {config.selectedTypes.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Distribution Mode</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: "random" as const,
                    label: "Completely Random",
                    description: "Each NPC gets a random personality type",
                  },
                  {
                    id: "split" as const,
                    label: "Split Evenly",
                    description: "Types are distributed equally among NPCs",
                  },
                  {
                    id: "custom" as const,
                    label: "Custom Assignment",
                    description: "Assign each NPC individually",
                  },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleDistributionChange(mode.id)}
                    className={`p-3 rounded-sm border-2 transition-all text-left ${
                      config.distributionMode === mode.id
                        ? "border-rust-500 bg-rust-900/30"
                        : "border-border/50 bg-card/30 hover:border-border"
                    }`}
                  >
                    <h5 className="font-semibold text-foreground">{mode.label}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Assignment */}
          {config.distributionMode === "custom" && config.selectedTypes.length > 0 && (
            <div className="bg-card/50 border border-border/50 rounded-sm p-4 space-y-3 max-h-64 overflow-y-auto">
              <h4 className="font-semibold text-foreground sticky top-0 bg-card/50">
                Assign NPC Types
              </h4>
              <div className="space-y-2">
                {config.customAssignments.map((assignment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground w-12">
                      NPC {idx + 1}:
                    </span>
                    <div className="flex-1 flex gap-2">
                      {config.selectedTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleCustomAssignment(idx, type)}
                          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                            assignment === type
                              ? "bg-accent text-accent-foreground font-semibold"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {npcTypes.find((t) => t.id === type)?.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-card/50 border border-border/50 rounded-sm p-4">
            <h4 className="font-semibold text-foreground mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground">
              {config.count} NPCs will spawn with {config.selectedTypes.length} personality
              type{config.selectedTypes.length !== 1 ? "s" : ""} in{" "}
              <span className="text-accent font-semibold">
                {config.distributionMode === "random"
                  ? "random"
                  : config.distributionMode === "split"
                    ? "split"
                    : "custom"}
              </span>{" "}
              distribution.
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Selected types: {config.selectedTypes.map((t) => npcTypes.find((n) => n.id === t)?.name).join(", ")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
