import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlainHeader } from '../components/Header';
import { Icon } from '../components/Icon';
import { Field, Btn } from '../components/ui';
import { showAlert } from '../lib/confirm';
import { colors, fonts, space } from '../theme/tokens';
import { namingFor, useAppDispatch, useAppState } from '../state/store';

export function PrayerScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');
  const naming = namingFor(state);

  const confirmDelete = (id: string, name: string) => {
    showAlert('Take ' + name + ' off the list?', 'They stay on your oikos map if they were already there.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => dispatch({ type: 'deleteName', id }) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Carried in prayer" subtitle="The names you are holding before God" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>Tap the hands beside a name when you have prayed for them today. Nothing here is scored. It is a list so that no one is forgotten.</Text>

        {state.names.length === 0 && (
          <Text style={s.empty}>No names yet. Add someone below, or send a name across from your oikos map.</Text>
        )}

        {state.names.map((n) => {
          const color = n.prayed ? colors.accent700 : colors.neutral500;
          return (
            <View key={n.id} style={s.card}>
              <View style={s.row}>
                <Pressable onPress={() => dispatch({ type: 'togglePrayed', id: n.id })} accessibilityLabel="Mark as prayed for today" style={{ width: 24, paddingTop: 2 }} hitSlop={8}>
                  <Icon name="HandsPraying" size={21} color={color} />
                </Pressable>
                <View style={{ flex: 1 }}>
                  <Text style={s.name}>{n.name}</Text>
                  {n.note.length > 0 && <Text style={s.note}>{n.note}</Text>}
                  {n.oikosId && <Text style={s.from}>From your oikos map</Text>}
                </View>
                <Text style={[s.status, { color }]}>{n.prayed ? 'Prayed today' : 'Not yet today'}</Text>
              </View>
              <View style={s.actionRow}>
                <Pressable onPress={() => confirmDelete(n.id, n.name)} accessibilityLabel={'Remove ' + n.name} hitSlop={6}>
                  <Text style={s.remove}>Remove</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        <View style={{ paddingTop: space[4], flexDirection: 'row', gap: space[2], alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Field label={naming.prayerLabel} value={draft} onChangeText={setDraft} placeholder={naming.prayerPlaceholder} />
          </View>
          <Btn
            label="Add"
            onPress={() => {
              dispatch({ type: 'addName', text: draft });
              setDraft('');
            }}
          />
        </View>

        <View style={{ paddingTop: space[6] }}>
          <Btn label="I prayed today" variant="secondary" onPress={() => dispatch({ type: 'markPrayedToday' })} style={{ alignSelf: 'flex-start' }} />
          <Text style={[s.close, { paddingTop: space[3] }]}>
            {state.prayedDays === 0
              ? 'Tap that once at the end of a day you prayed. Keep the list short enough that you can actually pray it.'
              : 'You have prayed ' + state.prayedDays + ' days. Keep the list short enough that you can actually pray it.'}
          </Text>
          <Text style={s.helper}>God knows who you mean. A code name loses nothing in prayer.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[6] },
  empty: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)', paddingBottom: space[2] },
  card: { paddingVertical: space[2], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 17, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  from: { fontSize: 11, color: 'rgba(32,30,29,0.40)', marginTop: 3 },
  status: { fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', paddingTop: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: space[2] },
  remove: { fontSize: 13, color: colors.neutral600 },
  close: { fontSize: 15, lineHeight: 24, color: colors.text },
  helper: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)', paddingTop: space[2] },
});
