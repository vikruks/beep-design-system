import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Dark Storybook UI to match the design system.
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Beep!',
  }),
});
