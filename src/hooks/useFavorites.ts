import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "toret.favorites";

const read = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

// Simple cross-component subscription
const listeners = new Set<(ids: string[]) => void>();
const broadcast = (ids: string[]) => listeners.forEach((l) => l(ids));

export const useFavorites = () => {
  const [ids, setIds] = useState<string[]>(read);

  useEffect(() => {
    const cb = (next: string[]) => setIds(next);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  const persist = (next: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    broadcast(next);
  };

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    persist(next);
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { favorites: ids, toggle, isFavorite };
};