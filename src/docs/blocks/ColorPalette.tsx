import { StyleSheet, View } from 'react-native';
import { theme } from '../../tokens/theme';
import { docs, flatten, Section, TokenName, TokenValue, tokenPath } from './shared';

const DESCRIPTIONS: Record<string, string> = {
  brand: 'The Beep! accent.',
  status: 'Feedback colours: base, strong and light backgrounds, text and icon.',
  background: 'Screen backgrounds.',
  surface: 'Layers above the background: cards, sheets, bars and highlights.',
  border: 'Outlines and dividers on components.',
  text: 'Text colours.',
  icon: 'Icon colours.',
  overlay: 'Scrims behind sheets and modals.',
  separator: 'List and section separators.',
  illustration: 'Fixed palette for illustrations.',
};

/** Every colour in `theme.color`, grouped by its first level. */
export function ColorPalette() {
  const groups = Object.entries(theme.color);
  const singles = groups.filter(([, v]) => typeof v === 'string');
  const nested = groups.filter(([, v]) => typeof v !== 'string');

  return (
    <View>
      {nested.map(([group, value]) => (
        <Section key={group} title={group} description={DESCRIPTIONS[group]}>
          <Swatches entries={flatten(value, tokenPath('theme.color', group))} />
        </Section>
      ))}
      {singles.length > 0 ? (
        <Section title="other">
          <Swatches entries={singles.map(([k, v]) => ({ path: tokenPath('theme.color', k), value: v }))} />
        </Section>
      ) : null}
    </View>
  );
}

function Swatches({ entries }: { entries: { path: string; value: unknown }[] }) {
  return (
    <View style={styles.grid}>
      {entries.map(({ path, value }) => (
        <View key={path} style={styles.swatch}>
          <View style={styles.chipBackdrop}>
            <View style={[styles.chip, { backgroundColor: String(value) }]} />
          </View>
          <View style={styles.meta}>
            <TokenName>{path.replace('theme.color.', '')}</TokenName>
            <TokenValue>{String(value)}</TokenValue>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space.stack.lg,
  },
  swatch: {
    width: docs.swatchWidth,
    borderRadius: theme.radius.md,
    borderWidth: theme.borderWidth.separator,
    borderColor: theme.color.border.default,
    backgroundColor: theme.color.surface.card,
    overflow: 'hidden',
  },
  // Swatches sit on the app background, so transparent colours look as they do in the app.
  chipBackdrop: {
    height: docs.swatchHeight,
    backgroundColor: theme.color.background.primary,
    borderBottomWidth: theme.borderWidth.separator,
    borderBottomColor: theme.color.border.default,
  },
  chip: {
    flex: 1,
  },
  meta: {
    padding: theme.space.inset.md,
    gap: theme.space.stack.xs,
  },
});
