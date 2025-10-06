import React from "react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./container/Card";
import { Label } from "./container/Label";
import { Input } from "./input/TextField";
import { TextArea } from "./input/TextArea";
import { Button } from "./input/Button";
import { ContactFormData } from "../database/email";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.info("Sending email with data:", data);

      const response = await fetch(`http://localhost:8787/send-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded", {
            description: "Please try again in 15 minutes.",
            duration: 6000,
          });
        }

        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent succesfully!", {
        description: "I'll get back to you soon.",
        duration: 5000,
      });

      reset();
    } catch (err) {
      if (errors instanceof Error) {
        toast.error("Failed to send message", {
          description: errors.message,
          duration: 6000,
        });
      }

      setError("root", {
        message: "Failed to send message. Please try again.",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "tychovanrosmalen12@gmail.com",
      href: "mailto:tychovanrosmalen12@gmail.com?subject=Contact%20from%20Pormailtotfolio",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+31 6 14 35 67 62",
      href: "tel:+31614356762",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Druten, Gelderland",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 px-6 sm:px-8 lg:px-12 bg-muted/30">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">Get In Touch</h2>
          <p className="text-4xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next project? Let's discuess how we can work
            together
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder="Your name"
                            className={errors.name ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Controller
                      name="subject"
                      control={control}
                      rules={{
                        required: "Subject is required",
                        minLength: {
                          value: 3,
                          message: "Subject must be at least 3 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="subject"
                          placeholder="Project discussion"
                          className={errors.subject ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Controller
                      name="message"
                      control={control}
                      rules={{
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          id="message"
                          placeholder="Tell me about your project..."
                          rows={6}
                          className={errors.message ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send message"}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or
                opportunities. Wheter you need a technical partner or want to
                chat about technology, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.title}
                      </p>
                      <p className="text-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-8">
              <h4 className="mb-4">Current Availability</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🟢 Open to contracted side projects</p>
                <p>🟢 Open to full-time opportunities</p>
                <p>⚡ Response time: Usually within 24 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
