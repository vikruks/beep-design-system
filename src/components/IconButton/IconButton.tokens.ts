import { theme } from '../../tokens/theme';

const { iconButton, icon } = theme.componentSize;
const colors = theme.component.color.action.iconButton;

/** Icon Button tokens, mapped from the Figma "Icon Button" component set. */
export const tokens = {
  /** Box size, radius and icon size per size and shape (Icon Button Size and Icon Size modes). */
  size: {
    36: {
      box: iconButton['36 Square'].size,
      icon: icon['20'].size,
      radius: { square: iconButton['36 Square'].radius, circle: iconButton['36 Circle'].radius },
    },
    20: {
      box: iconButton['20 Square'].size,
      icon: icon['12'].size,
      radius: { square: iconButton['20 Square'].radius, circle: iconButton['20 Circle'].radius },
    },
  },
  variant: {
    default: { background: colors.default.bgDefault, icon: colors.default.iconDefault },
    ghost: { background: colors.ghost.bgDefault, icon: colors.ghost.iconDefault },
    solid: { background: colors.solid.bgDefault, icon: colors.solid.iconDefault },
  },
  /** Accent parts of two-tone icons (e.g. the notification bell). */
  iconAccent: theme.color.icon.accent,
  touchTarget: theme.sizing.touchTarget.min,
  dot: {
    size: theme.component.sizing.indicator.dot,
    color: theme.component.color.indicator.dot,
    /** Figma: the dot sits 1pt outside the top-right corner. No offset token exists yet. */
    offset: -theme.component.borderWidth.iconSm,
  },
  opacity: {
    pressed: theme.state.pressed.opacity,
    disabled: theme.state.disabled.opacity,
  },
} as const;
