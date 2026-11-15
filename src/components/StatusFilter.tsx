import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

const STATUS_LIST = ['Semua', 'Antrean', 'Dicuci', 'Disetrika', 'Selesai'];

type Props = {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
};

export default function StatusFilter({
  selectedStatus,
  onSelectStatus,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {STATUS_LIST.map((status) => {
        const active = selectedStatus === status;
        return (
          <Pressable
            key={status}
            onPress={() => onSelectStatus(status)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {status}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: SPACE.s,
    paddingVertical: SPACE.xs,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.muted,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});