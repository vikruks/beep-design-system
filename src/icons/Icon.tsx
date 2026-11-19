import { useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import { theme } from '../tokens/theme';
import { icons, type IconName } from './icons';

export type { IconName };

export type IconProps = {
  name: IconName;
  /** Width and height. Use an icon size token, e.g. theme.componentSize.icon['20'].size. */
  size: number;
  /** Colour of the main (white) parts. */
  color?: string;
  /** Colour of the accent (yellow) parts of two-tone icons. */
  accentColor?: string;
};

/** Draws an icon from the Figma icon set. Decorative: hidden from screen readers. */
export function Icon({ name, size, color = theme.color.icon.primary, accentColor = theme.color.icon.accent }: IconProps) {
  const { svg, fixed } = icons[name];
  const xml = useMemo(
    () => (fixed ? svg : svg.replaceAll('{primary}', color).replaceAll('{accent}', accentColor)),
    [svg, fixed, color, accentColor],
  );
  return <SvgXml xml={xml} width={size} height={size} aria-hidden />;
}
