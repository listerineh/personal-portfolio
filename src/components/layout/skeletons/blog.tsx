"use client";

import { BlogListingClient } from "@/components/blog/blog-listing-client";
import { placeholderPosts } from "./placeholders";
import { PageLoading } from "../page-loading";

export function BlogSkeleton() {
  return (
    <PageLoading>
      <BlogListingClient posts={placeholderPosts} />
    </PageLoading>
  );
}
