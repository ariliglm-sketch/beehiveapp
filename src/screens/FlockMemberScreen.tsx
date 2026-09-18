import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShareStackParamList } from '../navigation/types';
import { BareHeader } from '../components/Header';
import { Btn, Field } from '../components/ui';
import { showAlert } from '../lib/confirm';
import { colors, fonts, space } from '../theme/tokens';
import { ALL_STEPS } from '../data/content';
import { DAILY_VERSES, textForVerseId } from '../data/verses';
import { composeCoachNoteText, daysSince, useAppDispatch, useAppState } from '../state/store';

type Props = NativeStackScreenProps<ShareStackParamList, 'FlockMember'>;

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value}</Text>
    </View>
  );
}

export function FlockMemberScreen({ route, navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const entry = state.flock.find((f) => f.id === route.params.id);

  const [verseId, setVerseId] = useState<string | null>(null);
  const [words, setWords] = useState('');
  const [stepId, setStepId] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');

  const verseInfo = verseId ? textForVerseId(verseId, state.packId) : null;
  const step = stepId ? ALL_STEPS.find((x) => x.id === stepId) ?? null : null;

  const noteText = useMemo(
    () =>
      composeCoachNoteText(
        verseInfo ? { ref: verseInfo.verse.ref, text: verseInfo.text, source: verseInfo.source.shortName } : null,
        words,
        step ? { id: step.id, title: step.title } : null,
        checkIn
      ),
    [verseInfo, words, step, checkIn]
  );

  const hasContent = !!verseInfo || words.trim().length > 0 || !!step || checkIn.trim().length > 0;

  if (!entry) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <BareHeader backLabel="Flock" onBack={() => navigation.goBack()} />
        <Text style={[s.body, { paddingHorizontal: space[4] }]}>This person is no longer in your flock.</Text>
      </View>
    );
  }

  const report = entry.lastReport;

  const confirmAndSend = () => {
    if (!hasContent) {
      showAlert('Nothing to send yet', 'Pick a verse, write a word, give a step, or set a check-in first.');
      return;
    }
    showAlert(
      'Send this to ' + entry.codeName + '?',
      'This will leave your phone as a plain message, the same way his reports reach you.',
      [
        { text: 'Read it again', style: 'cancel' },
        { text: 'Send', onPress: doSend },
      ]
    );
  };

  const doSend = async () => {
    try {
      const result = await Share.share({ message: noteText });
      if (Platform.OS === 'ios' && (result as { action?: string }).action === Share.dismissedAction) {
        return;
      }
      dispatch({ type: 'recordNoteSent', id: entry.id });
      setVerseId(null);
      setWords('');
      setStepId(null);
      setCheckIn('');
    } catch {
      // The share sheet itself was cancelled or failed to open — nothing was sent.
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <BareHeader backLabel="Flock" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.title}>{entry.codeName}</Text>
        <Text style={s.subtitle}>
          {entry.lastReceivedAt
            ? 'Last report ' + daysSince(entry.lastReceivedAt) + ' days ago' + (report?.date ? ' · dated ' + report.date : '')
            : 'Has never sent a report. Go to him before you ask him for anything.'}
        </Text>
        {entry.lastNoteSentAt && <Text style={s.subtitle}>{'Last note from you: ' + daysSince(entry.lastNoteSentAt) + ' days ago'}</Text>}

        {report ? (
          <View style={{ paddingTop: space[4] }}>
            <Row label="Field" value={report.field} />
            <Row label="Talks" value={report.talks} />
            <Row label="Studies" value={report.studies} />
            <Row label="Trained" value={report.trained} />
            <Row label="Lights" value={report.lights} />
            <Row label="Prayer" value={report.prayer} />
            <Row label="Map" value={report.map} />
            <Row label="Stalled branch" value={report.stalled} />
            <Row label="Tools used" value={report.tools} />

            {report.journal && report.journal.length > 0 && (
              <View style={{ paddingTop: space[4] }}>
                <Text style={s.kicker}>In his own words</Text>
                {report.journal.map((j, i) => (
                  <View key={i} style={s.quoteCard}>
                    <Text style={s.quoteDate}>{j.date}</Text>
                    <Text style={s.quoteBody}>{j.body}</Text>
                  </View>
                ))}
              </View>
            )}

            {report.note && (
              <View style={{ paddingTop: space[4] }}>
                <Text style={s.kicker}>What he asked you</Text>
                <View style={s.quoteCard}>
                  <Text style={s.quoteBody}>{report.note}</Text>
                </View>
              </View>
            )}
          </View>
        ) : (
          <Text style={[s.body, { paddingTop: space[4] }]}>Nothing sent yet. This name is on your list so you remember to check on him.</Text>
        )}

        <View style={{ paddingTop: space[6] }}>
          <Text style={s.kicker}>Write back</Text>
          <Text style={s.mutedSmall}>Pick a verse, add your own words, give one next step, and set a check-in. Send only what you fill in.</Text>

          <Text style={[s.label, { paddingTop: space[4] }]}>A verse to send</Text>
          <View style={s.chipRow}>
            {DAILY_VERSES.map((v) => {
              const on = verseId === v.id;
              return (
                <Pressable key={v.id} onPress={() => setVerseId(on ? null : v.id)} style={[s.chip, on && s.chipOn]} hitSlop={4}>
                  <Text style={[s.chipText, on && s.chipTextOn]}>{v.ref}</Text>
                </Pressable>
              );
            })}
          </View>
          {verseInfo && (
            <View style={s.quoteCard}>
              <Text style={s.quoteBody}>{verseInfo.text}</Text>
              <Text style={s.quoteDate}>{verseInfo.verse.ref + ' · ' + verseInfo.source.shortName}</Text>
            </View>
          )}

          <View style={{ paddingTop: space[4] }}>
            <Field label="Your own words" value={words} onChangeText={setWords} placeholder="What you want him to hear from you" multiline />
          </View>

          <Text style={[s.label, { paddingTop: space[4] }]}>One next step to give him</Text>
          <View style={s.chipRow}>
            {ALL_STEPS.map((x) => {
              const on = stepId === x.id;
              return (
                <Pressable key={x.id} onPress={() => setStepId(on ? null : x.id)} style={[s.chip, on && s.chipOn]} hitSlop={4}>
                  <Text style={[s.chipText, on && s.chipTextOn]}>{x.title}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ paddingTop: space[4] }}>
            <Field label="Set your next check-in" value={checkIn} onChangeText={setCheckIn} placeholder="e.g. 25 Sep" />
          </View>

          {hasContent && (
            <View style={{ paddingTop: space[4] }}>
              <Text style={s.kicker}>What will be sent</Text>
              <View style={s.previewBox}>
                <Text style={s.previewText}>{noteText}</Text>
              </View>
            </View>
          )}

          <Btn
            label={'Send to ' + entry.codeName}
            onPress={confirmAndSend}
            block
            style={{ marginTop: space[4], opacity: hasContent ? 1 : 0.5 }}
          />
        </View>

        <Text style={[s.mutedSmall, { paddingTop: space[6] }]}>
          Only what he chose to send is shown here. No person on his oikos map is ever named in a report — only counts.
        </Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: fonts.heading, fontSize: 28, color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(32,30,29,0.55)' },
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  label: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[2] },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  mutedSmall: { fontSize: 13, lineHeight: 20, color: 'rgba(32,30,29,0.55)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: space[3], paddingVertical: space[2], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  rowLabel: { fontSize: 13, color: 'rgba(32,30,29,0.55)' },
  rowValue: { fontSize: 14, color: colors.text, flex: 1, textAlign: 'right' },
  quoteCard: { backgroundColor: colors.surface, borderRadius: 2, padding: space[3], marginTop: space[2], marginBottom: space[2] },
  quoteDate: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent, marginTop: 4 },
  quoteBody: { fontSize: 14, lineHeight: 21, color: colors.text, fontStyle: 'italic' },
  chipRow: { flexDirection: 'row', gap: space[2], flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: 'rgba(32,30,29,0.20)', borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5, maxWidth: 260 },
  chipOn: { borderColor: colors.accent700, backgroundColor: 'rgba(32,30,29,0.05)' },
  chipText: { fontSize: 12, color: 'rgba(32,30,29,0.55)' },
  chipTextOn: { color: colors.accent700 },
  previewBox: { backgroundColor: colors.surface, borderRadius: 2, borderWidth: 1, borderColor: colors.divider, padding: space[3], marginTop: space[2] },
  previewText: { fontFamily: 'monospace', fontSize: 12, lineHeight: 18, color: colors.text },
});
