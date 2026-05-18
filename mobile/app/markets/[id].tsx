import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockMarkets } from '@/lib/mockMarkets';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatMarketDate, formatDollarsCompact } from '@/lib/format';

export default function MarketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const market = useMemo(() => mockMarkets.find((m) => m.id === String(id)), [id]);

  const border = useThemeColor({ light: '#E5E7EB', dark: '#2A2D2E' }, 'icon');
  const muted = useThemeColor({ light: '#6B7280', dark: '#A1A1AA' }, 'icon');
  const inputBg = useThemeColor({ light: '#FFFFFF', dark: '#1D1F20' }, 'background');

  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes');
  const [sharesText, setSharesText] = useState('10');
  const shares = Math.max(1, Number.parseInt(sharesText || '1', 10) || 1);

  if (!market) {
    return (
      <ThemedView style={styles.screen}>
        <Stack.Screen options={{ title: 'Market' }} />
        <ThemedText type="subtitle">Market not found</ThemedText>
        <ThemedText style={{ marginTop: 8, color: muted }}>
          The market you&apos;re looking for doesn&apos;t exist.
        </ThemedText>
      </ThemedView>
    );
  }

  const price = outcome === 'yes' ? market.yesPrice : market.noPrice;
  const cost = (shares * price) / 100;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Stack.Screen options={{ title: 'Market' }} />

      <View style={styles.header}>
        <View style={[styles.badge, { borderColor: border }]}>
          <ThemedText style={{ fontSize: 12 }}>{market.category}</ThemedText>
        </View>
        {market.status === 'open' ? (
          <View style={styles.badgeOpen}>
            <ThemedText style={{ fontSize: 12, color: '#166534' }}>Open</ThemedText>
          </View>
        ) : null}
      </View>

      <ThemedText type="title" style={styles.title}>
        {market.title}
      </ThemedText>
      <ThemedText style={{ marginTop: 10, color: muted }}>{market.description}</ThemedText>

      <View style={styles.grid2}>
        <ThemedView style={[styles.pricePanel, { borderColor: '#16a34a' }]}>
          <ThemedText style={{ color: muted, fontSize: 12 }}>YES</ThemedText>
          <ThemedText style={{ fontSize: 34, fontWeight: '800', color: '#16a34a' }}>
            {market.yesPrice}¢
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.pricePanel, { borderColor: '#dc2626' }]}>
          <ThemedText style={{ color: muted, fontSize: 12 }}>NO</ThemedText>
          <ThemedText style={{ fontSize: 34, fontWeight: '800', color: '#dc2626' }}>
            {market.noPrice}¢
          </ThemedText>
        </ThemedView>
      </View>

      <ThemedView style={[styles.card, { borderColor: border }]}>
        <ThemedText type="subtitle">Market stats</ThemedText>
        <View style={styles.statsRow}>
          <View style={{ flex: 1 }}>
            <ThemedText style={{ color: muted, fontSize: 12 }}>Volume</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ marginTop: 4 }}>
              {formatDollarsCompact(market.volume)}
            </ThemedText>
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText style={{ color: muted, fontSize: 12 }}>Liquidity</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ marginTop: 4 }}>
              {formatDollarsCompact(market.liquidity)}
            </ThemedText>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <ThemedText style={{ color: muted, fontSize: 12 }}>Ends</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ marginTop: 4 }}>
            {formatMarketDate(market.endDate)}
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={[styles.card, { borderColor: border }]}>
        <ThemedText type="subtitle">Place order</ThemedText>

        <View style={styles.outcomeRow}>
          <ThemedText
            type="defaultSemiBold"
            onPress={() => setOutcome('yes')}
            style={[styles.outcomeBtn, outcome === 'yes' ? styles.outcomeYesActive : null]}>
            YES
          </ThemedText>
          <ThemedText
            type="defaultSemiBold"
            onPress={() => setOutcome('no')}
            style={[styles.outcomeBtn, outcome === 'no' ? styles.outcomeNoActive : null]}>
            NO
          </ThemedText>
        </View>

        <ThemedText style={{ marginTop: 12, color: muted, fontSize: 12 }}>Shares</ThemedText>
        <TextInput
          value={sharesText}
          onChangeText={setSharesText}
          keyboardType="number-pad"
          style={[styles.input, { borderColor: border, backgroundColor: inputBg }]}
          placeholder="10"
          placeholderTextColor={muted}
        />

        <ThemedView style={[styles.costBox, { borderColor: border }]}>
          <View style={styles.costRow}>
            <ThemedText style={{ color: muted }}>Cost</ThemedText>
            <ThemedText type="defaultSemiBold">${cost.toFixed(2)}</ThemedText>
          </View>
          <View style={styles.costRow}>
            <ThemedText style={{ color: muted }}>Price/share</ThemedText>
            <ThemedText type="defaultSemiBold">{price}¢</ThemedText>
          </View>
        </ThemedView>

        <View style={[styles.buyBtn, { backgroundColor: '#7f1d1d' }]}>
          <ThemedText type="defaultSemiBold" style={{ color: '#fff' }}>
            Buy {outcome.toUpperCase()}
          </ThemedText>
        </View>

        <ThemedText style={{ marginTop: 10, color: muted, fontSize: 12, textAlign: 'center' }}>
          You have $1,250 available
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  scroll: { padding: 16, paddingBottom: 40, gap: 14 },
  header: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  badgeOpen: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  title: { fontSize: 28, lineHeight: 32 },
  grid2: { flexDirection: 'row', gap: 12, marginTop: 6 },
  pricePanel: { flex: 1, borderRadius: 16, padding: 14, borderWidth: 2 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  outcomeRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  outcomeBtn: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(107,114,128,0.25)',
  },
  outcomeYesActive: { backgroundColor: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)' },
  outcomeNoActive: { backgroundColor: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)' },
  input: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 12, borderWidth: 1, borderRadius: 14 },
  costBox: { marginTop: 12, borderWidth: 1, borderRadius: 14, padding: 12, gap: 8 },
  costRow: { flexDirection: 'row', justifyContent: 'space-between' },
  buyBtn: { marginTop: 12, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
});

