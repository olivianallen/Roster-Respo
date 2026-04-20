import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Screen, CompanyTile, ChevronRight, SearchIcon, PlusIcon } from '../components/Shared';
import { C, F } from '../tokens';
import { COMPANIES } from '../data';

export default function CompanySearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? COMPANIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.domain.toLowerCase().includes(query.toLowerCase())
      )
    : COMPANIES.slice(0, 5);

  const pick = (company) => navigation.navigate('RolePicker', { company });

  const renderItem = ({ item: c }) => (
    <TouchableOpacity
      onPress={() => pick(c)}
      activeOpacity={0.7}
      style={styles.companyRow}
    >
      <CompanyTile name={c.name} color={c.color} size={40} />
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{c.name}</Text>
        <Text style={styles.companyMeta} numberOfLines={1}>{c.domain} · {c.kind}</Text>
      </View>
      <ChevronRight color={C.ink3} size={14} />
    </TouchableOpacity>
  );

  const ListHeader = (
    <Text style={styles.sectionLabel}>
      {query.trim() ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}` : 'Suggested'}
    </Text>
  );

  const EmptyState = (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyText}>
        No match for "<Text style={{ color: C.ink }}>{query}</Text>"
      </Text>
      <TouchableOpacity
        onPress={() => pick({ id: 'custom', name: query, domain: '', kind: 'Custom entry', color: C.clay })}
        style={styles.addCustomBtn}
      >
        <View style={styles.addCustomIcon}>
          <PlusIcon color={C.ink} size={14} />
        </View>
        <View>
          <Text style={styles.addCustomTitle}>Add "{query}"</Text>
          <Text style={styles.addCustomSub}>Create a custom entry</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add application</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <SearchIcon color={C.ink2} size={16} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search company or paste a job URL"
            placeholderTextColor={C.ink3}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
              <Text style={styles.clearX}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={c => c.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 52,
  },
  cancelBtn: { width: 60 },
  cancelText: { fontFamily: F.sans, fontSize: 15, color: C.ink2 },
  headerTitle: {
    flex: 1, textAlign: 'center', fontFamily: F.sansS, fontSize: 15, color: C.ink,
  },
  searchWrap: { paddingHorizontal: 20, paddingBottom: 8 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.sand, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11,
    borderWidth: 1, borderColor: C.line,
  },
  searchInput: {
    flex: 1, fontFamily: F.sans, fontSize: 15, color: C.ink, padding: 0,
  },
  clearBtn: {
    width: 18, height: 18, borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  clearX: { fontSize: 10, color: C.paper },
  sectionLabel: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3,
    letterSpacing: 1.2, textTransform: 'uppercase',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  companyRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: C.line,
  },
  companyInfo: { flex: 1, minWidth: 0 },
  companyName: { fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3 },
  companyMeta: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 1 },
  emptyWrap: { paddingTop: 28, paddingHorizontal: 4 },
  emptyText: { fontFamily: F.sans, fontSize: 14, color: C.ink2, marginBottom: 14 },
  addCustomBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.line, borderStyle: 'dashed',
  },
  addCustomIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.sand,
    alignItems: 'center', justifyContent: 'center',
  },
  addCustomTitle: { fontFamily: F.serif, fontSize: 17, color: C.ink, letterSpacing: -0.3 },
  addCustomSub: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 1 },
});
