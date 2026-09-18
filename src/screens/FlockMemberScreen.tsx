import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShareStackParamList } from '../navigation/types';
import { BareHeader } from '../components/Header';
import { colors, fonts, space } from '../theme/tokens';
import { daysSince, useAppState } from '../state/store';

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
  const entry = state.flock.find((f) => f.id === route.params.id);

  if (!entry) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <BareHeader backLabel="Flock" onBack={() => navigation.goBack()} />
        <Text style={[s.body, { paddingHorizontal: space[4] }]}>This person is no longer in your flock.</Text>
      </View>
    );
  }

  const report = entry.lastReport;

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
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  mutedSmall: { fontSize: 13, lineHeight: 20, color: 'rgba(32,30,29,0.55)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: space[3], paddingVertical: space[2], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  rowLabel: { fontSize: 13, color: 'rgba(32,30,29,0.55)' },
  rowValue: { fontSize: 14, color: colors.text, flex: 1, textAlign: 'right' },
  quoteCard: { backgroundColor: colors.surface, borderRadius: 2, padding: space[3], marginBottom: space[2] },
  quoteDate: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent, marginBottom: 4 },
  quoteBody: { fontSize: 14, lineHeight: 21, color: colors.text, fontStyle: 'italic' },
});
