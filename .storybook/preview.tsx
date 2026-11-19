import type { Preview } from '@storybook/react-native-web-vite';
import { themes } from 'storybook/theming';

// Beep! is dark-theme only, so every story and docs page renders on a dark canvas.
const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#000000' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;
