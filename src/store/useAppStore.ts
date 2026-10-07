'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lang } from '@/lib/quran'
import { BADGES } from '@/lib/quran'

export type LevelId = 1 | 2 | 3 | 4

export interface CompletedItem {
  id: string
  stars: number
  completedAt: number
}

interface AppState {
  studentName: string
  language: Lang
  completed: Record<string, CompletedItem>
  streak: number
  lastActiveDate: string
  currentLevel: LevelId | null
  hasOnboarded: boolean

  setLanguage: (lang: Lang) => void
  setStudentName: (name: string) => void
  setCurrentLevel: (level: LevelId | null) => void
  setOnboarded: (v: boolean) => void
  completeItem: (id: string, stars?: number) => void
  getStars: (filterPrefix?: string) => number
  getTotalStars: () => number
  getUnlockedBadges: () => string[]
  touchStreak: () => void
  reset: () => void
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function dayDiff(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00Z')
  const db = new Date(b + 'T00:00:00Z')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      studentName: '',
      language: 'en',
      completed: {},
      streak: 0,
      lastActiveDate: '',
      currentLevel: null,
      hasOnboarded: false,

      setLanguage: (lang) => set({ language: lang }),
      setStudentName: (name) => set({ studentName: name }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      setOnboarded: (v) => set({ hasOnboarded: v }),

      completeItem: (id, stars = 1) => {
        const existing = get().completed[id]
        const newStars = Math.max(existing?.stars ?? 0, stars)
        set({
          completed: {
            ...get().completed,
            [id]: { id, stars: newStars, completedAt: Date.now() },
          },
        })
      },

      getStars: (filterPrefix) => {
        const items = Object.values(get().completed)
        const filtered = filterPrefix
          ? items.filter((c) => c.id.startsWith(filterPrefix))
          : items
        return filtered.reduce((sum, c) => sum + c.stars, 0)
      },

      getTotalStars: () => {
        return Object.values(get().completed).reduce((sum, c) => sum + c.stars, 0)
      },

      getUnlockedBadges: () => {
        const state = get()
        const completed = state.completed
        const unlocked: string[] = []

        for (const badge of BADGES) {
          const [type, val] = badge.requirement.split(':')
          if (type === 'letter') {
            if (completed[`letter:${val}`]) unlocked.push(badge.id)
          } else if (type === 'level1') {
            const lettersDone = Array.from({ length: 28 }, (_, i) => completed[`letter:${i + 1}`]).filter(Boolean).length
            if (lettersDone >= 28) unlocked.push(badge.id)
          } else if (type === 'level2') {
            const harakatDone = ['fathah', 'kasrah', 'dammah', 'tanwin-fath', 'tanwin-kasr', 'tanwin-damm', 'sukun', 'madd']
              .filter((h) => completed[`harakah:${h}`]).length
            if (harakatDone >= 8) unlocked.push(badge.id)
          } else if (type === 'level3') {
            const tajweedDone = ['qalqalah', 'ghunnah', 'idgham', 'ikhfa', 'madd']
              .filter((t) => completed[`tajweed:${t}`]).length
            if (tajweedDone >= 5) unlocked.push(badge.id)
          } else if (type === 'surah') {
            if (completed[`surah:${val}`]) unlocked.push(badge.id)
          } else if (type === 'streak') {
            if (state.streak >= parseInt(val)) unlocked.push(badge.id)
          } else if (type === 'stars') {
            if (get().getTotalStars() >= parseInt(val)) unlocked.push(badge.id)
          }
        }
        return unlocked
      },

      touchStreak: () => {
        const today = todayStr()
        const last = get().lastActiveDate
        if (last === today) return
        if (!last) {
          set({ streak: 1, lastActiveDate: today })
          return
        }
        const diff = dayDiff(last, today)
        if (diff === 1) {
          set({ streak: get().streak + 1, lastActiveDate: today })
        } else if (diff > 1) {
          set({ streak: 1, lastActiveDate: today })
        }
      },

      reset: () =>
        set({
          studentName: '',
          completed: {},
          streak: 0,
          lastActiveDate: '',
          currentLevel: null,
          hasOnboarded: false,
        }),
    }),
    {
      name: 'little-qari-store',
      version: 1,
    }
  )
)
