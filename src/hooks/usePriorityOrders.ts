import { useMemo } from 'react';
import { LaundryOrder } from '../context/LaundryContext';

export function usePriorityOrders(
  orders: LaundryOrder[],
  priorityIds: Set<number>
) {
  const priorityOrders = useMemo(() => {
    return orders.filter((order) => priorityIds.has(order.id));
  }, [orders, priorityIds]);

  return {
    priorityOrders,
    priorityCount: priorityOrders.length,
  };
}