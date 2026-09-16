import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';

const QUADRANTS: { label: string; note: string; tone: 'reject' | 'delay' | 'receive' | 'more' }[] = [
  { label: 'Reject', note: 'Bless, don’t argue', tone: 'reject' },
  { label: 'Delay', note: 'Stay in relationship', tone: 'delay' },
  { label: 'Receive', note: 'Go further this week', tone: 'receive' },
  { label: 'Want more', note: 'Start a study', tone: 'more' },
];

const TONE_COLOR: Record<string, string> = {
  reject: colors.neutral500,
  delay: colors.accent2700,
  receive: colors.accent700,
  more: colors.accent800,
};

// One seed, four kinds of ground (Mark 4) — drawn as a simple sower's field
// split into four plots rather than copying any published soils chart.
export function ResponsesTool() {
  return (
    <View style={s.wrap}>
      <View style={s.grid}>
        {QUADRANTS.map((q) => (
          <View key={q.label} style={[s.cell, { borderColor: TONE_COLOR[q.tone] }]}>
            <Text style={[s.cellLabel, { color: TONE_COLOR[q.tone] }]}>{q.label}</Text>
            <Text style={s.cellNote}>{q.note}</Text>
          </View>
        ))}
      </View>
      <Text style={s.caption}>The same seed, sown on four kinds of ground</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 280, gap: space[2] },
  cell: {
    width: 136,
    height: 92,
    borderWidth: 2,
    borderRadius: 4,
    padding: space[2],
    justifyContent: 'center',
  },
  cellLabel: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 15 },
  cellNote: { fontSize: 12, lineHeight: 17, color: 'rgba(32,30,29,0.55)', marginTop: 3 },
  caption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: space[2], textAlign: 'center' },
});
