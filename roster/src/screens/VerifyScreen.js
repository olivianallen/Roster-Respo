import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Screen, Back, StepDots, PrimaryBtn } from '../components/Shared';
import { C, F } from '../tokens';

export default function VerifyScreen({ navigation, route }) {
  const { email } = route.params || {};
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const full = digits.every(d => d.length === 1);

  const handle = (i, val) => {
    const d = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKey = (i, e) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Back onPress={() => navigation.goBack()} step={1} />
          <StepDots step={1} />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>Check your inbox.</Text>
            <Text style={styles.sub}>
              We sent a code to{' '}
              <Text style={styles.emailHighlight}>{email || 'your email'}</Text>. Enter it below.
            </Text>
          </View>

          <View style={styles.codeRow}>
            {digits.map((d, i) => (
              <TextInput
                key={i}
                ref={el => (inputs.current[i] = el)}
                value={d}
                onChangeText={v => handle(i, v)}
                onKeyPress={e => onKey(i, e)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={i === 0}
                style={[styles.codeBox, { borderColor: d ? C.ink : C.line }]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.resendBtn}>
            <Text style={styles.resendText}>
              Didn't get it?{' '}
              <Text style={styles.resendLink}>Resend code</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <PrimaryBtn
            onPress={() => navigation.navigate('Profile', { email })}
            disabled={!full}
            style={styles.btn}
          >
            Verify
          </PrimaryBtn>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, paddingHorizontal: 28, paddingBottom: 24 },
  titleBlock: { marginTop: 40 },
  title: { fontFamily: F.serif, fontSize: 34, lineHeight: 38, color: C.ink, letterSpacing: -0.8 },
  sub: { marginTop: 10, fontFamily: F.sans, fontSize: 14.5, color: C.ink2, lineHeight: 22 },
  emailHighlight: { color: C.ink, fontFamily: F.sansM },
  codeRow: { marginTop: 40, flexDirection: 'row', gap: 10 },
  codeBox: {
    flex: 1, height: 62, borderRadius: 14,
    borderWidth: 1.5, backgroundColor: C.paper,
    textAlign: 'center', fontFamily: F.serif, fontSize: 28, color: C.ink,
  },
  resendBtn: { marginTop: 22, alignItems: 'center' },
  resendText: { fontFamily: F.sans, fontSize: 13.5, color: C.ink2 },
  resendLink: { color: C.ink, textDecorationLine: 'underline' },
  btn: {},
});
