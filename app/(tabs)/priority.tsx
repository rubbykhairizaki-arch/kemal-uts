import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLaundry } from '../../src/context/LaundryContext';
import { usePriorityOrders } from '../../src/hooks/usePriorityOrders';
import OrderCard from '../../src/components/OrderCard';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function PriorityScreen() {
  const router = useRouter();
  const { orders, priorityIds, togglePriority, compactMode } = useLaundry();
  const { priorityOrders, priorityCount } = usePriorityOrders(
    orders,
    priorityIds
  );

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {priorityCount} pesanan ditandai sebagai prioritas pengerjaan
      </Text>

      <FlatList
        data={priorityOrders}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <OrderCard
            customerName={item.customerName}
            date={item.date}
            serviceType={item.serviceType}
            icon={item.icon}
            weight={item.weight}
            totalPrice={item.totalPrice}
            status={item.status}
            notes={item.notes}
            isPriority={priorityIds.has(item.id)}
            compact={compactMode}
            onPress={() => openDetail(item.id)}
            onTogglePriority={() => togglePriority(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada pesanan prioritas. Tekan ikon ☆ pada daftar cucian untuk
            menandai pesanan penting.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  subtitle: {
    fontSize: TYPO.body,
    fontWeight: '600',
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    paddingTop: 50,
    lineHeight: 20,
  },
});