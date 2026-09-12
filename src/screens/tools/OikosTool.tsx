import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Field, Btn } from '../../components/ui';
import { colors, fonts, space } from '../../theme/tokens';
import { oikosLook, useAppDispatch, useAppState } from '../../state/store';

const COLOR_MAP: Record<string, string> = {
  accent700: colors.accent700,
  accent2700: colors.accent2700,
  neutral600: colors.neutral600,
};

export function OikosTool() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');

  const green = state.oikos.filter((p) => p.light === 'green').length;
  const yellow = state.oikos.filter((p) => p.light === 'yellow').length;
  const red = state.oikos.filter((p) => p.light === 'red').length;

  return (
    <View style={{ paddingTop: space[4] }}>
      <Text style={s.h6}>{'Your oikos · ' + green + ' green · ' + yellow + ' yellow · ' + red + ' red'}</Text>
      {state.oikos.map((p) => {
        const look = oikosLook[p.light];
        const color = COLOR_MAP[look.color];
        return (
          <View key={p.id} style={s.row}>
            <Pressable onPress={() => dispatch({ type: 'cycleOikos', id: p.id })} accessibilityLabel="Change how open this person is" style={{ paddingTop: 2 }} hitSlop={8}>
              <Icon name={look.icon} size={21} color={color} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{p.name}</Text>
              <Text style={s.note}>{p.note}</Text>
            </View>
            <Text style={[s.light, { color }]}>{look.light}</Text>
          </View>
        );
      })}
      <View style={{ paddingTop: space[3], flexDirection: 'row', gap: space[2], alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <Field label="Add a name from your household, work, or neighborhood" value={draft} onChangeText={setDraft} placeholder="Name, and how you know them" />
        </View>
        <Btn
          label="Add"
          onPress={() => {
            dispatch({ type: 'addOikos', text: draft });
            setDraft('');
          }}
        />
      </View>
      <Text style={[s.helper, { paddingTop: space[4] }]}>
        Tap the mark beside a name to move them between green (open, go now), yellow (unsure, keep loving), and red (closed for now, keep praying). Work the green lights first.
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  light: { fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', paddingTop: 4 },
  helper: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
});
