import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../tokens/theme';
import { docs, Section, TokenName, TokenValue, tokenPath } from './shared';

const { motion } = theme;
const useNativeDriver = Platform.OS !== 'web';
const bezier = (curve: readonly number[]) => Easing.bezier(curve[0], curve[1], curve[2], curve[3]);

/**
 * Converts an iOS-style spring (duration + damping ratio, as in SwiftUI) to
 * React Native's physics spring: stiffness = (2π / T)², damping = 4π·ζ / T, mass = 1.
 */
export function springConfig({ duration, dampingRatio }: { duration: number; dampingRatio: number }) {
  const seconds = duration / 1000;
  return {
    stiffness: (2 * Math.PI / seconds) ** 2,
    damping: (4 * Math.PI * dampingRatio) / seconds,
    mass: 1,
  };
}

type Driver = (value: Animated.Value, toValue: number) => Animated.CompositeAnimation;

/**
 * Loops a value 0 → 1 → 0, holding at each end. `catchUp` pads the hold so rows
 * with shorter animations stay in sync with the longest one.
 */
function useLoop(drive: Driver, catchUp = 0) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        drive(value, 1),
        Animated.delay(docs.loopPause + catchUp),
        drive(value, 0),
        Animated.delay(docs.loopPause + catchUp),
      ]),
    );
    loop.start();
    return () => loop.stop();
    // `drive` is recreated each render but only uses constant token values, so start the loop once.
  }, [value]);
  return value;
}

function Track({ path, meta, drive, catchUp }: { path: string; meta: string; drive: Driver; catchUp?: number }) {
  const value = useLoop(drive, catchUp);
  const [width, setWidth] = useState(0);
  const translateX = value.interpolate({ inputRange: [0, 1], outputRange: [0, Math.max(0, width - docs.dot)] });

  return (
    <View style={styles.row}>
      <View style={styles.meta}>
        <TokenName>{path}</TokenName>
        <TokenValue>{meta}</TokenValue>
      </View>
      <View style={styles.track} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <Animated.View style={[styles.dot, { transform: [{ translateX }] }]} />
      </View>
    </View>
  );
}

const timing =
  (duration: number, easing: (t: number) => number): Driver =>
  (value, toValue) =>
    Animated.timing(value, { toValue, duration, easing, useNativeDriver });

/** Durations, easing curves, springs, press scale and stagger from `theme.motion`. */
export function MotionDemo() {
  const standard = bezier(motion.easing.standard);
  const longestDuration = Math.max(...Object.values(motion.duration));
  const longestSpring = Math.max(...Object.values(motion.spring).map((s) => s.duration));

  return (
    <View>
      <Section title="Duration" description="Each dot uses the duration with the standard easing.">
        {Object.entries(motion.duration).map(([name, ms]) => (
          <Track key={name} path={tokenPath('theme.motion.duration', name)} meta={`${ms}ms`} drive={timing(ms, standard)} catchUp={longestDuration - ms} />
        ))}
      </Section>

      <Section title="Easing" description={`Cubic Bézier curves for Easing.bezier, shown at duration.slow (${motion.duration.slow}ms).`}>
        {Object.entries(motion.easing).map(([name, curve]) => (
          <Track
            key={name}
            path={tokenPath('theme.motion.easing', name)}
            meta={`bezier(${curve.join(', ')})`}
            drive={timing(motion.duration.slow, bezier(curve))}
          />
        ))}
      </Section>

      <Section title="Spring" description="Duration and damping ratio (lower ratio = more bounce), converted to a physics spring.">
        {Object.entries(motion.spring).map(([name, spring]) => (
          <Track
            key={name}
            path={tokenPath('theme.motion.spring', name)}
            meta={`${spring.duration}ms · damping ${spring.dampingRatio}`}
            drive={(value, toValue) => Animated.spring(value, { toValue, ...springConfig(spring), useNativeDriver })}
            catchUp={longestSpring - spring.duration}
          />
        ))}
      </Section>

      <Section title="Press scale" description={`Press and hold: the element scales to ${motion.press.scale} (theme.motion.press.scale).`}>
        <PressScaleDemo />
      </Section>

      <Section title="Stagger" description={`Items in a list start ${motion.stagger}ms apart (theme.motion.stagger).`}>
        <StaggerDemo />
      </Section>
    </View>
  );
}

function PressScaleDemo() {
  const scale = useRef(new Animated.Value(1)).current;
  const to = (toValue: number) =>
    Animated.spring(scale, { toValue, ...springConfig(motion.spring.snappy), useNativeDriver }).start();

  return (
    <Pressable onPressIn={() => to(motion.press.scale)} onPressOut={() => to(1)} style={styles.pressTarget}>
      <Animated.View style={[styles.pressCard, { transform: [{ scale }] }]}>
        <Text style={styles.pressLabel}>Press and hold</Text>
      </Animated.View>
    </Pressable>
  );
}

const STAGGER_ITEMS = 5;

function StaggerDemo() {
  const values = useRef(Array.from({ length: STAGGER_ITEMS }, () => new Animated.Value(0))).current;

  useEffect(() => {
    const run = (toValue: number) =>
      Animated.stagger(
        motion.stagger,
        values.map((v) =>
          Animated.timing(v, { toValue, duration: motion.duration.normal, easing: bezier(motion.easing.enter), useNativeDriver }),
        ),
      );
    const loop = Animated.loop(
      Animated.sequence([run(1), Animated.delay(docs.loopPause), run(0), Animated.delay(docs.loopPause)]),
    );
    loop.start();
    return () => loop.stop();
  }, [values]);

  return (
    <View style={styles.staggerRow}>
      {values.map((v, i) => (
        <Animated.View
          key={i}
          style={[
            styles.staggerItem,
            {
              opacity: v,
              transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [docs.dot, 0] }) }],
            },
          ]}
        />
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
  track: {
    flex: 1,
    height: docs.trackHeight,
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.surface.highlight.subtle,
  },
  dot: {
    width: docs.dot,
    height: docs.dot,
    borderRadius: theme.radius.full,
    backgroundColor: theme.color.brand.primary,
  },
  pressTarget: {
    alignSelf: 'flex-start',
  },
  pressCard: {
    width: docs.swatchWidth,
    height: docs.swatchHeight,
    borderRadius: theme.component.radius.card,
    backgroundColor: theme.color.surface.raised,
    borderWidth: theme.borderWidth.separator,
    borderColor: theme.color.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressLabel: {
    ...theme.typography.labelMd,
    color: theme.color.text.primary,
  },
  staggerRow: {
    flexDirection: 'row',
    gap: theme.space.inline.sm,
    height: docs.previewBox,
    alignItems: 'center',
  },
  staggerItem: {
    width: docs.previewBox / 2,
    height: docs.previewBox / 2,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.color.brand.primary,
  },
});
