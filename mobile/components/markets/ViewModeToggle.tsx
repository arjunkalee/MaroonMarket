import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ViewMode = 'grid' | 'discover';

export default function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  const bg = useThemeColor({}, 'background');
  const border = useThemeColor({ light: '#E5E7EB', dark: '#2A2D2E' }, 'icon');
  const pill = useThemeColor({ light: '#FFFFFF', dark: '#1D1F20' }, 'background');

  return (
    <View style={[styles.container, { borderColor: border, backgroundColor: bg }]}>
      <Pressable
        onPress={() => onChange('grid')}
        style={[styles.item, mode === 'grid' ? [styles.active, { backgroundColor: pill }] : null]}>
        <ThemedText type="defaultSemiBold" style={styles.itemText}>
          Grid
        </ThemedText>
      </Pressable>
      <Pressable
        onPress={() => onChange('discover')}
        style={[
          styles.item,
          mode === 'discover' ? [styles.active, { backgroundColor: pill }] : null,
        ]}>
        <ThemedText type="defaultSemiBold" style={styles.itemText}>
          Discover
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  active: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  itemText: {
    fontSize: 13,
  },
});

