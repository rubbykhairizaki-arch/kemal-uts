import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useLaundry } from '../../src/context/LaundryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function SettingsScreen() {
  const { compactMode, setCompactMode } = useLaundry();
  const [expressOpen, setExpressOpen] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Preferensi Tampilan</Text>

        <View style={styles.row}>
          <View style={styles.textGroup}>
            <Text style={styles.label}>Compact Mode Kartu</Text>
            <Text style={styles.desc}>
              Sembunyikan catatan & tanggal pada kartu daftar pesanan
            </Text>
          </View>
          <Switch value={compactMode} onValueChange={setCompactMode} />
        </View>

        <Text style={styles.info}>
          Status Compact Mode: {compactMode ? 'Aktif' : 'Nonaktif'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Operasional Kemal Laundry</Text>

        <View style={styles.row}>
          <View style={styles.textGroup}>
            <Text style={styles.label}>Terima Layanan Express 3 Jam</Text>
            <Text style={styles.desc}>
              Matikan jika kuota mesin cuci express hari ini penuh
            </Text>
          </View>
          <Switch value={expressOpen} onValueChange={setExpressOpen} />
        </View>

        <Text style={styles.info}>
          Layanan Express: {expressOpen ? 'Buka (Tersedia)' : 'Tutup Sementara'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACE.m,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: TYPO.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  desc: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  info: {
    marginTop: SPACE.m,
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.accent,
  },
});