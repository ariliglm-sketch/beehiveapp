import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ToolsStackParamList } from '../navigation/types';
import { BareHeader } from '../components/Header';
import { colors, fonts, space } from '../theme/tokens';
import { TOOLS } from '../data/content';
import { OikosTool } from './tools/OikosTool';
import { StoryTool } from './tools/StoryTool';
import { CirclesTool } from './tools/CirclesTool';
import { ChurchTool } from './tools/ChurchTool';
import { MapTool } from './tools/MapTool';

type Props = NativeStackScreenProps<ToolsStackParamList, 'Tool'>;

export function ToolScreen({ route, navigation }: Props) {
  const tool = TOOLS.find((t) => t.id === route.params.toolId) ?? TOOLS[0];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <BareHeader backLabel={route.params.fromStepTitle ?? 'Tools'} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: space[4], paddingBottom: space[8] }}>
        <Text style={s.kicker}>{tool.fieldLabel}</Text>
        <Text style={s.title}>{tool.name}</Text>
        <Text style={s.intro}>{tool.intro}</Text>
        <Text style={s.ref}>{tool.verseRef}</Text>

        {tool.items ? (
          <View>
            {tool.items.map((it, i) => (
              <View key={i} style={s.itemRow}>
                <Text style={s.itemN}>{i + 1}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.itemTitle}>{it.title}</Text>
                  <Text style={s.itemBody}>{it.body}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {tool.id === 'oikos' ? <OikosTool /> : null}
        {tool.id === 'story' ? <StoryTool /> : null}
        {tool.id === 'circles' ? <CirclesTool /> : null}
        {tool.id === 'church' ? <ChurchTool /> : null}
        {tool.id === 'map' ? <MapTool /> : null}

        {tool.heart ? (
          <View style={{ paddingTop: space[6] }}>
            <Text style={[s.kicker, { color: colors.accent2700 }]}>Take heart</Text>
            <Text style={s.body}>{tool.heart}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent700, marginBottom: space[1] },
  title: { fontFamily: fonts.heading, fontSize: 28, color: colors.text, marginBottom: space[3] },
  intro: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[2] },
  ref: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700, marginBottom: space[6] },
  itemRow: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[2] },
  itemN: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 15, width: 24, color: colors.accent700, paddingTop: 1 },
  itemTitle: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  itemBody: { fontSize: 14, lineHeight: 22, marginTop: 3, color: colors.text },
  body: { fontSize: 16, lineHeight: 26, color: colors.text },
});
