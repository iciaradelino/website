import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Literata, Source_Sans_3 } from "next/font/google";
import { getDictionary, isLang, locales } from "@/lib/i18n";
import "../globals.css";

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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    title: meta.siteTitle,
    description: meta.siteDescription,
  };
}

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${sourceSans.variable} ${literata.variable}`}>
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}
