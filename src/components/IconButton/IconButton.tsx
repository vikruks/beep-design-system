import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '../../icons/Icon';
import { tokens } from './IconButton.tokens';

export type IconButtonSize = keyof typeof tokens.size;
export type IconButtonShape = 'square' | 'circle';
export type IconButtonVariant = keyof typeof tokens.variant;
export type IconButtonState = 'default' | 'pressed' | 'disabled';

export type IconButtonViewProps = {
  size?: IconButtonSize;
  shape?: IconButtonShape;
  variant?: IconButtonVariant;
  icon?: IconName;
  showDot?: boolean;
  state?: IconButtonState;
};

export type IconButtonProps = Omit<IconButtonViewProps, 'state'> & {
  /** Required: what the button does, e.g. "Close". */
  accessibilityLabel: string;
  disabled?: boolean;
  onPress: () => void;
};

/**
 * Draws the icon button in one given state. Has no behaviour, so it works in a states grid.
 * Pressed and Disabled change only the opacity of the whole element.
 */
export function IconButtonView({
  size = 36,
  shape = 'square',
  variant = 'default',
  icon = 'notification',
  showDot = false,
  state = 'default',
}: IconButtonViewProps) {
  const s = tokens.size[size];
  const colors = tokens.variant[variant];

  return (
    <View
      style={[
        styles.root,
        { width: s.box, height: s.box, borderRadius: s.radius[shape], backgroundColor: colors.background },
        state === 'pressed' && styles.pressed,
        state === 'disabled' && styles.disabled,
      ]}
    >
      <Icon name={icon} size={s.icon} color={colors.icon} accentColor={tokens.iconAccent} />
      {showDot ? <View style={styles.dot} aria-hidden /> : null}
    </View>
  );
}

/**
 * Icon Button: a tappable icon without a label (back, close, more, share, edit).
 * Default on dark screens; Ghost in top bars; Solid on photos, maps and light areas.
 * Square for toolbars, Circle for floating or clear (×) buttons.
 * Action with text → Button. Non-tappable icon → Icon Container.
 *
 * @example <IconButton size={36} shape="square" variant="solid" icon="close" accessibilityLabel="Close" onPress={close} />
 */
export function IconButton({
  size = 36,
  shape = 'square',
  variant = 'default',
  icon = 'notification',
  showDot = false,
  accessibilityLabel,
  disabled = false,
  onPress,
}: IconButtonProps) {
  useAnnounceDot(showDot);
  const slop = (tokens.touchTarget - tokens.size[size].box) / 2;

  return (
    <Pressable
      role="button"
      // With a dot, screen readers hear "Notifications, new, button".
      aria-label={showDot ? `${accessibilityLabel}, new` : accessibilityLabel}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      hitSlop={slop}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <IconButtonView
          size={size}
          shape={shape}
          variant={variant}
          icon={icon}
          showDot={showDot}
          state={disabled ? 'disabled' : pressed ? 'pressed' : 'default'}
        />
      )}
    </Pressable>
  );
}

/** Announces "new" when a dot appears while the button is on screen. */
function useAnnounceDot(showDot: boolean) {
  const hadDot = useRef(showDot);
  useEffect(() => {
    if (showDot && !hadDot.current) AccessibilityInfo.announceForAccessibility('new');
    hadDot.current = showDot;
  }, [showDot]);
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: tokens.opacity.pressed,
  },
  disabled: {
    opacity: tokens.opacity.disabled,
  },
  dot: {
    position: 'absolute',
    top: tokens.dot.offset,
    right: tokens.dot.offset,
    width: tokens.dot.size,
    height: tokens.dot.size,
    borderRadius: tokens.dot.size / 2,
    backgroundColor: tokens.dot.color,
  },
});
