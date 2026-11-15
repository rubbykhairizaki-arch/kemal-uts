import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

type Props = {
  totalOrders: number;
  activeCount: number;
  completedCount: number;
  totalRevenue: number;
};

export default function SummaryBanner({
  totalOrders,
  activeCount,
  completedCount,
  totalRevenue,
}: Props) {
  return (
    <View style={styles.banner}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.brandTitle}>🫧 Kemal Laundry</Text>
          <Text style={styles.subtitle}>Manajemen Cucian & Kasir</Text>
        </View>
        <View style={styles.revenueBox}>
          <Text style={styles.revenueLabel}>Total Omzet</Text>
          <Text style={styles.revenueValue}>
            Rp {totalRevenue.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalOrders}</Text>
          <Text style={styles.statLabel}>Total Nota</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: COLORS.warning }]}>
            {activeCount}
          </Text>
          <Text style={styles.statLabel}>Diproses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: COLORS.success }]}>
            {completedCount}
          </Text>
          <Text style={styles.statLabel}>Selesai</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    marginBottom: SPACE.m,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACE.m,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: TYPO.caption,
    color: '#E0F2FE',
    marginTop: 2,
  },
  revenueBox: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: RADIUS.small,
    alignItems: 'flex-end',
  },
  revenueLabel: {
    fontSize: 11,
    color: '#E0F2FE',
  },
  revenueValue: {
    fontSize: TYPO.body,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.small,
    paddingVertical: SPACE.s,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
});