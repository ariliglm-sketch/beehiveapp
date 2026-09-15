import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ToolsStackParamList } from '../navigation/types';
import { PlainHeader } from '../components/Header';
import { Icon } from '../components/Icon';
import { colors, fonts, space } from '../theme/tokens';
import { ALL_TOOLS } from '../data/toolbox';

type Props = NativeStackScreenProps<ToolsStackParamList, 'ToolsList'>;

export function ToolsListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PlainHeader title="Simple tools" subtitle="Learn them until you can draw them from memory" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.intro}>
          Simple tools you can draw on one sheet of paper and hand to anyone. Learn them until you can teach them from memory — a tool you cannot reproduce cannot multiply.
        </Text>
        {ALL_TOOLS.map((t) => (
          <Pressable key={t.id} onPress={() => navigation.navigate('Tool', { toolId: t.id })} style={s.row}>
            <Icon name={t.icon} size={24} color={colors.accent700} />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{t.name}</Text>
              <Text style={s.blurb}>{t.blurb}</Text>
              <Text style={s.fieldLabel}>{t.fieldLabel}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[6] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[3] },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 18, color: colors.text },
  blurb: { fontSize: 13, lineHeight: 19, marginTop: 3, color: 'rgba(32,30,29,0.55)' },
  fieldLabel: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginTop: 5, color: colors.text },
});
