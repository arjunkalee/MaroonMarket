import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { mockMarkets, marketCategories } from '@/lib/mockMarkets';
import type { Market } from '@/types/market';
import MarketCard from '@/components/markets/MarketCard';
import ViewModeToggle, { type ViewMode } from '@/components/markets/ViewModeToggle';
import DiscoverDeck from '@/components/markets/DiscoverDeck';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MarketsScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<ViewMode>('grid');
  const [category, setCategory] = useState<(typeof marketCategories)[number]>('All');
  const [q, setQ] = useState('');

  const border = useThemeColor({ light: '#E5E7EB', dark: '#2A2D2E' }, 'icon');
  const muted = useThemeColor({ light: '#6B7280', dark: '#A1A1AA' }, 'icon');
  const inputBg = useThemeColor({ light: '#FFFFFF', dark: '#1D1F20' }, 'background');

  const data = useMemo(() => {
    return mockMarkets.filter((m: Market) => {
      const matchesCategory = category === 'All' || m.category === category;
      const matchesSearch =
        m.title.toLowerCase().includes(q.toLowerCase()) ||
        m.description.toLowerCase().includes(q.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, q]);

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <ThemedText type="title" style={styles.title}>
            TAMU Markets
          </ThemedText>
          <ThemedText style={{ marginTop: 6, color: muted }}>
            Predict and trade on Texas A&M campus events
          </ThemedText>
        </View>
        <ViewModeToggle mode={mode} onChange={setMode} />
      </View>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search markets..."
        placeholderTextColor={muted}
        style={[styles.search, { borderColor: border, backgroundColor: inputBg, color: muted }]}
      />

      <View style={styles.chips}>
        {marketCategories.map((c) => {
          const active = c === category;
          return (
            <ThemedText
              key={c}
              type="defaultSemiBold"
              onPress={() => setCategory(c)}
              style={[
                styles.chip,
                { borderColor: border },
                active ? styles.chipActive : null,
                active ? { backgroundColor: '#7f1d1d', color: '#fff' } : { color: muted },
              ]}>
              {c}
            </ThemedText>
          );
        })}
      </View>

      {mode === 'discover' ? (
        <DiscoverDeck markets={data} onOpenMarket={(id) => router.push(`/markets/${id}`)} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(m) => m.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 18 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <MarketCard market={item} onPress={() => router.push(`/markets/${item.id}`)} />
            </View>
          )}
          ListEmptyComponent={
            <View style={{ paddingVertical: 50, alignItems: 'center' }}>
              <ThemedText type="subtitle">No markets found</ThemedText>
              <ThemedText style={{ marginTop: 8, color: muted }}>
                Try adjusting filters or search.
              </ThemedText>
            </View>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  title: { fontSize: 28, lineHeight: 32 },
  search: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 12,
    overflow: 'hidden',
  },
  chipActive: { borderColor: '#7f1d1d' },
});
