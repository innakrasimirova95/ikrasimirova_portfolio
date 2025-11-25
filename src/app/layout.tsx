import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";

// Fuentes Geist correctamente importadas
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Alex_Brush } from "next/font/google";

import "./globals.css";

const alex = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Inna Krasimirova - Portfolio",
  description: "Software Engineer & Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${alex.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
