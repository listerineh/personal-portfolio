import { metadataFor } from "@/lib/metadata";

export const generateMetadata = metadataFor("kairoDeleteAccount");

export default function KairoDeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
