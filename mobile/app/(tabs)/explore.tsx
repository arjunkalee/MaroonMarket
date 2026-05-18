import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function PortfolioScreen() {
  const muted = useThemeColor({ light: '#6B7280', dark: '#A1A1AA' }, 'icon');

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Portfolio
      </ThemedText>
      <ThemedText style={{ marginTop: 8, color: muted }}>
        Coming soon: positions, watchlist, and trade history.
      </ThemedText>

      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">Balance</ThemedText>
        <ThemedText style={{ marginTop: 6, fontSize: 22, fontWeight: '800' }}>$1,250</ThemedText>
        <ThemedText style={{ marginTop: 6, color: muted }}>
          This is mock data for now (same as the web app).
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  title: { fontSize: 28, lineHeight: 32 },
  card: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(107,114,128,0.25)',
  },
});
