import { useEffect, useRef } from 'react';
import { AccessibilityInfo, ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from '../../icons/Icon';
import { tokens } from './Button.tokens';

export type ButtonVariant = keyof typeof tokens.variant;
export type ButtonState = 'default' | 'pressed' | 'disabled' | 'loading';

export type ButtonViewProps = {
  variant?: ButtonVariant;
  label: string;
  /** Leading Icon/20, drawn in the variant's content colour. */
  icon?: IconName;
  state?: ButtonState;
};

export type ButtonProps = Omit<ButtonViewProps, 'state'> & {
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
};

/**
 * Draws the button in one given state. Has no behaviour, so it works in a states grid.
 * Pressed and Disabled keep the Default colours and change only the opacity of the whole element
 * (state.pressed.opacity, state.disabled.opacity).
 */
export function ButtonView({ variant = 'primary', label, icon, state = 'default' }: ButtonViewProps) {
  const colors = tokens.variant[variant];
  const leading =
    state === 'loading' ? (
      <ActivityIndicator size="small" color={colors.spinner} />
    ) : icon ? (
      <Icon name={icon} size={tokens.iconSize} color={colors.content} accentColor={colors.content} />
    ) : null;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: colors.background },
        state === 'pressed' && styles.pressed,
        state === 'disabled' && styles.disabled,
      ]}
    >
      {leading ? (
        // Icon and spinner are decorative: the button is read as one element.
        <View style={styles.leading} aria-hidden>
          {leading}
        </View>
      ) : null}
      <Text style={[styles.label, { color: colors.content }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/**
 * Button for screen actions: main and supporting actions.
 * Icon only → Icon Button. Small action in a card → Chip/Action (Size SM). Partner brand → Button/Branded.
 *
 * @example <Button variant="primary" label="Pay" loading onPress={pay} />
 */
export function Button({ variant = 'primary', label, icon, disabled = false, loading = false, onPress }: ButtonProps) {
  useAnnounceLoading(loading);

  return (
    <Pressable
      // ARIA props work on iOS, Android and web (accessibilityState.busy is ignored on web).
      role="button"
      aria-label={label}
      aria-disabled={disabled}
      aria-busy={loading}
      // Loading is not pressable, but stays "busy" rather than "disabled" for screen readers.
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      style={styles.pressable}
    >
      {({ pressed }) => (
        <ButtonView
          variant={variant}
          label={label}
          icon={icon}
          state={loading ? 'loading' : disabled ? 'disabled' : pressed ? 'pressed' : 'default'}
        />
      )}
    </Pressable>
  );
}

/** Announces "Loading" when loading starts. The screen announces the result. */
function useAnnounceLoading(loading: boolean) {
  const wasLoading = useRef(loading);
  useEffect(() => {
    if (loading && !wasLoading.current) AccessibilityInfo.announceForAccessibility('Loading');
    wasLoading.current = loading;
  }, [loading]);
}

const styles = StyleSheet.create({
  pressable: {
    minWidth: tokens.minWidth,
  },
  root: {
    height: tokens.height,
    minWidth: tokens.minWidth,
    paddingHorizontal: tokens.paddingX,
    gap: tokens.gap,
    borderRadius: tokens.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: tokens.opacity.pressed,
  },
  disabled: {
    opacity: tokens.opacity.disabled,
  },
  leading: {
    width: tokens.iconSize,
    height: tokens.iconSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...tokens.label,
    flexShrink: 1,
  },
});
