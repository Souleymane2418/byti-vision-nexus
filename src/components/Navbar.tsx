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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={bytiLogo} alt="BYTI Technologie SARL" className="h-10 md:h-12 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              hash={link.hash || undefined}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="relative text-foreground hover:text-primary transition-colors p-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative text-foreground p-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground p-2"
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
            className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  hash={link.hash || undefined}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-foreground hover:text-primary transition-colors border-b border-border/30 last:border-0"
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
