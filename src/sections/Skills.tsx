import React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Card, CardContent, CardTitle } from "../components/container/Card";
import { Badge } from "../components/container/Badge";
import { useTranslation } from "react-i18next";
import {
  Cloud,
  Code2,
  Database,
  Monitor,
  Palette,
  Server,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";

export default function Skills() {
  const ref = useRef(null);
  const { t } = useTranslation();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: t("skills.categories.frontend"),
      icon: Monitor,
      skills: ["React", "Typescript", "Next.js", "Tailwind CSS", "Javascript"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("skills.categories.backend"),
      icon: Server,
      skills: ["Node.js", "Express.js", "GraphQL", "C#", "C++", "REST APIs"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("skills.categories.mobile"),
      icon: Smartphone,
      skills: ["React Native", "IOS Development", "Android Development"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: t("skills.categories.cloud_devops"),
      icon: Cloud,
      skills: ["Docker", "CI/CD", "Linux", "Version Control"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: t("skills.categories.databases"),
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "Supabase", "MySQL", "Firebase"],
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Tools & Design",
      icon: Settings,
      color: "from-yellow-500 to-orange-500",
      skills: ["Git", "VS Code", "Figma", "Postman", "Jira", "BitBucket"],
    },
  ];

  const expertiseAreas = [
    {
      icon: Code2,
      title: t("skills.expertises.full_stack.title"),
      description: t("skills.expertises.full_stack.description"),
      color: "text-primary",
    },
    {
      icon: Palette,
      title: t("skills.expertises.ui.title"),
      description: t("skills.expertises.ui.description"),
      color: "text-purple-400",
    },
    {
      icon: Zap,
      title: t("about.highlights.performance.title"),
      description: t("skills.expertises.performance.description"),
      color: "text-yellow-400",
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 sm:px-8 lg:px-12 bg-muted/30">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">{t("skills.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {expertiseAreas.map((expertise, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow hover:border-primary/50 transition-colors">
                <CardContent className="p-0">
                  <expertise.icon
                    className={`h-12 w-12 mx-auto mb-4 ${expertise.color}`}
                  />
                  <h3 className="text-lg mb-2">{expertise.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {expertise.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
