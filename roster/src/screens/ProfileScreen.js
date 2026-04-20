import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Screen, Back, StepDots, PrimaryBtn } from '../components/Shared';
import { C, F } from '../tokens';

function Field({ label, value, onChangeText, placeholder, autoFocus }) {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldRow, { borderBottomColor: focus ? C.ink : C.line }]}>
        <TextInput
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={C.ink3}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={styles.input}
        />
      </View>
    </View>
  );
}

export default function ProfileScreen({ navigation, route }) {
  const { email } = route.params || {};
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Back onPress={() => navigation.goBack()} step={2} />
          <StepDots step={2} />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>Tell us about yourself.</Text>
            <Text style={styles.sub}>We'll use this to personalize your tracker. You can change it anytime.</Text>
          </View>

          <View style={styles.fields}>
            <Field
              label="Your name"
              value={name}
              onChangeText={setName}
              placeholder="Jamie Rivera"
              autoFocus
            />
            <Field
              label="Current role or focus"
              value={role}
              onChangeText={setRole}
              placeholder="Product designer"
            />
          </View>

          <View style={{ flex: 1 }} />

          <PrimaryBtn
            onPress={() => navigation.navigate('Goals', { email, name, role })}
            disabled={!name.trim()}
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
  fields: { marginTop: 32, gap: 22 },
  fieldLabel: { fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase' },
  fieldRow: {
    marginTop: 8, borderBottomWidth: 1.5,
    paddingBottom: 10,
  },
  input: { fontFamily: F.sans, fontSize: 20, color: C.ink, letterSpacing: -0.3, padding: 0 },
  btn: {},
});
