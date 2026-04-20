import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Screen, PrimaryBtn, GhostBtn } from '../components/Shared';
import { C, F } from '../tokens';

function TaskRow({ n, title }) {
  return (
    <View style={styles.taskRow}>
      <View style={styles.taskNum}>
        <Text style={styles.taskNumText}>{n}</Text>
      </View>
      <Text style={styles.taskTitle}>{title}</Text>
      <Svg width="8" height="14" viewBox="0 0 8 14">
        <Path d="M1 1l6 6-6 6" stroke={C.ink3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

export default function DoneScreen({ navigation, route }) {
  const { name } = route.params || {};
  const first = (name || 'there').split(' ')[0];

  return (
    <Screen>
      <View style={styles.inner}>
        <View style={styles.topSection}>
          <View style={styles.checkCircle}>
            <Svg width="30" height="30" viewBox="0 0 30 30">
              <Path d="M7 15.5l5 5 11-12" stroke={C.canvas} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <Text style={styles.welcome}>Welcome, {first}.</Text>
          <Text style={styles.sub}>
            Your tracker is ready. Add your first application to get started — you can paste a link and we'll autofill the rest.
          </Text>
        </View>

        <View style={styles.tasks}>
          <Text style={styles.tasksLabel}>Getting started</Text>
          <TaskRow n={1} title="Add your first application" />
          <TaskRow n={2} title="Connect your email for auto-tracking" />
          <TaskRow n={3} title="Import from LinkedIn (optional)" />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.ctas}>
          <PrimaryBtn onPress={() => navigation.navigate('CompanySearch')}>
            Add first application
          </PrimaryBtn>
          <GhostBtn onPress={() => navigation.navigate('Tracker')}>
            Skip · go to dashboard
          </GhostBtn>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, paddingHorizontal: 28, paddingBottom: 24, paddingTop: 20 },
  topSection: { marginTop: 40 },
  checkCircle: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: C.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  welcome: {
    marginTop: 28, fontFamily: F.serif,
    fontSize: 40, lineHeight: 42, color: C.ink, letterSpacing: -1,
  },
  sub: {
    marginTop: 12, fontFamily: F.sans, fontSize: 15, color: C.ink2, lineHeight: 23, maxWidth: 300,
  },
  tasks: { marginTop: 32 },
  tasksLabel: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.line,
  },
  taskNum: {
    width: 24, height: 24, borderRadius: 999,
    borderWidth: 1.5, borderColor: C.line,
    alignItems: 'center', justifyContent: 'center',
  },
  taskNumText: { fontFamily: F.mono, fontSize: 11, color: C.ink3 },
  taskTitle: { flex: 1, fontFamily: F.sans, fontSize: 14.5, color: C.ink },
  ctas: { gap: 10 },
});
