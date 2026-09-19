import { Platform, Share } from 'react-native';
import { showAlert } from './confirm';

// react-native-web's Share.share only works through the browser's Web Share
// API (navigator.share), which most desktop and embedded browsers don't
// implement — the call rejects immediately, and there was nothing after it
// to catch that and tell the person, so "Send" looked like it did nothing.
// Fall back to the clipboard there instead of failing silently. Native
// iOS/Android always has a real share sheet, so this never applies there.
export async function shareOrCopy(text: string): Promise<boolean> {
  try {
    const result = await Share.share({ message: text });
    if (Platform.OS === 'ios' && (result as { action?: string }).action === Share.dismissedAction) {
      return false;
    }
    return true;
  } catch {
    if (Platform.OS !== 'web') return false;
    return copyToClipboard(text);
  }
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    showAlert('Copied to your clipboard', "This browser can't open a share sheet, so paste the copied text into a message to send it.");
    return true;
  } catch {
    showAlert('Could not share', 'Copy the text by hand below and send it yourself.');
    return false;
  }
}
