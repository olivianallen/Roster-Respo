import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen, Back, StepDots, PrimaryBtn, Mark } from '../components/Shared';
import { C, F } from '../tokens';
import { useStore } from '../StoreContext';

function BenefitRow({ emoji, title, desc }) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.benefitIcon}>
        <Text style={styles.benefitEmoji}>{emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDesc}>{desc}</Text>
      </View>
    </View>
  );
}

export default function NotifyScreen({ navigation, route }) {
  const { email, name, role, goals } = route.params || {};
  const { saveUser } = useStore();

  const proceed = (notificationsEnabled) => {
    saveUser({ email, name, role, goals, notificationsEnabled });
    navigation.navigate('Done', { name });
  };

  return (
    <Screen>
      <View style={styles.inner}>
        <Back onPress={() => navigation.goBack()} step={4} />
        <StepDots step={4} />

        <View style={styles.titleBlock}>
          <Text style={styles.title}>Never miss{'\n'}a follow-up.</Text>
          <Text style={styles.sub}>Roster sends gentle nudges when it's time to check in on an application.</Text>
        </View>

        <View style={styles.mockNotif}>
          <View style={styles.appIconWrap}>
            <Mark size={22} color={C.canvas} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifApp}>Roster</Text>
              <Text style={styles.notifTime}>now</Text>
            </View>
            <Text style={styles.notifBody}>
              <Text style={styles.notifBold}>Follow up with Atelier Oaks.</Text>
              {' '}It's been 7 days since you applied.
            </Text>
          </View>
        </View>

        <View style={styles.benefits}>
          <BenefitRow emoji="🕯" title="Follow-up reminders" desc="7 / 14 / 21 days after applying" />
          <BenefitRow emoji="📅" title="Interview prep" desc="24 hours before scheduled calls" />
          <BenefitRow emoji="✏️" title="Weekly digest" desc="Mondays at 9am · your pipeline" />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.ctas}>
          <PrimaryBtn onPress={() => proceed(true)}>Turn on notifications</PrimaryBtn>
          <TouchableOpacity onPress={() => proceed(false)} style={styles.skipBtn}>
            <Text style={styles.skipText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, paddingHorizontal: 28, paddingBottom: 24 },
  titleBlock: { marginTop: 40 },
  title: { fontFamily: F.serif, fontSize: 34, lineHeight: 38, color: C.ink, letterSpacing: -0.8 },
  sub: { marginTop: 10, fontFamily: F.sans, fontSize: 14.5, color: C.ink2, lineHeight: 22 },
  mockNotif: {
    marginTop: 36, flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    backgroundColor: C.paper, borderRadius: 18, padding: 14,
    borderWidth: 1, borderColor: C.line,
  },
  appIconWrap: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  notifApp: { fontFamily: F.sansS, fontSize: 13, color: C.ink },
  notifTime: { fontFamily: F.sans, fontSize: 11, color: C.ink3 },
  notifBody: { marginTop: 2, fontFamily: F.sans, fontSize: 13.5, color: C.ink, lineHeight: 19 },
  notifBold: { fontFamily: F.sansS },
  benefits: { marginTop: 24, gap: 12 },
  benefitRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  benefitIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: C.sand, alignItems: 'center', justifyContent: 'center',
  },
  benefitEmoji: { fontSize: 16 },
  benefitTitle: { fontFamily: F.sansM, fontSize: 14, color: C.ink },
  benefitDesc: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 1 },
  ctas: { gap: 10 },
  skipBtn: { alignItems: 'center', padding: 12 },
  skipText: { fontFamily: F.sans, fontSize: 14, color: C.ink2 },
});
