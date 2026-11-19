import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../tokens/theme';
import { docs, TokenName, TokenValue, tokenPath } from './shared';

const SAMPLE = 'Find a charger near you';

/** Every style in `theme.typography`, rendered with its own tokens. */
export function TypographyScale() {
  return (
    <View style={styles.list}>
      {Object.entries(theme.typography).map(([name, style]) => (
        <View key={name} style={styles.row}>
          <View style={styles.meta}>
            <TokenName>{tokenPath('theme.typography', name)}</TokenName>
            <TokenValue>
              {`${style.fontSize} / ${style.lineHeight} · weight ${style.fontWeight} · tracking ${style.letterSpacing}`}
            </TokenValue>
          </View>
          <Text style={[style, styles.sample]}>
            {SAMPLE}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderTopWidth: theme.borderWidth.separator,
    borderTopColor: theme.color.separator.strong,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.space.inline.md,
    paddingVertical: theme.space.stack.lg,
    borderBottomWidth: theme.borderWidth.separator,
    borderBottomColor: theme.color.border.default,
  },
  meta: {
    width: docs.metaWidth,
    gap: theme.space.stack.xs,
  },
  sample: {
    flex: 1,
    color: theme.color.text.primary,
  },
});
