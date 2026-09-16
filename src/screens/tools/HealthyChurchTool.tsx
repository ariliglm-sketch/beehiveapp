import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

const FINGERS = [
  { label: 'Worship', height: 50 },
  { label: 'Fellowship', height: 65 },
  { label: 'Ministry', height: 76 },
  { label: 'Discipleship', height: 68 },
  { label: 'Evangelism\n& missions', height: 55 },
];

// An open hand, five fingers, five purposes — drawn as plain rounded bars
// rising from one palm, not a copy of any published hand diagram.
export function HealthyChurchTool() {
  return (
    <View style={s.wrap}>
      <View style={s.fingerRow}>
        {FINGERS.map((f) => (
          <View key={f.label} style={s.fingerCol}>
            <View style={[s.finger, { height: f.height }]} />
          </View>
        ))}
      </View>
      <View style={s.palm} />
      <View style={s.labelRow}>
        {FINGERS.map((f) => (
          <Text key={f.label} style={s.label}>{f.label}</Text>
        ))}
      </View>
      <Text style={s.caption}>POUCH — participative, obedience-based, unpaid leaders, cells, homes</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  fingerRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  fingerCol: { width: 60, alignItems: 'center' },
  finger: { width: 22, backgroundColor: colors.accent, borderRadius: 11 },
  palm: { width: 318, height: 46, backgroundColor: colors.accent700, borderRadius: 8, marginTop: -8 },
  labelRow: { flexDirection: 'row', gap: 6, marginTop: space[2] },
  label: { width: 60, fontSize: 11, lineHeight: 14, color: 'rgba(32,30,29,0.65)', textAlign: 'center' },
  caption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: space[3], textAlign: 'center', maxWidth: 260 },
});
