import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShareStackParamList } from '../navigation/types';
import { PlainHeader } from '../components/Header';
import { Btn, Field } from '../components/ui';
import { Icon } from '../components/Icon';
import { showAlert } from '../lib/confirm';
import { shareOrCopy } from '../lib/shareText';
import { colors, fonts, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { ALL_TOOLS } from '../data/toolbox';
import {
  GOAL_TARGETS,
  REPORT_SECTION_LABELS,
  REPORT_SECTION_ORDER,
  activePartNum,
  composeReportText,
  deepestGeneration,
  doneCount,
  goalTotals,
  oikosLightCounts,
  parseCoachNoteText,
  reportSummary,
  toolsOpenedCount,
  useAppDispatch,
  useAppState,
  type ReportSections,
} from '../state/store';

type Props = NativeStackScreenProps<ShareStackParamList, 'Share'>;

const ALL_ON: ReportSections = { field: true, counts: true, lights: true, prayer: true, map: true, tools: true };

export function ShareScreen({ navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [sections, setSections] = useState<ReportSections>(ALL_ON);
  const [journalTicks, setJournalTicks] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState('');
  const [pasteNote, setPasteNote] = useState('');
  const [noteError, setNoteError] = useState('');

  const journalIds = useMemo(() => Object.keys(journalTicks).filter((id) => journalTicks[id]), [journalTicks]);
  const reportText = useMemo(() => composeReportText(state, sections, journalIds, note), [state, sections, journalIds, note]);

  const previewFor = (key: keyof ReportSections) => {
    if (key === 'field') {
      const n = activePartNum(state);
      const part = PARTS.find((p) => p.n === n)!;
      return n + ' ' + part.title + ' — ' + doneCount(state) + ' steps walked';
    }
    if (key === 'counts') {
      const totals = goalTotals(state);
      return totals.convos + '/' + GOAL_TARGETS.convos + ' talks · ' + totals.studies + '/' + GOAL_TARGETS.studies + ' studies · ' + totals.trained + '/' + GOAL_TARGETS.trained + ' trained';
    }
    if (key === 'lights') {
      const l = oikosLightCounts(state);
      return l.green + ' green, ' + l.yellow + ' yellow, ' + l.red + ' red';
    }
    if (key === 'prayer') return state.prayedDays + ' days';
    if (key === 'map') return state.groups.length + ' groups, ' + deepestGeneration(state) + ' generations';
    return toolsOpenedCount(state) + ' of ' + ALL_TOOLS.length + ' tools';
  };

  const confirmAndSend = () => {
    const checked = REPORT_SECTION_ORDER.filter((k) => sections[k]).map((k) => REPORT_SECTION_LABELS[k]);
    const lines = checked.length ? checked.join('\n') : 'Nothing checked yet.';
    const extra =
      (journalIds.length > 0 ? '\n' + journalIds.length + ' journal entry(ies), word for word' : '') +
      (note.trim() ? '\nYour note' : '');
    showAlert(
      'Send this to your coach?',
      'This is what is leaving your phone:\n\n' + lines + extra + '\n\nOnce sent, it cannot be recalled.',
      [
        { text: 'Read it again', style: 'cancel' },
        { text: 'Send', onPress: doSend },
      ]
    );
  };

  const readCoachNote = () => {
    const result = parseCoachNoteText(pasteNote);
    if (!result.ok) {
      setNoteError(result.reason);
      return;
    }
    setNoteError('');
    dispatch({ type: 'receiveCoachNote', note: result.data });
    setPasteNote('');
  };

  const doSend = async () => {
    const summary = reportSummary(sections, journalIds.length);
    const sent = await shareOrCopy(reportText);
    if (!sent) return;
    dispatch({ type: 'recordSentReport', summary, hadJournal: journalIds.length > 0 });
    setNote('');
    setJournalTicks({});
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Share with your coach" subtitle="Nothing leaves until you tap send" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Field
          label="How your coach sees you"
          value={state.myCodeName}
          onChangeText={(t) => dispatch({ type: 'setMyCodeName', text: t })}
          placeholder="A code name only your coach would recognise"
        />

        <Pressable onPress={() => navigation.navigate('Flock')} style={{ paddingTop: space[4] }} hitSlop={4}>
          <Text style={s.link}>I am coaching others — open my flock</Text>
        </Pressable>

        <View style={{ paddingTop: space[6] }}>
          <Field
            label="Something from your coach?"
            value={pasteNote}
            onChangeText={(t) => {
              setPasteNote(t);
              if (noteError) setNoteError('');
            }}
            placeholder="Paste the note your coach sent here"
            multiline
          />
          {noteError.length > 0 && <Text style={s.error}>{noteError}</Text>}
          <Btn label="Read it" onPress={readCoachNote} style={{ marginTop: space[2], alignSelf: 'flex-start' }} />
          <Text style={s.mutedSmall}>It will show on your Today screen until you have read it.</Text>
        </View>

        <Text style={[s.kicker, { paddingTop: space[6] }]}>What you are sending</Text>
        {REPORT_SECTION_ORDER.map((key) => {
          const on = sections[key];
          return (
            <Pressable key={key} onPress={() => setSections((prev) => ({ ...prev, [key]: !prev[key] }))} style={s.checkRow} hitSlop={4}>
              <Icon name={on ? 'CheckSquare' : 'Square'} size={20} color={on ? colors.accent700 : colors.neutral500} />
              <View style={{ flex: 1 }}>
                <Text style={s.checkLabel}>{REPORT_SECTION_LABELS[key]}</Text>
                <Text style={s.checkValue}>{previewFor(key)}</Text>
              </View>
            </Pressable>
          );
        })}

        {state.entries.length > 0 && (
          <View style={{ paddingTop: space[6] }}>
            <Text style={s.kicker}>Journal entries — off by default</Text>
            <Text style={s.mutedSmall}>These go word for word, and carry any real name you wrote. Tick only what you mean to send.</Text>
            {state.entries.map((e) => {
              const on = !!journalTicks[e.id];
              return (
                <Pressable
                  key={e.id}
                  onPress={() => setJournalTicks((prev) => ({ ...prev, [e.id]: !prev[e.id] }))}
                  style={s.checkRow}
                  hitSlop={4}
                >
                  <Icon name={on ? 'CheckSquare' : 'Square'} size={20} color={on ? colors.accent700 : colors.neutral500} />
                  <View style={{ flex: 1 }}>
                    <Text style={s.checkLabel}>{e.date}</Text>
                    <Text style={s.checkValue} numberOfLines={2}>
                      {e.body}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={{ paddingTop: space[6] }}>
          <Field
            label="Anything you want to say to your coach"
            value={note}
            onChangeText={setNote}
            placeholder="Where you are weary, where you need help."
            multiline
          />
          <Text style={s.mutedSmall}>This goes word for word too, so write it as you would want it read.</Text>
        </View>

        <View style={{ paddingTop: space[6] }}>
          <Text style={s.kicker}>What will be sent</Text>
          <View style={s.previewBox}>
            <Text style={s.previewText}>{reportText}</Text>
          </View>
          <Text style={s.mutedSmall}>{reportText.length + ' characters'}</Text>
        </View>

        <Btn label="Send to your coach" onPress={confirmAndSend} block style={{ marginTop: space[6] }} />
        <Text style={[s.mutedSmall, { paddingTop: space[2] }]}>You will be shown exactly what is going before anything is sent.</Text>

        <View style={{ paddingTop: space[6] }}>
          <Text style={s.kicker}>What you have sent</Text>
          {state.sentReports.length === 0 ? (
            <Text style={s.empty}>You have not sent a report yet.</Text>
          ) : (
            state.sentReports.map((r) => (
              <View key={r.id} style={s.sentRow}>
                <Text style={s.sentDate}>{r.date}</Text>
                <Text style={s.sentSummary}>{r.summary}</Text>
              </View>
            ))
          )}
        </View>

        <View style={{ paddingTop: space[6], paddingBottom: space[4] }}>
          <Text style={s.kicker}>If this phone is taken</Text>
          <Text style={s.body}>
            A sent report cannot be recalled. Send counts and leave the journal unticked where believing carries a cost — a number
            tells your coach how the work is going and names no one.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  link: { fontFamily: fonts.heading, fontSize: 14, color: colors.accent },
  error: { fontSize: 13, color: colors.neutral600, paddingTop: space[1] },
  checkRow: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  checkLabel: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 15, color: colors.text },
  checkValue: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: 2 },
  mutedSmall: { fontSize: 13, lineHeight: 20, color: 'rgba(32,30,29,0.55)', paddingTop: space[1] },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  previewBox: { backgroundColor: colors.surface, borderRadius: 2, borderWidth: 1, borderColor: colors.divider, padding: space[3], marginTop: space[2] },
  previewText: { fontFamily: 'monospace', fontSize: 12, lineHeight: 18, color: colors.text },
  empty: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
  sentRow: { paddingVertical: space[2], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  sentDate: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 14, color: colors.text },
  sentSummary: { fontSize: 12, lineHeight: 18, color: 'rgba(32,30,29,0.55)', marginTop: 2 },
});
