import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function goToJournalTab() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Journal' as never);
  }
}
