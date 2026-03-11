import { ReactNode } from "react";
import { Package } from "lucide-react";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  icon?: ReactNode;
  rarity?: "common" | "uncommon" | "rare" | "legendary";
}

interface InventoryProps {
  items: InventoryItem[];
  onItemClick?: (item: InventoryItem) => void;
}

const rarityColors = {
  common: "border-muted-foreground/40",
  uncommon: "border-burnt-400",
  rare: "border-accent",
  legendary: "border-rust-400",
};

const rarityBgColors = {
  common: "bg-background/30",
  uncommon: "bg-burnt-900/20",
  rare: "bg-accent/10",
  legendary: "bg-rust-900/20",
};

export default function Inventory({ items, onItemClick }: InventoryProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border/50">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-burnt-400" />
          INVENTORY
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{items.length} items stored</p>
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No items in inventory</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={`group relative p-4 rounded-sm border-2 transition-all duration-200 text-left
                  ${rarityBgColors[item.rarity || "common"]}
                  ${rarityColors[item.rarity || "common"]}
                  hover:shadow-lg hover:shadow-rust-500/20
                  active:scale-95
                `}
              >
                {/* Rarity indicator glow */}
                {item.rarity !== "common" && (
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: item.rarity === "legendary" ? "rgba(219, 112, 52, 0.2)" :
                                  item.rarity === "rare" ? "rgba(255, 165, 0, 0.2)" :
                                  "rgba(188, 96, 40, 0.2)"
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-sm break-words">{item.name}</h4>
                      {item.rarity && item.rarity !== "common" && (
                        <p className="text-xs text-accent capitalize mt-1">{item.rarity}</p>
                      )}
                    </div>
                    {item.icon && (
                      <div className="flex-shrink-0 text-foreground/70">{item.icon}</div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Qty: <span className="font-semibold text-foreground">{item.quantity}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
