# GitHub Actions Workflows

## Notify New Blog Post

**File:** `notify-new-blog.yml`

### Purpose

Automatically detects when a new blog post is added to the repository and sends email notifications to all newsletter subscribers (on `main` branch) or shows a preview summary (on `develop` branch).

### How It Works

**On `main` branch (Production):**
1. **Trigger:** Runs when changes are pushed to `main` in `src/lib/data/blog/*.ts`
2. **Detection:** Identifies newly added blog files (not modified files)
3. **Extraction:** Extracts blog metadata (title, slug, excerpt, image) from the new file
4. **Notification:** Calls the newsletter API to send emails to all subscribers
5. **Summary:** Shows confirmation that emails were sent

**On `develop` branch (Preview):**
1. **Trigger:** Runs when changes are pushed to `develop` in `src/lib/data/blog/*.ts`
2. **Detection:** Identifies newly added blog files (not modified files)
3. **Extraction:** Extracts blog metadata (title, slug, excerpt, image) from the new file
4. **Preview:** Shows what will happen when merged to main (NO emails sent)
5. **Summary:** Displays blog details and pending actions

### Workflow Steps

```yaml
1. Checkout code (with last 2 commits for comparison)
2. Setup Node.js 20
3. Detect new blog files using git diff
4. Extract blog data using extract-blog-data.js script
5. Send notification via API call
6. Generate summary in GitHub Actions UI
```

### Environment Variables

The workflow uses the following environment variable:

- `SITE_URL` (optional): The base URL of your site
  - Default: `https://listerineh.dev`
  - Can be set as a GitHub secret for different environments

### Setting Up

1. **No additional setup required** - The workflow is ready to use once merged to main
2. **Optional:** Add `SITE_URL` as a GitHub secret if you need a different URL:
   - Go to Repository Settings → Secrets and variables → Actions
   - Add new secret: `SITE_URL` with value `https://your-domain.com`

### Usage

#### Testing in Develop (Preview Mode)

Create and test your blog post in the `develop` branch first:

```bash
# Create new blog post
touch src/lib/data/blog/my-awesome-post.ts

# Add content to the file (title, excerpt, etc.)

# Commit and push to develop
git add src/lib/data/blog/my-awesome-post.ts
git commit -m "feat: add new blog post about awesome topic"
git push origin develop
```

The workflow will automatically:
- ✅ Detect the new file
- ✅ Extract the blog data
- ✅ Show a preview summary
- ⚠️ **NOT send emails** (preview mode)

#### Publishing to Production

Once you're happy with the preview, merge to main:

```bash
# Merge develop to main
git checkout main
git merge develop
git push origin main
```

The workflow will automatically:
- ✅ Detect the new file
- ✅ Extract the blog data
- ✅ **Send notifications to all subscribers**
- ✅ Show a confirmation summary

### Monitoring

You can monitor the workflow execution in:
- **GitHub Actions tab** in your repository
- **Summary page** shows the blog title, slug, and notification status
- **Logs** show detailed information about each step

### Troubleshooting

**Workflow doesn't trigger:**
- Ensure the file is in `src/lib/data/blog/` directory
- Ensure the file has `.ts` extension
- Ensure it's a new file (added, not modified)
- Check that you pushed to `main` branch

**Notification fails:**
- Check that your site is accessible at `SITE_URL`
- Verify the API endpoint `/api/newsletter/send-blog-notification` is working
- Check the workflow logs for detailed error messages

**Data extraction fails:**
- Ensure the blog file follows the correct format
- Title and slug are required fields
- Check the `extract-blog-data.js` script logs

### Example Output

**On `develop` branch (Preview Mode):**

```
📝 New Blog Post Detected (Preview Mode)

Environment: Preview (develop)
Title: Building Modern Web Apps with Next.js
Slug: building-with-nextjs
Excerpt: Learn how to build scalable applications...
Image URL: https://listerineh.dev/images/blog/nextjs-guide.webp

📋 What will happen when merged to main:

- ✉️ Email notifications will be sent to all subscribers
- 🔗 Blog will be available at: https://listerineh.dev/blog/building-with-nextjs
- 📊 Notification stats will be tracked

⚠️ Note: No emails were sent in preview mode
```

**On `main` branch (Production):**

```
📧 Blog Notification Sent

Environment: Production
Title: Building Modern Web Apps with Next.js
Slug: building-with-nextjs
URL: https://listerineh.dev/blog/building-with-nextjs

✅ Subscribers have been notified! 🎉
```
