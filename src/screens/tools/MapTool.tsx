import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tag } from '../../components/ui';
import { colors, fonts, space } from '../../theme/tokens';
import { GENERATIONS, MAP_ADVICE } from '../../data/content';

export function MapTool() {
  return (
    <View style={{ paddingTop: space[2] }}>
      {GENERATIONS.map((g, i) => (
        <View key={i} style={[s.row, { paddingLeft: g.indent * space[4] }]}>
          <Text style={s.gen}>{g.gen}</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{g.name}</Text>
            <Text style={s.note}>{g.note}</Text>
          </View>
          <Tag label={g.stage} tone={g.tone} />
        </View>
      ))}
      <Text style={[s.advice, { paddingTop: space[4] }]}>{MAP_ADVICE}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  gen: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 13, letterSpacing: 0.8, width: 30, color: colors.accent700, paddingTop: 3 },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  advice: { fontSize: 15, lineHeight: 24, color: colors.text },
});
