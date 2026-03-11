interface NameInputsProps {
  characterName: string;
  shopName: string;
  onCharacterNameChange: (name: string) => void;
  onShopNameChange: (name: string) => void;
}

export default function NameInputs({
  characterName,
  shopName,
  onCharacterNameChange,
  onShopNameChange,
}: NameInputsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">CHARACTER & SHOP</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Character Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Character Name
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => onCharacterNameChange(e.target.value.substring(0, 20))}
            placeholder="Enter your character name..."
            maxLength={20}
            className="w-full bg-background/50 border border-border/50 rounded-sm px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-rust-400 focus:ring-1 focus:ring-rust-400/50 transition-colors"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {characterName.length}/20 characters
          </p>
        </div>

        {/* Shop Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Shop Name
          </label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => onShopNameChange(e.target.value.substring(0, 25))}
            placeholder="Enter your shop name..."
            maxLength={25}
            className="w-full bg-background/50 border border-border/50 rounded-sm px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-burnt-400 focus:ring-1 focus:ring-burnt-400/50 transition-colors"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {shopName.length}/25 characters
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-card/50 border border-border/50 rounded-sm p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
          Preview
        </h4>
        <div className="space-y-2">
          <div>
            <span className="text-xs text-muted-foreground">Character: </span>
            <span className="text-sm font-semibold text-rust-400">
              {characterName || "Your Character"}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Shop: </span>
            <span className="text-sm font-semibold text-burnt-400">
              {shopName || "Your Shop"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
