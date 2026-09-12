import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, space } from '../theme/tokens';
import { Icon } from './Icon';

const DATELINE = 'Saturday, 12 September';
const DAYLINE = 'Day 48';
const PLACE_LINE = 'Nyakach, Kisumu West · sent by Grace Chapel, 28 August';

function BackRow({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <Pressable onPress={onBack} style={s.backRow} hitSlop={8}>
      <Icon name="ArrowLeft" size={18} color={colors.accent} />
      <Text style={s.backLabel}>{label}</Text>
    </Pressable>
  );
}

export function MastheadHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.wrap, { paddingTop: insets.top + 12 }]}>
      <View style={s.rule3} />
      <View style={s.datelineRow}>
        <Text style={s.datelineText}>{DATELINE}</Text>
        <Text style={[s.datelineText, { color: colors.accent700 }]}>{DAYLINE}</Text>
      </View>
      <View style={s.rule1} />
      <Text style={s.brand}>Bee Hive</Text>
      <Text style={s.brandSub}>Church Planting App</Text>
      <Text style={s.placeLine}>{PLACE_LINE}</Text>
    </View>
  );
}

export function PlainHeader({
  title,
  subtitle,
  backLabel,
  onBack,
}: {
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.wrap, { paddingTop: insets.top + 12 }]}>
      {backLabel && onBack ? <BackRow label={backLabel} onBack={onBack} /> : null}
      <Text style={s.plainTitle}>{title}</Text>
      {subtitle ? <Text style={s.plainSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function BareHeader({ backLabel, onBack }: { backLabel: string; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.wrap, { paddingTop: insets.top + 12 }]}>
      <BackRow label={backLabel} onBack={onBack} />
      <View style={{ height: space[3] }} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingHorizontal: space[4] },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: space[1], alignSelf: 'flex-start' },
  backLabel: { fontFamily: fonts.heading, fontSize: 14, color: colors.accent },
  rule3: { height: 3, backgroundColor: colors.text },
  datelineRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  datelineText: { fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' },
  rule1: { height: 1, backgroundColor: colors.text },
  brand: { fontFamily: fonts.heading, fontSize: 40, letterSpacing: -0.5, marginTop: space[3], marginBottom: 2, color: colors.text },
  brandSub: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: colors.accent700, marginBottom: 6 },
  placeLine: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[3] },
  plainTitle: { fontFamily: fonts.heading, fontSize: 30, color: colors.text, marginTop: space[1], marginBottom: 2 },
  plainSubtitle: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[3] },
});
