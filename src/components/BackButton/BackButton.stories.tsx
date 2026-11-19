import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';
import { IconButtonView } from '../IconButton/IconButton';
import { onLightArea } from '../IconButton/IconButton.stories';
import { BackButton } from './BackButton';
import { tokens } from './BackButton.tokens';

const meta = {
  title: 'Components/Icon Button/Back',
  component: BackButton,
  args: {
    variant: 'ghost',
    size: 36,
    shape: 'square',
    disabled: false,
    onPress: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost', 'solid'] },
    size: { control: 'inline-radio', options: [36, 20] },
    shape: { control: 'inline-radio', options: ['square', 'circle'] },
  },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const SolidOnPhoto: Story = {
  name: 'Solid (on photo)',
  args: { variant: 'solid' },
  decorators: [onLightArea],
};

export const Pressed: Story = {
  render: ({ variant, size, shape }) => (
    <IconButtonView variant={variant} size={size} shape={shape} icon={tokens.icon} state="pressed" />
  ),
};

export const Disabled: Story = { args: { disabled: true } };
