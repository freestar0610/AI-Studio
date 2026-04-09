import { motion } from "motion/react";
import { User, Menu, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center neon-glow-gold">
          <Sparkles className="text-midnight w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          YOON STUDIO
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#about" className="hover:text-white transition-colors">Service</a>
        <a href="#studio" className="hover:text-white transition-colors">AI Studio</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-sm font-medium">
          <User className="w-4 h-4" />
          My Page
        </button>
        <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
