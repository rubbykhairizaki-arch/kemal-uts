import { useEffect, useMemo, useState } from 'react';
import { LaundryOrder } from '../context/LaundryContext';

export function useLaundrySearch(orders: LaundryOrder[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredOrders = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return orders.filter((order) => {
      const matchStatus =
        selectedStatus === 'Semua' || order.status === selectedStatus;

      const matchQuery =
        !q ||
        order.customerName.toLowerCase().includes(q) ||
        order.serviceType.toLowerCase().includes(q) ||
        order.notes.toLowerCase().includes(q) ||
        order.date.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [orders, debouncedQuery, selectedStatus]);

  const resetFilter = () => {
    setQuery('');
    setDebouncedQuery('');
    setSelectedStatus('Semua');
  };

  return {
    query,
    setQuery,
    selectedStatus,
    setSelectedStatus,
    filteredOrders,
    resultCount: filteredOrders.length,
    resetFilter,
  };
}