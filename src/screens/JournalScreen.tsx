import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlainHeader } from '../components/Header';
import { Field, Btn, Card } from '../components/ui';
import { colors, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { activePartNum, useAppDispatch, useAppState } from '../state/store';

export function JournalScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');
  const activePart = PARTS.find((p) => p.n === activePartNum(state))!;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="What God has done" subtitle="Your own record of this work" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>Write the small things down. In a year, when you cannot see fruit, this page will remind you what the Lord has already done here.</Text>
        <Field label="What happened today" value={draft} onChangeText={setDraft} placeholder="Two sentences is enough." multiline />
        <Btn
          label="Save entry"
          style={{ marginTop: space[2], alignSelf: 'flex-start' }}
          onPress={() => {
            dispatch({ type: 'addEntry', text: draft, tag: 'Field ' + activePart.n + ' · ' + activePart.title });
            setDraft('');
          }}
        />
        <View style={{ paddingTop: space[6], gap: space[3] }}>
          {state.entries.map((e, i) => (
            <Card key={i}>
              <Text style={s.kicker}>{e.date}</Text>
              <Text style={s.body}>{e.body}</Text>
              <Text style={s.meta}>{e.tag}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[4] },
  kicker: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent },
  body: { fontSize: 13, lineHeight: 20, color: colors.text },
  meta: { fontSize: 11, color: 'rgba(32,30,29,0.5)' },
});
