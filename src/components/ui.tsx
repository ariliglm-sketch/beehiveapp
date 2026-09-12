import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, space } from '../theme/tokens';
import { Icon } from './Icon';

export function Btn({
  label,
  onPress,
  variant = 'primary',
  block = false,
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  block?: boolean;
  icon?: 'ArrowRight' | 'ArrowLeft';
  style?: ViewStyle;
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.btn,
        isPrimary && { backgroundColor: pressed ? colors.accent700 : colors.accent },
        isSecondary && { borderWidth: 1, borderColor: colors.divider, backgroundColor: pressed ? 'rgba(32,30,29,0.07)' : 'transparent' },
        isGhost && { paddingHorizontal: space[1], backgroundColor: pressed ? 'rgba(0,136,176,0.1)' : 'transparent' },
        block && { width: '100%' },
        style,
      ]}
    >
      {icon === 'ArrowLeft' && <Icon name="ArrowLeft" size={18} color={isPrimary ? colors.bg : colors.text} />}
      <Text
        style={[
          s.btnLabel,
          isPrimary && { color: colors.bg },
          isGhost && { color: colors.accent },
        ]}
      >
        {label}
      </Text>
      {icon === 'ArrowRight' && <Icon name="ArrowRight" size={17} color={isPrimary ? colors.bg : colors.text} />}
    </Pressable>
  );
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(32,30,29,0.55)"
        multiline={multiline}
        style={[s.input, multiline && { minHeight: 90, textAlignVertical: 'top' }]}
      />
    </View>
  );
}

export function Tag({ label, tone = 'accent' }: { label: string; tone?: 'accent' | 'accent2' | 'neutral' | 'outline' }) {
  const toneStyle: Record<string, ViewStyle & { color: string }> = {
    accent: { backgroundColor: colors.accent100, color: colors.accent800 },
    accent2: { backgroundColor: colors.accent2100, color: colors.accent2800 },
    neutral: { backgroundColor: colors.neutral100, color: colors.neutral800 },
    outline: { backgroundColor: 'transparent', color: colors.accent, borderWidth: 1, borderColor: colors.accent },
  };
  const t = toneStyle[tone];
  return (
    <View style={[s.tag, t]}>
      <Text style={{ fontSize: 11, letterSpacing: 0.2, color: t.color }}>{label}</Text>
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={s.card}>{children}</View>;
}

export function Kicker({ children, tone = 'text' }: { children: React.ReactNode; tone?: 'text' | 'accent' | 'accent2' }) {
  const color = tone === 'accent' ? colors.accent700 : tone === 'accent2' ? colors.accent2700 : colors.text;
  return <Text style={[s.kicker, { color }]}>{children}</Text>;
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: space[2],
    paddingHorizontal: space[3] * 1.2,
    borderRadius: radius.md,
  },
  btnLabel: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.text,
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: 'rgba(32,30,29,0.7)',
  },
  input: {
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: radius.md,
    fontFamily: fonts.body,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: radius.md * 0.75,
  },
  kicker: {
    fontFamily: fonts.heading,
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    gap: space[2],
    padding: space[3],
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
});
