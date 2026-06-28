// ─── Wishlist / saved courses ─────────────────────────────────────────────────
// localStorage-backed list of saved course slugs. A custom "wishlist-change"
// event lets any number of components (landing cards, course detail page, a
// future /wishlist view) stay in sync without a shared provider.

import { useEffect, useState } from "react";

const KEY = "madarsa_wishlist";
const EVENT = "wishlist-change";

export function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(list: string[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function isSaved(slug: string): boolean {
  return getWishlist().includes(slug);
}

export function toggleWishlist(slug: string): void {
  if (typeof window === "undefined") return;
  const list = getWishlist();
  const next = list.includes(slug)
    ? list.filter((s) => s !== slug)
    : [...list, slug];
  persist(next);
}

// Reactive view of the saved-slug list. Re-renders on toggle (same tab via the
// custom event) and on changes from other tabs (the native "storage" event).
export function useWishlist(): string[] {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setList(getWishlist());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return list;
}
