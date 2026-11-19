import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../tokens/theme';

/**
 * Layout values used only by the documentation pages.
 * They are not part of the Beep! design system.
 */
export const docs = {
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  swatchWidth: 208,
  swatchHeight: 72,
  previewBox: 72,
  metaWidth: 240,
  dot: 16,
  trackHeight: 24,
  loopPause: 600,
} as const;

export type TokenEntry = { path: string; value: unknown };

const isIdent = (k: string) => /^[A-Za-z_$][\w$]*$/.test(k);
const isBranch = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Appends a key the way it's written in code: `.primary` or `['2xl']`. */
export const tokenPath = (prefix: string, key: string) =>
  `${prefix}${isIdent(key) ? `.${key}` : `['${key}']`}`;

/** Flattens a token tree into `{ path: 'theme.color.text.primary', value }` entries. */
export function flatten(tree: unknown, prefix: string): TokenEntry[] {
  if (!isBranch(tree)) return [{ path: prefix, value: tree }];
  return Object.entries(tree).flatMap(([k, v]) => flatten(v, tokenPath(prefix, k)));
}

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? <Text style={styles.sectionDescription}>{description}</Text> : null}
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

export function TokenName({ children }: { children: string }) {
  return (
    <Text style={styles.tokenName} selectable>
      {children}
    </Text>
  );
}

export function TokenValue({ children }: { children: ReactNode }) {
  return (
    <Text style={styles.tokenValue} selectable>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.space.section['2xl'],
  },
  sectionTitle: {
    ...theme.typography.headingSm,
    color: theme.color.text.primary,
    marginBottom: theme.space.stack.xs,
  },
  sectionDescription: {
    ...theme.typography.bodySm,
    color: theme.color.text.secondary,
  },
  sectionBody: {
    marginTop: theme.space.stack.lg,
  },
  tokenName: {
    ...theme.typography.captionLg,
    fontFamily: docs.mono,
    color: theme.color.text.primary,
  },
  tokenValue: {
    ...theme.typography.captionMd,
    fontFamily: docs.mono,
    color: theme.color.text.secondary,
  },
});
