import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import bytiLogo from "@/assets/byti-logo.png";

const navLinks = [
  { label: "Accueil", href: "/", hash: "" },
  { label: "Boutique", href: "/boutique", hash: "" },
  { label: "Activités", href: "/", hash: "#services" },
  { label: "À propos", href: "/", hash: "#about" },
  { label: "Projets", href: "/", hash: "#projects" },
  { label: "Contact", href: "/", hash: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b-2 border-byti-yellow ${
        scrolled
          ? "bg-byti-blue/95 backdrop-blur-xl shadow-lg"
          : "bg-byti-blue"
      }`}
    >
      <div className="logo-stripe w-full" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <span className="absolute inset-0 -m-1 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,oklch(0.5_0.13_240/0.55),transparent_60%),radial-gradient(circle_at_70%_70%,oklch(0.56_0.21_28/0.45),transparent_60%)] blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white rounded-xl px-2.5 py-1.5 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] ring-1 ring-white/40">
              <img src={bytiLogo} alt="BYTI Technologie SARL" className="h-9 md:h-11 w-auto" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col leading-tight border-l border-white/20 pl-3">
            <span className="text-[10px] font-semibold tracking-[0.22em] text-white/70 uppercase">Membre du Groupe</span>
            <span className="text-xs font-bold tracking-[0.3em] text-white uppercase">BYTI Worldwide</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              hash={link.hash || undefined}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-300 tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-byti-blue-light to-byti-red group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="relative text-white hover:text-byti-red transition-colors p-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-byti-red text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative text-white p-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-byti-red text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.16_0.04_260)/0.96] backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  hash={link.hash || undefined}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-white hover:text-byti-red transition-colors border-b border-white/10 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
