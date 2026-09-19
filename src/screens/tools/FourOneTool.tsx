import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

const QUADRANTS = [
  { letter: 'W', label: 'Why', note: 'Identity' },
  { letter: 'W', label: 'Who', note: 'Their oikos' },
  { letter: 'W', label: 'What', note: 'Two stories' },
  { letter: 'W', label: 'When', note: 'A goal and a date' },
];

// The 411 is meant to fit on one sheet of paper — so it is drawn here as one
// sheet, folded into its four questions.
export function FourOneTool() {
  return (
    <View style={s.wrap}>
      <View style={s.page}>
        <View style={s.row}>
          <Quadrant {...QUADRANTS[0]} />
          <Quadrant {...QUADRANTS[1]} />
        </View>
        <View style={s.divider} />
        <View style={s.row}>
          <Quadrant {...QUADRANTS[2]} />
          <Quadrant {...QUADRANTS[3]} />
        </View>
      </View>
      <Text style={s.caption}>One page, four questions, under an hour</Text>
    </View>
  );
}

function Quadrant({ letter, label, note }: { letter: string; label: string; note: string }) {
  return (
    <View style={s.cell}>
      <Text style={s.letter}>{letter}</Text>
      <Text style={s.label}>{label}</Text>
      <Text style={s.note}>{note}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  page: { width: 260, height: 200, borderWidth: 2, borderColor: colors.text, borderRadius: 4 },
  row: { flex: 1, flexDirection: 'row' },
  divider: { height: 2, backgroundColor: colors.divider },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space[2] },
  letter: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 22, color: colors.accent },
  label: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 15, color: colors.text, marginTop: 2 },
  note: { fontSize: 11, color: 'rgba(32,30,29,0.55)', marginTop: 2, textAlign: 'center' },
  caption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: space[2], textAlign: 'center' },
});
