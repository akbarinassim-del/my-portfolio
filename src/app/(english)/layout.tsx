import { Document } from "@/components/document";
import { portfolioMetadata } from "@/content/metadata";

export const metadata = portfolioMetadata("en");
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
