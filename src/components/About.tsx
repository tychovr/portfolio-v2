import React from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, Lightbulb, Users, Zap } from "lucide-react";
import { Card, CardContent } from "./container/Card";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code with modern best practices and design patterns.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description:
        "Turning complex challenges into elegant solutions through creative thinking.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working effectively with teams to deliver exceptional user experiences.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing applications for speed, efficiency, and seamless interactions.",
    },
  ];

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "20+" },
    { label: "Client Satisfaction", value: "100%" },
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
          <h2 className="text-4xl sm:text-5xl mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate software engineer with 2+ years of experience
            building innovative digital solutions.
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
              <h3 className="text-2xl mb-6">My Journey</h3>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Curiosity sparked my early love of technology, which has
                  undoubtedly developed over time. I now like addressing
                  challenging challenges and optimizing them as a software
                  engineer. It's more than simply code on a screen to me; it's
                  transforming concepts into something that was previously only
                  possible in dreams. I don't build for show; I build with a
                  purpose, creating solutions that support human development.
                </p>

                <p>
                  I believe in continuous learning and staying up-to-date with
                  emerging technologies. When I'm not coding, you'll find me
                  exploring new frameworks and tools.
                </p>

                <p>
                  Right now I focus on full-stack design, using modern tech to
                  make ideas shine. Building apps that do more than just run,
                  they’re smooth to use — and made to be fun.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-card border border-border rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
