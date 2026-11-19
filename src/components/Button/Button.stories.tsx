import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fn } from 'storybook/test';
import { theme } from '../../tokens/theme';
import { Button, ButtonView, type ButtonIcon, type ButtonState, type ButtonVariant } from './Button';
import { tokens } from './Button.tokens';

const VARIANTS = Object.keys(tokens.variant) as ButtonVariant[];
const STATES: ButtonState[] = ['default', 'pressed', 'disabled', 'loading'];

/** Content width of a 375pt iPhone screen with the standard screen padding. */
const PHONE_CONTENT_WIDTH = 375 - theme.space.screen.lg * 2;

/** Stand-in for Icon/20 until the Icon component exists: a plus drawn in the content colour. */
const PlusIcon: ButtonIcon = ({ color, size }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ position: 'absolute', width: size * 0.7, height: theme.component.borderWidth.iconLg, backgroundColor: color }} />
    <View style={{ position: 'absolute', height: size * 0.7, width: theme.component.borderWidth.iconLg, backgroundColor: color }} />
  </View>
);

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
    variant: { control: 'inline-radio', options: VARIANTS },
    icon: {
      control: 'select',
      options: ['none', 'plus'],
      mapping: { none: undefined, plus: PlusIcon },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Try every prop with the controls. */
export const Playground: Story = {};

/** Every variant in every state, drawn with ButtonView. */
export const AllVariantsAndStates: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <View style={styles.grid}>
      <View style={styles.row}>
        <View style={styles.rowLabel} />
        {STATES.map((state) => (
          <Caption key={state} style={styles.cell}>
            {state}
          </Caption>
        ))}
      </View>
      {VARIANTS.map((variant) => (
        <View key={variant} style={styles.row}>
          <Caption style={styles.rowLabel}>{variant}</Caption>
          {STATES.map((state) => (
            <View key={state} style={styles.cell}>
              <ButtonView variant={variant} label="Label" state={state} />
            </View>
          ))}
        </View>
      ))}
    </View>
  ),
};

/** Leading 20pt icon before the label. */
export const WithIcon: Story = {
  args: { icon: PlusIcon, label: 'Add vehicle' },
  render: (args) => (
    <Stack>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </Stack>
  ),
};

/** Spinner before the label. The label stays visible and the button can't be pressed. */
export const Loading: Story = {
  args: { loading: true, label: 'Paying' },
  render: (args) => (
    <Stack>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </Stack>
  ),
};

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

function Stack({ children }: { children: ReactNode }) {
  return <View style={styles.stack}>{children}</View>;
}

function Caption({ children, style }: { children: ReactNode; style?: object }) {
  return <Text style={[styles.caption, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  grid: {
    gap: theme.space.stack.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.inline.md,
  },
  rowLabel: {
    width: theme.sizing.touchTarget.min * 2,
  },
  cell: {
    width: theme.sizing.touchTarget.min * 3,
    alignItems: 'flex-start',
  },
  caption: {
    ...theme.typography.captionLg,
    color: theme.color.text.secondary,
  },
  stack: {
    gap: theme.space.stack.md,
    alignItems: 'flex-start',
  },
});
