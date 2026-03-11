import { Hammer, Plus } from "lucide-react";

export interface CraftingRecipe {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  ingredients: Array<{
    name: string;
    quantity: number;
  }>;
  output: {
    name: string;
    quantity: number;
  };
  craftTime?: number;
  level?: number;
}

interface CraftingProps {
  recipes: CraftingRecipe[];
  onCraft?: (recipe: CraftingRecipe) => void;
}

export default function Crafting({ recipes, onCraft }: CraftingProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-border/50">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Hammer className="w-5 h-5 text-rust-400" />
          CRAFTING
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{recipes.length} recipes available</p>
      </div>

      {/* Recipes list */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        {recipes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <Hammer className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No recipes available</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-background/50 border border-border/50 rounded-sm p-4 hover:border-burnt-400/50 transition-colors group"
              >
                {/* Recipe header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      {recipe.icon && <span className="text-xl">{recipe.icon}</span>}
                      {recipe.name}
                      {recipe.level && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded ml-auto">
                          Lvl {recipe.level}
                        </span>
                      )}
                    </h4>
                    {recipe.description && (
                      <p className="text-xs text-muted-foreground mt-1">{recipe.description}</p>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-3 p-2 bg-card/50 rounded-sm">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Ingredients:
                  </p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex justify-between">
                        <span>{ingredient.name}</span>
                        <span className="text-muted-foreground">x{ingredient.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Output and craft button */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Output:
                    </p>
                    <p className="text-sm font-bold text-accent">
                      {recipe.output.name} x{recipe.output.quantity}
                    </p>
                    {recipe.craftTime && (
                      <p className="text-xs text-muted-foreground mt-1">⏱ {recipe.craftTime}s</p>
                    )}
                  </div>
                  <button
                    onClick={() => onCraft?.(recipe)}
                    className="px-4 py-2 bg-rust-600 hover:bg-rust-500 text-foreground font-bold rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Craft</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
