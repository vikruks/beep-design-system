import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  // Where Storybook looks for pages: any *.mdx doc or *.stories.tsx file inside src/
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
};

export default config;
