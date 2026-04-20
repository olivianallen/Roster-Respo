import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SCREEN_W = Dimensions.get('window').width;
const GRID_PAD = 20;
const CELL_GAP = 3;
const CELL_W = Math.floor((SCREEN_W - GRID_PAD * 2 - CELL_GAP * 6) / 7);
import { Screen, NavBar } from '../components/Shared';
import { C, F } from '../tokens';
import { useStore } from '../StoreContext';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CalendarScreen({ navigation }) {
  const { apps } = useStore();
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const withDates = apps.filter(a => a?.interviewAt?.date);
  const upcoming = withDates
    .map(a => ({ ...a, _d: new Date(a.interviewAt.date + 'T' + (a.interviewAt.time || '09:00')) }))
    .sort((x, y) => x._d - y._d)
    .filter(a => a._d >= today);

  const y = cursor.getFullYear();
  const m = cursor.getMonth();
  const startDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  const monthName = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const dayMap = {};
  withDates.forEach(a => {
    const dt = new Date(a.interviewAt.date);
    if (dt.getFullYear() === y && dt.getMonth() === m) {
      const day = dt.getDate();
      (dayMap[day] = dayMap[day] || []).push(a);
    }
  });

  const prevMonth = () => setCursor(new Date(y, m - 1, 1));
  const nextMonth = () => setCursor(new Date(y, m + 1, 1));

  const formatCalDate = (d) => {
    return d.toLocaleDateString('en-US', { month: 'short' });
  };

  return (
    <Screen>
      <NavBar title="Calendar" onBack={() => navigation.goBack()} />

      <View style={styles.upcomingHeader}>
        <Text style={styles.upcomingEyebrow}>Interviews</Text>
        <Text style={styles.upcomingCount}>{upcoming.length} upcoming</Text>
      </View>

      {/* Month nav */}
      <View style={styles.monthNav}>
        <TouchableOpacity onPress={prevMonth} style={styles.navArrow}>
          <Svg width="7" height="12" viewBox="0 0 8 14">
            <Path d="M7 1L1 7l6 6" stroke={C.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.monthName}>{monthName}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navArrow}>
          <Svg width="7" height="12" viewBox="0 0 8 14">
            <Path d="M1 1l6 6-6 6" stroke={C.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={styles.dowRow}>
        {DOW.map((d, i) => (
          <Text key={i} style={styles.dowLabel}>{d}</Text>
        ))}
      </View>

      {/* Month grid */}
      <View style={styles.grid}>
        {cells.map((d, i) => {
          const isToday = d && y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
          const evts = d ? (dayMap[d] || []) : [];
          return (
            <View
              key={i}
              style={[
                styles.cell,
                isToday && styles.cellToday,
                evts.length > 0 && !isToday && styles.cellHasEvent,
              ]}
            >
              {d ? (
                <>
                  <Text style={[styles.cellNum, isToday && styles.cellNumToday, evts.length && !isToday && styles.cellNumBold]}>
                    {d}
                  </Text>
                  {evts.length > 0 && !isToday && (
                    <View style={styles.dotsRow}>
                      {evts.slice(0, 3).map((_, k) => (
                        <View key={k} style={styles.eventDot} />
                      ))}
                    </View>
                  )}
                  {evts.length > 0 && isToday && (
                    <Text style={styles.todayCount}>{evts.length}</Text>
                  )}
                </>
              ) : null}
            </View>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.upcomingList}>
        <Text style={styles.upcomingListLabel}>Upcoming</Text>
        {upcoming.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No interviews scheduled</Text>
            <Text style={styles.emptySub}>Add a date on an application to see it here.</Text>
          </View>
        ) : (
          upcoming.slice(0, 8).map(a => (
            <TouchableOpacity
              key={a.id}
              onPress={() => navigation.navigate('PrepNotes', { appId: a.id })}
              activeOpacity={0.7}
              style={styles.upcomingRow}
            >
              <View style={styles.dateTile}>
                <Text style={styles.dateTileMonth}>{formatCalDate(a._d)}</Text>
                <Text style={styles.dateTileDay}>{a._d.getDate()}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.upcomingRole} numberOfLines={1}>{a.role.title}</Text>
                <Text style={styles.upcomingMeta}>
                  {a.company.name}{a.interviewAt.time ? ` · ${a.interviewAt.time}` : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  upcomingHeader: { paddingHorizontal: 24, paddingBottom: 6 },
  upcomingEyebrow: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  upcomingCount: { fontFamily: F.serif, fontSize: 32, letterSpacing: -0.7, color: C.ink, lineHeight: 40, marginTop: 4 },
  monthNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  navArrow: {
    width: 32, height: 32, borderRadius: 10,
    borderWidth: 1, borderColor: C.line, backgroundColor: C.paper,
    alignItems: 'center', justifyContent: 'center',
  },
  monthName: { fontFamily: F.serif, fontSize: 19, color: C.ink, letterSpacing: -0.3 },
  dowRow: {
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 4,
  },
  dowLabel: {
    flex: 1, textAlign: 'center',
    fontFamily: F.mono, fontSize: 10, color: C.ink3, letterSpacing: 1.2,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: GRID_PAD, gap: CELL_GAP,
  },
  cell: {
    width: CELL_W,
    height: CELL_W,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellToday: { backgroundColor: C.ink },
  cellHasEvent: { backgroundColor: C.paper, borderWidth: 1, borderColor: C.line },
  cellNum: { fontFamily: F.sans, fontSize: 12, color: C.ink },
  cellNumToday: { color: C.canvas, fontFamily: F.sansS },
  cellNumBold: { fontFamily: F.sansS },
  dotsRow: { flexDirection: 'row', gap: 1.5, marginTop: 2 },
  eventDot: { width: 4, height: 4, borderRadius: 999, backgroundColor: C.clay },
  todayCount: { fontFamily: F.mono, fontSize: 9, color: C.canvas, marginTop: 1 },
  upcomingList: { padding: 20, paddingBottom: 40 },
  upcomingListLabel: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
  },
  emptyCard: {
    padding: 24, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.line, borderStyle: 'dashed',
    alignItems: 'center',
  },
  emptyTitle: { fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3 },
  emptySub: { marginTop: 4, fontFamily: F.sans, fontSize: 12, color: C.ink3 },
  upcomingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: 14,
    borderWidth: 1, borderColor: C.line, backgroundColor: C.paper,
    marginBottom: 8,
  },
  dateTile: {
    width: 46, flexShrink: 0, alignItems: 'center',
    paddingVertical: 4, borderRadius: 8, backgroundColor: C.sand,
  },
  dateTileMonth: {
    fontFamily: F.mono, fontSize: 9.5, color: C.terra, letterSpacing: 1, textTransform: 'uppercase',
  },
  dateTileDay: { fontFamily: F.serif, fontSize: 22, color: C.ink, lineHeight: 26 },
  upcomingRole: { fontFamily: F.serif, fontSize: 16, color: C.ink, letterSpacing: -0.3 },
  upcomingMeta: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 2 },
});
