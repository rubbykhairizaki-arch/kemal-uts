import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type OrderStatus = 'Antrean' | 'Dicuci' | 'Disetrika' | 'Selesai';

export type LaundryOrder = {
  id: number;
  customerName: string;
  phone: string;
  date: string;
  serviceType: string;
  icon: string;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
  status: OrderStatus;
  notes: string;
};

type LaundryContextType = {
  orders: LaundryOrder[];
  priorityIds: Set<number>;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
  addOrder: (order: Omit<LaundryOrder, 'id' | 'totalPrice'>) => void;
  togglePriority: (id: number) => void;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
  getById: (id: string | number) => LaundryOrder | undefined;
};

const LaundryContext = createContext<LaundryContextType | null>(null);

const INITIAL_ORDERS: LaundryOrder[] = [
  {
    id: 101,
    customerName: 'Budi Santoso',
    phone: '0812-3456-7890',
    date: '2026-11-15',
    serviceType: 'Cuci Komplit Reguler',
    icon: '👕',
    weight: 4,
    pricePerKg: 7000,
    totalPrice: 28000,
    status: 'Dicuci',
    notes: 'Pisahkan kemeja putih, gunakan pewangi lavender.',
  },
  {
    id: 102,
    customerName: 'Siti Aminah',
    phone: '0857-9876-5432',
    date: '2026-11-15',
    serviceType: 'Kilat Express 3 Jam',
    icon: '⚡',
    weight: 3,
    pricePerKg: 12000,
    totalPrice: 36000,
    status: 'Disetrika',
    notes: 'Diambil sore jam 17.00 WIB untuk acara keluarga.',
  },
  {
    id: 103,
    customerName: 'Andi Pratama',
    phone: '0813-2233-4455',
    date: '2026-11-14',
    serviceType: 'Bedcover & Selimut',
    icon: '🛏️',
    weight: 5,
    pricePerKg: 10000,
    totalPrice: 50000,
    status: 'Selesai',
    notes: 'Bedcover ukuran King Size warna biru navy.',
  },
  {
    id: 104,
    customerName: 'Dewi Lestari',
    phone: '0896-1122-3344',
    date: '2026-11-15',
    serviceType: 'Setrika Uap Saja',
    icon: '💨',
    weight: 2,
    pricePerKg: 5000,
    totalPrice: 10000,
    status: 'Antrean',
    notes: 'Jangan dilipat terlalu tebal pada bagian kerah batik.',
  },
];

export function LaundryProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<LaundryOrder[]>(INITIAL_ORDERS);
  // Set default pesanan ID 102 sebagai prioritas awal
  const [priorityIds, setPriorityIds] = useState<Set<number>>(new Set([102]));
  const [compactMode, setCompactMode] = useState<boolean>(false);

  const addOrder = (orderData: Omit<LaundryOrder, 'id' | 'totalPrice'>) => {
    const totalPrice = orderData.weight * orderData.pricePerKg;
    setOrders((prev) => [
      {
        id: Date.now(),
        totalPrice,
        ...orderData,
      },
      ...prev,
    ]);
  };

  const togglePriority = (id: number) => {
    setPriorityIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const updateOrderStatus = (id: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const getById = (id: string | number) => {
    return orders.find((order) => order.id === Number(id));
  };

  const value = useMemo(
    () => ({
      orders,
      priorityIds,
      compactMode,
      setCompactMode,
      addOrder,
      togglePriority,
      updateOrderStatus,
      getById,
    }),
    [orders, priorityIds, compactMode]
  );

  return (
    <LaundryContext.Provider value={value}>
      {children}
    </LaundryContext.Provider>
  );
}

export function useLaundry() {
  const context = useContext(LaundryContext);
  if (!context) {
    throw new Error('useLaundry harus digunakan di dalam LaundryProvider');
  }
  return context;
}