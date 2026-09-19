import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

const THIRDS = [
  { label: 'Look back', note: 'Care and accountability' },
  { label: 'Look up', note: 'The next passage' },
  { label: 'Look forward', note: 'Practice and sending' },
];

// The meeting divided into equal, visible thirds — so a leader can see at a
// glance that two of them are not teaching.
export function ThirdsTool() {
  return (
    <View style={s.wrap}>
      <View style={s.bar}>
        {THIRDS.map((t, i) => (
          <View key={t.label} style={[s.segment, i < THIRDS.length - 1 && s.segmentDivider]}>
            <Text style={s.segmentLabel}>{t.label}</Text>
          </View>
        ))}
      </View>
      <View style={s.noteRow}>
        {THIRDS.map((t) => (
          <Text key={t.label} style={s.note}>{t.note}</Text>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4] },
  bar: { flexDirection: 'row', height: 72, borderRadius: 4, overflow: 'hidden', borderWidth: 2, borderColor: colors.text },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  segmentDivider: { borderRightWidth: 2, borderRightColor: colors.text },
  segmentLabel: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 13, color: colors.text, textAlign: 'center' },
  noteRow: { flexDirection: 'row', marginTop: space[2] },
  note: { flex: 1, fontSize: 11, color: 'rgba(32,30,29,0.55)', textAlign: 'center', paddingHorizontal: 4 },
});
