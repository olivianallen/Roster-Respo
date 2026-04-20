import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen, PrimaryBtn, Mark } from '../components/Shared';
import { C, F } from '../tokens';

function StackCard({ title, tag, rotate, left, top, tagColor }) {
  return (
    <View style={[styles.stackCard, { transform: [{ rotate: `${rotate}deg` }], left, top }]}>
      <View style={styles.stackCardHeader}>
        <View style={styles.stackCardInitial}>
          <Text style={styles.stackCardInitialText}>{title[0]}</Text>
        </View>
        <View style={[styles.stackCardTag, { borderColor: tagColor }]}>
          <Text style={[styles.stackCardTagText, { color: tagColor }]}>{tag}</Text>
        </View>
      </View>
      <Text style={styles.stackCardTitle}>{title}</Text>
      <Text style={styles.stackCardSub}>Senior Designer · Remote</Text>
    </View>
  );
}

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.inner}>
        <View style={styles.top}>
          <Mark size={44} />
          <View style={styles.hero}>
            <Text style={styles.headline}>
              Keep every{'\n'}
              <Text style={styles.headlineAccent}>application</Text>{'\n'}
              in one place.
            </Text>
            <Text style={styles.subtitle}>
              Track the jobs you've applied to, follow up on time, and land the next one.
            </Text>
          </View>
        </View>

        <View style={styles.cardArea}>
          <StackCard rotate={-6} left={-10} top={22} title="Atelier Oaks" tag="Screen" tagColor={C.moss} />
          <StackCard rotate={2}  left={76}  top={6}  title="Northwind"   tag="Offer"   tagColor={C.clay} />
          <StackCard rotate={-1} left={170} top={28} title="Paper & Pine" tag="Applied" tagColor={C.ink2} />
        </View>

        <View style={styles.ctas}>
          <PrimaryBtn onPress={() => navigation.navigate('Email')}>
            Create account
          </PrimaryBtn>
          <TouchableOpacity onPress={() => navigation.navigate('Tracker')} style={styles.signinBtn}>
            <Text style={styles.signinText}>
              I already have an account{' '}
              <Text style={styles.signinLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  top: {},
  hero: { marginTop: 56 },
  headline: {
    fontFamily: F.serif,
    fontSize: 52,
    lineHeight: 54,
    color: C.ink,
    letterSpacing: -1.5,
  },
  headlineAccent: {
    fontFamily: F.serifI,
    color: C.clay,
  },
  subtitle: {
    marginTop: 18,
    fontFamily: F.sans,
    fontSize: 16,
    lineHeight: 24,
    color: C.ink2,
    maxWidth: 300,
  },
  cardArea: { height: 150, position: 'relative' },
  stackCard: {
    position: 'absolute',
    width: 160,
    backgroundColor: C.paper,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.line,
  },
  stackCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stackCardInitial: {
    width: 24, height: 24, borderRadius: 6,
    backgroundColor: C.sand,
    alignItems: 'center', justifyContent: 'center',
  },
  stackCardInitialText: { fontFamily: F.serif, fontSize: 14, color: C.ink },
  stackCardTag: {
    borderWidth: 1, borderRadius: 999,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  stackCardTagText: { fontFamily: F.mono, fontSize: 9.5, letterSpacing: 0.8, textTransform: 'uppercase' },
  stackCardTitle: { marginTop: 14, fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3 },
  stackCardSub: { marginTop: 3, fontFamily: F.sans, fontSize: 11, color: C.ink3 },
  ctas: { gap: 12 },
  signinBtn: { alignItems: 'center', padding: 10 },
  signinText: { fontFamily: F.sans, fontSize: 14.5, color: C.ink2 },
  signinLink: { color: C.ink, textDecorationLine: 'underline' },
});
