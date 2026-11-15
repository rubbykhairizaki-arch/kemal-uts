import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { COLORS } from '../../src/styles/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        headerStyle: { backgroundColor: COLORS.accent },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          headerTitle: 'Kemal Laundry',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🧺</Text>,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Tambah Order',
          headerTitle: 'Input Cucian Baru',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="priority"
        options={{
          title: 'Prioritas',
          headerTitle: 'Cucian Prioritas ⭐',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>⭐</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Pengaturan',
          headerTitle: 'Pengaturan Toko',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
}