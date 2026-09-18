import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShareStackParamList } from '../navigation/types';
import { PlainHeader } from '../components/Header';
import { Field, Btn } from '../components/ui';
import { colors, fonts, space } from '../theme/tokens';
import { daysSince, parseReportText, sortedFlock, useAppDispatch, useAppState } from '../state/store';

type Props = NativeStackScreenProps<ShareStackParamList, 'Flock'>;

export function FlockScreen({ navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [pasteText, setPasteText] = useState('');
  const [watchName, setWatchName] = useState('');
  const [error, setError] = useState('');

  const flock = sortedFlock(state);

  const readIt = () => {
    const result = parseReportText(pasteText);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    setError('');
    dispatch({ type: 'ingestFlockReport', parsed: result.data });
    setPasteText('');
  };

  const confirmDelete = (id: string, codeName: string) => {
    Alert.alert('Stop watching for ' + codeName + '?', 'Any report already filed under this name is removed too.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => dispatch({ type: 'deleteFlockEntry', id }) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Your flock" subtitle="Sorted by who has gone quietest" backLabel="Share" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Field
          label="Paste a report you were sent"
          value={pasteText}
          onChangeText={(t) => {
            setPasteText(t);
            if (error) setError('');
          }}
          placeholder="Paste the whole message here"
          multiline
        />
        {error.length > 0 && <Text style={s.error}>{error}</Text>}
        <Btn label="Read it" onPress={readIt} style={{ marginTop: space[2], alignSelf: 'flex-start' }} />

        {flock.length === 0 && (
          <Text style={[s.empty, { paddingTop: space[6] }]}>
            No one in your flock yet. Paste the first report you receive, or add someone below so you remember to look for them.
          </Text>
        )}

        {flock.map((f) => {
          const quiet = f.lastReceivedAt
            ? 'Quiet for ' + daysSince(f.lastReceivedAt) + ' days'
            : 'Has never sent a report. Go to him before you ask him for anything.';
          return (
            <Pressable key={f.id} onPress={() => navigation.navigate('FlockMember', { id: f.id })} style={s.row}>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{f.codeName}</Text>
                <Text style={[s.quiet, !f.lastReceivedAt && { color: colors.accent2700 }]}>{quiet}</Text>
              </View>
              <Pressable onPress={() => confirmDelete(f.id, f.codeName)} hitSlop={8} accessibilityLabel={'Remove ' + f.codeName}>
                <Text style={s.remove}>Remove</Text>
              </Pressable>
            </Pressable>
          );
        })}

        <View style={{ paddingTop: space[6], flexDirection: 'row', gap: space[2], alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Field label="Add someone to watch for" value={watchName} onChangeText={setWatchName} placeholder="Their code name" />
          </View>
          <Btn
            label="Add"
            onPress={() => {
              dispatch({ type: 'addFlockWatch', codeName: watchName });
              setWatchName('');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  error: { fontSize: 13, color: colors.neutral600, paddingTop: space[1] },
  empty: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
  row: { flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 17, color: colors.text },
  quiet: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginTop: 2 },
  remove: { fontSize: 13, color: colors.neutral600 },
});
