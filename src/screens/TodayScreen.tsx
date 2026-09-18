import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { TodayStackParamList } from '../navigation/types';
import { MastheadHeader } from '../components/Header';
import { Btn } from '../components/ui';
import { CmykNumeral } from '../components/CmykNumeral';
import { colors, fonts, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { PACKS, verseForDate } from '../data/verses';
import { GOAL_TARGETS, activePartNum, doneCount, goalTotals, markedCount, nextStep, useAppDispatch, useAppState, type OikosMark } from '../state/store';

type Props = NativeStackScreenProps<TodayStackParamList, 'Today'>;

const GOAL_META = [
  { key: 'convos' as const, mark: 'convo' as OikosMark, label: 'Gospel conversations', note: 'Your story and God’s story, out loud' },
  { key: 'studies' as const, mark: 'study' as OikosMark, label: 'New studies started', note: 'In a home, with the household present' },
  { key: 'trained' as const, mark: 'trained' as OikosMark, label: 'People trained to go', note: 'The 411, then sent with a name and a date' },
];

export function TodayScreen({ navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const next = nextStep(state);
  const active = activePartNum(state);
  const activePart = PARTS.find((p) => p.n === active)!;
  const activeStepsDone = activePart.steps.filter((x) => state.done[x.id]).length;
  const stepsDone = doneCount(state);
  const totals = goalTotals(state);
  const daily = verseForDate(new Date(), state.packId);

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: space[8] }}>
      <MastheadHeader />
      <View style={{ paddingHorizontal: space[4] }}>
        <Section>
          <Kicker tone="accent">Your next step</Kicker>
          <Text style={s.h2}>{next.title}</Text>
          <Text style={s.muted}>{'Field ' + next.part + ' · ' + next.partTitle + ' · ' + next.partField}</Text>
          <Text style={s.body}>{next.teaser}</Text>
          <Btn
            label="Walk me through it"
            icon="ArrowRight"
            onPress={() => navigation.navigate('Step', { stepId: next.id })}
            style={{ marginTop: space[1], alignSelf: 'flex-start' }}
          />
        </Section>

        {state.coachNote && (
          <Section>
            <Kicker tone="accent">From your coach</Kicker>
            {state.coachNote.verseText && (
              <>
                <Text style={s.verse}>{state.coachNote.verseText}</Text>
                <Text style={s.verseRef}>
                  {(state.coachNote.verseRef ?? '') + (state.coachNote.verseSource ? ' · ' + state.coachNote.verseSource : '')}
                </Text>
              </>
            )}
            {state.coachNote.words && <Text style={[s.body, { marginTop: space[3] }]}>{state.coachNote.words}</Text>}
            {state.coachNote.stepTitle && (
              <Btn
                label={'Open: ' + state.coachNote.stepTitle}
                variant="secondary"
                onPress={() => {
                  const id = state.coachNote?.stepId;
                  if (id) navigation.navigate('Step', { stepId: id });
                }}
                style={{ marginTop: space[3], alignSelf: 'flex-start' }}
              />
            )}
            {state.coachNote.checkIn && <Text style={[s.muted, { marginTop: space[3] }]}>{'You will talk: ' + state.coachNote.checkIn}</Text>}
            <Btn
              label="Got it"
              variant="ghost"
              onPress={() => dispatch({ type: 'dismissCoachNote' })}
              style={{ marginTop: space[2], alignSelf: 'flex-start' }}
            />
          </Section>
        )}

        <Section>
          <Kicker>This week in the field</Kicker>
          {GOAL_META.map((g) => {
            const named = markedCount(state, g.mark);
            const unnamed = state.goals[g.key];
            return (
              <View key={g.key} style={s.goalRow}>
                <Text style={s.goalCount}>{totals[g.key] + '/' + GOAL_TARGETS[g.key]}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.goalLabel}>{g.label}</Text>
                  <Text style={s.goalNote}>{named + ' from your map · ' + unnamed + ' not on your map'}</Text>
                </View>
                <Btn label="−1" variant="secondary" onPress={() => dispatch({ type: 'removeGoal', key: g.key })} />
                <Btn label="+1" variant="secondary" onPress={() => dispatch({ type: 'addGoal', key: g.key })} />
              </View>
            );
          })}
          <Text style={[s.muted, { marginTop: space[2] }]}>
            People you mark on your oikos map are counted for you. Use +1 only for someone not on your map — a stranger on the road, a visitor passing through — so no one is counted twice.
          </Text>
        </Section>

        <Section>
          <Kicker>A word for today</Kicker>
          <Text style={s.verse}>{daily.text}</Text>
          <Text style={s.verseRef}>{daily.verse.ref + ' · ' + daily.source.shortName}</Text>
          {daily.verse.reflection && <Text style={[s.body, { marginTop: space[3] }]}>{daily.verse.reflection}</Text>}

          <View style={s.packRow}>
            {PACKS.map((p) => {
              const on = state.packId === p.id;
              return (
                <Pressable
                  key={p.id}
                  onPress={() => dispatch({ type: 'setPack', packId: p.id })}
                  accessibilityLabel={'Read in ' + p.name}
                  style={[s.chip, on && s.chipOn]}
                  hitSlop={4}
                >
                  <Text style={[s.chipText, on && s.chipTextOn]}>{p.shortName}</Text>
                </Pressable>
              );
            })}
          </View>
          {daily.usedFallback && (
            <Text style={s.mutedSmall}>{daily.pack.name + ' is not loaded on this phone yet, so today’s verse is shown in ' + daily.source.shortName + '.'}</Text>
          )}
          <Text style={s.attribution}>{daily.source.attribution}</Text>
        </Section>

        <Section>
          <Kicker>Which field you are working</Kicker>
          <View style={{ flexDirection: 'row', gap: space[4], alignItems: 'flex-start' }}>
            <CmykNumeral value={String(active)} />
            <View style={{ flex: 1, paddingTop: 4 }}>
              <Text style={s.fieldTitle}>{activePart.title + ' · ' + activePart.field}</Text>
              <Text style={[s.muted, { marginVertical: 4 }]}>{activeStepsDone + ' of ' + activePart.steps.length + ' steps walked'}</Text>
              <Btn label="See all five parts" variant="secondary" onPress={() => navigation.navigate('Fields' as never)} />
            </View>
          </View>
          <Text style={[s.body, { marginTop: space[4] }]}>{activePart.intro}</Text>
        </Section>

        <Section last>
          <Kicker>Faithfulness, not results</Kicker>
          <View style={{ flexDirection: 'row', gap: space[6] }}>
            <Stat value={String(state.prayedDays)} label={'days of prayer\nrecorded'} />
            <Stat value={String(stepsDone)} label={'steps walked\nsince you began'} />
            <Stat value={String(state.oikos.length)} label={'names on\nyour map'} />
          </View>
          <Text style={[s.mutedSmall, { paddingTop: space[6] }]}>
            The five parts, the Four Fields, the 411, Three Circles and the church circle in this app follow the training of the NoPlaceLeft coalition (noplaceleft.net). Nothing here replaces being trained by a person.
          </Text>
        </Section>
      </View>
    </ScrollView>
  );
}

function Section({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <View style={{ paddingTop: space[8], paddingBottom: last ? space[4] : 0 }}>{children}</View>;
}

function Kicker({ children, tone }: { children: React.ReactNode; tone?: 'accent' }) {
  return <Text style={[s.kicker, tone === 'accent' && { color: colors.accent700 }]}>{children}</Text>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  h2: { fontFamily: fonts.heading, fontSize: 26, color: colors.text, marginBottom: 6 },
  muted: { fontSize: 14, color: 'rgba(32,30,29,0.55)', marginBottom: space[2] },
  mutedSmall: { fontSize: 13, lineHeight: 20, color: 'rgba(32,30,29,0.55)', paddingTop: space[2] },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: space[2], paddingVertical: space[2] },
  goalCount: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 26, width: 62, color: colors.text },
  goalLabel: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  goalNote: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: 1 },
  verse: { fontFamily: fonts.heading, fontSize: 23, lineHeight: 31, fontStyle: 'italic', color: colors.text, marginBottom: 6 },
  verseRef: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700 },
  packRow: { flexDirection: 'row', gap: space[2], paddingTop: space[4], flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: 'rgba(32,30,29,0.20)', borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5 },
  chipOn: { borderColor: colors.accent700, backgroundColor: 'rgba(32,30,29,0.05)' },
  chipText: { fontSize: 12, color: 'rgba(32,30,29,0.55)' },
  chipTextOn: { color: colors.accent700 },
  attribution: { fontSize: 11, lineHeight: 17, color: 'rgba(32,30,29,0.40)', paddingTop: space[3] },
  fieldTitle: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 19, color: colors.text },
  statValue: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 32, color: colors.text, lineHeight: 34 },
  statLabel: { fontSize: 12, color: 'rgba(32,30,29,0.55)', marginTop: 2 },
});
