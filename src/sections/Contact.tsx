import React from "react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Label } from "../components/container/Label";
import { Input } from "../components/input/TextField";
import { TextArea } from "../components/input/TextArea";
import { Button } from "../components/input/Button";
import { useTranslation } from "react-i18next";
import { ContactFormData } from "../types/types";
import { track } from "../utils/analytics";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/container/Card";

export default function Contact() {
  const ref = useRef(null);
  const { t } = useTranslation();
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

      const response = await fetch(`/api/send-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          track("send_message", { status: "Failed", reason: "Rate limited" });
          toast.error(t("contact.form.toast.rate_limit.title"), {
            description: t("contact.form.toast.rate_limit.description", {
              duration: 15,
            }),
            duration: 6000,
          });
        }

        throw new Error(
          result.error || t("contact.form.toast.failed.description")
        );
      }

      track("send_message", { status: "Successful" });
      toast.success(t("contact.form.toast.message_sent.title"), {
        description: t("contact.form.toast.message_sent.description"),
        duration: 5000,
      });

      reset();
    } catch (err) {
      if (errors instanceof Error) {
        track("send_message", { status: "Failed", reason: errors.message });
        toast.error(t("contact.form.toast.failed.title"), {
          description: errors.message,
          duration: 6000,
        });
      }

      setError("root", {
        message: `${t("contact.form.toast.failed.description")}${t(
          "contact.form.toast.failed.extension"
        )}`,
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "tychovanrosmalen12@gmail.com",
      href: "mailto:tychovanrosmalen12@gmail.com?subject=Contact%20from%20Portfolio",
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
      href: "https://www.google.com/maps/place/Druten/@51.8847138,5.5580909,14z/data=!3m1!4b1!4m6!3m5!1s0x47c6ff847e22ffef:0x6768e5d3cfc549df!8m2!3d51.8940837!4d5.5942725!16zL20vMHZqX2M?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D",
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
          <h2 className="text-4xl sm:text-5xl mb-4">{t("contact.title")}</h2>
          <p className="text-4xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.description")}
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
                <CardTitle>{t("button.send_message")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {t("contact.form.name.label")}
                      </Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: t("contact.form.name.required"),
                          minLength: {
                            value: 2,
                            message: t("contact.form.name.min_length", {
                              length: 2,
                            }),
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder={t("contact.form.name.placeholder")}
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
                      <Label htmlFor="email">
                        {t("contact.form.email.label")}
                      </Label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: t("contact.form.email.required"),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t("contact.form.email.invalid"),
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder={t("contact.form.email.placeholder")}
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
                    <Label htmlFor="subject">
                      {t("contact.form.subject.label")}
                    </Label>
                    <Controller
                      name="subject"
                      control={control}
                      rules={{
                        required: t("contact.form.subject.required"),
                        minLength: {
                          value: 3,
                          message: t("contact.form.subject.min_length", {
                            length: 3,
                          }),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="subject"
                          placeholder={t("contact.form.subject.placeholder")}
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
                    <Label htmlFor="message">
                      {t("contact.form.message.label")}
                    </Label>
                    <Controller
                      name="message"
                      control={control}
                      rules={{
                        required: t("contact.form.message.required"),
                        minLength: {
                          value: 10,
                          message: t("contact.form.message.min_length", {
                            length: 10,
                          }),
                        },
                      }}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          id="message"
                          placeholder={t("contact.form.message.placeholder")}
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
                      {isSubmitting
                        ? t("button.sending")
                        : t("button.send_message")}
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
              <h3 className="text-2xl mb-6">{t("contact.connect.title")}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("contact.connect.description")}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  onClick={() =>
                    track("social_click", {
                      social: info.title,
                      url: info.href,
                    })
                  }
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {info.title}
                    </p>
                    <p className="text-foreground">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="mb-4">{t("availability.current")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🟢 {t("availability.fulltime")}</p>
                <p>🟢 {t("availability.freelance")}</p>
                <p>🟢 {t("availability.consulting")}</p>
                <p>⚡ {t("availability.response_time")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
