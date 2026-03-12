import { BuildingType } from "./Map";

interface BuildingSelectorProps {
  selectedBuilding: BuildingType | null;
  onBuildingSelect: (building: BuildingType | null) => void;
}

const availableBuildings: Array<{
  type: BuildingType;
  name: string;
  icon: string;
  description: string;
  cost: { scrap: number; wood: number };
}> = [
  {
    type: "storage",
    name: "Storage",
    icon: "📦",
    description: "Increase inventory capacity",
    cost: { scrap: 30, wood: 25 },
  },
  {
    type: "furnace",
    name: "Furnace",
    icon: "🔥",
    description: "Smelt raw materials",
    cost: { scrap: 50, wood: 40 },
  },
  {
    type: "turret",
    name: "Turret",
    icon: "🎯",
    description: "Automated defense system",
    cost: { scrap: 100, wood: 50 },
  },
];

export default function BuildingSelector({
  selectedBuilding,
  onBuildingSelect,
}: BuildingSelectorProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border/50">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          BUILDINGS
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {selectedBuilding
            ? "Click on a cell to place"
            : "Select a building to place on your map"}
        </p>
      </div>

      {/* Buildings list */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-2">
        {availableBuildings.map((building) => (
          <button
            key={building.type}
            onClick={() =>
              onBuildingSelect(selectedBuilding === building.type ? null : building.type)
            }
            className={`w-full p-3 rounded-sm border-2 transition-all text-left group ${
              selectedBuilding === building.type
                ? "border-accent bg-accent/10"
                : "border-border/50 bg-card/30 hover:border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{building.icon}</span>
                <div>
                  <h4 className="font-bold text-foreground">{building.name}</h4>
                  <p className="text-xs text-muted-foreground">{building.description}</p>
                </div>
              </div>
              {selectedBuilding === building.type && (
                <div className="w-3 h-3 bg-accent rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>

            {/* Cost */}
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="bg-background/50 px-2 py-1 rounded">
                Scrap: {building.cost.scrap}
              </span>
              <span className="bg-background/50 px-2 py-1 rounded">
                Wood: {building.cost.wood}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
