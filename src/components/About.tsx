import React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, Lightbulb, Users, Zap } from "lucide-react";
import { Card, CardContent } from "./container/Card";
import { useTranslation } from "react-i18next";

export default function About() {
  const ref = useRef(null);
  const { t } = useTranslation();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: t("about.highlights.clean_code.title"),
      description: t("about.highlights.clean_code.description"),
    },
    {
      icon: Lightbulb,
      title: t("about.highlights.problem_solving.title"),
      description: t("about.highlights.problem_solving.description"),
    },
    {
      icon: Users,
      title: t("about.highlights.collaboration.title"),
      description: t("about.highlights.collaboration.description"),
    },
    {
      icon: Zap,
      title: t("about.highlights.performance.title"),
      description: t("about.highlights.performance.description"),
    },
  ];

  const stats = [
    { label: t("about.stats.experience"), value: "2+" },
    { label: t("about.stats.projects"), value: "10+" },
    { label: t("about.stats.technologies"), value: "20+" },
    { label: t("about.stats.satisfaction"), value: "100%" },
  ];

  return (
    <section id="about" className="py-20 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">{t("about.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("about.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl mb-6">{t("about.journey.title")}</h3>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{t("about.journey.description1")}</p>
                <p>{t("about.journey.description2")}</p>
                <p>{t("about.journey.description3")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-card border border-border rounded-lg text-center hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-2xl text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="h-full border-border hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="text-lg">{highlight.title}</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
