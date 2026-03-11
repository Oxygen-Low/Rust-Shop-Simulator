import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background grid pattern for metal aesthetic */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Subtle radial glow from center */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Top decoration - rusty lines */}
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rust-500 to-transparent mb-8 opacity-60"></div>

        {/* Title section */}
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter">
            <span className="text-rust-400">RUST</span>
            <br />
            <span className="text-burnt-400">SHOP</span>
            <br />
            <span className="text-accent">SIMULATOR</span>
          </h1>

          {/* Subtitle */}
          <div className="mt-8 space-y-4">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Survive the wasteland. Own a shop. Dominate the post-apocalyptic economy.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/70 max-w-md mx-auto">
              In a world of radioactive decay and ruins, you've carved out a sanctuary. 
              Now it's time to build an empire from the ashes. Gather rare materials, 
              craft valuable goods, and establish the most profitable shop in the Rust continent.
            </p>
          </div>
        </div>

        {/* Play button */}
        <Link
          to="/game"
          className="mt-12 px-10 py-4 bg-gradient-to-r from-rust-500 to-rust-600 hover:from-rust-400 hover:to-rust-500 text-foreground font-bold text-lg rounded-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-rust-500/50 active:scale-95"
        >
          ENTER THE WASTELAND
        </Link>

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 bg-burnt-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-rust-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
        </div>
      </div>
    </div>
  );
}
