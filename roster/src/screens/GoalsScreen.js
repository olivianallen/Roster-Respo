import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Screen, Back, StepDots, PrimaryBtn } from '../components/Shared';
import { C, F } from '../tokens';
import { GOALS } from '../data';

export default function GoalsScreen({ navigation, route }) {
  const { email, name, role } = route.params || {};
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <Screen>
      <View style={styles.inner}>
        <Back onPress={() => navigation.goBack()} step={3} />
        <StepDots step={3} />

        <View style={styles.titleBlock}>
          <Text style={styles.title}>What are you{'\n'}looking for?</Text>
          <Text style={styles.sub}>Pick any that apply. We'll tailor reminders and insights.</Text>
        </View>

        <View style={styles.grid}>
          {GOALS.map(g => {
            const on = selected.includes(g.id);
            return (
              <TouchableOpacity
                key={g.id}
                onPress={() => toggle(g.id)}
                activeOpacity={0.8}
                style={[styles.goalCard, {
                  borderColor: on ? C.ink : C.line,
                  backgroundColor: on ? C.ink : C.paper,
                }]}
              >
                <Text style={[styles.goalLabel, { color: on ? C.canvas : C.ink }]}>{g.label}</Text>
                <Text style={[styles.goalHint, { color: on ? 'rgba(250,245,235,0.7)' : C.ink3 }]}>{g.hint}</Text>
                {on && (
                  <View style={styles.checkBadge}>
                    <Svg width="10" height="10" viewBox="0 0 10 10">
                      <Path d="M2 5l2 2 4-4.5" stroke={C.canvas} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <PrimaryBtn
          onPress={() => navigation.navigate('Notify', { email, name, role, goals: selected })}
          disabled={selected.length === 0}
        >
          {`Continue${selected.length > 0 ? ` · ${selected.length}` : ''}`}
        </PrimaryBtn>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, paddingHorizontal: 28, paddingBottom: 24 },
  titleBlock: { marginTop: 40 },
  title: { fontFamily: F.serif, fontSize: 34, lineHeight: 38, color: C.ink, letterSpacing: -0.8 },
  sub: { marginTop: 10, fontFamily: F.sans, fontSize: 14.5, color: C.ink2, lineHeight: 22 },
  grid: {
    marginTop: 28,
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  goalCard: {
    width: '47%', minHeight: 76,
    padding: 14, borderRadius: 16, borderWidth: 1.5,
    position: 'relative',
  },
  goalLabel: { fontFamily: F.serif, fontSize: 19, letterSpacing: -0.3 },
  goalHint: { marginTop: 2, fontFamily: F.sans, fontSize: 11.5 },
  checkBadge: {
    position: 'absolute', top: 12, right: 12,
    width: 18, height: 18, borderRadius: 999,
    backgroundColor: C.clay,
    alignItems: 'center', justifyContent: 'center',
  },
});
