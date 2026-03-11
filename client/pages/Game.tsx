import { useState } from "react";
import GameLayout from "@/components/layout/GameLayout";
import Header from "@/components/game/Header";
import Inventory, { InventoryItem } from "@/components/game/Inventory";
import Crafting, { CraftingRecipe } from "@/components/game/Crafting";

export default function Game() {
  // Sample inventory items
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Metal Fragment",
      quantity: 45,
      icon: "🔩",
      rarity: "common",
    },
    {
      id: "2",
      name: "Scrap Wood",
      quantity: 128,
      icon: "🪵",
      rarity: "common",
    },
    {
      id: "3",
      name: "Rad Suit",
      quantity: 3,
      icon: "🥼",
      rarity: "uncommon",
    },
    {
      id: "4",
      name: "High Quality Metal",
      quantity: 12,
      icon: "⚙️",
      rarity: "rare",
    },
    {
      id: "5",
      name: "Radiation",
      quantity: 5,
      icon: "☢️",
      rarity: "rare",
    },
    {
      id: "6",
      name: "Supply Signal",
      quantity: 1,
      icon: "📡",
      rarity: "legendary",
    },
  ]);

  // Sample crafting recipes
  const [recipes] = useState<CraftingRecipe[]>([
    {
      id: "r1",
      name: "Metal Door",
      icon: "🚪",
      description: "A sturdy metal door for your shop",
      ingredients: [
        { name: "Metal Fragment", quantity: 30 },
        { name: "Scrap Wood", quantity: 20 },
      ],
      output: {
        name: "Metal Door",
        quantity: 1,
      },
      craftTime: 15,
      level: 1,
    },
    {
      id: "r2",
      name: "Storage Box",
      icon: "📦",
      description: "Increase your inventory capacity",
      ingredients: [
        { name: "Scrap Wood", quantity: 50 },
        { name: "Metal Fragment", quantity: 15 },
      ],
      output: {
        name: "Storage Box",
        quantity: 1,
      },
      craftTime: 20,
      level: 1,
    },
    {
      id: "r3",
      name: "Furnace",
      icon: "🔥",
      description: "Smelt ore into refined materials",
      ingredients: [
        { name: "Metal Fragment", quantity: 100 },
        { name: "High Quality Metal", quantity: 5 },
      ],
      output: {
        name: "Furnace",
        quantity: 1,
      },
      craftTime: 30,
      level: 3,
    },
    {
      id: "r4",
      name: "Ammunition",
      icon: "🔫",
      description: "Craft ammunition for defense",
      ingredients: [
        { name: "Metal Fragment", quantity: 20 },
      ],
      output: {
        name: "Ammunition",
        quantity: 15,
      },
      craftTime: 5,
      level: 1,
    },
  ]);

  // Player stats
  const stats = [
    { label: "Credits", value: "12,450", icon: "💰", color: "burnt" as const },
    { label: "Level", value: "8", icon: "📊", color: "rust" as const },
    { label: "Health", value: "85%", icon: "❤️", color: "accent" as const },
    { label: "Radiation", value: "12%", icon: "☢️", color: "rust" as const },
    { label: "Items", value: "194/200", icon: "📦", color: "burnt" as const },
    { label: "Shop Rep", value: "S+", icon: "⭐", color: "accent" as const },
  ];

  const handleItemClick = (item: InventoryItem) => {
    console.log("Item clicked:", item.name);
  };

  const handleCraft = (recipe: CraftingRecipe) => {
    console.log("Crafting:", recipe.name);
  };

  return (
    <GameLayout
      header={<Header stats={stats} />}
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        {/* Left side - Inventory */}
        <div className="border-r border-border/50 overflow-hidden">
          <Inventory items={inventoryItems} onItemClick={handleItemClick} />
        </div>

        {/* Right side - Crafting */}
        <div className="overflow-hidden">
          <Crafting recipes={recipes} onCraft={handleCraft} />
        </div>
      </div>
    </GameLayout>
  );
}
