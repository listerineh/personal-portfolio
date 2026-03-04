#!/bin/bash

# Script to manually revalidate cache
# Usage: 
#   ./scripts/revalidate-cache.sh              # Revalidate all pages
#   ./scripts/revalidate-cache.sh [slug]       # Revalidate specific blog post
#   ./scripts/revalidate-cache.sh --all        # Revalidate everything including blog posts

SITE_URL="${SITE_URL:-https://listerineh.dev}"
REVALIDATE_SECRET="${REVALIDATE_SECRET}"

if [ -z "$REVALIDATE_SECRET" ]; then
  echo "❌ Error: REVALIDATE_SECRET environment variable is not set"
  echo ""
  echo "Set it with:"
  echo "  export REVALIDATE_SECRET=your-secret-here"
  exit 1
fi

# Function to revalidate a path
revalidate_path() {
  local PATH_TO_REVALIDATE="$1"
  local TYPE="${2:-page}"
  
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "$SITE_URL/api/revalidate" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $REVALIDATE_SECRET" \
    -d "{\"path\": \"$PATH_TO_REVALIDATE\", \"type\": \"$TYPE\"}")
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ $PATH_TO_REVALIDATE"
    return 0
  else
    echo "❌ $PATH_TO_REVALIDATE (HTTP $HTTP_CODE)"
    return 1
  fi
}

echo "🔄 Revalidating cache..."
echo "Site: $SITE_URL"
echo ""

ARG="$1"

if [ "$ARG" = "--all" ]; then
  # Revalidate all main pages
  echo "📄 Revalidating main pages..."
  revalidate_path "/"
  revalidate_path "/blog"
  revalidate_path "/why"
  revalidate_path "/privacy"
  revalidate_path "/terms"
  
  echo ""
  echo "📝 Revalidating blog posts..."
  
  # Get blog posts from sitemap
  BLOG_POSTS=$(curl -s "$SITE_URL/sitemap.xml" | grep -oP '(?<=<loc>)https://listerineh.dev/blog/[^<]+' | sed 's|https://listerineh.dev||' | head -20)
  
  if [ -n "$BLOG_POSTS" ]; then
    echo "$BLOG_POSTS" | while read -r POST_PATH; do
      if [ -n "$POST_PATH" ]; then
        revalidate_path "$POST_PATH"
      fi
    done
  else
    echo "⚠️ No blog posts found in sitemap"
  fi
  
elif [ -n "$ARG" ]; then
  # Revalidate specific blog post
  echo "📝 Revalidating blog post: $ARG"
  revalidate_path "/blog/$ARG"
  
  # Also revalidate blog listing
  echo ""
  echo "📄 Revalidating blog listing..."
  revalidate_path "/blog"
  
else
  # Revalidate main pages only
  echo "📄 Revalidating main pages..."
  revalidate_path "/"
  revalidate_path "/blog"
  revalidate_path "/why"
  revalidate_path "/privacy"
  revalidate_path "/terms"
fi

echo ""
echo "✨ Cache revalidation complete!"
echo ""
echo "💡 Tip: Use './scripts/revalidate-cache.sh --all' to revalidate everything"
