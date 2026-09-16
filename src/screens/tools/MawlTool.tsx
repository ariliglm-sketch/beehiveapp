import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { colors, fonts, space } from '../../theme/tokens';

const STAGES = [
  { icon: 'CheckCircle', label: 'Model', note: 'You do it, they watch' },
  { icon: 'UsersThree', label: 'Assist', note: 'You do it together' },
  { icon: 'Circle', label: 'Watch', note: 'They do it, you say nothing' },
  { icon: 'ArrowRight', label: 'Leave', note: 'They do it without you' },
];

// Four stages, drawn as a fading hand-off — a filled mark shrinking to an
// outline as the leader steps back, rather than a copy of any published
// four-step graphic.
export function MawlTool() {
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        {STAGES.map((st, i) => (
          <React.Fragment key={st.label}>
            <View style={s.stageCol}>
              <View style={[s.markWrap, { opacity: 1 - i * 0.2 }]}>
                <Icon name={st.icon} size={26} color={colors.accent700} />
              </View>
              <Text style={s.label}>{st.label}</Text>
              <Text style={s.note}>{st.note}</Text>
            </View>
            {i < STAGES.length - 1 && <Icon name="ArrowRight" size={16} color={colors.neutral500} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingVertical: space[4], alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  stageCol: { width: 66, alignItems: 'center' },
  markWrap: { height: 32, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 13, color: colors.text, marginTop: 4 },
  note: { fontSize: 10, lineHeight: 13, color: 'rgba(32,30,29,0.55)', textAlign: 'center', marginTop: 2 },
});
