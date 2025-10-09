import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { DateTime } from "luxon";
import { motion } from "motion/react";
import { Button } from "./input/Button";
import { useTranslation } from "react-i18next";
import { track } from "../utils/analytics";

export default function Footer() {
  const { t } = useTranslation();

  const currentYear = DateTime.now().year;

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/tychovr",
      label: "GitHub",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tycho-van-rosmalen/",
      label: "LinkedIn",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: Mail,
      href: "mailto:tychovanrosmalen12@gmail.com?subject=Contact%20from%20Portfolio",
      label: "Email",
    },
  ];

  const quickLinks = [
    { label: t("navigation.about"), href: "#about" },
    { label: t("navigation.skills"), href: "#skills" },
    { label: t("navigation.projects"), href: "#projects" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    track("navigation_click", { section: href.split("#")[1] });

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl">Tycho van Rosmalen</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={index}
                    onClick={() =>
                      track("social_click", {
                        social: social.label,
                        url: social.href,
                      })
                    }
                    href={social.href}
                    target={social.target}
                    rel={social.rel}
                    aria-label={social.label}
                    className="p-2 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4>{t("footer.links")}</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foregrond hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4>{t("footer.contact")}</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>tychovanrosmalen12@gmail.com</p>
              <p>Druten, Gelderland</p>
              <div className="flex flex-col text-primary text-sm gap-1">
                <span>{t("availability.fulltime")}</span>
                <span>{t("availability.contracted")}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tycho van Rosmalen. {t("footer.copy_right")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
