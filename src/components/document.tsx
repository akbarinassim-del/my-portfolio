import localFont from "next/font/local";
import "@/app/globals.css";

const manrope = localFont({
  src: "../assets/fonts/Manrope.ttf",
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});
const vazirmatn = localFont({
  src: "../assets/fonts/Vazirmatn.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
  preload: false,
});

export function Document({ children, locale }: { children: React.ReactNode; locale: "en" | "fa" }) {
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} className={`${manrope.variable} ${vazirmatn.variable}`}>
      <body>{children}</body>
    </html>
  );
}
