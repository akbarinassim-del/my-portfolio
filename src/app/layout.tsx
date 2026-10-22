import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Morgan — Developer & Designer",
  description: "Personal portfolio of Alex Morgan, a full-stack developer crafting thoughtful digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
