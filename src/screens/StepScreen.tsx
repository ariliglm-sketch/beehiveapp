import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FieldsStackParamList } from '../navigation/types';
import { BareHeader } from '../components/Header';
import { Icon } from '../components/Icon';
import { Btn } from '../components/ui';
import { colors, fonts, space } from '../theme/tokens';
import { ALL_STEPS } from '../data/content';
import { verseTextForId } from '../data/verses';
import { useAppDispatch, useAppState } from '../state/store';
import { goToJournalTab } from '../navigation/navigationRef';

type Props = NativeStackScreenProps<FieldsStackParamList, 'Step'>;

export function StepScreen({ route, navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const cur = ALL_STEPS.find((x) => x.id === route.params.stepId) ?? ALL_STEPS[0];
  const checks = state.checks[cur.id] || {};
  const done = !!state.done[cur.id];
  const verse = verseTextForId(cur.id, state.packId);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <BareHeader backLabel={cur.partTitle} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.kicker}>{'Field ' + cur.part + ' · ' + cur.partTitle + ' · ' + cur.partField}</Text>
        <Text style={s.title}>{cur.title}</Text>

        <Text style={s.verse}>{verse.text}</Text>
        <View style={{ marginBottom: space[6] }}>
          <Text style={s.ref}>{verse.verse.ref + ' · ' + verse.source.shortName}</Text>
          {verse.usedFallback && (
            <Text style={s.mutedSmall}>
              {verse.pack.name + ' is not loaded on this phone yet, so this verse is shown in ' + verse.source.shortName + '.'}
            </Text>
          )}
        </View>

        <Text style={s.h6}>Why this step</Text>
        <Text style={[s.body, { marginBottom: space[6] }]}>{cur.why}</Text>

        <Text style={s.h6}>Do this, in order</Text>
        {cur.actions.map((text, i) => {
          const on = !!checks[i];
          return (
            <Pressable key={i} onPress={() => dispatch({ type: 'toggleStepAction', stepId: cur.id, index: i })} style={s.actionRow}>
              <View style={{ width: 20, paddingTop: 2 }}>
                <Icon name={on ? 'CheckSquare' : 'Square'} size={19} color={on ? colors.accent700 : colors.neutral500} />
              </View>
              <Text style={[s.actionText, { color: on ? colors.neutral700 : colors.text }]}>{text}</Text>
            </Pressable>
          );
        })}

        {cur.toolLabel && cur.tool ? (
          <Btn
            label={cur.toolLabel}
            variant="secondary"
            icon="ArrowRight"
            block
            style={{ marginTop: space[3], justifyContent: 'space-between' }}
            onPress={() => navigation.navigate('Tool', { toolId: cur.tool as string, fromStepTitle: cur.title })}
          />
        ) : null}

        <View style={{ paddingTop: space[6] }}>
          <Text style={[s.h6, { color: colors.accent2700 }]}>Take heart</Text>
          <Text style={s.body}>{cur.heart}</Text>
        </View>

        <View style={{ paddingTop: space[6] }}>
          <Text style={s.h6}>Pray before you go</Text>
          <Text style={s.prayer}>{cur.prayer}</Text>
        </View>

        <View style={{ paddingTop: space[6] }}>
          <Text style={s.h6}>If it goes hard</Text>
          <Text style={s.body}>{cur.hard}</Text>
        </View>

        <View style={{ paddingTop: space[6], gap: space[2] }}>
          <Btn
            label={done ? 'Walked. Read it again anytime.' : 'I have walked this step'}
            block
            onPress={() => dispatch({ type: 'completeStep', stepId: cur.id })}
          />
          <Btn label="Write what happened" variant="secondary" block onPress={() => goToJournalTab()} />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent700, marginBottom: space[1] },
  title: { fontFamily: fonts.heading, fontSize: 28, color: colors.text, marginBottom: space[3] },
  verse: { fontFamily: fonts.heading, fontSize: 20, fontStyle: 'italic', lineHeight: 29, color: colors.text, marginBottom: 5 },
  ref: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700 },
  mutedSmall: { fontSize: 13, lineHeight: 20, color: 'rgba(32,30,29,0.55)', marginTop: space[2] },
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  body: { fontSize: 16, lineHeight: 26, color: colors.text },
  actionRow: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  actionText: { flex: 1, fontSize: 15, lineHeight: 24 },
  prayer: { fontFamily: fonts.heading, fontSize: 18, fontStyle: 'italic', lineHeight: 27, color: colors.text },
});
