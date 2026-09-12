import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Btn } from '../../components/ui';
import { colors, fonts, space } from '../../theme/tokens';
import { CIRCLE_STEPS } from '../../data/content';

export function CirclesTool() {
  const [step, setStep] = useState(0);
  const cs = CIRCLE_STEPS[step];
  const circleColor = (n: number) => (cs.circle === n ? colors.accent : colors.neutral400);

  return (
    <View style={{ paddingTop: space[2] }}>
      <View style={s.diagramWrap}>
        <View style={{ flexDirection: 'row', gap: space[6] }}>
          <Circle color={circleColor(1)} label="God’s design" />
          <Circle color={circleColor(2)} label="Brokenness" />
        </View>
        <Text style={s.arrows}>sin →   ← our own repair</Text>
        <Circle color={circleColor(3)} label="Jesus" />
      </View>
      <Text style={s.h6}>{'Step ' + (step + 1) + ' of 5 · ' + cs.label}</Text>
      <Text style={s.say}>{cs.say}</Text>
      <Text style={s.note}>{cs.note}</Text>
      <View style={{ flexDirection: 'row', gap: space[2] }}>
        <Btn
          label="Back"
          variant="secondary"
          style={{ flex: 1 }}
          onPress={() => setStep((s2) => (s2 + CIRCLE_STEPS.length - 1) % CIRCLE_STEPS.length)}
        />
        <Btn
          label={step === CIRCLE_STEPS.length - 1 ? 'Start again' : 'Next'}
          style={{ flex: 1 }}
          onPress={() => setStep((s2) => (s2 + 1) % CIRCLE_STEPS.length)}
        />
      </View>
      <Text style={[s.note, { paddingTop: space[4] }]}>
        Draw it on paper as you talk, then hand them the pen and ask them to draw it back to you. That is how it multiplies.
      </Text>
    </View>
  );
}

function Circle({ color, label }: { color: string; label: string }) {
  return (
    <View style={[s.circle, { borderColor: color }]}>
      <Text style={[s.circleLabel, { color }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  diagramWrap: { alignItems: 'center', gap: space[2], paddingVertical: space[4] },
  circle: { width: 104, height: 104, borderRadius: 52, borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 10 },
  circleLabel: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 14, textAlign: 'center', lineHeight: 17 },
  arrows: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(32,30,29,0.55)' },
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.accent700, marginBottom: space[1] },
  say: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 28, color: colors.text, marginBottom: space[2] },
  note: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)', marginBottom: space[4] },
});
