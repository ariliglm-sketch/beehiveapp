import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function goToJournalTab() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Journal' as never);
  }
}

export function goToShareScreen() {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as (name: string, params?: object) => void)('Share', { screen: 'Share' });
  }
}

export function goToFlockScreen() {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as (name: string, params?: object) => void)('Share', { screen: 'Flock' });
  }
}
