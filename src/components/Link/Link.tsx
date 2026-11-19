import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from '../../icons/Icon';
import { tokens } from './Link.tokens';

export type LinkSize = keyof typeof tokens.size;
export type LinkState = 'default' | 'pressed' | 'disabled';

export type LinkViewProps = {
  size?: LinkSize;
  label: string;
  showIcon?: boolean;
  icon?: IconName;
  /** Defaults to false on SM and true on MD. */
  showChevron?: boolean;
  state?: LinkState;
};

export type LinkProps = Omit<LinkViewProps, 'label'> & {
  /** Link text. For inline links you can pass it as children instead. */
  label?: string;
  children?: string;
  /** Inline link inside a sentence: <Text>… <Link inline onPress={…}>Terms</Link></Text>. */
  inline?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  /** Web URL: opens in the browser when there's no onPress. */
  href?: string;
};

/**
 * Draws a standalone link in one given state. Has no behaviour, so it works in a states grid.
 * Pressed and Disabled change only the opacity of the whole element.
 */
export function LinkView({ size = 'sm', label, showIcon = false, icon, showChevron = size === 'md', state = 'default' }: LinkViewProps) {
  const s = tokens.size[size];

  return (
    <View style={[styles.row, state === 'pressed' && styles.pressed, state === 'disabled' && styles.disabled]}>
      {showIcon && icon ? <Icon name={icon} size={s.icon} color={tokens.color} /> : null}
      <Text style={[s.label, styles.label]}>{label}</Text>
      {showChevron ? (
        // Decorative: part of the link, not a separate button.
        <View style={styles.chevron} aria-hidden>
          <Icon name="chevron-down" size={tokens.chevron.icon} color={tokens.chevron.iconColor} />
        </View>
      ) : null}
    </View>
  );
}

/**
 * Link: tappable text that navigates. Opens a screen, a document or a website
 * (Terms and Conditions, Show all, Learn more).
 * An action that changes data → Button. A low-emphasis action button → Button variant Tertiary.
 *
 * @example <Link size="md" label="Terms and Conditions" onPress={openTerms} />
 * @example <Text>By tapping Pay, you agree to the <Link inline onPress={openTerms}>Terms</Link></Text>
 */
export function Link({ inline = false, label, children, disabled = false, onPress, href, ...view }: LinkProps) {
  const text = label ?? children ?? '';
  const handlePress = onPress ?? (href ? () => void Linking.openURL(href) : undefined);
  const a11y = {
    role: 'link' as const,
    'aria-label': text,
    'aria-disabled': disabled,
    accessibilityHint: href && !onPress ? 'Opens in browser' : undefined,
  };

  if (inline) return <InlineLink text={text} disabled={disabled} onPress={handlePress} a11y={a11y} />;

  const lineHeight = tokens.size[view.size ?? 'sm'].label.lineHeight;
  return (
    <Pressable
      {...a11y}
      disabled={disabled}
      onPress={handlePress}
      // Min touch target: extend the hit area around the text.
      hitSlop={Math.max(0, (tokens.touchTarget - lineHeight) / 2)}
      style={styles.pressable}
    >
      {({ pressed }) => <LinkView {...view} label={text} state={disabled ? 'disabled' : pressed ? 'pressed' : 'default'} />}
    </Pressable>
  );
}

/**
 * Inline link: a nested Text that keeps the sentence's text style and only changes the colour.
 * Note: iOS ignores opacity on nested Text, so the pressed and disabled dimming shows on web only;
 * iOS shows its own highlight while pressed.
 */
function InlineLink({
  text,
  disabled,
  onPress,
  a11y,
}: {
  text: string;
  disabled: boolean;
  onPress?: () => void;
  a11y: object;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Text
      {...a11y}
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.inline, pressed && !disabled && styles.pressed, disabled && styles.disabled]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.gap,
  },
  label: {
    color: tokens.color,
    flexShrink: 1,
  },
  inline: {
    color: tokens.color,
  },
  chevron: {
    width: tokens.chevron.size,
    height: tokens.chevron.size,
    borderRadius: tokens.chevron.radius,
    backgroundColor: tokens.chevron.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: tokens.opacity.pressed,
  },
  disabled: {
    opacity: tokens.opacity.disabled,
  },
});
