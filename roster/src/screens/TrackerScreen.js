import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  Screen, CompanyTile, StatusPill, StarIcon, FilterIcon, NoteIcon, ClockIcon, CalendarIcon, PlusIcon,
} from '../components/Shared';
import { C, F } from '../tokens';
import { useStore } from '../StoreContext';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function TrackerScreen({ navigation }) {
  const { user, apps } = useStore();
  const first = ((user?.name || 'there').split(' ')[0]);

  const interviewsThisWeek = apps.filter(a => {
    if (!a.interviewAt?.date) return false;
    const d = new Date(a.interviewAt.date);
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return d >= now && d <= weekEnd;
  }).length;

  return (
    <Screen>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(first[0] || 'R').toUpperCase()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={styles.calBtn}>
          <CalendarIcon color={C.ink} size={14} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Your tracker</Text>
        <Text style={styles.appCount}>
          {apps.length} application{apps.length === 1 ? '' : 's'}
        </Text>
        <Text style={styles.appSub}>
          {apps.length === 0
            ? 'Add your first one to start tracking.'
            : `${apps.filter(a => a.followUp && a.followUp !== 'none').length} with follow-ups scheduled.`}
        </Text>
      </View>

      {/* Stats chips */}
      {apps.length > 0 && (
        <View style={styles.stats}>
          <View style={styles.statChip}>
            <Text style={styles.statChipNum}>{apps.length}</Text>
            <Text style={styles.statChipLabel}> apps</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipNum}>{interviewsThisWeek}</Text>
            <Text style={styles.statChipLabel}> interviews this week</Text>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {apps.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No applications yet</Text>
            <Text style={styles.emptySub}>Tap the + below to add one.</Text>
          </View>
        ) : (
          apps.map(a => <AppCard key={a.id} app={a} navigation={navigation} />)
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => navigation.navigate('CompanySearch')}
        activeOpacity={0.85}
        style={styles.fab}
      >
        <PlusIcon color={C.canvas} size={20} />
      </TouchableOpacity>
    </Screen>
  );
}

function AppCard({ app, navigation }) {
  const noteCount = app.notes ? Object.values(app.notes).filter(v => v && v.trim()).length : 0;
  const hasInterview = app.interviewAt?.date;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <View style={[styles.card, app.isNew && styles.cardNew]}>
      <View style={styles.cardTop}>
        <CompanyTile name={app.company.name} color={app.company.color} size={40} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardRoleTitle} numberOfLines={1}>{app.role.title}</Text>
            {app.isNew && <Text style={styles.newBadge}>New</Text>}
          </View>
          <Text style={styles.cardCompany}>{app.company.name} · {app.role.loc}</Text>
          {app.role.salary ? <Text style={styles.cardSalary}>{app.role.salary}</Text> : null}

          {app.rank > 0 && (
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map(n => <StarIcon key={n} filled={n <= app.rank} size={11} />)}
            </View>
          )}

          <View style={styles.chipsRow}>
            <StatusPill status={app.status} />
            {app.followUp && app.followUp !== 'none' && (
              <View style={styles.followUpChip}>
                <ClockIcon color={C.ink2} size={11} />
                <Text style={styles.followUpText}>
                  Follow up {app.followUp === '7d' ? 'in 7 days' : app.followUp === '14d' ? 'in 14 days' : 'on date'}
                </Text>
              </View>
            )}
            {hasInterview && (
              <View style={styles.interviewChip}>
                <CalendarIcon color={C.terra} size={10} />
                <Text style={styles.interviewChipText}>
                  {formatDate(app.interviewAt.date)}{app.interviewAt.time ? ` · ${app.interviewAt.time}` : ''}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PrepNotes', { appId: app.id })}
            style={styles.notesBtn}
          >
            <NoteIcon color={C.ink} size={12} />
            <Text style={styles.notesBtnText}>
              Interview notes{noteCount > 0 ? ` · ${noteCount}/8 sections` : ' · none yet'}
            </Text>
            <Svg width="6" height="10" viewBox="0 0 8 14">
              <Path d="M1 1l6 6-6 6" stroke={C.ink3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 8,
  },
  avatar: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: F.serif, fontSize: 15, color: C.canvas },
  calBtn: {
    width: 34, height: 34, borderRadius: 10,
    borderWidth: 1, borderColor: C.line,
    backgroundColor: C.paper, alignItems: 'center', justifyContent: 'center',
  },
  header: { paddingHorizontal: 24, paddingVertical: 16 },
  eyebrow: { fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase' },
  appCount: { fontFamily: F.serif, fontSize: 36, letterSpacing: -0.8, color: C.ink, lineHeight: 42, marginTop: 6 },
  appSub: { fontFamily: F.sans, fontSize: 13, color: C.ink2, marginTop: 2 },
  stats: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, paddingBottom: 8, flexWrap: 'wrap' },
  statChip: {
    flexDirection: 'row', alignItems: 'baseline',
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: C.paper, borderRadius: 999,
    borderWidth: 1, borderColor: C.line,
  },
  statChipNum: { fontFamily: F.sansS, fontSize: 13, color: C.ink },
  statChipLabel: { fontFamily: F.sans, fontSize: 13, color: C.ink2 },
  list: { padding: 24, paddingTop: 12, paddingBottom: 100 },
  emptyState: {
    padding: 40, borderRadius: 18,
    borderWidth: 1.5, borderColor: C.line, borderStyle: 'dashed',
    alignItems: 'center', marginTop: 20,
  },
  emptyTitle: { fontFamily: F.serif, fontSize: 20, color: C.ink, letterSpacing: -0.3 },
  emptySub: { marginTop: 6, fontFamily: F.sans, fontSize: 13, color: C.ink2 },
  card: {
    padding: 14, borderRadius: 16,
    backgroundColor: C.paper, borderWidth: 1, borderColor: C.line,
    marginBottom: 10,
  },
  cardNew: { borderColor: `${C.clay}55` },
  cardTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  cardTitleRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  cardRoleTitle: { flex: 1, fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3, lineHeight: 22 },
  newBadge: { fontFamily: F.mono, fontSize: 9, color: C.clay, letterSpacing: 0.6, textTransform: 'uppercase' },
  cardCompany: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 2 },
  cardSalary: { marginTop: 4, fontFamily: F.serifI, fontSize: 14, color: C.terra, letterSpacing: -0.2 },
  starsRow: { flexDirection: 'row', gap: 2, marginTop: 6 },
  chipsRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' },
  followUpChip: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  followUpText: { fontFamily: F.sans, fontSize: 11.5, color: C.ink2 },
  interviewChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999,
    backgroundColor: '#F5EDEA',
  },
  interviewChipText: { fontFamily: F.sansM, fontSize: 11.5, color: C.terra },
  notesBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 10, borderWidth: 1, borderColor: C.line,
    backgroundColor: C.sand, marginTop: 10,
  },
  notesBtnText: { flex: 1, fontFamily: F.sans, fontSize: 12.5, color: C.ink },
  fab: {
    position: 'absolute', bottom: 30, right: 20,
    width: 58, height: 58, borderRadius: 999,
    backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center',
    shadowColor: C.ink, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
});
