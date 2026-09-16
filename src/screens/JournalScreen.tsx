import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlainHeader } from '../components/Header';
import { Field, Btn, Card } from '../components/ui';
import { colors, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { activePartNum, nextStep, personName, useAppDispatch, useAppState } from '../state/store';

export function JournalScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');
  const [personId, setPersonId] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const activePart = PARTS.find((p) => p.n === activePartNum(state))!;
  const step = nextStep(state);

  const save = () => {
    if (!draft.trim()) {
      setError('Write something first.');
      return;
    }
    setError('');
    dispatch({
      type: 'addEntry',
      text: draft,
      tag: 'Field ' + activePart.n + ' · ' + activePart.title,
      personId,
      stepId: step.id,
    });
    setDraft('');
    setPersonId(undefined);
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete this entry?', 'It cannot be brought back.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch({ type: 'deleteEntry', id }) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="What God has done" subtitle="Your own record of this work" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>Write the small things down. In a year, when you cannot see fruit, this page will remind you what the Lord has already done here.</Text>

        <Field
          label="What happened today"
          value={draft}
          onChangeText={(t: string) => {
            setDraft(t);
            if (error) setError('');
          }}
          placeholder="Two sentences is enough."
          multiline
        />
        {error.length > 0 && <Text style={s.error}>{error}</Text>}

        {state.oikos.length > 0 && (
          <View style={{ paddingTop: space[3] }}>
            <Text style={s.label}>Was this about someone on your map?</Text>
            <View style={s.chipRow}>
              {state.oikos.map((p) => {
                const on = personId === p.id;
                return (
                  <Pressable
                    key={p.id}
                    onPress={() => setPersonId(on ? undefined : p.id)}
                    accessibilityLabel={'Link this entry to ' + p.name}
                    style={[s.chip, on && s.chipOn]}
                    hitSlop={4}
                  >
                    <Text style={[s.chipText, on && s.chipTextOn]}>{p.name}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <Btn label="Save entry" style={{ marginTop: space[3], alignSelf: 'flex-start' }} onPress={save} />

        <View style={{ paddingTop: space[6], gap: space[3] }}>
          {state.entries.length === 0 && (
            <Text style={s.empty}>Nothing written yet. Your first entry can be one sentence about today.</Text>
          )}
          {state.entries.map((e) => {
            const who = personName(state, e.personId);
            return (
              <Card key={e.id}>
                <Text style={s.kicker}>{e.date}</Text>
                <Text style={s.body}>{e.body}</Text>
                <View style={s.footer}>
                  <Text style={s.meta}>{who ? e.tag + ' · ' + who : e.tag}</Text>
                  <Pressable onPress={() => confirmDelete(e.id)} accessibilityLabel="Delete this entry" hitSlop={6}>
                    <Text style={s.remove}>Delete</Text>
                  </Pressable>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[4] },
  label: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[2] },
  chipRow: { flexDirection: 'row', gap: space[2], flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: 'rgba(32,30,29,0.20)', borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5 },
  chipOn: { borderColor: colors.accent700, backgroundColor: 'rgba(32,30,29,0.05)' },
  chipText: { fontSize: 12, color: 'rgba(32,30,29,0.55)' },
  chipTextOn: { color: colors.accent700 },
  kicker: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent },
  body: { fontSize: 13, lineHeight: 20, color: colors.text },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: space[2] },
  meta: { fontSize: 11, color: 'rgba(32,30,29,0.5)', flex: 1 },
  remove: { fontSize: 12, color: colors.neutral600 },
  empty: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
  error: { fontSize: 13, color: colors.neutral600, paddingTop: space[1] },
});
