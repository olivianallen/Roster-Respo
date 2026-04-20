import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Screen, NavBar, CompanyTile, PrimaryBtn, StarIcon, CalendarIcon } from '../components/Shared';
import { C, F } from '../tokens';
import { STATUSES, RANK_LABELS } from '../data';
import { useStore } from '../StoreContext';

const FOLLOW_UPS = [
  { id: '7d',    label: 'In 7 days',    hint: 'Standard cadence' },
  { id: '14d',   label: 'In 14 days',   hint: 'Slow-moving role' },
  { id: 'custom',label: 'Custom date',  hint: 'Pick one' },
  { id: 'none',  label: 'No reminder',  hint: "I'll check manually" },
];

export default function AppDetailsScreen({ navigation, route }) {
  const { company, role } = route.params || {};
  const { addApp } = useStore();

  const [status, setStatus]         = useState('applied');
  const [rank, setRank]             = useState(0);
  const [followUp, setFollowUp]     = useState('7d');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');

  const save = () => {
    addApp({
      company,
      role,
      status,
      rank,
      followUp,
      interviewAt: interviewDate ? { date: interviewDate, time: interviewTime } : null,
      notes: { why: '', star: '', q: '', salary: '', debrief: '', answers: '', followup: '', reflect: '' },
    });
    navigation.navigate('Tracker');
  };

  return (
    <Screen>
      <NavBar title="Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Role preview */}
        <View style={styles.previewCard}>
          <CompanyTile name={company?.name || '?'} color={company?.color || C.ink} size={44} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.roleTitle}>{role?.title}</Text>
            <Text style={styles.roleMeta}>{company?.name} · {role?.loc}</Text>
            {role?.salary ? <Text style={styles.roleSalary}>{role.salary}</Text> : null}
          </View>
        </View>

        {/* Status */}
        <Text style={styles.sectionLabel}>Status</Text>
        <View style={styles.statusGrid}>
          {STATUSES.map(s => {
            const on = s.id === status;
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => setStatus(s.id)}
                activeOpacity={0.7}
                style={[styles.statusBtn, {
                  borderColor: on ? C.ink : C.line,
                  backgroundColor: on ? C.ink : C.paper,
                }]}
              >
                <View style={[styles.statusDot, { backgroundColor: s.color }]} />
                <Text style={[styles.statusLabel, { color: on ? C.canvas : C.ink }]}>{s.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Interest */}
        <View style={styles.interestHeader}>
          <Text style={styles.sectionLabel}>My interest</Text>
          <Text style={styles.rankLabel}>{RANK_LABELS[rank]}</Text>
        </View>
        <View style={styles.starsCard}>
          {[1,2,3,4,5].map(n => {
            const filled = n <= rank;
            return (
              <TouchableOpacity
                key={n}
                onPress={() => setRank(n === rank ? 0 : n)}
                activeOpacity={0.7}
                style={[styles.starBtn, {
                  borderColor: filled ? C.clay : C.line,
                  backgroundColor: filled ? C.clay : 'transparent',
                }]}
              >
                <StarIcon filled={filled} size={18} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Interview */}
        <Text style={styles.sectionLabel}>Interview scheduled</Text>
        <View style={styles.interviewCard}>
          <View style={styles.calIconWrap}>
            <CalendarIcon color={C.ink} size={18} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor={C.ink3}
              value={interviewDate}
              onChangeText={setInterviewDate}
              style={styles.interviewInput}
            />
            <TextInput
              placeholder="HH:MM"
              placeholderTextColor={C.ink3}
              value={interviewTime}
              onChangeText={setInterviewTime}
              style={[styles.interviewInput, { fontFamily: F.mono, fontSize: 12.5, color: C.ink3 }]}
            />
          </View>
          {(interviewDate || interviewTime) && (
            <TouchableOpacity onPress={() => { setInterviewDate(''); setInterviewTime(''); }}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Follow-up */}
        <Text style={styles.sectionLabel}>Remind me to follow up</Text>
        <View style={styles.followUpCard}>
          {FOLLOW_UPS.map((o, i) => {
            const on = o.id === followUp;
            return (
              <TouchableOpacity
                key={o.id}
                onPress={() => setFollowUp(o.id)}
                activeOpacity={0.7}
                style={[styles.followUpRow, i < FOLLOW_UPS.length - 1 && styles.followUpDivider]}
              >
                <View style={[styles.radio, {
                  borderColor: on ? C.ink : C.line,
                  backgroundColor: on ? C.ink : 'transparent',
                }]}>
                  {on && (
                    <Svg width="9" height="9" viewBox="0 0 9 9">
                      <Path d="M1.5 4.5l2 2 4-4.5" stroke={C.canvas} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.followUpLabel}>{o.label}</Text>
                  <Text style={styles.followUpHint}>{o.hint}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <PrimaryBtn onPress={save} style={styles.saveBtn}>Add to tracker</PrimaryBtn>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  previewCard: {
    flexDirection: 'row', gap: 12, alignItems: 'center',
    padding: 16, borderRadius: 16,
    backgroundColor: C.paper, borderWidth: 1, borderColor: C.line,
    marginBottom: 22,
  },
  roleTitle: { fontFamily: F.serif, fontSize: 18, color: C.ink, letterSpacing: -0.3, lineHeight: 22 },
  roleMeta: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 2 },
  roleSalary: { marginTop: 6, fontFamily: F.serifI, fontSize: 15, color: C.terra, letterSpacing: -0.2 },
  sectionLabel: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
  },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
  statusBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 12,
    borderRadius: 12, borderWidth: 1.5, width: '47%',
  },
  statusDot: { width: 8, height: 8, borderRadius: 999 },
  statusLabel: { fontFamily: F.sansM, fontSize: 14 },
  interestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  rankLabel: { fontFamily: F.sans, fontSize: 13, color: C.ink2 },
  starsCard: {
    flexDirection: 'row', gap: 6, padding: 12,
    backgroundColor: C.paper, borderRadius: 14, borderWidth: 1, borderColor: C.line,
    marginBottom: 22,
  },
  starBtn: {
    flex: 1, height: 44, borderRadius: 10,
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
  },
  interviewCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14,
    backgroundColor: C.paper, borderRadius: 14, borderWidth: 1, borderColor: C.line,
    marginBottom: 22,
  },
  calIconWrap: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: C.sand,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  interviewInput: { fontFamily: F.sans, fontSize: 14, color: C.ink, padding: 0 },
  clearText: { fontFamily: F.sans, fontSize: 11.5, color: C.ink3 },
  followUpCard: {
    backgroundColor: C.paper, borderRadius: 14, borderWidth: 1, borderColor: C.line,
    overflow: 'hidden', marginBottom: 22,
  },
  followUpRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 14,
  },
  followUpDivider: { borderBottomWidth: 1, borderBottomColor: C.line },
  radio: {
    width: 18, height: 18, borderRadius: 999, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  followUpLabel: { fontFamily: F.sans, fontSize: 14.5, color: C.ink },
  followUpHint: { fontFamily: F.sans, fontSize: 11.5, color: C.ink3, marginTop: 1 },
  saveBtn: { marginTop: 4 },
});
