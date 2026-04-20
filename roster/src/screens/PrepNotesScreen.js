import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import { Screen, NavBar, CompanyTile } from '../components/Shared';
import { C, F } from '../tokens';
import { PREP_TEMPLATES } from '../data';
import { useStore } from '../StoreContext';

export default function PrepNotesScreen({ navigation, route }) {
  const { appId } = route.params || {};
  const { apps, updateApp } = useStore();
  const app = apps.find(a => a.id === appId);

  const [phase, setPhase] = useState('before');
  const [activeId, setActiveId] = useState('why');
  const [notes, setNotes] = useState(app?.notes || {});
  const debounceRef = useRef(null);

  const phaseSections = PREP_TEMPLATES.filter(t => t.group === phase);
  const filledBefore = PREP_TEMPLATES.filter(t => t.group === 'before' && (notes[t.id] || '').trim()).length;
  const filledAfter  = PREP_TEMPLATES.filter(t => t.group === 'after'  && (notes[t.id] || '').trim()).length;

  const currentSection = PREP_TEMPLATES.find(t => t.id === activeId);
  const currentText = notes[activeId] || '';

  const updateNote = useCallback((val) => {
    const next = { ...notes, [activeId]: val };
    setNotes(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateApp(appId, { notes: next });
    }, 400);
  }, [notes, activeId, appId, updateApp]);

  const applyTemplate = () => {
    if (!currentText.trim() && currentSection) {
      updateNote(currentSection.starter);
    }
  };

  const switchPhase = (p) => {
    setPhase(p);
    const first = PREP_TEMPLATES.find(t => t.group === p);
    if (first) setActiveId(first.id);
  };

  const save = () => {
    updateApp(appId, { notes });
    navigation.goBack();
  };

  if (!app) return null;

  return (
    <Screen>
      <NavBar title="Interview notes" onBack={() => navigation.goBack()} />

      {/* Context */}
      <View style={styles.context}>
        <CompanyTile name={app.company.name} color={app.company.color} size={40} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.roleName} numberOfLines={1}>{app.role.title}</Text>
          <Text style={styles.companyName}>{app.company.name}</Text>
        </View>
      </View>

      {/* Before/After toggle */}
      <View style={styles.toggleWrap}>
        <View style={styles.toggle}>
          {[
            { id: 'before', label: 'Before', count: filledBefore },
            { id: 'after',  label: 'After',  count: filledAfter  },
          ].map(p => {
            const on = p.id === phase;
            return (
              <TouchableOpacity
                key={p.id}
                onPress={() => switchPhase(p.id)}
                activeOpacity={0.7}
                style={[styles.toggleBtn, on && styles.toggleBtnActive]}
              >
                <Text style={[styles.toggleLabel, { color: C.ink }]}>{p.label}</Text>
                <View style={[styles.toggleCount, { backgroundColor: on ? C.sand : 'transparent' }]}>
                  <Text style={[styles.toggleCountText, { color: on ? C.ink2 : C.ink3 }]}>
                    {p.count}/4
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Section chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContent}>
        {phaseSections.map(t => {
          const on = t.id === activeId;
          const has = (notes[t.id] || '').trim().length > 0;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => setActiveId(t.id)}
              activeOpacity={0.7}
              style={[styles.sectionChip, {
                borderColor: on ? C.ink : C.line,
                backgroundColor: on ? C.ink : C.paper,
              }]}
            >
              {has && <View style={[styles.chipDot, { backgroundColor: on ? C.clay : C.moss }]} />}
              <Text style={[styles.sectionChipText, { color: on ? C.canvas : C.ink }]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Editor */}
      <View style={styles.editorWrap}>
        <View style={styles.editor}>
          <View style={styles.editorHeader}>
            <Text style={styles.editorLabel}>{currentSection?.label}</Text>
            {!currentText.trim() && (
              <TouchableOpacity onPress={applyTemplate}>
                <Text style={styles.templateBtn}>+ Use template</Text>
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            multiline
            value={currentText}
            onChangeText={updateNote}
            placeholder={`Jot down your ${phase === 'before' ? 'prep' : 'post-interview'} notes here…`}
            placeholderTextColor={C.ink3}
            style={styles.textarea}
            textAlignVertical="top"
          />
          <View style={styles.editorFooter}>
            <Text style={styles.charCount}>{currentText.length} chars</Text>
            <Text style={styles.autosave}>Autosaves as you type</Text>
          </View>
        </View>
      </View>

      <View style={styles.saveWrap}>
        <TouchableOpacity onPress={save} style={styles.doneBtn}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  context: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 24, paddingVertical: 14,
  },
  roleName: { fontFamily: F.serif, fontSize: 20, color: C.ink, letterSpacing: -0.4, lineHeight: 24 },
  companyName: { fontFamily: F.sans, fontSize: 12, color: C.ink3, marginTop: 2 },
  toggleWrap: { paddingHorizontal: 20, paddingBottom: 10 },
  toggle: {
    flexDirection: 'row',
    backgroundColor: C.sand, borderRadius: 12, padding: 3,
    borderWidth: 1, borderColor: C.line,
  },
  toggleBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 9, borderRadius: 9, gap: 8,
  },
  toggleBtnActive: { backgroundColor: C.paper },
  toggleLabel: { fontFamily: F.sansM, fontSize: 13 },
  toggleCount: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  toggleCountText: { fontFamily: F.mono, fontSize: 10 },
  chipsScroll: { flexGrow: 0 },
  chipsContent: { paddingHorizontal: 16, gap: 6, paddingBottom: 10 },
  sectionChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 999, borderWidth: 1,
  },
  chipDot: { width: 5, height: 5, borderRadius: 999 },
  sectionChipText: { fontFamily: F.sansM, fontSize: 12.5 },
  editorWrap: { flex: 1, paddingHorizontal: 20, paddingBottom: 10 },
  editor: {
    flex: 1, borderRadius: 16, backgroundColor: C.paper,
    borderWidth: 1, borderColor: C.line, padding: 14,
  },
  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  editorLabel: {
    fontFamily: F.mono, fontSize: 10.5, color: C.ink3, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  templateBtn: { fontFamily: F.mono, fontSize: 10.5, color: C.clay, letterSpacing: 1, textTransform: 'uppercase' },
  textarea: {
    flex: 1, fontFamily: F.sans, fontSize: 14.5, lineHeight: 22, color: C.ink, padding: 0,
  },
  editorFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  charCount: { fontFamily: F.mono, fontSize: 10, color: C.ink3 },
  autosave: { fontFamily: F.mono, fontSize: 10, color: C.ink3 },
  saveWrap: { paddingHorizontal: 28, paddingBottom: 24 },
  doneBtn: {
    height: 56, borderRadius: 16, backgroundColor: C.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  doneBtnText: { fontFamily: F.sansS, fontSize: 16, color: C.canvas },
});
