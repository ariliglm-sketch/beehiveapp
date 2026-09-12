import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field, Btn } from '../../components/ui';
import { colors, fonts, space } from '../../theme/tokens';
import { useAppDispatch, useAppState } from '../../state/store';

export function StoryTool() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { before, how, since, practiced } = state.story;
  const full = [before, how, since].filter(Boolean).join(' ') + ' May I tell you what God has done for me?';

  return (
    <View style={{ paddingTop: space[4], gap: space[3] }}>
      <Field label="Before I met Christ — five seconds" value={before} onChangeText={(v) => dispatch({ type: 'setStory', field: 'before', value: v })} placeholder="I was angry at my father and drinking to forget it." />
      <Field label="How I met Christ — five seconds" value={how} onChangeText={(v) => dispatch({ type: 'setStory', field: 'how', value: v })} placeholder="A neighbor read me Luke and I gave my life to Jesus." />
      <Field label="Since then — five seconds" value={since} onChangeText={(v) => dispatch({ type: 'setStory', field: 'since', value: v })} placeholder="I am not free of trouble, but I am not alone in it." />
      <View style={{ paddingTop: space[2] }}>
        <Text style={s.h6}>Say it out loud</Text>
        <Text style={s.full}>{full}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
        <Btn label="I practiced it out loud" onPress={() => dispatch({ type: 'practiceStory' })} />
        <Text style={s.muted}>{practiced + ' times out loud'}</Text>
      </View>
      <Text style={s.muted}>Keep it under fifteen seconds and end with a question: may I tell you what God has done for me?</Text>
    </View>
  );
}

const s = StyleSheet.create({
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  full: { fontFamily: fonts.heading, fontSize: 19, fontStyle: 'italic', lineHeight: 28, color: colors.text },
  muted: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)' },
});
