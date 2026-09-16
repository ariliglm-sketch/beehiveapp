import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_STEPS, CHURCH_MARKS, ENCOURAGEMENTS, PARTS, type Part } from '../data/content';

export type Encouragement = (typeof ENCOURAGEMENTS)[number];

export type OikosLight = 'green' | 'yellow' | 'red';
export type OikosMark = 'convo' | 'study' | 'trained';
export type OikosMarks = { convo: boolean; study: boolean; trained: boolean };
export type OikosPerson = { id: string; name: string; note: string; light: OikosLight; marks: OikosMarks };
export type PrayerName = { id: string; name: string; note: string; prayed: boolean; oikosId?: string };
export type JournalEntry = { id: string; date: string; body: string; tag: string; personId?: string; stepId?: string };

type State = {
  hydrated: boolean;
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

const STORAGE_KEY = 'beehive.state.v1';

const noMarks: OikosMarks = { convo: false, study: false, trained: false };

const initialState: State = {
  hydrated: false,
  done: {},
  checks: {},
  celebrate: null,
  goals: { convos: 0, studies: 0, trained: 0 },
  story: { before: '', how: '', since: '', practiced: 0 },
  oikos: [],
  churchMarks: {},
  names: [],
  entries: [],
  prayedDays: 0,
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function today() {
  const d = new Date();
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
}

function makeId(prefix: string) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function normalize(raw: Partial<State>): Partial<State> {
  const oikos = Array.isArray(raw.oikos)
    ? raw.oikos.map((p) => ({ ...p, marks: { ...noMarks, ...(p as OikosPerson).marks } }))
    : undefined;
  return oikos ? { ...raw, oikos } : raw;
}

type Action =
  | { type: 'hydrate'; state: Partial<State> }
  | { type: 'toggleStepAction'; stepId: string; index: number }
  | { type: 'completeStep'; stepId: string }
  | { type: 'undoStep'; stepId: string }
  | { type: 'closeCelebrate' }
  | { type: 'addGoal'; key: 'convos' | 'studies' | 'trained' }
  | { type: 'removeGoal'; key: 'convos' | 'studies' | 'trained' }
  | { type: 'setStory'; field: 'before' | 'how' | 'since'; value: string }
  | { type: 'practiceStory' }
  | { type: 'cycleOikos'; id: string }
  | { type: 'addOikos'; text: string }
  | { type: 'deleteOikos'; id: string }
  | { type: 'toggleOikosMark'; id: string; mark: OikosMark }
  | { type: 'promoteToPrayer'; id: string }
  | { type: 'toggleChurchMark'; id: string }
  | { type: 'togglePrayed'; id: string }
  | { type: 'addName'; text: string }
  | { type: 'deleteName'; id: string }
  | { type: 'addEntry'; text: string; tag: string; personId?: string; stepId?: string }
  | { type: 'deleteEntry'; id: string }
  | { type: 'markPrayedToday' }
  | { type: 'resetAll' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...normalize(action.state), hydrated: true, celebrate: null };
    case 'toggleStepAction': {
      const prior = state.checks[action.stepId] || {};
      return { ...state, checks: { ...state.checks, [action.stepId]: { ...prior, [action.index]: !prior[action.index] } } };
    }
    case 'completeStep': {
      const count = Object.values(state.done).filter(Boolean).length;
      return {
        ...state,
        done: { ...state.done, [action.stepId]: true },
        celebrate: ENCOURAGEMENTS[count % ENCOURAGEMENTS.length],
      };
    }
    case 'undoStep': {
      const next = { ...state.done };
      delete next[action.stepId];
      return { ...state, done: next };
    }
    case 'closeCelebrate':
      return { ...state, celebrate: null };
    case 'addGoal':
      return { ...state, goals: { ...state.goals, [action.key]: state.goals[action.key] + 1 } };
    case 'removeGoal':
      return { ...state, goals: { ...state.goals, [action.key]: Math.max(0, state.goals[action.key] - 1) } };
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
      return { ...state, oikos: [...state.oikos, { id: makeId('o'), name, note: rest.join(', '), light: 'yellow', marks: { ...noMarks } }] };
    }
    case 'deleteOikos':
      return {
        ...state,
        oikos: state.oikos.filter((p) => p.id !== action.id),
        names: state.names.map((n) => (n.oikosId === action.id ? { ...n, oikosId: undefined } : n)),
        entries: state.entries.map((e) => (e.personId === action.id ? { ...e, personId: undefined } : e)),
      };
    case 'toggleOikosMark':
      return {
        ...state,
        oikos: state.oikos.map((p) =>
          p.id === action.id ? { ...p, marks: { ...p.marks, [action.mark]: !p.marks[action.mark] } } : p
        ),
      };
    case 'promoteToPrayer': {
      const person = state.oikos.find((p) => p.id === action.id);
      if (!person) return state;
      if (state.names.some((n) => n.oikosId === person.id)) return state;
      return {
        ...state,
        names: [...state.names, { id: makeId('n'), name: person.name, note: person.note, prayed: false, oikosId: person.id }],
      };
    }
    case 'toggleChurchMark':
      return { ...state, churchMarks: { ...state.churchMarks, [action.id]: !state.churchMarks[action.id] } };
    case 'togglePrayed':
      return { ...state, names: state.names.map((n) => (n.id === action.id ? { ...n, prayed: !n.prayed } : n)) };
    case 'addName': {
      const t = action.text.trim();
      if (!t) return state;
      const [name, ...rest] = t.split(/,\s*/);
      return { ...state, names: [...state.names, { id: makeId('n'), name, note: rest.join(', '), prayed: false }] };
    }
    case 'deleteName':
      return { ...state, names: state.names.filter((n) => n.id !== action.id) };
    case 'addEntry': {
      const t = action.text.trim();
      if (!t) return state;
      const entry: JournalEntry = { id: makeId('e'), date: today(), body: t, tag: action.tag };
      if (action.personId) entry.personId = action.personId;
      if (action.stepId) entry.stepId = action.stepId;
      return { ...state, entries: [entry, ...state.entries] };
    }
    case 'deleteEntry':
      return { ...state, entries: state.entries.filter((e) => e.id !== action.id) };
    case 'markPrayedToday':
      return { ...state, prayedDays: state.prayedDays + 1 };
    case 'resetAll':
      return { ...initialState, hydrated: true };
    default:
      return state;
  }
}

const StateCtx = createContext<State | null>(null);
const DispatchCtx = createContext<React.Dispatch<Action> | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          try {
            dispatch({ type: 'hydrate', state: JSON.parse(raw) as Partial<State> });
            return;
          } catch {}
        }
        dispatch({ type: 'hydrate', state: {} });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: 'hydrate', state: {} });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const { hydrated, celebrate, ...persisted } = state;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)).catch(() => {});
    }, 400);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state]);

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

export function markedCount(state: State, mark: OikosMark) {
  return state.oikos.filter((p) => p.marks[mark]).length;
}

export function goalTotals(state: State) {
  return {
    convos: state.goals.convos + markedCount(state, 'convo'),
    studies: state.goals.studies + markedCount(state, 'study'),
    trained: state.goals.trained + markedCount(state, 'trained'),
  };
}

export function isOnPrayerList(state: State, oikosId: string) {
  return state.names.some((n) => n.oikosId === oikosId);
}

export function personName(state: State, personId?: string) {
  if (!personId) return null;
  return state.oikos.find((p) => p.id === personId)?.name ?? null;
}

export const oikosLook: Record<OikosLight, { light: string; color: string; icon: string }> = {
  green: { light: 'Green · go now', color: 'accent700', icon: 'DoorOpen' },
  yellow: { light: 'Yellow · keep loving', color: 'accent2700', icon: 'HourglassMedium' },
  red: { light: 'Red · keep praying', color: 'neutral600', icon: 'Door' },
};

export const markLook: Record<OikosMark, { label: string; short: string }> = {
  convo: { label: 'Heard the gospel', short: 'Conversation' },
  study: { label: 'Studying with me', short: 'Study' },
  trained: { label: 'Trained and sent', short: 'Trained' },
};
