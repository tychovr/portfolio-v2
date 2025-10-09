import React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./input/Button";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./input/LanguageSwitcher";
import { track } from "../utils/analytics";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  const navItems = [
    { label: t("navigation.about"), href: "#about" },
    { label: t("navigation.skills"), href: "#skills" },
    { label: t("navigation.projects"), href: "#projects" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string, closeMenu: boolean = false) => {
    track("navigation_click", { section: href.split("#")[1] });

    if (closeMenu) {
      setIsMenuOpen(false);

      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        (menuRef.current && menuRef.current.contains(e.target as Node)) ||
        (buttonRef.current && buttonRef.current.contains(e.target as Node))
      ) {
        return;
      }
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="cursor-pointer"
            onClick={() => {
              track("cta_click", { action: "Scroll to Top", url: undefined });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl text-primary">TR</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.div
              className="flex gap-10 direction-row"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button onClick={() => scrollToSection("#contact")} size="sm">
                {t("button.get_in_touch")}
              </Button>
              <LanguageSwitcher />
            </motion.div>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden flex flex-row items-center justify-center gap-2"
          >
            {!isMenuOpen && <LanguageSwitcher />}
            <Button
              ref={buttonRef}
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="md:hidden bg-background border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="px-0 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href, true)}
                    className="block w-full px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-lg text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="pt-2 px-4 "
                >
                  <Button
                    onClick={() => scrollToSection("#contact", true)}
                    className="w-full"
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
