'use client';

import { useEffect, useRef } from 'react';

export default function ComponentsDocsPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // In development, use Storybook dev server
    // In production, use static files
    const storybookUrl = process.env.NODE_ENV === 'production' 
      ? '/docs/components/index.html' 
      : 'http://localhost:6006';
    
    if (iframeRef.current) {
      iframeRef.current.src = storybookUrl;
    }
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
