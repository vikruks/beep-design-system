import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  // Where Storybook looks for pages: any *.mdx doc or *.stories.tsx file inside src/
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      optimizeDeps: {
        rolldownOptions: {
          // react-native-svg's web code imports an Android-only module that uses
          // TurboModuleRegistry, which react-native-web doesn't export. The import is a
          // lazy require that never runs on web, so shim the missing export (the
          // production build already does this via vite-plugin-rnw).
          shimMissingExports: true,
        },
      },
    });
  },
};

export default config;
