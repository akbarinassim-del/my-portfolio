import { Document } from "@/components/document";
import { portfolioMetadata } from "@/content/metadata";

export const metadata = portfolioMetadata("fa");
export default function PersianLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="fa">{children}</Document>;
}
