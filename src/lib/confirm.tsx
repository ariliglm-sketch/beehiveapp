import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, Text, View } from 'react-native';
import { Btn } from '../components/ui';
import { colors, fonts, space } from '../theme/tokens';

type Button = { text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void };
type Request = { title: string; message?: string; buttons: Button[] };

// Native Alert.alert works fine on iOS/Android, but has two separate problems
// on the web target: react-native-web's own Alert.alert renders nothing and
// never calls a button's onPress, and browser automation / some embedded
// preview panes auto-dismiss window.confirm/alert before a person can see or
// click it. So on web this renders its own modal instead of touching either
// one. Native is untouched.
let listener: ((r: Request | null) => void) | null = null;

export function showAlert(title: string, message?: string, buttons?: Button[]) {
  const finalButtons = buttons && buttons.length > 0 ? buttons : [{ text: 'OK' }];
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }
  listener?.({ title, message, buttons: finalButtons });
}

export function ConfirmModal() {
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    listener = setRequest;
    return () => {
      listener = null;
    };
  }, []);

  if (!request) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={() => setRequest(null)}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <View style={s.rule} />
          <Text style={s.title}>{request.title}</Text>
          {request.message ? <Text style={s.message}>{request.message}</Text> : null}
          <View style={{ gap: space[2] }}>
            {request.buttons.map((b, i) => (
              <Btn
                key={i}
                label={b.text}
                variant={b.style === 'cancel' ? 'secondary' : b.style === 'destructive' ? 'primary' : 'primary'}
                block
                onPress={() => {
                  setRequest(null);
                  b.onPress?.();
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(45,43,43,0.55)', justifyContent: 'flex-end', alignItems: 'stretch' },
  sheet: { backgroundColor: colors.bg, padding: space[4], paddingBottom: space[6], paddingTop: space[4], maxWidth: 480, width: '100%', alignSelf: 'center' },
  rule: { height: 3, backgroundColor: colors.text, marginBottom: space[3] },
  title: { fontFamily: fonts.heading, fontSize: 22, color: colors.text, marginBottom: space[2] },
  message: { fontSize: 15, lineHeight: 23, color: colors.text, marginBottom: space[4] },
});
