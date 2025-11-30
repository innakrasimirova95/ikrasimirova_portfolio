"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, User, MessageCircle, Type as TypeIcon } from "lucide-react";

type ContactFormProps = { className?: string };

const MESSAGE_MAX = 500;

export const ContactForm = React.forwardRef<HTMLElement, ContactFormProps>(
  ({ className }, ref) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const { t } = useLanguage();

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (status !== "idle") setStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setStatus("idle");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error("Error");

        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleClear = () => {
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("idle");
    };

    const isDisabled =
      isSubmitting ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim();

    return (
      <section
        id="contact"
        ref={ref}
        className={cn("scroll-mt-24 w-full py-16 px-4 sm:px-0", className)}
        aria-labelledby="contact-title"
      >
        <SectionTitle id="contact-title" className="mb-6">
          {t("contact.title")}
        </SectionTitle>

        <div className="relative max-w-3xl mx-auto">
          {/* halo suave de color */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-500/12 via-purple-500/10 to-pink-500/12 blur-[80px]" />

          {/* tarjeta principal */}
          <div className="rounded-[1.6rem] border border-border bg-background/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <form
              onSubmit={handleSubmit}
              aria-describedby="contact-status"
              className="p-6 md:p-8 lg:p-10 space-y-6"
            >
              {/* Cabecera pequeña dentro de la tarjeta */}
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/70">
                  {t("contact.form.sectionHint")}
                </p>
                <p className="text-sm text-muted-foreground max-w-lg">
                  {t("contact.form.sectionDescription")}
                </p>
              </div>

              {/* Nombre + Email */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                  >
                    {t("contact.form.name")}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder={t("contact.form.namePlaceholder")}
                      value={form.name}
                      onChange={handleChange}
                      className="bg-background border-border text-sm text-foreground rounded-lg pl-9 pr-3 py-2 placeholder:text-muted-foreground
                                 focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                  >
                    {t("contact.form.email")}
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("contact.form.emailPlaceholder")}
                      value={form.email}
                      onChange={handleChange}
                      className="bg-background border-border text-sm text-foreground rounded-lg pl-9 pr-3 py-2 placeholder:text-muted-foreground
                                 focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>

              {/* Asunto */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                >
                  {t("contact.form.subject")}
                </label>
                <div className="relative">
                  <TypeIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-subject"
                    name="subject"
                    required
                    placeholder={t("contact.form.subjectPlaceholder")}
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-background border-border text-sm text-foreground rounded-lg pl-9 pr-3 py-2 placeholder:text-muted-foreground
                               focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80 flex items-center justify-between"
                >
                  <span>{t("contact.form.message")}</span>
                  <span className="text-[10px] font-normal tracking-normal text-muted-foreground">
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                </label>
                <div className="relative">
                  <MessageCircle className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={form.message}
                    onChange={handleChange}
                    className="bg-background border-border text-sm text-foreground rounded-lg pl-9 pr-3 py-2 min-h-[120px] placeholder:text-muted-foreground
                               focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Estado */}
              <div id="contact-status" aria-live="polite" className="min-h-[1.25rem]">
                {status === "success" && (
                  <p className="text-sm text-emerald-400">
                    {t("contact.form.success")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-rose-400">
                    {t("contact.form.error")}
                  </p>
                )}
              </div>

              {/* Botones juntos a la izquierda */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={isDisabled}
                  className={cn(
                    "w-full sm:w-auto px-8 py-2 font-medium text-white rounded-lg",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "hover:brightness-110 active:brightness-110",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    "transition-all duration-300 shadow-[0_0_20px_rgba(100,100,255,0.25)]"
                  )}
                >
                  {isSubmitting
                    ? t("contact.form.submittingButton")
                    : t("contact.form.submitButton")}
                </Button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-muted-foreground hover:text-foreground active:text-foreground transition underline underline-offset-4 decoration-muted-foreground/70"
                >
                  {t("contact.form.clearButton")}
                </button>
              </div>

              {/* Nota final */}
              <p className="text-[11px] text-muted-foreground pt-2">
                {t("contact.linkedinPrompt")}{" "}
                <a
                  href="https://www.linkedin.com/in/innakrasimirova/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 decoration-purple-500/60 hover:text-foreground active:text-foreground"
                >
                  LinkedIn
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }
);

ContactForm.displayName = "ContactForm";
