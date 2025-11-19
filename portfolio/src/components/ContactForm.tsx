"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionTitle } from "./ui/SectionTitle";

type ContactFormProps = { className?: string };

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

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    return (
      <section
        id="contacto"
        ref={ref}
        className={cn("scroll-mt-24 w-full", className)}
      >
        <div>
          <SectionTitle className="mb-6">&lt;Contacto/&gt;</SectionTitle>

          <div className="relative">
            {/* halo suave de color */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-pink-500/10 blur-[80px]" />

            {/* tarjeta principal */}
            <div className="rounded-[1.6rem] border border-border bg-background/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 lg:p-10 space-y-5"
              >
                {/* Nombre + Email */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                    >
                      Nombre
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-background border-border text-sm text-foreground rounded-lg px-3 py-2 placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="tucorreo@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-background border-border text-sm text-foreground rounded-lg px-3 py-2 placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                  >
                    Asunto
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    required
                    placeholder="Sobre qué quieres hablar"
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-background border-border text-sm text-foreground rounded-lg px-3 py-2 placeholder:text-muted-foreground"
                  />
                </div>

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/80"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntame un poco más..."
                    value={form.message}
                    onChange={handleChange}
                    className="bg-background border-border text-sm text-foreground rounded-lg px-3 py-2 min-h-[120px] placeholder:text-muted-foreground"
                  />
                </div>

                {/* Estado */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {status === "success" && (
                    <p className="text-sm text-emerald-600">
                      ¡Gracias! He recibido tu mensaje.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600">
                      Ha ocurrido un error al enviar el mensaje.
                    </p>
                  )}
                </div>

                {/* Botones juntos a la izquierda */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-2 font-medium text-white rounded-lg
                               bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                               hover:brightness-110 active:brightness-110
                               transition-all duration-300 shadow-[0_0_20px_rgba(100,100,255,0.25)]"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </Button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-muted-foreground hover:text-foreground active:text-foreground transition underline underline-offset-4 decoration-muted-foreground/70"
                  >
                    Limpiar
                  </button>
                </div>

                {/* Nota final */}
                <p className="text-[11px] text-muted-foreground pt-2">
                  También puedes escribirme por{" "}
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
        </div>
      </section>
    );
  }
);

ContactForm.displayName = "ContactForm";
