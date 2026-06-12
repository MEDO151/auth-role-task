import { NextIntlClientProvider } from "next-intl";

import { getMessages } from "next-intl/server";

import { notFound } from "next/navigation";

import { Urbanist } from "next/font/google";

import { Toaster } from "sonner";

import { routing } from "@/i18n/routing";

import StoreProvider from "@/store/provider";

import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata:
  Metadata = {
    title:
      "Cleaning Services | Professional Home & Office Cleaning",

    description:
      "Professional cleaning services for homes and offices. Reliable, fast, and high-quality cleaning solutions tailored to your needs.",

    icons: {
      icon:
        "/favicon.ico",
    },
};

const urbanist = Urbanist({
  subsets: ["latin"],

  variable: "--font-urbanist",

  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${urbanist.variable} font-sans`}>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            {children}

            <Toaster richColors position="top-right" />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
