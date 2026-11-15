import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';
import { OrderStatus } from '../context/LaundryContext';

type Props = {
  customerName: string;
  date: string;
  serviceType: string;
  icon: string;
  weight: number;
  totalPrice: number;
  status: OrderStatus;
  notes: string;
  isPriority: boolean;
  compact?: boolean;
  onPress: () => void;
  onTogglePriority: () => void;
};

export default function OrderCard({
  customerName,
  date,
  serviceType,
  icon,
  weight,
  totalPrice,
  status,
  notes,
  isPriority,
  compact = false,
  onPress,
  onTogglePriority,
}: Props) {
  const getStatusColor = (st: OrderStatus) => {
    switch (st) {
      case 'Selesai':
        return COLORS.success;
      case 'Dicuci':
      case 'Disetrika':
        return COLORS.warning;
      default:
        return COLORS.muted;
    }
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <Text style={styles.icon}>{icon}</Text>

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1}>
              {customerName}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(status) },
              ]}
            >
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>

          <Text style={styles.meta}>
            {serviceType} • {weight} kg • Rp{' '}
            {totalPrice.toLocaleString('id-ID')}
          </Text>

          {!compact && (
            <>
              <Text style={styles.date}>Tanggal Masuk: {date}</Text>
              <Text style={styles.notes} numberOfLines={1}>
                Catatan: {notes}
              </Text>
            </>
          )}
        </View>
      </Pressable>

      <Pressable onPress={onTogglePriority} style={styles.priorityButton}>
        <Text style={styles.priorityIcon}>{isPriority ? '⭐' : '☆'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.m,
    gap: SPACE.m,
  },
  icon: {
    fontSize: 34,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACE.s,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  meta: {
    fontSize: TYPO.body,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 2,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  notes: {
    fontSize: TYPO.caption,
    color: COLORS.text,
    marginTop: 2,
  },
  priorityButton: {
    padding: SPACE.l,
  },
  priorityIcon: {
    fontSize: 24,
    color: COLORS.warning,
  },
});