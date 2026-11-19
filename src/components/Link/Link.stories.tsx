import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, Text, View } from 'react-native';
import { fn } from 'storybook/test';
import { icons } from '../../icons/icons';
import { theme } from '../../tokens/theme';
import { Link, LinkView } from './Link';

/** Content width of a 375pt iPhone screen with the standard screen padding. */
const PHONE_CONTENT_WIDTH = 375 - theme.space.screen.lg * 2;

const meta = {
  title: 'Components/Link',
  component: Link,
  args: {
    size: 'sm',
    label: 'Terms and Conditions',
    showIcon: false,
    disabled: false,
    onPress: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: 'select', options: Object.keys(icons) },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Caption LG, in captions and footers. No chevron by default. */
export const SM: Story = {};

/** Label MD, next to body text and in rows. Chevron by default. */
export const MD: Story = { args: { size: 'md', label: 'Feedback (5)' } };

/** Optional leading icon, e.g. a coin next to an amount. */
export const WithIcon: Story = { args: { size: 'md', label: '120 coins', showIcon: true, icon: 'beepcoin', showChevron: false } };

/** Icon Container 20 with chevron-down. Decorative, part of the link. */
export const WithChevron: Story = { args: { label: 'Show all', showChevron: true } };

/** Whole element at state.pressed.opacity. */
export const Pressed: Story = {
  args: { size: 'md', label: 'Feedback (5)' },
  render: ({ size, label = '', showIcon, icon, showChevron }) => (
    <LinkView size={size} label={label} showIcon={showIcon} icon={icon} showChevron={showChevron} state="pressed" />
  ),
};

/** Whole element at state.disabled.opacity; doesn't respond to presses. */
export const Disabled: Story = { args: { disabled: true } };

/** Link inside a sentence: keeps the sentence's text style and only changes the colour. */
export const Inline: Story = {
  render: ({ onPress, disabled }) => (
    <View style={{ width: PHONE_CONTENT_WIDTH }}>
      <Text style={styles.sentence}>
        By tapping Pay, you agree to the{' '}
        <Link inline onPress={onPress} disabled={disabled}>
          Terms and Conditions
        </Link>{' '}
        and the{' '}
        <Link inline onPress={onPress} disabled={disabled}>
          Privacy Policy
        </Link>
        .
      </Text>
    </View>
  ),
};

/** Hugs its text; on a phone-width screen a long label wraps. */
export const LongLabel: Story = {
  args: { size: 'md', label: 'Read the full terms and conditions of the Beep! wallet and rewards programme' },
  decorators: [
    (Story) => (
      <View style={{ width: PHONE_CONTENT_WIDTH }}>
        <Story />
      </View>
    ),
  ],
};

const styles = StyleSheet.create({
  sentence: {
    ...theme.typography.captionLg,
    color: theme.color.text.secondary,
  },
});
