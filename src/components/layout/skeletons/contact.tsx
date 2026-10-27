"use client";

import { ContactListingClient } from "@/components/contact/contact-listing-client";
import { PageLoading } from "../page-loading";

export function ContactSkeleton() {
  return (
    <PageLoading shell={false}>
      <ContactListingClient />
    </PageLoading>
  );
}
