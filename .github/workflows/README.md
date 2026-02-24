# GitHub Actions Workflows

## Notify New Blog Post

**File:** `notify-new-blog.yml`

### Purpose

Automatically detects when a new blog post is added to the repository and sends email notifications to all newsletter subscribers.

### How It Works

1. **Trigger:** Runs when changes are pushed to the `main` branch in `src/lib/data/blog/*.ts`
2. **Detection:** Identifies newly added blog files (not modified files)
3. **Extraction:** Extracts blog metadata (title, slug, excerpt, image) from the new file
4. **Notification:** Calls the newsletter API to send emails to all subscribers

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

Simply create a new blog post file in `src/lib/data/blog/` and push to main:

```bash
# Create new blog post
touch src/lib/data/blog/my-awesome-post.ts

# Add content to the file (title, excerpt, etc.)

# Commit and push
git add src/lib/data/blog/my-awesome-post.ts
git commit -m "feat: add new blog post about awesome topic"
git push origin main
```

The workflow will automatically:
- Detect the new file
- Extract the blog data
- Send notifications to all subscribers
- Show a summary in the GitHub Actions run

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

When successful, you'll see in the GitHub Actions summary:

```
📧 Blog Notification Sent

Title: Building Modern Web Apps with Next.js
Slug: building-with-nextjs
URL: https://listerineh.dev/blog/building-with-nextjs

Subscribers have been notified! 🎉
```
