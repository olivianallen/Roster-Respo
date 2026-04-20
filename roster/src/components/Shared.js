import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { C, F } from '../tokens';

export function Screen({ children, bg = C.canvas, scroll = false, style }) {
  return (
    <View style={[styles.screen, { backgroundColor: bg }, style]}>
      {children}
    </View>
  );
}

export function PrimaryBtn({ children, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled, style]}
    >
      <Text style={[styles.primaryBtnText, disabled && styles.primaryBtnTextDisabled]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function GhostBtn({ children, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.ghostBtn, style]}>
      <Text style={styles.ghostBtnText}>{children}</Text>
    </TouchableOpacity>
  );
}

export function Back({ onPress, step }) {
  return (
    <View style={styles.backRow}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.backBtn}>
        <ChevronLeft color={C.ink} size={18} />
      </TouchableOpacity>
      {step != null && (
        <Text style={styles.stepLabel}>Step {step + 1} of 5</Text>
      )}
      <View style={{ width: 40 }} />
    </View>
  );
}

export function StepDots({ step, total = 5 }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i <= step ? C.clay : C.sand2 }]}
        />
      ))}
    </View>
  );
}

export function NavBar({ title, onBack, rightAction }) {
  return (
    <View style={styles.navbar}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.6} style={styles.navBackBtn}>
          <ChevronLeft color={C.ink2} size={16} />
          <Text style={styles.navBackText}>Back</Text>
        </TouchableOpacity>
      ) : <View style={{ width: 60 }} />}
      {title ? <Text style={styles.navTitle}>{title}</Text> : <View style={{ flex: 1 }} />}
      {rightAction || <View style={{ width: 60 }} />}
    </View>
  );
}

export function Mark({ size = 36, color = C.ink }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      <Rect x="6" y="10" width="22" height="18" rx="3" fill={color} opacity="0.18" />
      <Rect x="8" y="7" width="22" height="18" rx="3" fill={color} opacity="0.45" />
      <Rect x="10" y="4" width="22" height="18" rx="3" fill={color} />
      <Path d="M14 10h14M14 14h10" stroke={C.canvas} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

export function StarIcon({ filled, size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M10 2l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L10 14.5l-5 2.8 1.2-5.6L2 7.8l5.6-.6z"
        fill={filled ? C.clay : 'none'}
        stroke={filled ? C.clay : C.sand2}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20">
      <Circle cx="10" cy="10" r="9" fill={C.moss} />
      <Path d="M5.5 10.5l3 3 6-6.5" stroke={C.canvas} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronLeft({ color = C.ink, size = 14 }) {
  return (
    <Svg width={size * 0.6} height={size} viewBox="0 0 8 14">
      <Path d="M7 1L1 7l6 6" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRight({ color = C.ink3, size = 14 }) {
  return (
    <Svg width={size * 0.6} height={size} viewBox="0 0 8 14">
      <Path d="M1 1l6 6-6 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlusIcon({ color = C.ink, size = 14 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path d="M7 1v12M1 7h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function CalendarIcon({ color = C.ink, size = 18 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Rect x="2" y="3.5" width="14" height="12" rx="2" fill="none" stroke={color} strokeWidth="1.3" />
      <Path d="M2 7h14M6 2v3M12 2v3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}

export function ClockIcon({ color = C.ink2, size = 11 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Circle cx="6" cy="6" r="5" fill="none" stroke={color} strokeWidth="1.2" />
      <Path d="M6 3v3l2 1.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function NoteIcon({ color = C.ink, size = 12 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Path d="M2 2h6l2 2v6H2z" fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <Path d="M4 6h4M4 8h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ color = C.ink2, size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Circle cx="7" cy="7" r="5" fill="none" stroke={color} strokeWidth="1.5" />
      <Path d="M11 11l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function FilterIcon({ color = C.ink, size = 14 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path d="M1 2h12M3 7h8M5 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function CompanyTile({ name, color, size = 40 }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size * 0.28,
      backgroundColor: color, alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontFamily: F.serif, fontSize: size * 0.45, color: C.canvas }}>
        {name[0]}
      </Text>
    </View>
  );
}

export function StatusPill({ status }) {
  const colors = { saved: C.ink3, applied: C.clay, screen: C.moss, onsite: C.terra };
  const labels = { saved: 'Saved', applied: 'Applied', screen: 'Screen', onsite: 'Onsite' };
  return (
    <View style={styles.statusPill}>
      <View style={[styles.statusDot, { backgroundColor: colors[status] || C.ink3 }]} />
      <Text style={styles.statusText}>{labels[status] || status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  primaryBtn: {
    height: 56, borderRadius: 16,
    backgroundColor: C.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnDisabled: { backgroundColor: C.sand2 },
  primaryBtnText: { fontFamily: F.sansS, fontSize: 16, color: C.canvas, letterSpacing: -0.1 },
  primaryBtnTextDisabled: { color: C.ink3 },
  ghostBtn: {
    height: 52, borderRadius: 16,
    borderWidth: 1, borderColor: C.line,
    alignItems: 'center', justifyContent: 'center',
  },
  ghostBtnText: { fontFamily: F.sansM, fontSize: 15, color: C.ink, letterSpacing: -0.1 },
  backRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginLeft: -10,
  },
  stepLabel: {
    fontFamily: F.mono, fontSize: 11, color: C.ink3,
    letterSpacing: 1.5, textTransform: 'uppercase',
  },
  dotsRow: { flexDirection: 'row', gap: 6, marginTop: 22 },
  dot: { height: 3, flex: 1, borderRadius: 2 },
  navbar: {
    height: 44, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16,
  },
  navBackBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    width: 60,
  },
  navBackText: { fontFamily: F.sans, fontSize: 15, color: C.ink2 },
  navTitle: {
    flex: 1, textAlign: 'center',
    fontFamily: F.sansS, fontSize: 15, color: C.ink,
  },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 9, paddingVertical: 3,
    borderRadius: 999, backgroundColor: C.sand,
  },
  statusDot: { width: 6, height: 6, borderRadius: 999 },
  statusText: { fontFamily: F.sansM, fontSize: 11.5, color: C.ink },
});
