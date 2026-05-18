import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Market } from '@/types/market';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { formatDollarsCompact, formatMarketDate } from '@/lib/format';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MarketCard({
  market,
  onPress,
}: {
  market: Market;
  onPress: () => void;
}) {
  const border = useThemeColor({ light: '#E5E7EB', dark: '#2A2D2E' }, 'icon');
  const muted = useThemeColor({ light: '#6B7280', dark: '#A1A1AA' }, 'icon');

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed ? { opacity: 0.9 } : null]}>
      <ThemedView style={[styles.card, { borderColor: border }]}>
        <View style={styles.badges}>
          <View style={[styles.badge, { borderColor: border }]}>
            <ThemedText style={styles.badgeText}>{market.category}</ThemedText>
          </View>
          {market.status === 'open' ? (
            <View style={[styles.badgeOpen]}>
              <ThemedText style={[styles.badgeText, { color: '#166534' }]}>Open</ThemedText>
            </View>
          ) : null}
        </View>

        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
          {market.title}
        </ThemedText>
        <ThemedText style={[styles.desc, { color: muted }]} numberOfLines={2}>
          {market.description}
        </ThemedText>

        <View style={styles.prices}>
          <View style={[styles.priceBox, { backgroundColor: 'rgba(34,197,94,0.10)' }]}>
            <ThemedText style={[styles.priceLabel, { color: muted }]}>YES</ThemedText>
            <ThemedText style={[styles.priceValue, { color: '#16a34a' }]}>
              {market.yesPrice}¢
            </ThemedText>
          </View>
          <View style={[styles.priceBox, { backgroundColor: 'rgba(239,68,68,0.10)' }]}>
            <ThemedText style={[styles.priceLabel, { color: muted }]}>NO</ThemedText>
            <ThemedText style={[styles.priceValue, { color: '#dc2626' }]}>
              {market.noPrice}¢
            </ThemedText>
          </View>
        </View>

        <View style={[styles.footer, { borderTopColor: border }]}>
          <ThemedText style={[styles.footerText, { color: muted }]}>
            Ends {formatMarketDate(market.endDate)}
          </ThemedText>
          <ThemedText style={[styles.footerText, { color: muted }]}>
            Vol {formatDollarsCompact(market.volume)}
          </ThemedText>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeOpen: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  badgeText: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
  prices: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  priceBox: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  footer: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 12,
  },
});

