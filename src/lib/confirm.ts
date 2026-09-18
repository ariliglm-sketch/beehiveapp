import { Alert, Platform } from 'react-native';

type Button = { text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void };

// react-native-web's Alert.alert renders nothing and never calls a button's
// onPress, so every confirm dialog in this app silently does nothing on web.
// This is a drop-in replacement with the same signature: on native it is
// Alert.alert unchanged; on web it falls back to window.confirm/alert, which
// is synchronous and blocking rather than a styled modal, but it actually
// runs the chosen button's callback.
export function showAlert(title: string, message?: string, buttons?: Button[]) {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }
  const text = message ? title + '\n\n' + message : title;
  if (!buttons || buttons.length <= 1) {
    window.alert(text);
    buttons?.[0]?.onPress?.();
    return;
  }
  const cancelBtn = buttons.find((b) => b.style === 'cancel');
  const actionBtn = buttons.find((b) => b.style !== 'cancel') ?? buttons[buttons.length - 1];
  if (window.confirm(text)) {
    actionBtn?.onPress?.();
  } else {
    cancelBtn?.onPress?.();
  }
}
