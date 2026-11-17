import { metadataFor } from "@/lib/metadata";

export const generateMetadata = metadataFor("kairoPrivacy");

export default function KairoPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
