// Ported from the Broadsheet design system (project/_ds/.../styles.css)
export const colors = {
  bg: '#f3f2f2',
  surface: '#eae9e9',
  text: '#201e1d',
  textMuted: 'rgba(32,30,29,0.55)',
  divider: 'rgba(32,30,29,0.16)',

  accent: '#0088b0',
  accent100: '#e9f8ff',
  accent600: '#1186ac',
  accent700: '#006786',
  accent800: '#004961',

  accent2: '#d6006c',
  accent2100: '#fff1f4',
  accent2700: '#aa0b56',
  accent2800: '#790e3d',

  neutral100: '#f8f4f4',
  neutral300: '#d7d3d3',
  neutral400: '#bab6b6',
  neutral500: '#9b9797',
  neutral600: '#7d7979',
  neutral700: '#605d5d',
  neutral800: '#444141',
  neutral900: '#2d2b2b',

  // A real traffic-light red/yellow/green, used only for the oikos map's open/unsure/
  // closed lights — distinct from the accent/accent2 brand colors above, which were
  // never meant to stand in for this and don't read as "green" or "red" at a glance.
  // Yellow is rendered as a darker amber so it stays legible as text/icon color on the
  // cream background; pure yellow would not be.
  signalGreen: '#2E7D32',
  signalYellow: '#B8860B',
  signalRed: '#C1272D',
};

export const space = {
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  6: 30,
  8: 40,
};

export const radius = {
  sm: 1,
  md: 2,
  lg: 4,
};

// Source Serif 4 is loaded via @expo-google-fonts/source-serif-4.
export const fonts = {
  body: 'SourceSerif4_400Regular',
  heading: 'SourceSerif4_600SemiBold',
  headingItalic: 'SourceSerif4_400Regular_Italic',
};
