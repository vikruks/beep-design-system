import type { Preview } from '@storybook/react-native-web-vite';
import { create } from 'storybook/theming';
import { theme } from '../src/tokens/theme';

// Beep! is dark-theme only, so every story and docs page renders on a dark canvas.
const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      theme: create({
        base: 'dark',
        appContentBg: theme.color.background.primary,
        fontBase: '-apple-system, Inter, system-ui',
      }),
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: theme.color.background.primary },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colors', 'Typography', 'Spacing', 'Radius', 'Motion'], 'Components'],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
};

export default preview;
