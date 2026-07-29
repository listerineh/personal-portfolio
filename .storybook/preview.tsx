import type { Preview } from '@storybook/nextjs-vite'
import React from 'react';
import '../src/app/globals.css';
import { ThemeProvider } from '../src/context/theme-context';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      
      React.useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }, [theme]);
      
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
