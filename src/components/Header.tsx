import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, space } from '../theme/tokens';
import { Icon } from './Icon';
import { Btn, Field } from './ui';
import { composePlaceLine, dayCount, useAppDispatch, useAppState, weekdayDateLine } from '../state/store';

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
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [draftPlace, setDraftPlace] = useState('');
  const [draftChurch, setDraftChurch] = useState('');
  const [draftDate, setDraftDate] = useState('');

  const openEditor = () => {
    setDraftPlace(state.fieldPlace);
    setDraftChurch(state.sendingChurch);
    setDraftDate(state.sentDate);
    setEditing(true);
  };

  const save = () => {
    dispatch({
      type: 'setFieldInfo',
      fieldPlace: draftPlace.trim(),
      sendingChurch: draftChurch.trim(),
      sentDate: draftDate.trim(),
    });
    setEditing(false);
  };

  const placeLine = composePlaceLine(state.fieldPlace, state.sendingChurch, state.sentDate);

  return (
    <View style={[s.wrap, { paddingTop: insets.top + 12 }]}>
      <View style={s.rule3} />
      <View style={s.datelineRow}>
        <Text style={s.datelineText}>{weekdayDateLine(new Date())}</Text>
        <Text style={[s.datelineText, { color: colors.accent700 }]}>{'Day ' + dayCount(state)}</Text>
      </View>
      <View style={s.rule1} />
      <Text style={s.brand}>Bee Hive</Text>
      <Text style={s.brandSub}>Church Planting App</Text>
      <Pressable onPress={openEditor} hitSlop={4}>
        <Text style={[s.placeLine, !placeLine && s.placeLinePrompt]}>
          {placeLine || 'Tap to add where you are working and who sent you'}
        </Text>
      </Pressable>

      <Modal visible={editing} transparent animationType="fade" onRequestClose={() => setEditing(false)}>
        <View style={s.backdrop}>
          <View style={s.sheet}>
            <View style={s.rule} />
            <Text style={s.modalTitle}>Where you are working</Text>
            <Text style={s.modalSubtitle}>This shows on your Today screen. Leave any of these blank if you would rather not say.</Text>
            <View style={{ gap: space[3] }}>
              <Field label="Field or place" value={draftPlace} onChangeText={setDraftPlace} placeholder="e.g. Nyakach, Kisumu West" />
              <Field label="Sent by (your sending church)" value={draftChurch} onChangeText={setDraftChurch} placeholder="e.g. Grace Chapel" />
              <Field label="Date sent" value={draftDate} onChangeText={setDraftDate} placeholder="e.g. 28 August" />
            </View>
            <View style={{ gap: space[2], marginTop: space[4] }}>
              <Btn label="Save" onPress={save} block />
              <Btn label="Cancel" variant="secondary" block onPress={() => setEditing(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
  placeLine: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[3], textDecorationLine: 'underline', textDecorationColor: 'rgba(32,30,29,0.25)' },
  placeLinePrompt: { color: colors.accent700 },
  plainTitle: { fontFamily: fonts.heading, fontSize: 30, color: colors.text, marginTop: space[1], marginBottom: 2 },
  plainSubtitle: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginBottom: space[3] },
  backdrop: { flex: 1, backgroundColor: 'rgba(45,43,43,0.55)', justifyContent: 'flex-end', alignItems: 'stretch' },
  sheet: { backgroundColor: colors.bg, padding: space[4], paddingBottom: space[6], paddingTop: space[4], maxWidth: 480, width: '100%', alignSelf: 'center' },
  rule: { height: 3, backgroundColor: colors.text, marginBottom: space[3] },
  modalTitle: { fontFamily: fonts.heading, fontSize: 22, color: colors.text, marginBottom: space[2] },
  modalSubtitle: { fontSize: 14, lineHeight: 21, color: 'rgba(32,30,29,0.55)', marginBottom: space[4] },
});
