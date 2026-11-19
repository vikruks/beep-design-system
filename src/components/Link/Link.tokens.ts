import { theme } from '../../tokens/theme';

/** Link tokens, mapped from the Figma "Link" component set. */
export const tokens = {
  color: theme.component.color.link.contentDefault,
  gap: theme.space.inline.xs,
  size: {
    sm: { label: theme.typography.captionLg, icon: theme.componentSize.icon['16'].size },
    md: { label: theme.typography.labelMd, icon: theme.componentSize.icon['20'].size },
  },
  /** Icon Container 20, Rounded, with chevron-down 12. */
  chevron: {
    size: theme.componentSize.iconContainer['20'].size,
    radius: theme.componentSize.iconContainer['20'].radius,
    background: theme.component.color.iconContainer.neutral.bg,
    icon: theme.componentSize.icon['12'].size,
    iconColor: theme.color.icon.primary,
  },
  touchTarget: theme.sizing.touchTarget.min,
  opacity: {
    pressed: theme.state.pressed.opacity,
    disabled: theme.state.disabled.opacity,
  },
} as const;
