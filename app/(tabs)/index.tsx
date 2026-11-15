import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLaundry } from '../../src/context/LaundryContext';
import { useLaundrySearch } from '../../src/hooks/useLaundrySearch';
import OrderCard from '../../src/components/OrderCard';
import SummaryBanner from '../../src/components/SummaryBanner';
import StatusFilter from '../../src/components/StatusFilter';
import { COLORS, SPACE, RADIUS } from '../../src/styles/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { orders, priorityIds, togglePriority, compactMode } = useLaundry();
  const {
    query,
    setQuery,
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    resultCount,
    resetFilter,
  } = useLaundrySearch(orders);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  const handleReset = useCallback(() => {
    resetFilter();
    searchRef.current?.focus();
  }, [resetFilter]);

  const stats = useMemo(() => {
    const completedCount = orders.filter((o) => o.status === 'Selesai').length;
    const activeCount = orders.length - completedCount;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    return {
      totalOrders: orders.length,
      activeCount,
      completedCount,
      totalRevenue,
    };
  }, [orders]);

  return (
    <View style={styles.container}>
      <SummaryBanner
        totalOrders={stats.totalOrders}
        activeCount={stats.activeCount}
        completedCount={stats.completedCount}
        totalRevenue={stats.totalRevenue}
      />

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari pelanggan, layanan, catatan..."
          style={styles.search}
        />
        <Pressable onPress={handleReset} style={styles.clearButton}>
          <Text style={styles.clearText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.filterWrapper}>
        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />
      </View>

      <Text style={styles.counter}>
        Menampilkan {resultCount} nota cucian
      </Text>

      <FlatList
        data={filteredOrders}
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
            Tidak ada data cucian yang sesuai filter.
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
  searchRow: {
    flexDirection: 'row',
    gap: SPACE.s,
    marginBottom: SPACE.s,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.small,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
  },
  clearButton: {
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.accentLight,
  },
  clearText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  filterWrapper: {
    marginBottom: SPACE.xs,
  },
  counter: {
    color: COLORS.muted,
    marginVertical: SPACE.s,
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    paddingTop: 40,
  },
});