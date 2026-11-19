import { StyleSheet, View } from 'react-native';
import { theme } from '../../tokens/theme';
import { docs, flatten, Section, TokenName, TokenValue } from './shared';

/** `theme.radius` and `theme.component.radius`, drawn on a box. */
export function RadiusScale() {
  return (
    <View>
      <Section title="Scale" description="The base corner radius scale.">
        <Boxes entries={flatten(theme.radius, 'theme.radius')} />
      </Section>
      <Section title="Component radius" description="Corner radius each component uses.">
        <Boxes entries={flatten(theme.component.radius, 'theme.component.radius')} />
      </Section>
    </View>
  );
}

function Boxes({ entries }: { entries: { path: string; value: unknown }[] }) {
  return (
    <View style={styles.grid}>
      {[...entries].sort((a, b) => Number(a.value) - Number(b.value)).map(({ path, value }) => (
        <View key={path} style={styles.item}>
          <View style={[styles.box, { borderRadius: Number(value) }]} />
          <TokenName>{path.split('.').pop() ?? path}</TokenName>
          <TokenValue>{`${value}`}</TokenValue>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space.section['2xl'],
  },
  item: {
    alignItems: 'center',
    gap: theme.space.stack.xs,
  },
  box: {
    width: docs.previewBox,
    height: docs.previewBox,
    marginBottom: theme.space.stack.xs,
    backgroundColor: theme.color.surface.raised,
    borderWidth: theme.component.borderWidth.iconMd,
    borderColor: theme.color.border.accent,
  },
});
