import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLaundry } from '../../src/context/LaundryContext';
import ServicePicker, {
  LAUNDRY_SERVICES,
  ServiceOption,
} from '../../src/components/ServicePicker';
import { COLORS, SPACE, RADIUS } from '../../src/styles/tokens';

export default function CreateScreen() {
  const router = useRouter();
  const { addOrder } = useLaundry();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-15');
  const [weight, setWeight] = useState('3');
  const [notes, setNotes] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceOption>(
    LAUNDRY_SERVICES[0]
  );

  const numericWeight = parseFloat(weight) || 0;
  const estimatedTotal = numericWeight * selectedService.pricePerKg;

  const canSave =
    customerName.trim().length > 0 &&
    numericWeight > 0 &&
    notes.trim().length > 0;

  const save = () => {
    if (!canSave) return;

    addOrder({
      customerName: customerName.trim(),
      phone: phone.trim() || '-',
      date: date.trim(),
      serviceType: selectedService.name,
      icon: selectedService.icon,
      weight: numericWeight,
      pricePerKg: selectedService.pricePerKg,
      status: 'Antrean',
      notes: notes.trim(),
    });

    setCustomerName('');
    setPhone('');
    setWeight('3');
    setNotes('');
    setSelectedService(LAUNDRY_SERVICES[0]);
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nama Pelanggan</Text>
      <TextInput
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Contoh: Pak Hendra"
        style={styles.input}
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>No. WhatsApp</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="0812xxxx"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Berat Cucian (Kg)</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            placeholder="Contoh: 4"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>Tanggal Masuk</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      <Text style={styles.label}>Pilih Paket Layanan</Text>
      <ServicePicker
        selectedService={selectedService}
        onSelect={setSelectedService}
      />

      <Text style={styles.label}>Catatan Khusus Pakaian</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Contoh: Jangan pakai pemutih, parfum sakura..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <View style={styles.estimateBox}>
        <Text style={styles.estimateLabel}>Estimasi Total Biaya:</Text>
        <Text style={styles.estimatePrice}>
          Rp {estimatedTotal.toLocaleString('id-ID')}
        </Text>
      </View>

      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.saveButton, !canSave && styles.disabled]}
      >
        <Text style={styles.saveText}>Simpan Nota Cucian</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    gap: SPACE.m,
  },
  col: {
    flex: 1,
    gap: SPACE.s,
  },
  label: {
    fontWeight: '700',
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },
  bodyInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  estimateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACE.m,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  estimateLabel: {
    fontWeight: '600',
    color: COLORS.text,
  },
  estimatePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  saveButton: {
    padding: 15,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});