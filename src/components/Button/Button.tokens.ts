import { theme } from '../../tokens/theme';

/** Button tokens, mapped from the Figma "Button" component set. */
export const tokens = {
  height: theme.componentSize.button.Large.height,
  paddingX: theme.componentSize.button.Large.paddingX,
  gap: theme.componentSize.button.Large.gap,
  radius: theme.component.radius.button,
  minWidth: theme.sizing.touchTarget.min,
  iconSize: theme.component.sizing.button.iconLg,
  label: theme.typography.labelLg,
  opacity: {
    pressed: theme.state.pressed.opacity,
    disabled: theme.state.disabled.opacity,
  },
  variant: {
    primary: {
      background: theme.component.color.action.primary.bgDefault,
      content: theme.component.color.action.primary.contentDefault,
      spinner: theme.component.color.spinner.dark.indicator,
    },
    secondary: {
      background: theme.component.color.action.secondary.bgDefault,
      content: theme.component.color.action.secondary.contentDefault,
      spinner: theme.component.color.spinner.yellow.indicator,
    },
    tertiary: {
      background: theme.component.color.action.tertiary.bgDefault,
      content: theme.component.color.action.tertiary.contentDefault,
      spinner: theme.component.color.spinner.yellow.indicator,
    },
    destructive: {
      background: theme.component.color.action.destructive.bgDefault,
      content: theme.component.color.action.destructive.contentDefault,
      spinner: theme.component.color.spinner.white.indicator,
    },
  },
} as const;
