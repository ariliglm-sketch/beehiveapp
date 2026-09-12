import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FieldsStackParamList } from '../navigation/types';
import { PlainHeader } from '../components/Header';
import { Tag } from '../components/ui';
import { Icon } from '../components/Icon';
import { colors, fonts, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { activePartNum, partDone, useAppState } from '../state/store';

type Props = NativeStackScreenProps<FieldsStackParamList, 'FieldsList'>;

export function FieldsListScreen({ navigation }: Props) {
  const state = useAppState();
  const active = activePartNum(state);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Four fields, five parts" subtitle="The whole work on one page" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>
          Jesus described the whole work as a field in four stages, and a farmer who sleeps while the seed grows. Work the field you are actually in. Keep sowing while you water.
        </Text>
        <Text style={s.ref}>Mark 4:1-20, 26-29 · Acts 14:21-23</Text>

        {PARTS.map((p) => {
          const done = partDone(state, p);
          const isNow = p.n === active;
          const stepsDoneCount = p.steps.filter((x) => state.done[x.id]).length;
          return (
            <Pressable key={p.n} onPress={() => navigation.navigate('Phase', { partNum: p.n })} style={s.row}>
              <Text style={[s.num, { color: done || isNow ? colors.text : colors.neutral500 }]}>{p.n}</Text>
              <View style={{ flex: 1 }}>
                <View style={s.titleRow}>
                  <Text style={s.title}>{p.title}</Text>
                  {isNow ? <Tag label="You are here" tone="accent" /> : null}
                  {done ? <Icon name="CheckCircle" size={20} color={colors.accent700} /> : null}
                </View>
                <Text style={s.field}>{p.field}</Text>
                <Text style={s.blurb}>{p.blurb}</Text>
                <Text style={s.count}>{stepsDoneCount + ' of ' + p.steps.length + ' steps'}</Text>
              </View>
            </Pressable>
          );
        })}

        <Text style={[s.intro, { paddingTop: space[4] }]}>
          You will work several fields at once, and that is right. But there is always one field where the work is stuck. Ask the Lord which one, and give this week to it.
        </Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[4] },
  ref: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700, marginBottom: space[4] },
  row: { flexDirection: 'row', gap: space[4], alignItems: 'flex-start', paddingVertical: space[3] },
  num: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 34, width: 34, lineHeight: 33 },
  titleRow: { flexDirection: 'row', alignItems: 'baseline', gap: space[2], justifyContent: 'space-between' },
  title: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 20, color: colors.text },
  field: { fontSize: 13, marginTop: 2, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent700 },
  blurb: { fontSize: 14, lineHeight: 21, marginTop: 5, marginBottom: 6, color: colors.text },
  count: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.text },
});
