import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Field, Btn, Tag } from '../../components/ui';
import { showAlert } from '../../lib/confirm';
import { colors, fonts, space } from '../../theme/tokens';
import {
  deepestGeneration,
  mapAdvice,
  namingFor,
  orderedGroups,
  stageLook,
  startedByLabel,
  useAppDispatch,
  useAppState,
  type GroupStage,
} from '../../state/store';

type Source = { kind: 'me' } | { kind: 'person'; id: string } | { kind: 'group'; id: string };

const STAGES: GroupStage[] = ['study', 'group', 'church'];

export function MapTool() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState('');
  const [stage, setStage] = useState<GroupStage>('study');
  const [source, setSource] = useState<Source>({ kind: 'me' });
  const [error, setError] = useState('');
  const naming = namingFor(state);

  const rows = orderedGroups(state);
  const deepest = deepestGeneration(state);
  const trained = state.oikos.filter((p) => p.marks.trained);

  const add = () => {
    if (!draft.trim()) {
      setError('Give the group a name first.');
      return;
    }
    setError('');
    dispatch({
      type: 'addGroup',
      text: draft,
      stage,
      startedByPersonId: source.kind === 'person' ? source.id : undefined,
      startedByGroupId: source.kind === 'group' ? source.id : undefined,
    });
    setDraft('');
    setStage('study');
    setSource({ kind: 'me' });
  };

  const confirmDelete = (id: string, name: string) => {
    showAlert('Remove ' + name + '?', 'Anything started from it stays on the map, attached further up.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => dispatch({ type: 'deleteGroup', id }) },
    ]);
  };

  return (
    <View style={{ paddingTop: space[2] }}>
      <Text style={s.banner}>{naming.banner}</Text>

      {rows.length > 0 && (
        <Text style={s.h6}>{rows.length + ' on the map · ' + deepest + ' generation' + (deepest === 1 ? '' : 's') + ' deep'}</Text>
      )}

      {rows.map(({ group, gen }) => (
        <View key={group.id} style={[s.row, { paddingLeft: Math.min(gen - 1, 3) * space[4] }]}>
          <Text style={s.gen}>{'G' + gen}</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{group.name}</Text>
            {group.note.length > 0 && <Text style={s.note}>{group.note}</Text>}
            <Text style={s.from}>{startedByLabel(state, group)}</Text>
            <Pressable onPress={() => confirmDelete(group.id, group.name)} accessibilityLabel={'Remove ' + group.name} hitSlop={6}>
              <Text style={s.remove}>Remove</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => dispatch({ type: 'cycleGroupStage', id: group.id })} accessibilityLabel="Change this stage" hitSlop={8}>
            <Tag label={stageLook[group.stage].label} tone={stageLook[group.stage].tone} />
          </Pressable>
        </View>
      ))}

      <View style={{ paddingTop: space[4] }}>
        <Field
          label={naming.groupLabel}
          value={draft}
          onChangeText={(t: string) => {
            setDraft(t);
            if (error) setError('');
          }}
          placeholder={naming.groupPlaceholder}
        />
        {error.length > 0 && <Text style={s.error}>{error}</Text>}

        <Text style={s.label}>What is it now?</Text>
        <View style={s.chipRow}>
          {STAGES.map((st) => (
            <Pressable key={st} onPress={() => setStage(st)} style={[s.chip, stage === st && s.chipOn]} hitSlop={4}>
              <Text style={[s.chipText, stage === st && s.chipTextOn]}>{stageLook[st].label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={s.label}>Who started it?</Text>
        <View style={s.chipRow}>
          <Pressable onPress={() => setSource({ kind: 'me' })} style={[s.chip, source.kind === 'me' && s.chipOn]} hitSlop={4}>
            <Text style={[s.chipText, source.kind === 'me' && s.chipTextOn]}>You</Text>
          </Pressable>
          {trained.map((p) => {
            const on = source.kind === 'person' && source.id === p.id;
            return (
              <Pressable key={p.id} onPress={() => setSource({ kind: 'person', id: p.id })} style={[s.chip, on && s.chipOn]} hitSlop={4}>
                <Text style={[s.chipText, on && s.chipTextOn]}>{p.name}</Text>
              </Pressable>
            );
          })}
          {state.groups.map((g) => {
            const on = source.kind === 'group' && source.id === g.id;
            return (
              <Pressable key={g.id} onPress={() => setSource({ kind: 'group', id: g.id })} style={[s.chip, on && s.chipOn]} hitSlop={4}>
                <Text style={[s.chipText, on && s.chipTextOn]}>{'From ' + g.name}</Text>
              </Pressable>
            );
          })}
        </View>

        {trained.length === 0 && state.groups.length === 0 && (
          <Text style={s.helper}>
            Once you mark someone trained and sent on your oikos map, their name appears here so you can record the group they start.
          </Text>
        )}

        <Btn label="Add to the map" style={{ marginTop: space[3], alignSelf: 'flex-start' }} onPress={add} />
      </View>

      <Text style={[s.advice, { paddingTop: space[4] }]}>{mapAdvice(state)}</Text>
      <Text style={[s.helper, { paddingTop: space[3] }]}>
        This page shows how the work has spread, so it is the page that would cost the most if this phone were taken. Keep the names here as short and unremarkable as you can.
      </Text>
      <Text style={[s.helper, { paddingTop: space[2] }]}>
        Generations are worked out from who started what, so you never set them yourself. Tap a stage tag to move a group between study, group and church.
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  banner: { fontSize: 12, color: colors.accent700, paddingBottom: space[3] },
  h6: { fontFamily: fonts.heading, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: colors.text, marginBottom: space[2] },
  row: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start', paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: 'rgba(32,30,29,0.10)' },
  gen: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 13, letterSpacing: 0.8, width: 30, color: colors.accent700, paddingTop: 3 },
  name: { fontFamily: fonts.heading, fontWeight: '600', fontSize: 16, color: colors.text },
  note: { fontSize: 13, lineHeight: 19, marginTop: 2, color: 'rgba(32,30,29,0.55)' },
  from: { fontSize: 11, color: 'rgba(32,30,29,0.40)', marginTop: 3 },
  remove: { fontSize: 12, color: colors.neutral600, paddingTop: space[2] },
  label: { fontSize: 13, color: 'rgba(32,30,29,0.55)', marginTop: space[3], marginBottom: space[2] },
  chipRow: { flexDirection: 'row', gap: space[2], flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: 'rgba(32,30,29,0.20)', borderRadius: 999, paddingHorizontal: space[3], paddingVertical: 5 },
  chipOn: { borderColor: colors.accent700, backgroundColor: 'rgba(32,30,29,0.05)' },
  chipText: { fontSize: 12, color: 'rgba(32,30,29,0.55)' },
  chipTextOn: { color: colors.accent700 },
  advice: { fontSize: 15, lineHeight: 24, color: colors.text },
  helper: { fontSize: 14, lineHeight: 22, color: 'rgba(32,30,29,0.55)', paddingTop: space[2] },
  error: { fontSize: 13, color: colors.neutral600, paddingTop: space[1] },
});
