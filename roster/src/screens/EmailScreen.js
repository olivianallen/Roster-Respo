import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { Screen, Back, StepDots, PrimaryBtn, CheckIcon } from '../components/Shared';
import { C, F, SP } from '../tokens';

function LockIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <Rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke={C.ink2} strokeWidth="1.3" />
      <Path d="M5 7V5a3 3 0 016 0v2" fill="none" stroke={C.ink2} strokeWidth="1.3" />
    </Svg>
  );
}

export default function EmailScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Back onPress={() => navigation.goBack()} step={0} />
          <StepDots step={0} />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>What's your email?</Text>
            <Text style={styles.sub}>We'll send a 6-digit code to verify it's you. No password needed.</Text>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Email address</Text>
            <View style={[styles.fieldRow, { borderBottomColor: focused ? C.ink : C.line }]}>
              <TextInput
                autoFocus
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="you@domain.com"
                placeholderTextColor={C.ink3}
                style={styles.input}
              />
              {valid && <CheckIcon />}
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.privacyNote}>
            <LockIcon />
            <Text style={styles.privacyText}>
              We'll never share your email with recruiters or employers.
            </Text>
          </View>

          <PrimaryBtn
            onPress={() => navigation.navigate('Verify', { email })}
            disabled={!valid}
            style={styles.btn}
          >
            Continue
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
  fieldWrap: { marginTop: 36 },
  fieldLabel: { fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase' },
  fieldRow: {
    marginTop: 8, borderBottomWidth: 1.5,
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 10,
  },
  input: {
    flex: 1, fontFamily: F.sans, fontSize: 20, color: C.ink, letterSpacing: -0.3, padding: 0,
  },
  privacyNote: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 14, backgroundColor: C.sand, borderRadius: 12, marginBottom: 14,
  },
  privacyText: { flex: 1, fontFamily: F.sans, fontSize: 12.5, color: C.ink2, lineHeight: 18 },
  btn: { marginTop: 0 },
});
