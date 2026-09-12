import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/tokens';

// A lightweight nod to the design system's CMYK misregistered-plate numeral
// (see styles.css .cmyk-num) — RN has no multiply-blend text filters, so this
// approximates the look with stacked, offset, translucent layers instead of
// a true print separation.
export function CmykNumeral({ value, size = 64 }: { value: string; size?: number }) {
  const base = { fontFamily: fonts.heading, fontSize: size, fontWeight: '600' as const, lineHeight: size * 0.95 };
  return (
    <View style={{ width: size * 0.85 }}>
      <Text style={[base, { color: colors.text }]}>{value}</Text>
      <Text style={[base, s.plate, { color: colors.accent, opacity: 0.55, left: 2, top: -1 }]}>{value}</Text>
      <Text style={[base, s.plate, { color: colors.accent2, opacity: 0.45, left: -2, top: 1 }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  plate: { position: 'absolute' },
});
