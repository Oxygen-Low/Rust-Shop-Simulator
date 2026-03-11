import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import GamemodeSelector, { Gamemode } from "@/components/setup/GamemodeSelector";
import StarterItemsSelector, {
  StarterItemsType,
} from "@/components/setup/StarterItemsSelector";
import NameInputs from "@/components/setup/NameInputs";
import NPCConfigurator, { NPCType, DistributionMode } from "@/components/setup/NPCConfigurator";

interface GameSetup {
  gamemode: Gamemode;
  starterItems: StarterItemsType;
  characterName: string;
  shopName: string;
  clothingSelection: {
    headwear: string | null;
    chestplate: string | null;
    pants: string | null;
    boots: string | null;
    gloves: string | null;
  };
  npcs: {
    count: number;
    distributionMode: DistributionMode;
    selectedTypes: NPCType[];
    customAssignments: NPCType[];
  };
}

export default function Setup() {
  const navigate = useNavigate();
  const [setup, setSetup] = useState<GameSetup>({
    gamemode: "mainland",
    starterItems: "basic",
    characterName: "",
    shopName: "",
    clothingSelection: {
      headwear: null,
      chestplate: null,
      pants: null,
      boots: null,
      gloves: null,
    },
    npcs: {
      count: 0,
      distributionMode: "random",
      selectedTypes: ["hostile", "friendly"],
      customAssignments: [],
    },
  });

  const handleStartGame = () => {
    // Basic validation
    if (!setup.characterName.trim()) {
      alert("Please enter a character name");
      return;
    }
    if (!setup.shopName.trim()) {
      alert("Please enter a shop name");
      return;
    }
    if (
      setup.starterItems === "basic-clothings" &&
      setup.npcs.selectedTypes.length === 0
    ) {
      alert("Please select at least one NPC type");
      return;
    }

    // Store setup in session storage and navigate to game
    sessionStorage.setItem("gameSetup", JSON.stringify(setup));
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-xl font-bold text-rust-400">GAME SETUP</h1>
        <div className="w-24"></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Gamemode section */}
          <section>
            <GamemodeSelector
              selectedGamemode={setup.gamemode}
              onGamemodeChange={(gamemode) =>
                setSetup({ ...setup, gamemode })
              }
            />
          </section>

          {/* Divider */}
          <div className="border-t border-border/30"></div>

          {/* Starter items section */}
          <section>
            <StarterItemsSelector
              selectedType={setup.starterItems}
              clothingSelection={setup.clothingSelection}
              onTypeChange={(starterItems) =>
                setSetup({ ...setup, starterItems })
              }
              onClothingChange={(clothingSelection) =>
                setSetup({ ...setup, clothingSelection })
              }
            />
          </section>

          {/* Divider */}
          <div className="border-t border-border/30"></div>

          {/* Name section */}
          <section>
            <NameInputs
              characterName={setup.characterName}
              shopName={setup.shopName}
              onCharacterNameChange={(characterName) =>
                setSetup({ ...setup, characterName })
              }
              onShopNameChange={(shopName) =>
                setSetup({ ...setup, shopName })
              }
            />
          </section>

          {/* Divider */}
          <div className="border-t border-border/30"></div>

          {/* NPC Configuration section */}
          <section>
            <NPCConfigurator
              config={setup.npcs}
              onConfigChange={(npcs) => setSetup({ ...setup, npcs })}
            />
          </section>

          {/* Start button section */}
          <section className="flex flex-col items-center gap-4 py-8">
            <button
              onClick={handleStartGame}
              className="px-12 py-4 bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-400 hover:to-rust-500 text-foreground font-bold text-lg rounded-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-rust-500/50 active:scale-95"
            >
              START GAME
            </button>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              Once you start, you can continue building your shop and managing your NPCs. Good
              luck in the wasteland!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
