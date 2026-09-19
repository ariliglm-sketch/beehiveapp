import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { colors, fonts, space } from '../../theme/tokens';

const STEPS: { icon: string; label: string }[] = [
  { icon: 'UsersThree', label: 'Go two by two' },
  { icon: 'HandsPraying', label: 'Bless the household' },
  { icon: 'Door', label: 'Eat what they give you' },
  { icon: 'HandsPraying', label: 'Meet a need and pray' },
  { icon: 'ChatCircleText', label: 'Tell them the kingdom is near' },
  { icon: 'DoorOpen', label: 'Stay where you are received' },
];

// A drawn-from-scratch walkthrough of the six-step pattern — a vertical line
// of numbered stops, the way a planter would sketch it on paper while
// teaching it, not a copy of anyone else's diagram.
export function Luke10Tool() {
  return (
    <View style={s.wrap}>
      {STEPS.map((step, i) => (
        <View key={step.label} style={s.row}>
          <View style={s.railCol}>
            <View style={s.dot}>
              <Icon name={step.icon} size={16} color={colors.bg} />
            </View>
            {i < STEPS.length - 1 && <View style={s.rail} />}
          </View>
          <View style={s.textCol}>
            <Text style={s.n}>{'STEP ' + (i + 1)}</Text>
            <Text style={s.label}>{step.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4] },
  row: { flexDirection: 'row' },
  railCol: { alignItems: 'center', width: 36 },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rail: { width: 2, flex: 1, minHeight: 20, backgroundColor: colors.divider },
  textCol: { flex: 1, paddingLeft: space[3], paddingBottom: space[3] },
  n: { fontSize: 11, letterSpacing: 1, color: colors.accent2700, marginBottom: 2 },
  label: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
});
