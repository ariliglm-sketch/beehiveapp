import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FieldsStackParamList } from '../navigation/types';
import { PlainHeader } from '../components/Header';
import { Icon } from '../components/Icon';
import { colors, fonts, space } from '../theme/tokens';
import { PARTS } from '../data/content';
import { useAppState } from '../state/store';

type Props = NativeStackScreenProps<FieldsStackParamList, 'Phase'>;

export function PhaseScreen({ route, navigation }: Props) {
  const state = useAppState();
  const part = PARTS.find((p) => p.n === route.params.partNum) ?? PARTS[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader
        title={part.title}
        subtitle={part.steps.length + ' steps · ' + part.field}
        backLabel="Five parts"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.field}>{part.field}</Text>
        <Text style={s.intro}>{part.intro}</Text>
        {part.steps.map((st) => {
          const done = !!state.done[st.id];
          return (
            <Pressable key={st.id} onPress={() => navigation.navigate('Step', { stepId: st.id })} style={s.row}>
              <View style={{ width: 22, paddingTop: 3 }}>
                <Icon name={done ? 'CheckCircle' : 'Circle'} size={20} color={done ? colors.accent700 : colors.neutral500} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.title}>{st.title}</Text>
                <Text style={s.teaser}>{st.teaser}</Text>
              </View>
              <Icon name="ArrowRight" size={17} color={colors.accent700} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  field: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent700, marginBottom: space[2] },
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[6] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[3] },
  title: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 18, color: colors.text },
  teaser: { fontSize: 13, lineHeight: 19, marginTop: 3, color: 'rgba(32,30,29,0.55)' },
});
