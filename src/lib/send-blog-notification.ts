/**
 * Utility function to send blog post notifications to newsletter subscribers
 * Call this function after publishing a new blog post
 */

interface BlogNotificationParams {
  blogTitle: string;
  blogSlug: string;
  blogExcerpt?: string;
  blogImageUrl?: string;
}

export async function sendBlogNotification(params: BlogNotificationParams) {
  try {
    const response = await fetch('/api/newsletter/send-blog-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send notifications');
    }

    return {
      success: true,
      message: data.message,
      stats: data.stats,
    };
  } catch (error) {
    console.error('Error sending blog notification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
