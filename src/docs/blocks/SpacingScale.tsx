import { StyleSheet, View } from 'react-native';
import { theme } from '../../tokens/theme';
import { docs, flatten, Section, TokenName, TokenValue, tokenPath } from './shared';

const DESCRIPTIONS: Record<string, string> = {
  screen: 'Horizontal padding between the screen edge and content.',
  section: 'Vertical gaps between sections of a screen.',
  stack: 'Vertical gaps between stacked elements.',
  inline: 'Horizontal gaps between elements in a row.',
  inset: 'Padding inside components.',
};

/** Every value in `theme.space`, drawn at true size. */
export function SpacingScale() {
  return (
    <View>
      {Object.entries(theme.space).map(([group, values]) => (
        <Section key={group} title={group} description={DESCRIPTIONS[group]}>
          {flatten(values, tokenPath('theme.space', group))
            .sort((a, b) => Number(a.value) - Number(b.value))
            .map(({ path, value }) => (
            <View key={path} style={styles.row}>
              <View style={styles.meta}>
                <TokenName>{path}</TokenName>
                <TokenValue>{`${value}`}</TokenValue>
              </View>
              <View style={[styles.bar, { width: Number(value) }]} />
            </View>
          ))}
        </Section>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.inline.md,
    paddingVertical: theme.space.stack.sm,
  },
  meta: {
    width: docs.metaWidth,
    gap: theme.space.stack.xs,
  },
  bar: {
    height: docs.dot,
    backgroundColor: theme.color.brand.primary,
    borderRadius: theme.radius.none,
  },
});
