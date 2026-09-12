import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ALL_STEPS, CHURCH_MARKS, ENCOURAGEMENTS, PARTS, type Part } from '../data/content';

export type Encouragement = (typeof ENCOURAGEMENTS)[number];

export type OikosLight = 'green' | 'yellow' | 'red';
export type OikosPerson = { id: string; name: string; note: string; light: OikosLight };
export type PrayerName = { id: string; name: string; note: string; prayed: boolean };
export type JournalEntry = { date: string; body: string; tag: string };

type State = {
  done: Record<string, boolean>;
  checks: Record<string, Record<number, boolean>>;
  celebrate: Encouragement | null;
  goals: { convos: number; studies: number; trained: number };
  story: { before: string; how: string; since: string; practiced: number };
  oikos: OikosPerson[];
  churchMarks: Record<string, boolean>;
  names: PrayerName[];
  entries: JournalEntry[];
  prayedDays: number;
};

const initialState: State = {
  done: { p11: true, p12: true, p13: true, p14: true, p21: true },
  checks: {},
  celebrate: null,
  goals: { convos: 4, studies: 1, trained: 2 },
  story: {
    before: 'I worked hard and drank hard, and I was angry at everyone.',
    how: 'A neighbor read Luke with me and I gave my life to Jesus.',
    since: 'I still have trouble, but I am not alone in it.',
    practiced: 3,
  },
  oikos: [
    { id: 'o1', name: 'Mama Auma', note: 'Neighbor. Hosts the Thursday reading.', light: 'green' },
    { id: 'o2', name: 'Peter Ochieng', note: 'Home from the city. Asks good questions.', light: 'green' },
    { id: 'o3', name: 'Joseph, the shopkeeper', note: 'Friendly, always busy. Wants to talk after market day.', light: 'yellow' },
    { id: 'o4', name: 'My brother Daniel', note: 'Thinks I have become strange. Still eats at my table.', light: 'yellow' },
    { id: 'o5', name: 'The elders of Nyakach', note: 'Cautious, not hostile. Need honoring first.', light: 'red' },
    { id: 'o6', name: 'Grace and the boys', note: 'My household. My first congregation.', light: 'green' },
  ],
  churchMarks: { m1: true, m2: false, m3: true, m4: true, m5: false, m6: true, m7: true, m8: false, m9: false },
  names: [
    { id: 'n1', name: 'Mama Auma', note: 'Her husband is not yet willing.', prayed: true },
    { id: 'n2', name: 'Peter Ochieng', note: 'Learning the three circles. Nervous but going.', prayed: true },
    { id: 'n3', name: 'The elders of Nyakach', note: 'Gatekeepers of the village.', prayed: false },
    { id: 'n4', name: 'Kadibo, the next village', note: 'No church there. No one has gone.', prayed: false },
    { id: 'n5', name: 'My own household', note: 'Grace and the two boys, who carry this with me.', prayed: true },
  ],
  entries: [
    { date: '10 September', body: 'Peter drew the three circles back to me at the shop, badly and out of order, and the shopkeeper listened to the whole thing.', tag: 'Field 2 · Gospel' },
    { date: '6 September', body: 'Mama Auma’s house read Luke 15 and her daughter asked what repentance means. We sat with the question and did not answer it too fast.', tag: 'Field 3 · Discipleship' },
    { date: '28 August', body: 'The elders sent me with prayer and laid hands on me. Grace stood beside me. Whatever comes, I was sent.', tag: 'Field 1 · Entry' },
  ],
  prayedDays: 19,
};

type Action =
  | { type: 'toggleStepAction'; stepId: string; index: number }
  | { type: 'completeStep'; stepId: string }
  | { type: 'closeCelebrate' }
  | { type: 'addGoal'; key: 'convos' | 'studies' | 'trained' }
  | { type: 'setStory'; field: 'before' | 'how' | 'since'; value: string }
  | { type: 'practiceStory' }
  | { type: 'cycleOikos'; id: string }
  | { type: 'addOikos'; text: string }
  | { type: 'toggleChurchMark'; id: string }
  | { type: 'togglePrayed'; id: string }
  | { type: 'addName'; text: string }
  | { type: 'addEntry'; text: string; tag: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggleStepAction': {
      const prior = state.checks[action.stepId] || {};
      return { ...state, checks: { ...state.checks, [action.stepId]: { ...prior, [action.index]: !prior[action.index] } } };
    }
    case 'completeStep': {
      const doneCount = Object.values(state.done).filter(Boolean).length;
      return {
        ...state,
        done: { ...state.done, [action.stepId]: true },
        celebrate: ENCOURAGEMENTS[doneCount % ENCOURAGEMENTS.length],
      };
    }
    case 'closeCelebrate':
      return { ...state, celebrate: null };
    case 'addGoal':
      return { ...state, goals: { ...state.goals, [action.key]: state.goals[action.key] + 1 } };
    case 'setStory':
      return { ...state, story: { ...state.story, [action.field]: action.value } };
    case 'practiceStory':
      return { ...state, story: { ...state.story, practiced: state.story.practiced + 1 } };
    case 'cycleOikos':
      return {
        ...state,
        oikos: state.oikos.map((p) =>
          p.id === action.id ? { ...p, light: p.light === 'green' ? 'yellow' : p.light === 'yellow' ? 'red' : 'green' } : p
        ),
      };
    case 'addOikos': {
      const t = action.text.trim();
      if (!t) return state;
      const [name, ...rest] = t.split(/,\s*/);
      return { ...state, oikos: [...state.oikos, { id: 'o' + Date.now(), name, note: rest.join(', ') || 'Added today.', light: 'yellow' }] };
    }
    case 'toggleChurchMark':
      return { ...state, churchMarks: { ...state.churchMarks, [action.id]: !state.churchMarks[action.id] } };
    case 'togglePrayed':
      return { ...state, names: state.names.map((n) => (n.id === action.id ? { ...n, prayed: !n.prayed } : n)) };
    case 'addName': {
      const t = action.text.trim();
      if (!t) return state;
      const [name, ...rest] = t.split(/,\s*/);
      return { ...state, names: [...state.names, { id: 'n' + Date.now(), name, note: rest.join(', ') || 'Added today.', prayed: false }] };
    }
    case 'addEntry': {
      const t = action.text.trim();
      if (!t) return state;
      return { ...state, entries: [{ date: 'Today', body: t, tag: action.tag }, ...state.entries] };
    }
    default:
      return state;
  }
}

const StateCtx = createContext<State | null>(null);
const DispatchCtx = createContext<React.Dispatch<Action> | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useAppState() {
  const s = useContext(StateCtx);
  if (!s) throw new Error('useAppState must be used within AppStateProvider');
  return s;
}

export function useAppDispatch() {
  const d = useContext(DispatchCtx);
  if (!d) throw new Error('useAppDispatch must be used within AppStateProvider');
  return d;
}

// --- Derived selectors, ported from the prototype's renderVals() ---

export function partDone(state: State, p: Part) {
  return p.steps.every((x) => state.done[x.id]);
}

export function activePartNum(state: State) {
  return (PARTS.find((p) => !partDone(state, p)) || PARTS[4]).n;
}

export function nextStep(state: State) {
  return ALL_STEPS.find((x) => !state.done[x.id]) || ALL_STEPS[ALL_STEPS.length - 1];
}

export function doneCount(state: State) {
  return Object.values(state.done).filter(Boolean).length;
}

export function churchMarksOn(state: State) {
  return CHURCH_MARKS.filter((m) => state.churchMarks[m.id]).length;
}

export const oikosLook: Record<OikosLight, { light: string; color: string; icon: string }> = {
  green: { light: 'Green · go now', color: 'accent700', icon: 'DoorOpen' },
  yellow: { light: 'Yellow · keep loving', color: 'accent2700', icon: 'HourglassMedium' },
  red: { light: 'Red · keep praying', color: 'neutral600', icon: 'Door' },
};
