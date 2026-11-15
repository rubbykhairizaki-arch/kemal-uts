import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { OrderStatus, useLaundry } from '../../src/context/LaundryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

const STATUS_OPTIONS: OrderStatus[] = [
  'Antrean',
  'Dicuci',
  'Disetrika',
  'Selesai',
];

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, priorityIds, togglePriority, updateOrderStatus } =
    useLaundry();

  const order = getById(id);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text>Data nota laundry tidak ditemukan.</Text>
      </View>
    );
  }

  const isPriority = priorityIds.has(order.id);

  return (
    <>
      <Stack.Screen
        options={{
          title: `Nota #${order.id}`,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.receiptCard}>
          <Text style={styles.icon}>{order.icon}</Text>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.phone}>WA: {order.phone}</Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Layanan</Text>
            <Text style={styles.detailValue}>{order.serviceType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tanggal Masuk</Text>
            <Text style={styles.detailValue}>{order.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Berat Cucian</Text>
            <Text style={styles.detailValue}>{order.weight} Kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Harga / Kg</Text>
            <Text style={styles.detailValue}>
              Rp {order.pricePerKg.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status Saat Ini</Text>
            <Text style={[styles.detailValue, { color: COLORS.accent }]}>
              {order.status}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Tagihan</Text>
            <Text style={styles.totalValue}>
              Rp {order.totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>

          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>Catatan Pelanggan:</Text>
            <Text style={styles.notesBody}>{order.notes}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Perbarui Status Pengerjaan</Text>
        <View style={styles.statusGrid}>
          {STATUS_OPTIONS.map((st) => {
            const active = order.status === st;
            return (
              <Pressable
                key={st}
                onPress={() => updateOrderStatus(order.id, st)}
                style={[styles.statusBtn, active && styles.statusBtnActive]}
              >
                <Text
                  style={[
                    styles.statusBtnText,
                    active && styles.statusBtnTextActive,
                  ]}
                >
                  {st}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => togglePriority(order.id)}
          style={styles.priorityButton}
        >
          <Text style={styles.priorityText}>
            {isPriority
              ? '⭐ Pesanan Prioritas (Tekan untuk Hapus)'
              : '☆ Tandai Sebagai Pesanan Prioritas'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  icon: {
    fontSize: 54,
    marginBottom: SPACE.xs,
  },
  customerName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  phone: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.m,
  },
  detailRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACE.s,
  },
  detailLabel: {
    fontSize: TYPO.body,
    color: COLORS.muted,
  },
  detailValue: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
  },
  notesBox: {
    width: '100%',
    backgroundColor: COLORS.background,
    padding: SPACE.m,
    borderRadius: RADIUS.small,
    marginTop: SPACE.m,
  },
  notesTitle: {
    fontSize: TYPO.caption,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: 4,
  },
  notesBody: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACE.xs,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.s,
  },
  statusBtn: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: RADIUS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  statusBtnText: {
    fontWeight: '700',
    color: COLORS.text,
  },
  statusBtnTextActive: {
    color: '#FFFFFF',
  },
  priorityButton: {
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginTop: SPACE.xs,
  },
  priorityText: {
    fontWeight: '700',
    color: COLORS.warning,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});