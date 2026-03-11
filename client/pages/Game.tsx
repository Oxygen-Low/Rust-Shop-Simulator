import { useState, useMemo } from "react";
import {
  Wrench,
  Logs,
  Shield,
  AlertTriangle,
  Box,
  Radio,
  Zap,
  Coins,
  BarChart3,
  Heart,
  Package,
  Star,
  Flame,
  DoorOpen,
} from "lucide-react";
import GameLayout from "@/components/layout/GameLayout";
import Header from "@/components/game/Header";
import Inventory, { InventoryItem } from "@/components/game/Inventory";
import Crafting, { CraftingRecipe } from "@/components/game/Crafting";

export default function Game() {
  // Get setup config from session storage
  const gameSetup = useMemo(() => {
    try {
      const stored = sessionStorage.getItem("gameSetup");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);
  // Sample inventory items
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Metal Fragment",
      quantity: 45,
      icon: <Wrench className="w-6 h-6" />,
      rarity: "common",
    },
    {
      id: "2",
      name: "Scrap Wood",
      quantity: 128,
      icon: <Logs className="w-6 h-6" />,
      rarity: "common",
    },
    {
      id: "3",
      name: "Rad Suit",
      quantity: 3,
      icon: <Shield className="w-6 h-6" />,
      rarity: "uncommon",
    },
    {
      id: "4",
      name: "High Quality Metal",
      quantity: 12,
      icon: <Zap className="w-6 h-6" />,
      rarity: "rare",
    },
    {
      id: "5",
      name: "Radiation",
      quantity: 5,
      icon: <AlertTriangle className="w-6 h-6" />,
      rarity: "rare",
    },
    {
      id: "6",
      name: "Supply Signal",
      quantity: 1,
      icon: <Radio className="w-6 h-6" />,
      rarity: "legendary",
    },
  ]);

  // Sample crafting recipes
  const [recipes] = useState<CraftingRecipe[]>([
    {
      id: "r1",
      name: "Metal Door",
      icon: <DoorOpen className="w-6 h-6" />,
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
      icon: <Box className="w-6 h-6" />,
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
      icon: <Flame className="w-6 h-6" />,
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
      icon: <Zap className="w-6 h-6" />,
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
    { label: "Credits", value: "12,450", icon: <Coins className="w-5 h-5" />, color: "burnt" as const },
    { label: "Level", value: "8", icon: <BarChart3 className="w-5 h-5" />, color: "rust" as const },
    { label: "Health", value: "85%", icon: <Heart className="w-5 h-5" />, color: "accent" as const },
    { label: "Radiation", value: "12%", icon: <AlertTriangle className="w-5 h-5" />, color: "rust" as const },
    { label: "Items", value: "194/200", icon: <Package className="w-5 h-5" />, color: "burnt" as const },
    { label: "Shop Rep", value: "S+", icon: <Star className="w-5 h-5" />, color: "accent" as const },
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
      shopName={gameSetup?.shopName || "RUST SHOP"}
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
