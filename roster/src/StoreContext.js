import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreContext = createContext(null);

const STORAGE_KEY = 'roster.state';

const initialState = {
  user: null,
  apps: [],
};

export function StoreProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [apps, setApps]     = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try {
          const s = JSON.parse(raw);
          if (s.user)  setUser(s.user);
          if (s.apps)  setApps(s.apps);
        } catch (_) {}
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((u, a) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u, apps: a }));
  }, []);

  const saveUser = useCallback((u) => {
    setUser(u);
    setApps(prev => { persist(u, prev); return prev; });
  }, [persist]);

  const addApp = useCallback((app) => {
    setApps(prev => {
      const next = [{ ...app, id: Date.now().toString(), isNew: true, createdAt: new Date().toISOString() }, ...prev];
      persist(user, next);
      setTimeout(() => {
        setApps(cur => cur.map(a => a.id === next[0].id ? { ...a, isNew: false } : a));
      }, 2400);
      return next;
    });
  }, [user, persist]);

  const updateApp = useCallback((id, changes) => {
    setApps(prev => {
      const next = prev.map(a => a.id === id ? { ...a, ...changes, updatedAt: new Date().toISOString() } : a);
      persist(user, next);
      return next;
    });
  }, [user, persist]);

  const clearAll = useCallback(() => {
    setUser(null);
    setApps([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <StoreContext.Provider value={{ user, apps, loaded, saveUser, addApp, updateApp, clearAll }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
