import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

const LEVELS = ['Seed\nsower', 'Church\nplanter', 'Church\nmultiplier', 'Multiplication\ntrainer', 'Movement\ncatalyst'];

// Five ascending steps, drawn as plain risers — the shape of the idea
// (each level stands on the one before it), not a copy of any figure.
export function LevelsTool() {
  return (
    <View style={s.wrap}>
      <View style={s.stairRow}>
        {LEVELS.map((label, i) => (
          <View key={label} style={s.stepCol}>
            <View style={[s.step, { height: 32 + i * 18 }]}>
              <Text style={s.stepN}>{i + 1}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={s.labelRow}>
        {LEVELS.map((label) => (
          <Text key={label} style={s.label}>{label}</Text>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  stairRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  stepCol: { width: 48, alignItems: 'center' },
  step: { width: 44, backgroundColor: colors.accent, borderTopLeftRadius: 4, borderTopRightRadius: 4, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 4 },
  stepN: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 13, color: colors.bg },
  labelRow: { flexDirection: 'row', gap: 4, marginTop: space[2] },
  label: { width: 48, fontSize: 10, lineHeight: 13, color: 'rgba(32,30,29,0.65)', textAlign: 'center' },
});
