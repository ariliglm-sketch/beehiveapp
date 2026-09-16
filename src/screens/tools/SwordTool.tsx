import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

// An original sword shape built from plain shapes (a triangular tip, a
// blade, a crossguard, a handle) — not a trace of any published artwork,
// just the S-P-E-C mnemonic given its own drawing.
export function SwordTool() {
  return (
    <View style={s.wrap}>
      <View style={s.tipRow}>
        <Text style={s.sideLabel}>{''}</Text>
        <View style={s.tip} />
        <Text style={s.sideLabel}>{''}</Text>
      </View>
      <Text style={s.tipCaption}>What we learn about God</Text>

      <View style={s.bladeRow}>
        <View style={s.bladeSide}>
          <Text style={s.letter}>S</Text>
          <Text style={s.letterCaption}>Sin to avoid</Text>
        </View>
        <View style={s.blade} />
        <View style={s.bladeSide}>
          <Text style={s.letter}>E</Text>
          <Text style={s.letterCaption}>Example to follow</Text>
        </View>
      </View>
      <View style={s.bladeRow}>
        <View style={s.bladeSide}>
          <Text style={s.letter}>P</Text>
          <Text style={s.letterCaption}>Promise to believe</Text>
        </View>
        <View style={s.blade} />
        <View style={s.bladeSide}>
          <Text style={s.letter}>C</Text>
          <Text style={s.letterCaption}>Command to obey</Text>
        </View>
      </View>

      <View style={s.guard} />
      <View style={s.handle} />
      <Text style={s.handleCaption}>What we learn about people</Text>
    </View>
  );
}

const BLADE_H = 40;

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  tipRow: { flexDirection: 'row', alignItems: 'flex-end' },
  sideLabel: { width: 90 },
  tip: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent700,
  },
  tipCaption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: 4, marginBottom: space[2] },
  bladeRow: { flexDirection: 'row', alignItems: 'center' },
  blade: { width: 10, height: BLADE_H, backgroundColor: colors.accent700 },
  bladeSide: { width: 100, alignItems: 'center', paddingHorizontal: 4 },
  letter: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 18, color: colors.accent800 },
  letterCaption: { fontSize: 11, color: 'rgba(32,30,29,0.55)', textAlign: 'center', marginTop: 1 },
  guard: { width: 90, height: 8, backgroundColor: colors.text, marginTop: 2, borderRadius: 2 },
  handle: { width: 14, height: 36, backgroundColor: colors.neutral700, marginTop: 2, borderRadius: 3 },
  handleCaption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: 4 },
});
