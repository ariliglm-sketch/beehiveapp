import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../../theme/tokens';
import { EXTRA_TOOLS } from '../../data/toolbox';

const STORY_TITLES = (EXTRA_TOOLS.find((t) => t.id === 'dbs')?.items ?? []).map((it) => it.title);
const QUESTIONS = ['What does it say?', 'What does it mean?', 'What will we do?'];

// Seven weeks laid out as one visible row, so a leader can see at a glance
// how short the whole study actually is — original layout, not a copy of
// any published seven-story chart.
export function DbsTool() {
  return (
    <View style={s.wrap}>
      <View style={s.weekRow}>
        {STORY_TITLES.map((title, i) => (
          <View key={title} style={s.weekCol}>
            <View style={s.weekDot}>
              <Text style={s.weekN}>{i + 1}</Text>
            </View>
            <Text style={s.weekLabel}>{title}</Text>
          </View>
        ))}
      </View>
      <View style={s.questionRow}>
        {QUESTIONS.map((q) => (
          <View key={q} style={s.questionChip}>
            <Text style={s.questionText}>{q}</Text>
          </View>
        ))}
      </View>
      <Text style={s.caption}>Ask the same three questions, every week</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  weekRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: space[2], maxWidth: 320 },
  weekCol: { width: 76, alignItems: 'center' },
  weekDot: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.accent2700, alignItems: 'center', justifyContent: 'center' },
  weekN: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 12, color: colors.bg },
  weekLabel: { fontSize: 10, lineHeight: 13, color: 'rgba(32,30,29,0.65)', textAlign: 'center', marginTop: 3 },
  questionRow: { flexDirection: 'row', gap: space[2], marginTop: space[4], flexWrap: 'wrap', justifyContent: 'center' },
  questionChip: { borderWidth: 1, borderColor: colors.divider, borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5 },
  questionText: { fontSize: 12, color: colors.accent700 },
  caption: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: space[2], textAlign: 'center' },
});
