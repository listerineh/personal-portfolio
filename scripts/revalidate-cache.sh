#!/bin/bash

# Script to manually revalidate cache for blog posts
# Usage: ./scripts/revalidate-cache.sh [slug]
# If no slug is provided, revalidates all blog pages

SITE_URL="${SITE_URL:-https://listerineh.dev}"
REVALIDATE_SECRET="${REVALIDATE_SECRET}"

if [ -z "$REVALIDATE_SECRET" ]; then
  echo "❌ Error: REVALIDATE_SECRET environment variable is not set"
  echo ""
  echo "Set it with:"
  echo "  export REVALIDATE_SECRET=your-secret-here"
  exit 1
fi

SLUG="$1"

echo "🔄 Revalidating cache..."
echo "Site: $SITE_URL"
echo ""

if [ -n "$SLUG" ]; then
  # Revalidate specific blog post
  echo "Revalidating blog post: $SLUG"
  
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "$SITE_URL/api/revalidate" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $REVALIDATE_SECRET" \
    -d "{\"path\": \"/blog/$SLUG\", \"type\": \"page\"}")
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Blog post revalidated successfully!"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  else
    echo "❌ Failed to revalidate (HTTP $HTTP_CODE)"
    echo "$BODY"
    exit 1
  fi
else
  # Revalidate blog listing page
  echo "Revalidating blog listing page..."
  
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "$SITE_URL/api/revalidate" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $REVALIDATE_SECRET" \
    -d "{\"path\": \"/blog\", \"type\": \"page\"}")
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Blog listing revalidated successfully!"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  else
    echo "❌ Failed to revalidate (HTTP $HTTP_CODE)"
    echo "$BODY"
    exit 1
  fi
fi

echo ""
echo "✨ Cache revalidation complete!"
