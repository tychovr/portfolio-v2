import React from "react";
import { Cloud, Database, Monitor, Server, Smartphone } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./container/Card";
import { Badge } from "./container/Badge";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend",
      icon: Monitor,
      skills: ["React", "Typescript", "Next.js", "Tailwind CSS", "Javascript"],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express.js", "GraphQL", "C#", "C++", "REST APIs"],
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["React Native", "IOS Development", "Android Development"],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["Docker", "CI/CD", "Linux"],
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Jira",
        "Redis",
        "Figma",
        "VS Code",
        "Postman",
      ],
    },
  ];

  const stat = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "20+" },
    { label: "Client Satisfaction", value: "100%" },
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
          <h2 className="text-4xl sm:text-5xl mb-4">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies to build exceptional
            digital experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card className="h-full border-border hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stat.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-card border border-border rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-3xl text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
