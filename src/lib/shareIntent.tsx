import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useAppDispatch } from '../state/store';
import { navigationRef, goToFlockScreen, goToShareScreen } from '../navigation/navigationRef';

const REPORT_MARK = 'BEEHIVE REPORT';
const NOTE_MARK = 'BEEHIVE NOTE';

// Handles the Android "share to Beehive" entry point: the OS share sheet opens this
// app with the shared text as a query param (see public/manifest.json's share_target).
// There is no such entry point on iOS — WebKit has never implemented the Web Share
// Target API — so this only ever fires on Android web/Chrome.
export function ShareIntentHandler() {
  const dispatch = useAppDispatch();

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

    const kind = text.startsWith(REPORT_MARK) ? 'report' : text.startsWith(NOTE_MARK) ? 'note' : 'unknown';
    dispatch({ type: 'receiveIncomingShare', kind, text });

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
  }, [dispatch]);

  return null;
}
