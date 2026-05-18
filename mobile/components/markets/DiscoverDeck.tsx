import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import type { Market } from '@/types/market';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const SWIPE_THRESHOLD_RATIO = 0.22;

export default function DiscoverDeck({
  markets,
  onOpenMarket,
}: {
  markets: Market[];
  onOpenMarket: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const threshold = useMemo(() => Math.max(90, width * SWIPE_THRESHOLD_RATIO), [width]);

  const position = useRef(new Animated.ValueXY()).current;
  const border = useThemeColor({ light: '#E5E7EB', dark: '#2A2D2E' }, 'icon');
  const muted = useThemeColor({ light: '#6B7280', dark: '#A1A1AA' }, 'icon');

  const current = markets[index];

  const reset = () => {
    position.setValue({ x: 0, y: 0 });
  };

  const swipeOut = (dir: 'left' | 'right') => {
    const toX = dir === 'right' ? width : -width;
    Animated.timing(position, {
      toValue: { x: toX, y: 0 },
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      reset();
      if (dir === 'right' && current) onOpenMarket(current.id);
      setIndex((i) => i + 1);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 6 && Math.abs(g.dy) < 20,
      onPanResponderMove: (_, g) => {
        position.setValue({ x: g.dx, y: 0 });
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx > threshold) swipeOut('right');
        else if (g.dx < -threshold) swipeOut('left');
        else {
          Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, threshold * 0.7],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-threshold * 0.7, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (markets.length === 0) {
    return (
      <View style={styles.center}>
        <ThemedText type="subtitle">No markets</ThemedText>
        <ThemedText style={{ marginTop: 6, color: muted }}>Try changing filters.</ThemedText>
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.center}>
        <ThemedText type="subtitle">You&apos;ve seen all markets</ThemedText>
        <Pressable onPress={() => setIndex(0)} style={[styles.primaryBtn]}>
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
            Start over
          </ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      <ThemedText style={{ textAlign: 'center', color: muted }}>
        Card {Math.min(index + 1, markets.length)} of {markets.length}
      </ThemedText>

      <View style={{ alignItems: 'center' }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.cardWrap,
            { borderColor: border },
            {
              transform: [{ translateX: position.x }, { rotate }],
            },
          ]}>
          <Animated.View style={[styles.overlay, styles.nope, { opacity: nopeOpacity }]}>
            <ThemedText type="subtitle" style={{ color: '#ef4444' }}>
              NOPE
            </ThemedText>
          </Animated.View>
          <Animated.View style={[styles.overlay, styles.like, { opacity: likeOpacity }]}>
            <ThemedText type="subtitle" style={{ color: '#22c55e' }}>
              LIKE
            </ThemedText>
          </Animated.View>

          <ThemedView style={styles.card}>
            <ThemedText type="subtitle" numberOfLines={3}>
              {current.title}
            </ThemedText>
            <ThemedText style={{ marginTop: 10, color: muted }} numberOfLines={4}>
              {current.description}
            </ThemedText>

            <View style={styles.row}>
              <View style={[styles.pill, { backgroundColor: 'rgba(34,197,94,0.10)' }]}>
                <ThemedText type="defaultSemiBold" style={{ color: '#16a34a' }}>
                  YES {current.yesPrice}¢
                </ThemedText>
              </View>
              <View style={[styles.pill, { backgroundColor: 'rgba(239,68,68,0.10)' }]}>
                <ThemedText type="defaultSemiBold" style={{ color: '#dc2626' }}>
                  NO {current.noPrice}¢
                </ThemedText>
              </View>
            </View>

            <ThemedText style={{ marginTop: 12, color: muted, textAlign: 'center', fontSize: 12 }}>
              Swipe right to open · swipe left to skip
            </ThemedText>
          </ThemedView>
        </Animated.View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={() => swipeOut('left')} style={[styles.circle, { borderColor: border }]}>
          <ThemedText type="defaultSemiBold" style={{ color: '#ef4444', fontSize: 18 }}>
            ✕
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => swipeOut('right')}
          style={[styles.circle, { borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.10)' }]}>
          <ThemedText type="defaultSemiBold" style={{ color: '#22c55e', fontSize: 18 }}>
            ♥
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { paddingVertical: 60, alignItems: 'center' },
  primaryBtn: {
    marginTop: 14,
    backgroundColor: '#7f1d1d',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cardWrap: {
    width: '92%',
    maxWidth: 420,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  card: {
    padding: 18,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    zIndex: 5,
  },
  like: { right: 14, backgroundColor: 'rgba(34,197,94,0.10)' },
  nope: { left: 14, backgroundColor: 'rgba(239,68,68,0.10)' },
  row: { flexDirection: 'row', gap: 10, marginTop: 16 },
  pill: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 18, marginTop: 6 },
  circle: {
    height: 56,
    width: 56,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

