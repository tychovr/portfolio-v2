import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { motion } from "motion/react";
import { track } from "../../utils/analytics";

const languages = [
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (lng: string) => {
    track("change_language", { language: lng });
    i18n.changeLanguage(lng);
  };

  return (
    <motion.div
      className="flex gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language.startsWith(lang.code) ? "default" : "outline"}
          size="sm"
          onClick={() => handleChange(lang.code)}
          aria-pressed={i18n.language.startsWith(lang.code)}
        >
          {lang.label}
        </Button>
      ))}
    </motion.div>
  );
}
