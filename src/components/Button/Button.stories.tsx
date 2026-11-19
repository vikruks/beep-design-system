import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { icons } from '../../icons/icons';
import { theme } from '../../tokens/theme';
import { Button, ButtonView } from './Button';
import { tokens } from './Button.tokens';

/** Content width of a 375pt iPhone screen with the standard screen padding. */
const PHONE_CONTENT_WIDTH = 375 - theme.space.screen.lg * 2;

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    variant: 'primary',
    label: 'Pay',
    disabled: false,
    loading: false,
    onPress: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: Object.keys(tokens.variant) },
    icon: { control: 'select', options: Object.keys(icons) },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Tertiary: Story = { args: { variant: 'tertiary' } };

export const Destructive: Story = { args: { variant: 'destructive', label: 'Delete card' } };

/** Whole element at state.pressed.opacity; colours stay the same. */
export const Pressed: Story = {
  render: ({ variant, label, icon }) => <ButtonView variant={variant} label={label} icon={icon} state="pressed" />,
};

/** Whole element at state.disabled.opacity; doesn't respond to presses. */
export const Disabled: Story = { args: { disabled: true } };

/** Spinner before the label. The label stays visible and the button can't be pressed. */
export const Loading: Story = { args: { loading: true, label: 'Paying' } };

/** Leading Icon/20 in the content colour. */
export const WithIcon: Story = { args: { icon: 'add-circle', label: 'Add vehicle' } };

/** On a phone-width screen, a long label stays on one line and is cut off with "…". */
export const LongLabel: Story = {
  args: { label: 'Continue to payment and confirm your booking for tomorrow morning' },
  decorators: [
    (Story) => (
      <View style={{ width: PHONE_CONTENT_WIDTH }}>
        <Story />
      </View>
    ),
  ],
};
