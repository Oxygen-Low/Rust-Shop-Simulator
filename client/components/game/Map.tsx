import { useState, useCallback } from "react";
import { Trash2 } from "lucide-react";

export type BuildingType = "storage" | "furnace" | "turret";

export interface Building {
  id: string;
  type: BuildingType;
  x: number;
  y: number;
}

interface MapProps {
  selectedBuilding: BuildingType | null;
  onBuildingSelect?: (buildingId: string) => void;
  onBuildingDelete?: (buildingId: string) => void;
}

const GRID_SIZE = 12;
const CELL_SIZE = 60;

const buildingConfig: Record<BuildingType, { name: string; icon: string; color: string }> = {
  storage: { name: "Storage", icon: "📦", color: "bg-blue-900/40" },
  furnace: { name: "Furnace", icon: "🔥", color: "bg-orange-900/40" },
  turret: { name: "Turret", icon: "🎯", color: "bg-yellow-900/40" },
};

export default function Map({ selectedBuilding, onBuildingSelect, onBuildingDelete }: MapProps) {
  const [buildings, setBuildings] = useState<Building[]>([
    { id: "1", type: "storage", x: 2, y: 2 },
    { id: "2", type: "furnace", x: 4, y: 3 },
  ]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  const handleCellClick = useCallback(
    (x: number, y: number) => {
      if (!selectedBuilding) return;

      // Check if cell is already occupied
      const occupied = buildings.some((b) => b.x === x && b.y === y);
      if (occupied) return;

      // Add new building
      const newBuilding: Building = {
        id: `building-${Date.now()}`,
        type: selectedBuilding,
        x,
        y,
      };
      setBuildings([...buildings, newBuilding]);
    },
    [selectedBuilding, buildings]
  );

  const handleBuildingClick = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    onBuildingSelect?.(buildingId);
  };

  const handleDeleteBuilding = (buildingId: string) => {
    setBuildings(buildings.filter((b) => b.id !== buildingId));
    if (selectedBuildingId === buildingId) {
      setSelectedBuildingId(null);
    }
    onBuildingDelete?.(buildingId);
  };

  const getCellStyle = (x: number, y: number) => {
    const building = buildings.find((b) => b.x === x && b.y === y);
    const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
    const canBuild = !building && selectedBuilding && isHovered;

    if (building) {
      return `${buildingConfig[building.type].color} border-2 ${
        selectedBuildingId === building.id ? "border-accent" : "border-border/30"
      }`;
    }

    if (canBuild) {
      return "bg-accent/30 border-2 border-accent";
    }

    return "bg-background/50 border border-border/20 hover:border-border/50";
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Map header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border/50">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          BASE MAP
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {selectedBuilding
            ? `Placing ${buildingConfig[selectedBuilding].name}s - Click to place`
            : "Select a building type to start building"}
        </p>
      </div>

      {/* Map grid */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
        <div
          className="bg-card/30 border-2 border-border/50 rounded-sm p-2"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: "2px",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const building = buildings.find((b) => b.x === x && b.y === y);

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                onMouseEnter={() => setHoveredCell({ x, y })}
                onMouseLeave={() => setHoveredCell(null)}
                className={`w-full h-full rounded-sm transition-all cursor-pointer flex items-center justify-center ${getCellStyle(x, y)}`}
              >
                {building ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuildingClick(building.id);
                    }}
                    className="relative group w-full h-full flex items-center justify-center text-lg hover:scale-110 transition-transform"
                  >
                    {buildingConfig[building.type].icon}
                    {selectedBuildingId === building.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBuilding(building.id);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Building stats */}
      {selectedBuildingId && (
        <div className="border-t border-border/50 px-4 sm:px-6 py-3 bg-card/50">
          {buildings.find((b) => b.id === selectedBuildingId) && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {buildingConfig[buildings.find((b) => b.id === selectedBuildingId)!.type].name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Position: (
                  {buildings.find((b) => b.id === selectedBuildingId)?.x},
                  {buildings.find((b) => b.id === selectedBuildingId)?.y})
                </p>
              </div>
              <button
                onClick={() => selectedBuildingId && handleDeleteBuilding(selectedBuildingId)}
                className="px-3 py-1 bg-destructive hover:bg-destructive/80 text-foreground rounded-sm text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
