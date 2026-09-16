import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { Field, Btn } from '../../components/ui';
import { colors, fonts, space } from '../../theme/tokens';
import { isOnPrayerList, markLook, oikosLook, useAppDispatch, useAppState, type OikosMark } from '../../state/store';

const COLOR_MAP: Record<string, string> = {
  accent700: colors.accent700,
  accent2700: colors.accent2700,
  neutral600: colors.neutral600,
};

const MARKS: OikosMark[] = ['convo', 'study', 'trained'];

export function OikosTool() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');

  const green = state.oikos.filter((p) => p.light === 'green').length;
  const yellow = state.oikos.filter((p) => p.light === 'yellow').length;
  const red = state.oikos.filter((p) => p.light === 'red').length;

  const confirmDelete = (id: string, name: string) => {
    Alert.alert('Remove ' + name + '?', 'This takes them off your map. Anything you wrote about them in your journal stays.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => dispatch({ type: 'deleteOikos', id }) },
    ]);
  };

  return (
    <View style={{ paddingTop: space[4] }}>
      <Text style={s.h6}>{'Your oikos · ' + green + ' green · ' + yellow + ' yellow · ' + red + ' red'}</Text>

      {state.oikos.length === 0 && (
        <Text style={s.empty}>
          Your map is empty. Write down the people you already know — household, work, neighbors, anyone in need — and mark how open each one is.
        </Text>
      )}

      {state.oikos.map((p) => {
        const look = oikosLook[p.light];
        const color = COLOR_MAP[look.color];
        const onPrayerList = isOnPrayerList(state, p.id);
        return (
          <View key={p.id} style={s.card}>
            <View style={s.row}>
              <Pressable onPress={() => dispatch({ type: 'cycleOikos', id: p.id })} accessibilityLabel="Change how open this person is" style={{ paddingTop: 2 }} hitSlop={8}>
                <Icon name={look.icon} size={21} color={color} />
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{p.name}</Text>
                {p.note.length > 0 && <Text style={s.note}>{p.note}</Text>}
              </View>
              <Text style={[s.light, { color }]}>{look.light}</Text>
            </View>

            <View style={s.chipRow}>
              {MARKS.map((m) => {
                const on = p.marks[m];
                return (
                  <Pressable
                    key={m}
                    onPress={() => dispatch({ type: 'toggleOikosMark', id: p.id, mark: m })}
                    accessibilityLabel={markLook[m].label}
                    style={[s.chip, on && s.chipOn]}
                    hitSlop={4}
                  >
                    <Text style={[s.chipText, on && s.chipTextOn]}>{markLook[m].short}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={s.actionRow}>
              <Pressable
                onPress={() => dispatch({ type: 'promoteToPrayer', id: p.id })}
                disabled={onPrayerList}
                accessibilityLabel={'Add ' + p.name + ' to your prayer list'}
                hitSlop={6}
              >
                <Text style={[s.action, onPrayerList && s.actionDone]}>{onPrayerList ? 'On your prayer list' : 'Add to prayer list'}</Text>
              </Pressable>
              <Pressable onPress={() => confirmDelete(p.id, p.name)} accessibilityLabel={'Remove ' + p.name} hitSlop={6}>
                <Text style={s.remove}>Remove</Text>
              </Pressable>
            </View>
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
      <Text style={[s.helper, { paddingTop: space[2] }]}>
        Tap conversation, study or trained as each one happens. Those taps are what fill the counters on your Today screen, so mark them here rather than counting twice.
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  empty: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)', paddingVertical: space[3] },
  card: { paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start' },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  light: { fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', paddingTop: 4 },
  chipRow: { flexDirection: 'row', gap: space[2], paddingTop: space[3], flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: 'rgba(32,30,29,0.20)', borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5 },
  chipOn: { borderColor: colors.accent700, backgroundColor: 'rgba(32,30,29,0.05)' },
  chipText: { fontSize: 12, color: 'rgba(32,30,29,0.55)' },
  chipTextOn: { color: colors.accent700 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: space[3] },
  action: { fontSize: 13, color: colors.accent700 },
  actionDone: { color: 'rgba(32,30,29,0.40)' },
  remove: { fontSize: 13, color: colors.neutral600 },
  helper: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
});
