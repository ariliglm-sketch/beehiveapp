import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useShareIntent } from 'expo-share-intent';
import { useAppDispatch } from '../state/store';
import { navigationRef, goToFlockScreen, goToShareScreen } from '../navigation/navigationRef';

const REPORT_MARK = 'BEEHIVE REPORT';
const NOTE_MARK = 'BEEHIVE NOTE';

type Kind = 'report' | 'note' | 'unknown';

function classify(text: string): Kind {
  return text.startsWith(REPORT_MARK) ? 'report' : text.startsWith(NOTE_MARK) ? 'note' : 'unknown';
}

function navigateForKind(kind: Kind) {
  let attempts = 0;
  const tryNavigate = () => {
    attempts += 1;
    if (navigationRef.isReady()) {
      if (kind === 'report') goToFlockScreen();
      else goToShareScreen();
      return;
    }
    if (attempts < 20) setTimeout(tryNavigate, 100);
  };
  tryNavigate();
}

// Handles two separate "share to Beehive" entry points:
// - Android web/PWA: the OS share sheet opens this app with the shared text as a query
//   param (see public/manifest.json's share_target).
// - Native Android: expo-share-intent's own native module (see the "expo-share-intent"
//   plugin in app.json, configured Android-only — there is no working iOS setup for it
//   here, since building or testing one needs a Mac and an Apple developer account we
//   don't have).
// There is no entry point on iOS at all, web or native: WebKit has never implemented the
// Web Share Target API, so on iPhone none of this fires either way.
export function ShareIntentHandler() {
  const dispatch = useAppDispatch();
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent({ disabled: Platform.OS === 'web' });

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const params = new URLSearchParams(window.location.search);
    const text = (params.get('text') || params.get('url') || '').trim();
    if (!text) return;

    const url = new URL(window.location.href);
    url.searchParams.delete('text');
    url.searchParams.delete('title');
    url.searchParams.delete('url');
    window.history.replaceState({}, '', url.toString());

    const kind = classify(text);
    dispatch({ type: 'receiveIncomingShare', kind, text });
    navigateForKind(kind);
  }, [dispatch]);

  useEffect(() => {
    if (Platform.OS === 'web' || !hasShareIntent) return;
    const text = (shareIntent.text || '').trim();
    resetShareIntent();
    if (!text) return;
    const kind = classify(text);
    dispatch({ type: 'receiveIncomingShare', kind, text });
    navigateForKind(kind);
  }, [hasShareIntent, shareIntent, dispatch, resetShareIntent]);

  return null;
}
