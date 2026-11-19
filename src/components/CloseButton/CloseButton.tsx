import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/native';
import { IconButton, type IconButtonProps } from '../IconButton/IconButton';
import { tokens } from './CloseButton.tokens';

export type CloseButtonProps = Partial<Pick<IconButtonProps, 'variant' | 'size' | 'shape' | 'disabled'>> & {
  /** Defaults to navigation.goBack() from React Navigation. */
  onPress?: () => void;
};

/**
 * Close button for the top bar, built on Icon Button. Fixed label "Close".
 * Leading slot of the top bar, for modals, sheets and full-screen flows. Other icons → Icon Button.
 *
 * @example <CloseButton onPress={navigation.goBack} />
 */
export function CloseButton({ variant = 'ghost', size = 36, shape = 'square', disabled = false, onPress }: CloseButtonProps) {
  // Read from context instead of useNavigation() so this doesn't throw outside a navigator.
  const navigation = useContext(NavigationContext);

  return (
    <IconButton
      variant={variant}
      size={size}
      shape={shape}
      icon={tokens.icon}
      accessibilityLabel="Close"
      disabled={disabled}
      onPress={onPress ?? (() => navigation?.goBack())}
    />
  );
}
