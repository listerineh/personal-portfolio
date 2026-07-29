import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  viteFinal: async (config) => {
    if (config.build) {
      config.build.outDir = 'public/blog/components';
    }
    return config;
  }
};

export default config;
