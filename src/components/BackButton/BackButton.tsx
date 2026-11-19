import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/native';
import { IconButton, type IconButtonProps } from '../IconButton/IconButton';
import { tokens } from './BackButton.tokens';

export type BackButtonProps = Partial<Pick<IconButtonProps, 'variant' | 'size' | 'shape' | 'disabled'>> & {
  /** Defaults to navigation.goBack() from React Navigation. */
  onPress?: () => void;
};

/**
 * Back button for the top bar, built on Icon Button. Fixed label "Back".
 * Leading slot of the top bar, for screens inside a stack. Other icons → Icon Button.
 *
 * @example <BackButton onPress={navigation.goBack} />
 */
export function BackButton({ variant = 'ghost', size = 36, shape = 'square', disabled = false, onPress }: BackButtonProps) {
  // Read from context instead of useNavigation() so this doesn't throw outside a navigator.
  const navigation = useContext(NavigationContext);

  return (
    <IconButton
      variant={variant}
      size={size}
      shape={shape}
      icon={tokens.icon}
      accessibilityLabel="Back"
      disabled={disabled}
      onPress={onPress ?? (() => navigation?.goBack())}
    />
  );
}
