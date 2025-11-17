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
          <SectionTitle className="text-3xl md:text-4xl mb-4">
            &lt;Contacto/&gt;
          </SectionTitle>

          <p className="text-sm md:text-base text-foreground mb-10 max-w-3xl">
            Si quieres hablar sobre oportunidades, colaboración o simplemente
            saludar, puedes enviarme un mensaje a través de este formulario.
          </p>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-3xl" />

            <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-background/95 via-background/90 to-background/95 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 lg:p-10 space-y-6"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                      Nombre
                    </label>
                    <Input
                      name="name"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-background/80"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="tucorreo@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="bg-background/80"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                    Asunto
                  </label>
                  <Input
                    name="subject"
                    required
                    placeholder="Sobre qué quieres hablar"
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-background/80"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
                    Mensaje
                  </label>
                  <Textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntame un poco más..."
                    value={form.message}
                    onChange={handleChange}
                    className="bg-background/80 min-h-[140px]"
                  />
                </div>

                {status === "success" && (
                  <p className="text-sm text-emerald-400">
                    ¡Gracias! He recibido tu mensaje.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Ha ocurrido un error al enviar el mensaje.
                  </p>
                )}

                <div className="pt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-2 font-medium text-black rounded-lg
                                    bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
                                    hover:opacity-90
                                    transition-all duration-300 "
                        >
                        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                        </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleClear}
                      className="px-6 bg-muted/40 hover:bg-muted/60"
                    >
                      Limpiar
                    </Button>
                  </div>

                  <span className="text-[11px] text-foreground md:text-right">
                    También puedes escribirme por{" "}
                    <a
                      href="https://www.linkedin.com/in/innakrasimirova/"
                      target="_blank"
                      className="underline underline-offset-4 decoration-purple-500/70 hover:text-foreground"
                    >
                      LinkedIn
                    </a>
                    .
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ContactForm.displayName = "ContactForm";
