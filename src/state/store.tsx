import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_STEPS, CHURCH_MARKS, ENCOURAGEMENTS, PARTS, type Part } from '../data/content';
import { ALL_TOOLS } from '../data/toolbox';
import { DEFAULT_PACK_ID } from '../data/verses';

export type Encouragement = (typeof ENCOURAGEMENTS)[number];

export type OikosLight = 'green' | 'yellow' | 'red';
export type OikosMark = 'convo' | 'study' | 'trained';
export type OikosMarks = { convo: boolean; study: boolean; trained: boolean };
export type OikosPerson = { id: string; name: string; note: string; light: OikosLight; marks: OikosMarks };
export type PrayerName = { id: string; name: string; note: string; prayed: boolean; oikosId?: string };
export type JournalEntry = { id: string; date: string; body: string; tag: string; personId?: string; stepId?: string };

export type GroupStage = 'study' | 'group' | 'church';
export type Group = {
  id: string;
  name: string;
  note: string;
  stage: GroupStage;
  startedByGroupId?: string;
  startedByPersonId?: string;
};

export type ReportSections = { field: boolean; counts: boolean; lights: boolean; prayer: boolean; map: boolean; tools: boolean };

export type ParsedReport = {
  from: string;
  date?: string;
  field?: string;
  talks?: string;
  studies?: string;
  trained?: string;
  lights?: string;
  prayer?: string;
  map?: string;
  stalled?: string;
  tools?: string;
  journal?: { date: string; body: string }[];
  note?: string;
};

export type SentReport = { id: string; date: string; summary: string; hadJournal: boolean };
export type FlockEntry = {
  id: string;
  codeName: string;
  addedAt: string;
  lastReceivedAt?: string;
  lastReport?: ParsedReport;
  lastNoteSentAt?: string;
};

export type CoachNote = {
  date: string;
  verseRef?: string;
  verseText?: string;
  verseSource?: string;
  words?: string;
  stepId?: string;
  stepTitle?: string;
  checkIn?: string;
  receivedAt: string;
};

type State = {
  hydrated: boolean;
  discreet: boolean;
  packId: string;
  done: Record<string, boolean>;
  checks: Record<string, Record<number, boolean>>;
  celebrate: Encouragement | null;
  goals: { convos: number; studies: number; trained: number };
  story: { before: string; how: string; since: string; practiced: number };
  oikos: OikosPerson[];
  churchMarks: Record<string, boolean>;
  names: PrayerName[];
  entries: JournalEntry[];
  groups: Group[];
  prayedDays: number;
  toolsOpened: Record<string, boolean>;
  myCodeName: string;
  sentReports: SentReport[];
  flock: FlockEntry[];
  coachNote: CoachNote | null;
  startedAt: string;
};

const STORAGE_KEY = 'beehive.state.v1';

const noMarks: OikosMarks = { convo: false, study: false, trained: false };

const initialState: State = {
  hydrated: false,
  discreet: true,
  packId: DEFAULT_PACK_ID,
  done: {},
  checks: {},
  celebrate: null,
  goals: { convos: 0, studies: 0, trained: 0 },
  story: { before: '', how: '', since: '', practiced: 0 },
  oikos: [],
  churchMarks: {},
  names: [],
  entries: [],
  groups: [],
  prayedDays: 0,
  toolsOpened: {},
  myCodeName: '',
  sentReports: [],
  flock: [],
  coachNote: null,
  startedAt: '',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function today() {
  const d = new Date();
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
}

export function weekdayDateLine(d: Date): string {
  return WEEKDAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
}

export function dayCount(state: Pick<State, 'startedAt'>): number {
  if (!state.startedAt) return 1;
  return daysSince(state.startedAt) + 1;
}

function reportDate(d: Date) {
  return d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear();
}

function makeId(prefix: string) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function normalize(raw: Partial<State>): Partial<State> {
  const out: Partial<State> = { ...raw };
  if (Array.isArray(raw.oikos)) {
    out.oikos = raw.oikos.map((p) => ({ ...p, marks: { ...noMarks, ...(p as OikosPerson).marks } }));
  }
  if (!Array.isArray(raw.groups)) out.groups = [];
  if (typeof raw.discreet !== 'boolean') out.discreet = true;
  if (typeof raw.packId !== 'string') out.packId = DEFAULT_PACK_ID;
  if (!raw.toolsOpened || typeof raw.toolsOpened !== 'object') out.toolsOpened = {};
  if (typeof raw.myCodeName !== 'string') out.myCodeName = '';
  if (!Array.isArray(raw.sentReports)) out.sentReports = [];
  if (!Array.isArray(raw.flock)) out.flock = [];
  if (typeof raw.coachNote === 'undefined') out.coachNote = null;
  if (typeof raw.startedAt !== 'string' || !raw.startedAt) out.startedAt = new Date().toISOString();
  return out;
}

type Action =
  | { type: 'hydrate'; state: Partial<State> }
  | { type: 'toggleDiscreet' }
  | { type: 'setPack'; packId: string }
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
  | { type: 'addGroup'; text: string; stage: GroupStage; startedByGroupId?: string; startedByPersonId?: string }
  | { type: 'cycleGroupStage'; id: string }
  | { type: 'deleteGroup'; id: string }
  | { type: 'markPrayedToday' }
  | { type: 'markToolOpened'; toolId: string }
  | { type: 'setMyCodeName'; text: string }
  | { type: 'recordSentReport'; summary: string; hadJournal: boolean }
  | { type: 'addFlockWatch'; codeName: string }
  | { type: 'deleteFlockEntry'; id: string }
  | { type: 'ingestFlockReport'; parsed: ParsedReport }
  | { type: 'recordNoteSent'; id: string }
  | { type: 'receiveCoachNote'; note: CoachNote }
  | { type: 'dismissCoachNote' }
  | { type: 'resetAll' };

const STAGE_ORDER: GroupStage[] = ['study', 'group', 'church'];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...normalize(action.state), hydrated: true, celebrate: null };
    case 'toggleDiscreet':
      return { ...state, discreet: !state.discreet };
    case 'setPack':
      return { ...state, packId: action.packId };
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
        groups: state.groups.map((g) => (g.startedByPersonId === action.id ? { ...g, startedByPersonId: undefined } : g)),
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
    case 'addGroup': {
      const t = action.text.trim();
      if (!t) return state;
      const [name, ...rest] = t.split(/,\s*/);
      const group: Group = { id: makeId('g'), name, note: rest.join(', '), stage: action.stage };
      if (action.startedByGroupId) group.startedByGroupId = action.startedByGroupId;
      if (action.startedByPersonId) group.startedByPersonId = action.startedByPersonId;
      return { ...state, groups: [...state.groups, group] };
    }
    case 'cycleGroupStage':
      return {
        ...state,
        groups: state.groups.map((g) =>
          g.id === action.id ? { ...g, stage: STAGE_ORDER[(STAGE_ORDER.indexOf(g.stage) + 1) % STAGE_ORDER.length] } : g
        ),
      };
    case 'deleteGroup': {
      const gone = state.groups.find((g) => g.id === action.id);
      if (!gone) return state;
      return {
        ...state,
        groups: state.groups
          .filter((g) => g.id !== action.id)
          .map((g) => (g.startedByGroupId === action.id ? { ...g, startedByGroupId: gone.startedByGroupId } : g)),
      };
    }
    case 'markPrayedToday':
      return { ...state, prayedDays: state.prayedDays + 1 };
    case 'markToolOpened':
      return state.toolsOpened[action.toolId] ? state : { ...state, toolsOpened: { ...state.toolsOpened, [action.toolId]: true } };
    case 'setMyCodeName':
      return { ...state, myCodeName: action.text };
    case 'recordSentReport':
      return {
        ...state,
        sentReports: [{ id: makeId('r'), date: today(), summary: action.summary, hadJournal: action.hadJournal }, ...state.sentReports],
      };
    case 'addFlockWatch': {
      const t = action.codeName.trim();
      if (!t) return state;
      if (state.flock.some((f) => f.codeName.toLowerCase() === t.toLowerCase())) return state;
      return { ...state, flock: [...state.flock, { id: makeId('f'), codeName: t, addedAt: new Date().toISOString() }] };
    }
    case 'deleteFlockEntry':
      return { ...state, flock: state.flock.filter((f) => f.id !== action.id) };
    case 'ingestFlockReport': {
      const name = action.parsed.from.trim();
      if (!name) return state;
      const now = new Date().toISOString();
      const existing = state.flock.find((f) => f.codeName.toLowerCase() === name.toLowerCase());
      if (existing) {
        return {
          ...state,
          flock: state.flock.map((f) => (f.id === existing.id ? { ...f, lastReport: action.parsed, lastReceivedAt: now } : f)),
        };
      }
      return { ...state, flock: [...state.flock, { id: makeId('f'), codeName: name, addedAt: now, lastReport: action.parsed, lastReceivedAt: now }] };
    }
    case 'recordNoteSent':
      return { ...state, flock: state.flock.map((f) => (f.id === action.id ? { ...f, lastNoteSentAt: new Date().toISOString() } : f)) };
    case 'receiveCoachNote':
      return { ...state, coachNote: action.note };
    case 'dismissCoachNote':
      return { ...state, coachNote: null };
    case 'resetAll':
      return { ...initialState, hydrated: true, discreet: state.discreet, packId: state.packId, myCodeName: state.myCodeName };
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

// --- Discreet naming ---
// When discreet is on, every prompt asks for a code name. The app stores only what
// the user types, so a real name is never written to the device unless they choose to.

export const naming = {
  on: {
    personLabel: 'Add a code name for someone you know',
    personPlaceholder: 'Code name, and how you know them',
    groupLabel: 'Add a group by code name',
    groupPlaceholder: 'Code name, and a hint of where it meets',
    prayerLabel: 'Add someone to carry, by code name',
    prayerPlaceholder: 'Code name, and one line about them',
    banner: 'Code names on · this phone stores only what you type',
    explain:
      'Use a code name only you would recognise — not a real name, and not a place that identifies them. If this phone is lost or taken, no one on it can be found from what you wrote.',
  },
  off: {
    personLabel: 'Add a name from your household, work, or neighborhood',
    personPlaceholder: 'Name, and how you know them',
    groupLabel: 'Add a group',
    groupPlaceholder: 'Name, and where it meets',
    prayerLabel: 'Add someone to carry',
    prayerPlaceholder: 'Name, and one line about them',
    banner: 'Real names on · anyone with this phone can read them',
    explain:
      'Real names are easier to pray over, and they are also readable by anyone who takes this phone. Where believing carries a cost, switch code names back on.',
  },
};

export function namingFor(state: State) {
  return state.discreet ? naming.on : naming.off;
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

export const GOAL_TARGETS = { convos: 5, studies: 2, trained: 3 };

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

export function oikosLightCounts(state: State) {
  return {
    green: state.oikos.filter((p) => p.light === 'green').length,
    yellow: state.oikos.filter((p) => p.light === 'yellow').length,
    red: state.oikos.filter((p) => p.light === 'red').length,
  };
}

export function toolsOpenedCount(state: State) {
  return Object.values(state.toolsOpened).filter(Boolean).length;
}

// --- Generational map ---

export function groupGeneration(state: State, id: string): number {
  const seen = new Set<string>();
  let current = state.groups.find((g) => g.id === id);
  let gen = 1;
  while (current) {
    if (seen.has(current.id)) return gen;
    seen.add(current.id);
    if (current.startedByGroupId) {
      const parent = state.groups.find((g) => g.id === current!.startedByGroupId);
      if (!parent) return gen;
      gen += 1;
      current = parent;
      continue;
    }
    if (current.startedByPersonId) gen += 1;
    return gen;
  }
  return gen;
}

export function groupChildren(state: State, id: string) {
  return state.groups.filter((g) => g.startedByGroupId === id);
}

export function deepestGeneration(state: State) {
  return state.groups.reduce((max, g) => Math.max(max, groupGeneration(state, g.id)), 0);
}

export function orderedGroups(state: State) {
  return [...state.groups]
    .map((g) => ({ group: g, gen: groupGeneration(state, g.id) }))
    .sort((a, b) => (a.gen === b.gen ? a.group.name.localeCompare(b.group.name) : a.gen - b.gen));
}

export function stalledGroups(state: State) {
  return state.groups.filter((g) => groupChildren(state, g.id).length === 0);
}

export function startedByLabel(state: State, g: Group) {
  if (g.startedByGroupId) {
    const parent = state.groups.find((x) => x.id === g.startedByGroupId);
    return parent ? 'Started from ' + parent.name : 'Started from a group no longer listed';
  }
  if (g.startedByPersonId) {
    const person = state.oikos.find((p) => p.id === g.startedByPersonId);
    return person ? 'Started by ' + person.name : 'Started by someone no longer on your map';
  }
  return 'Started by you';
}

export function mapAdvice(state: State) {
  if (state.groups.length === 0) {
    return 'Nothing on the map yet. Add the first group you started, then add each group that grows out of it.';
  }
  const deepest = deepestGeneration(state);
  const stalled = stalledGroups(state);
  if (state.groups.length === 1) {
    return 'One group on the map. That group is a work God planted. Keep sowing, and add the next one when it begins.';
  }
  if (stalled.length === 0) {
    return deepest + ' generations deep, and every group has started something. Keep training and stay out of the way.';
  }
  const names = stalled.slice(0, 2).map((g) => g.name).join(' and ');
  const rest = stalled.length > 2 ? ', among others' : '';
  return (
    deepest +
    ' generations on the map. The branch to watch is ' +
    names +
    rest +
    ' — nothing has started from there yet. Go and sit with them.'
  );
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

export const stageLook: Record<GroupStage, { label: string; tone: 'accent' | 'neutral' | 'outline' }> = {
  study: { label: 'Study', tone: 'outline' },
  group: { label: 'Group', tone: 'neutral' },
  church: { label: 'Church', tone: 'accent' },
};

// --- Share report (pastor → coach) ---
//
// Bee Hive has no server and no accounts, so "Send to your coach" cannot sync
// anything on its own. Instead it composes a short plain-text message
// (composeReportText) and hands it to the phone's own OS share sheet —
// WhatsApp, SMS, email, whatever the pastor already uses. The coach pastes
// whatever they received back into their own copy of the app (parseReportText),
// which files it under the "From:" code name on the Flock screen. No person on
// the oikos map is ever named in the wire format below — only counts. Groups
// travel under whatever code name the pastor already gave them.

const REPORT_HEADER = 'BEEHIVE REPORT v1';

export const REPORT_SECTION_LABELS: Record<keyof ReportSections, string> = {
  field: 'Steps walked / which field you are in',
  counts: 'Weekly counts (conversations, studies, trained)',
  lights: 'Oikos light counts (green, yellow, red)',
  prayer: 'Prayer streak',
  map: 'Generational map',
  tools: 'Tools used',
};

export const REPORT_SECTION_ORDER: (keyof ReportSections)[] = ['field', 'counts', 'lights', 'prayer', 'map', 'tools'];

export function composeReportText(state: State, sections: ReportSections, journalIds: string[], note: string): string {
  const lines: string[] = [REPORT_HEADER];
  lines.push('From: ' + (state.myCodeName.trim() || 'A pastor'));
  lines.push('Date: ' + reportDate(new Date()));

  if (sections.field) {
    const n = activePartNum(state);
    const part = PARTS.find((p) => p.n === n)!;
    lines.push('Field: ' + n + ' ' + part.title + ' — ' + doneCount(state) + ' steps walked');
  }
  if (sections.counts) {
    const totals = goalTotals(state);
    lines.push('Talks: ' + totals.convos + '/' + GOAL_TARGETS.convos);
    lines.push('Studies: ' + totals.studies + '/' + GOAL_TARGETS.studies);
    lines.push('Trained: ' + totals.trained + '/' + GOAL_TARGETS.trained);
  }
  if (sections.lights) {
    const l = oikosLightCounts(state);
    lines.push('Lights: ' + l.green + ' green, ' + l.yellow + ' yellow, ' + l.red + ' red');
  }
  if (sections.prayer) {
    lines.push('Prayer: ' + state.prayedDays + ' days');
  }
  if (sections.map) {
    lines.push('Map: ' + state.groups.length + ' groups, ' + deepestGeneration(state) + ' generations');
    const stalled = stalledGroups(state);
    if (state.groups.length > 0 && stalled.length > 0) {
      lines.push('Stalled: ' + stalled.slice(0, 3).map((g) => g.name).join(', '));
    }
  }
  if (sections.tools) {
    lines.push('Tools: ' + toolsOpenedCount(state) + ' of ' + ALL_TOOLS.length);
  }
  for (const id of journalIds) {
    const entry = state.entries.find((e) => e.id === id);
    if (entry) lines.push('Journal (' + entry.date + '): ' + entry.body);
  }
  if (note.trim()) {
    lines.push('Note: ' + note.trim());
  }
  return lines.join('\n');
}

export function reportSummary(sections: ReportSections, journalCount: number): string {
  const parts = REPORT_SECTION_ORDER.filter((k) => sections[k]).map((k) => {
    if (k === 'field') return 'Steps';
    if (k === 'counts') return 'counts';
    if (k === 'lights') return 'lights';
    if (k === 'prayer') return 'prayer days';
    if (k === 'map') return 'map';
    return 'tools';
  });
  const base = parts.length ? parts.join(', ') + '.' : 'Nothing checked.';
  const journalLine = journalCount > 0 ? journalCount + ' journal entr' + (journalCount === 1 ? 'y' : 'ies') + ', word for word.' : 'No journal entries, no names.';
  return base + ' ' + journalLine;
}

export function parseReportText(raw: string): { ok: true; data: ParsedReport } | { ok: false; reason: string } {
  const text = raw.trim();
  if (!text) {
    return { ok: false, reason: 'Paste the message your pastor sent, then try again.' };
  }
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines[0] !== REPORT_HEADER) {
    return { ok: false, reason: 'That does not look like a Bee Hive report. It should start with "' + REPORT_HEADER + '".' };
  }
  const data: Partial<ParsedReport> = {};
  const journal: { date: string; body: string }[] = [];
  for (const line of lines.slice(1)) {
    const m = line.match(/^([A-Za-z][A-Za-z ()0-9]*?):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const value = m[2].trim();
    if (key === 'From') data.from = value;
    else if (key === 'Date') data.date = value;
    else if (key === 'Field') data.field = value;
    else if (key === 'Talks') data.talks = value;
    else if (key === 'Studies') data.studies = value;
    else if (key === 'Trained') data.trained = value;
    else if (key === 'Lights') data.lights = value;
    else if (key === 'Prayer') data.prayer = value;
    else if (key === 'Map') data.map = value;
    else if (key === 'Stalled') data.stalled = value;
    else if (key === 'Tools') data.tools = value;
    else if (key === 'Note') data.note = value;
    else if (key.indexOf('Journal') === 0) {
      const dateMatch = key.match(/\(([^)]*)\)/);
      journal.push({ date: dateMatch ? dateMatch[1] : '', body: value });
    }
  }
  if (!data.from) {
    return { ok: false, reason: 'This report has no "From:" line, so there is no code name to file it under.' };
  }
  if (journal.length > 0) data.journal = journal;
  return { ok: true, data: data as ParsedReport };
}

export function sortedFlock(state: State) {
  return [...state.flock].sort((a, b) => {
    const aReported = !!a.lastReceivedAt;
    const bReported = !!b.lastReceivedAt;
    if (aReported !== bReported) return aReported ? 1 : -1;
    if (!aReported && !bReported) return a.addedAt.localeCompare(b.addedAt);
    return (a.lastReceivedAt as string).localeCompare(b.lastReceivedAt as string);
  });
}

export function daysSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

// --- Coach note (coach → pastor), the same transport in reverse ---
//
// A coach writes this from the Flock screen and it goes out through the same
// OS share sheet the pastor's report used — there is still no server and no
// second account. The pastor pastes what they received on the Share screen,
// which files it as the single coachNote shown on Today until dismissed. The
// step id travels in parentheses so the assigned step can be opened directly;
// if it does not match a step on this phone, StepScreen falls back safely
// rather than crashing.

const NOTE_HEADER = 'BEEHIVE NOTE v1';

export function composeCoachNoteText(
  verse: { ref: string; text: string; source: string } | null,
  words: string,
  step: { id: string; title: string } | null,
  checkIn: string
): string {
  const lines: string[] = [NOTE_HEADER];
  lines.push('Date: ' + reportDate(new Date()));
  if (verse) {
    lines.push('Verse: ' + verse.ref + ' — ' + verse.text + ' (' + verse.source + ')');
  }
  if (words.trim()) {
    lines.push('Words: ' + words.trim());
  }
  if (step) {
    lines.push('Step: ' + step.title + ' (' + step.id + ')');
  }
  if (checkIn.trim()) {
    lines.push('Check-in: ' + checkIn.trim());
  }
  return lines.join('\n');
}

export function parseCoachNoteText(raw: string): { ok: true; data: CoachNote } | { ok: false; reason: string } {
  const text = raw.trim();
  if (!text) {
    return { ok: false, reason: 'Paste the note your coach sent, then try again.' };
  }
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines[0] !== NOTE_HEADER) {
    return { ok: false, reason: 'That does not look like a note from a coach. It should start with "' + NOTE_HEADER + '".' };
  }
  const data: Partial<CoachNote> = {};
  for (const line of lines.slice(1)) {
    const m = line.match(/^([A-Za-z][A-Za-z ()0-9-]*?):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const value = m[2].trim();
    if (key === 'Date') data.date = value;
    else if (key === 'Verse') {
      const vm = value.match(/^(.*?) — (.*) \(([^)]+)\)$/);
      if (vm) {
        data.verseRef = vm[1].trim();
        data.verseText = vm[2].trim();
        data.verseSource = vm[3].trim();
      }
    } else if (key === 'Words') data.words = value;
    else if (key === 'Step') {
      const sm = value.match(/^(.*) \(([A-Za-z0-9]+)\)$/);
      if (sm) {
        data.stepTitle = sm[1].trim();
        data.stepId = sm[2].trim();
      } else {
        data.stepTitle = value;
      }
    } else if (key === 'Check-in') data.checkIn = value;
  }
  if (!data.date) {
    return { ok: false, reason: 'This note is missing its date, so it may not have copied correctly.' };
  }
  data.receivedAt = new Date().toISOString();
  return { ok: true, data: data as CoachNote };
}
