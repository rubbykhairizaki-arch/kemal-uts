import React from 'react';
import { Stack } from 'expo-router';
import { LaundryProvider } from '../src/context/LaundryContext';
import { COLORS } from '../src/styles/tokens';

export default function RootLayout() {
  return (
    <LaundryProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.accent },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: 'Detail Nota Laundry',
          }}
        />
      </Stack>
    </LaundryProvider>
  );
}