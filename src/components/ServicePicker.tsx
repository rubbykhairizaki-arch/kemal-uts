import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export type ServiceOption = {
  id: string;
  name: string;
  icon: string;
  pricePerKg: number;
};

export const LAUNDRY_SERVICES: ServiceOption[] = [
  { id: 'reguler', name: 'Cuci Komplit Reguler', icon: '👕', pricePerKg: 7000 },
  { id: 'express', name: 'Kilat Express 3 Jam', icon: '⚡', pricePerKg: 12000 },
  { id: 'bedcover', name: 'Bedcover & Selimut', icon: '🛏️', pricePerKg: 10000 },
  { id: 'setrika', name: 'Setrika Uap Saja', icon: '💨', pricePerKg: 5000 },
];

type Props = {
  selectedService: ServiceOption;
  onSelect: (service: ServiceOption) => void;
};

export default function ServicePicker({ selectedService, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {LAUNDRY_SERVICES.map((item) => {
        const isSelected = selectedService.id === item.id;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item)}
            style={[styles.card, isSelected && styles.cardSelected]}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.price}>
                Rp {item.pricePerKg.toLocaleString('id-ID')} / kg
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: SPACE.s,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    gap: SPACE.m,
  },
  cardSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: COLORS.accentLight,
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
  },
  price: {
    fontSize: TYPO.caption,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 2,
  },
});