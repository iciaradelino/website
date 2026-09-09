import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Historias de Gonzalo",
  description: "Relatos entre el bosque y la memoria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sourceSans.variable} ${literata.variable}`}
    >
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}
