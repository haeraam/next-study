import "@/app/ui/global.css";
import { inter } from "../ui/font";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const locales = ["en", "ko"];

export default async function RootLayout({ children, params: { locale } }: any) {
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

