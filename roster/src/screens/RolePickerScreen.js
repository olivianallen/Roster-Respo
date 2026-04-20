import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Screen, NavBar, CompanyTile, PlusIcon } from '../components/Shared';
import { C, F } from '../tokens';
import { ROLES_BY_COMPANY } from '../data';

export default function RolePickerScreen({ navigation, route }) {
  const { company } = route.params || {};
  const roles = ROLES_BY_COMPANY[company?.id] || [];

  const pick = (role) => navigation.navigate('AppDetails', { company, role });

  const pickCustom = () => navigation.navigate('AppDetails', {
    company,
    role: { id: 'custom', title: 'Custom Role', loc: '', type: 'Full-time', posted: 'now', salary: '' },
  });

  return (
    <Screen>
      <NavBar onBack={() => navigation.goBack()} />

      <View style={styles.companyHeader}>
        <CompanyTile name={company?.name || '?'} color={company?.color || C.ink} size={52} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.companyName}>{company?.name}</Text>
          <Text style={styles.companyKind}>{company?.kind}</Text>
        </View>
      </View>

      <View style={styles.openLabel}>
        <Text style={styles.openLabelText}>Open roles</Text>
        <Text style={styles.openLabelCount}>{roles.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {roles.map(r => (
          <TouchableOpacity
            key={r.id}
            onPress={() => pick(r)}
            activeOpacity={0.7}
            style={styles.roleCard}
          >
            <View style={styles.roleCardTop}>
              <Text style={styles.roleTitle}>{r.title}</Text>
              <Text style={styles.rolePosted}>{r.posted}</Text>
            </View>
            {r.salary ? (
              <Text style={styles.roleSalary}>{r.salary}</Text>
            ) : null}
            <View style={styles.roleMeta}>
              <View style={styles.typePill}>
                <Text style={styles.typePillText}>{r.type}</Text>
              </View>
              <Text style={styles.roleLoc}>{r.loc}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={pickCustom} activeOpacity={0.7} style={styles.customBtn}>
          <View style={styles.customBtnIcon}>
            <PlusIcon color={C.ink} size={12} />
          </View>
          <View>
            <Text style={styles.customBtnTitle}>Add a role not listed</Text>
            <Text style={styles.customBtnSub}>Enter title and details manually</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  companyHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 28, paddingVertical: 16,
  },
  companyName: { fontFamily: F.serif, fontSize: 26, color: C.ink, letterSpacing: -0.5, lineHeight: 30 },
  companyKind: { fontFamily: F.sans, fontSize: 12.5, color: C.ink3, marginTop: 3 },
  openLabel: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 28, paddingBottom: 10,
  },
  openLabelText: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  openLabelCount: { fontFamily: F.mono, fontSize: 10.5, color: C.ink3 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  roleCard: {
    padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: C.line,
    backgroundColor: C.paper, marginBottom: 8,
  },
  roleCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  roleTitle: { flex: 1, fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3, lineHeight: 22 },
  rolePosted: { fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 0.6, textTransform: 'uppercase' },
  roleSalary: {
    marginTop: 6, fontFamily: F.serifI, fontSize: 15.5, color: C.terra, letterSpacing: -0.2,
  },
  roleMeta: { marginTop: 6, flexDirection: 'row', gap: 10, alignItems: 'center' },
  typePill: {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, backgroundColor: C.sand,
  },
  typePillText: { fontFamily: F.mono, fontSize: 10.5, color: C.ink2 },
  roleLoc: { fontFamily: F.sans, fontSize: 12, color: C.ink2 },
  customBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.line, borderStyle: 'dashed',
    marginTop: 4,
  },
  customBtnIcon: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: C.sand, alignItems: 'center', justifyContent: 'center',
  },
  customBtnTitle: { fontFamily: F.sansM, fontSize: 14, color: C.ink },
  customBtnSub: { fontFamily: F.sans, fontSize: 11.5, color: C.ink3 },
});
