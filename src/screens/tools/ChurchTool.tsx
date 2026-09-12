import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { colors, fonts, space } from '../../theme/tokens';
import { CHURCH_MARKS } from '../../data/content';
import { churchMarksOn, useAppDispatch, useAppState } from '../../state/store';

export function ChurchTool() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const marksOn = churchMarksOn(state);
  const advice =
    marksOn >= 8
      ? 'This group is a church. Tell them so, and give the parts away to their own leaders.'
      : 'Choose one missing mark and begin it this month. Do not try to add them all at once.';

  return (
    <View style={{ paddingTop: space[2] }}>
      <Text style={s.h6}>{marksOn + ' of ' + CHURCH_MARKS.length + ' marks present'}</Text>
      {CHURCH_MARKS.map((m) => {
        const on = !!state.churchMarks[m.id];
        return (
          <Pressable key={m.id} onPress={() => dispatch({ type: 'toggleChurchMark', id: m.id })} style={s.row}>
            <View style={{ width: 20, paddingTop: 2 }}>
              <Icon name={on ? 'CheckSquare' : 'Square'} size={19} color={on ? colors.accent700 : colors.neutral500} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.label}>{m.label}</Text>
              <Text style={s.ref}>{m.ref}</Text>
            </View>
          </Pressable>
        );
      })}
      <Text style={[s.advice, { paddingTop: space[4] }]}>{advice}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  label: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  ref: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  advice: { fontSize: 15, lineHeight: 24, color: colors.text },
});
