import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type StarterItemsType = "basic" | "enhanced" | "basic-clothings";

interface ClothingSelection {
  headwear: string | null;
  chestplate: string | null;
  pants: string | null;
  boots: string | null;
  gloves: string | null;
}

interface StarterItemsSelectorProps {
  selectedType: StarterItemsType;
  clothingSelection: ClothingSelection;
  onTypeChange: (type: StarterItemsType) => void;
  onClothingChange: (selection: ClothingSelection) => void;
}

const starterItems = [
  {
    id: "basic" as const,
    name: "Basic",
    description: "Classic starting loadout",
    items: [
      { name: "Scrap Metal", quantity: 500 },
      { name: "Wood", quantity: 3000 },
    ],
  },
  {
    id: "enhanced" as const,
    name: "Enhanced",
    description: "A more generous starting package",
    items: [
      { name: "Scrap Metal", quantity: 1000 },
      { name: "Wood", quantity: 5000 },
      { name: "Stone", quantity: 5000 },
    ],
  },
  {
    id: "basic-clothings" as const,
    name: "Basic with Clothing",
    description: "Basic items + custom clothing selection",
    items: [
      { name: "Scrap Metal", quantity: 500 },
      { name: "Wood", quantity: 3000 },
    ],
  },
];

const headwearOptions = ["Beanie", "Helmet", "Hazmat Hood"];
const chestplateOptions = ["Shirt", "Chestplate", "Hazmat Suit"];
const pantsOptions = ["Pants", "Tactical Pants", "Hazmat Pants"];
const bootsOptions = ["Boots", "Heavy Boots", "Hazmat Boots"];
const glovesOptions = ["Gloves", "Work Gloves", "Hazmat Gloves"];

export default function StarterItemsSelector({
  selectedType,
  clothingSelection,
  onTypeChange,
  onClothingChange,
}: StarterItemsSelectorProps) {
  const [expandedClothing, setExpandedClothing] = useState<keyof ClothingSelection | null>(null);

  const handleClothingSelect = (
    category: keyof ClothingSelection,
    value: string
  ) => {
    onClothingChange({
      ...clothingSelection,
      [category]: clothingSelection[category] === value ? null : value,
    });
    setExpandedClothing(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">STARTING ITEMS</h3>

      {/* Item type selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {starterItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTypeChange(item.id)}
            className={`group rounded-sm border-2 p-4 transition-all duration-200 text-left
              ${selectedType === item.id
                ? "border-burnt-500 bg-burnt-900/30"
                : "border-border/50 bg-card/30 hover:border-border"
              }
              hover:shadow-lg hover:shadow-burnt-500/10
            `}
          >
            <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
            <div className="space-y-1">
              {item.items.map((itemData, idx) => (
                <div key={idx} className="text-xs text-foreground/70">
                  • {itemData.name} x{itemData.quantity}
                </div>
              ))}
            </div>
            {selectedType === item.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-burnt-400 rounded-full mt-4"></div>
            )}
          </button>
        ))}
      </div>

      {/* Clothing customization section */}
      {selectedType === "basic-clothings" && (
        <div className="bg-card/50 border border-border/50 rounded-sm p-4 space-y-3">
          <h4 className="font-semibold text-foreground mb-4">CLOTHING</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Headwear */}
            <div className="relative">
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Headwear
              </label>
              <button
                onClick={() =>
                  setExpandedClothing(expandedClothing === "headwear" ? null : "headwear")
                }
                className="w-full flex items-center justify-between bg-background/50 border border-border/50 rounded-sm px-3 py-2 text-sm text-foreground hover:border-accent/50 transition-colors"
              >
                <span>{clothingSelection.headwear || "Select headwear..."}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedClothing === "headwear" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedClothing === "headwear" && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-sm z-10 overflow-hidden">
                  {headwearOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleClothingSelect("headwear", option)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        clothingSelection.headwear === option
                          ? "bg-rust-900/30 text-rust-400"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chestplate */}
            <div className="relative">
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Chestplate
              </label>
              <button
                onClick={() =>
                  setExpandedClothing(expandedClothing === "chestplate" ? null : "chestplate")
                }
                className="w-full flex items-center justify-between bg-background/50 border border-border/50 rounded-sm px-3 py-2 text-sm text-foreground hover:border-accent/50 transition-colors"
              >
                <span>{clothingSelection.chestplate || "Select chestplate..."}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedClothing === "chestplate" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedClothing === "chestplate" && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-sm z-10 overflow-hidden">
                  {chestplateOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleClothingSelect("chestplate", option)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        clothingSelection.chestplate === option
                          ? "bg-rust-900/30 text-rust-400"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pants */}
            <div className="relative">
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Pants
              </label>
              <button
                onClick={() =>
                  setExpandedClothing(expandedClothing === "pants" ? null : "pants")
                }
                className="w-full flex items-center justify-between bg-background/50 border border-border/50 rounded-sm px-3 py-2 text-sm text-foreground hover:border-accent/50 transition-colors"
              >
                <span>{clothingSelection.pants || "Select pants..."}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedClothing === "pants" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedClothing === "pants" && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-sm z-10 overflow-hidden">
                  {pantsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleClothingSelect("pants", option)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        clothingSelection.pants === option
                          ? "bg-rust-900/30 text-rust-400"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Boots */}
            <div className="relative">
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Boots
              </label>
              <button
                onClick={() =>
                  setExpandedClothing(expandedClothing === "boots" ? null : "boots")
                }
                className="w-full flex items-center justify-between bg-background/50 border border-border/50 rounded-sm px-3 py-2 text-sm text-foreground hover:border-accent/50 transition-colors"
              >
                <span>{clothingSelection.boots || "Select boots..."}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedClothing === "boots" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedClothing === "boots" && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-sm z-10 overflow-hidden">
                  {bootsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleClothingSelect("boots", option)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        clothingSelection.boots === option
                          ? "bg-rust-900/30 text-rust-400"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Gloves */}
            <div className="relative">
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Gloves
              </label>
              <button
                onClick={() =>
                  setExpandedClothing(expandedClothing === "gloves" ? null : "gloves")
                }
                className="w-full flex items-center justify-between bg-background/50 border border-border/50 rounded-sm px-3 py-2 text-sm text-foreground hover:border-accent/50 transition-colors"
              >
                <span>{clothingSelection.gloves || "Select gloves..."}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedClothing === "gloves" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedClothing === "gloves" && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-sm z-10 overflow-hidden">
                  {glovesOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleClothingSelect("gloves", option)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        clothingSelection.gloves === option
                          ? "bg-rust-900/30 text-rust-400"
                          : "hover:bg-muted"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hazmat Suit */}
            <div>
              <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                Full Suit
              </label>
              <button
                onClick={() => {
                  const hasHazmat =
                    clothingSelection.headwear === "Hazmat Hood" &&
                    clothingSelection.chestplate === "Hazmat Suit" &&
                    clothingSelection.pants === "Hazmat Pants" &&
                    clothingSelection.boots === "Hazmat Boots" &&
                    clothingSelection.gloves === "Hazmat Gloves";

                  if (hasHazmat) {
                    onClothingChange({
                      headwear: null,
                      chestplate: null,
                      pants: null,
                      boots: null,
                      gloves: null,
                    });
                  } else {
                    onClothingChange({
                      headwear: "Hazmat Hood",
                      chestplate: "Hazmat Suit",
                      pants: "Hazmat Pants",
                      boots: "Hazmat Boots",
                      gloves: "Hazmat Gloves",
                    });
                  }
                }}
                className={`w-full text-left bg-background/50 border-2 rounded-sm px-3 py-2 text-sm transition-colors ${
                  clothingSelection.headwear === "Hazmat Hood" &&
                  clothingSelection.chestplate === "Hazmat Suit"
                    ? "border-accent/50 bg-accent/10 text-accent font-semibold"
                    : "border-border/50 hover:border-accent/30"
                }`}
              >
                ☢️ Full Hazmat Suit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
