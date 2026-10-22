import type { Metadata } from "next";
import { site } from "@/config/site";

export function portfolioMetadata(locale: "en" | "fa"): Metadata {
  const title = `${site.name} | ${site.professionalTitle}`;
  const description = locale === "fa"
    ? "نمونه‌کارهای نسیم اکبری در طراحی محصول، رابط و تجربه کاربری و ساخت وب‌سایت با کمک هوش مصنوعی، برای مشتریان ایرانی و بین‌المللی."
    : "Nasim Akbari — Product Designer & AI-Powered Web Creator. Explore collaborative UX/UI case studies, product design, and AI-assisted websites for Iranian and international clients.";
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    applicationName: "Nasim Akbari Portfolio",
    authors: [{ name: site.name }],
    alternates: { canonical: locale === "fa" ? "/fa" : "/", languages: { en: "/", fa: "/fa", "x-default": "/" } },
    openGraph: { title, description, type: "website", locale: locale === "fa" ? "fa_IR" : "en_US", alternateLocale: locale === "fa" ? "en_US" : "fa_IR" },
    twitter: { card: "summary", title, description },
  };
}
