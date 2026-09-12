import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '../theme/tokens';
import { doneCount, useAppDispatch, useAppState } from '../state/store';
import { Btn } from './ui';
import { goToJournalTab } from '../navigation/navigationRef';

export function CelebrateModal() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const celebrate = state.celebrate;

  return (
    <Modal visible={!!celebrate} transparent animationType="fade" onRequestClose={() => dispatch({ type: 'closeCelebrate' })}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <View style={s.rule} />
          <Text style={s.kicker}>Step {doneCount(state)} walked</Text>
          <Text style={s.title}>{celebrate?.title}</Text>
          <Text style={s.body}>{celebrate?.body}</Text>
          <Text style={s.verse}>{celebrate?.verse}</Text>
          <Text style={s.ref}>{celebrate?.ref}</Text>
          <View style={{ gap: space[2] }}>
            <Btn
              label="Write what happened"
              block
              onPress={() => {
                dispatch({ type: 'closeCelebrate' });
                goToJournalTab();
              }}
            />
            <Btn label="Stay here a moment" variant="ghost" block onPress={() => dispatch({ type: 'closeCelebrate' })} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(45,43,43,0.55)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.bg, padding: space[4], paddingBottom: space[8], paddingTop: space[6] },
  rule: { height: 3, backgroundColor: colors.text, marginBottom: space[3] },
  kicker: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700, marginBottom: space[2] },
  title: { fontFamily: fonts.heading, fontSize: 27, color: colors.text, marginBottom: space[3] },
  body: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: space[3] },
  verse: { fontFamily: fonts.heading, fontSize: 19, fontStyle: 'italic', lineHeight: 27, color: colors.text, marginBottom: 4 },
  ref: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent2700, marginBottom: space[6] },
});
