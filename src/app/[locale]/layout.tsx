import {
  NextIntlClientProvider,
} from "next-intl";

import {
  getMessages,
} from "next-intl/server";

import { notFound }
  from "next/navigation";

import { Urbanist }
  from "next/font/google";

import { routing }
  from "@/i18n/routing";

import StoreProvider
  from "@/store/provider";

import "@/app/globals.css";

const urbanist =
  Urbanist({
    subsets: ["latin"],
    variable:
      "--font-urbanist",
    display: "swap",
  });

export default async function LocaleLayout({
  children,
  params,
}: {
  children:
    React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } =
    await params;

  if (
    !routing.locales.includes(
      locale as
        | "en"
        | "ar"
    )
  ) {
    notFound();
  }

  const messages =
    await getMessages();

  return (
    <html
      lang={locale}
      dir={
        locale === "ar"
          ? "rtl"
          : "ltr"
      }
    >
      <body
        className={`${urbanist.variable} font-sans`}
      >
        <StoreProvider>
          <NextIntlClientProvider
            messages={
              messages
            }
          >
            {children}
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}