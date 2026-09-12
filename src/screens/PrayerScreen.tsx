import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlainHeader } from '../components/Header';
import { Icon } from '../components/Icon';
import { Field, Btn } from '../components/ui';
import { colors, fonts, space } from '../theme/tokens';
import { useAppDispatch, useAppState } from '../state/store';

export function PrayerScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Carried in prayer" subtitle="The names you are holding before God" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>Tap the hands beside a name when you have prayed for them today. Nothing here is scored. It is a list so that no one is forgotten.</Text>
        {state.names.map((n) => {
          const color = n.prayed ? colors.accent700 : colors.neutral500;
          return (
            <View key={n.id} style={s.row}>
              <Pressable onPress={() => dispatch({ type: 'togglePrayed', id: n.id })} accessibilityLabel="Mark as prayed for today" style={{ width: 24, paddingTop: 2 }} hitSlop={8}>
                <Icon name="HandsPraying" size={21} color={color} />
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{n.name}</Text>
                <Text style={s.note}>{n.note}</Text>
              </View>
              <Text style={[s.status, { color }]}>{n.prayed ? 'Prayed today' : 'Not yet today'}</Text>
            </View>
          );
        })}
        <View style={{ paddingTop: space[4], flexDirection: 'row', gap: space[2], alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Field label="Add someone to carry" value={draft} onChangeText={setDraft} placeholder="Name, and one line about them" />
          </View>
          <Btn
            label="Add"
            onPress={() => {
              dispatch({ type: 'addName', text: draft });
              setDraft('');
            }}
          />
        </View>
        <Text style={[s.close, { paddingTop: space[6] }]}>
          {'You have prayed for this village ' + state.prayedDays + ' days running. Keep the list short enough that you can actually pray it.'}
        </Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[6] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 17, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  status: { fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', paddingTop: 5 },
  close: { fontSize: 15, lineHeight: 24, color: colors.text },
});
