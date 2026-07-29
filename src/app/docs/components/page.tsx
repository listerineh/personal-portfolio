'use client';

import { useEffect, useRef } from 'react';

export default function ComponentsDocsPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Dynamically load Storybook iframe
    const loadStorybook = async () => {
      try {
        // Storybook runs on port 6006 by default in development
        // In production, we'll need to build it and serve static files
        const storybookUrl = process.env.NODE_ENV === 'production' 
          ? '/storybook' 
          : 'http://localhost:6006';
        
        if (iframeRef.current) {
          iframeRef.current.src = storybookUrl;
        }
      } catch (error) {
        console.error('Failed to load Storybook:', error);
      }
    };

    loadStorybook();
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Storybook Design System"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
