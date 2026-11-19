import type { Decorator, Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';
import { icons } from '../../icons/icons';
import { theme } from '../../tokens/theme';
import { IconButton, IconButtonView } from './IconButton';

/** Stand-in for a photo, map or light area, where Solid is used. */
export const onLightArea: Decorator = (Story) => (
  <View style={styles.lightArea}>
    <Story />
  </View>
);

const meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  // Shared with the Back and Close stories; not a story itself.
  excludeStories: ['onLightArea'],
  args: {
    size: 36,
    shape: 'square',
    variant: 'default',
    icon: 'notification',
    showDot: false,
    accessibilityLabel: 'Notifications',
    disabled: false,
    onPress: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: [36, 20] },
    shape: { control: 'inline-radio', options: ['square', 'circle'] },
    variant: { control: 'inline-radio', options: ['default', 'ghost', 'solid'] },
    icon: { control: 'select', options: Object.keys(icons) },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default36Square: Story = {};

export const Default36Circle: Story = { args: { shape: 'circle' } };

/** Ghost: in top bars. */
export const Ghost36: Story = { args: { variant: 'ghost' } };

/** Solid: on photos, maps and light areas. */
export const Solid36: Story = { args: { variant: 'solid' }, decorators: [onLightArea] };

export const Default20Square: Story = { args: { size: 20 } };

/** Circle 20: clear (×) buttons. */
export const Default20Circle: Story = { args: { size: 20, shape: 'circle', icon: 'close', accessibilityLabel: 'Clear' } };

/** Whole element at state.pressed.opacity. */
export const Pressed: Story = {
  render: ({ size, shape, variant, icon, showDot }) => (
    <IconButtonView size={size} shape={shape} variant={variant} icon={icon} showDot={showDot} state="pressed" />
  ),
};

/** Whole element at state.disabled.opacity; doesn't respond to presses. */
export const Disabled: Story = { args: { disabled: true } };

/** Notification dot at the top-right corner. Read as "Notifications, new, button". */
export const WithDot: Story = { args: { showDot: true } };

const styles = StyleSheet.create({
  lightArea: {
    padding: theme.space.inset.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.illustration.greyLight,
  },
});
