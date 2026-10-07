'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Volume2 } from 'lucide-react'
import { useAppStore, type LevelId } from '@/store/useAppStore'
import { UI, BADGES } from '@/lib/quran'
import { Mascot } from './Mascot'
import { TopBar, BadgesDialog, StarBurst } from './TopBar'
import { Onboarding } from './Onboarding'
import { Button } from '@/components/ui/button'
import { Level1Huruf } from '@/components/lessons/Level1Huruf'
import { Level2Harakat } from '@/components/lessons/Level2Harakat'
import { Level3Tajweed } from '@/components/lessons/Level3Tajweed'
import { Level4Surahs } from '@/components/lessons/Level4Surahs'
import { computeUnlockedBadges } from './TopBar'

interface LevelCardData {
  id: LevelId
  titleKey: keyof typeof UI
  descKey: keyof typeof UI
  emoji: string
  gradient: string
  borderColor: string
  icon: string
}

const LEVELS: LevelCardData[] = [
  {
    id: 1,
    titleKey: 'level1Title',
    descKey: 'level1Desc',
    emoji: 'ا',
    gradient: 'from-amber-50 to-orange-100',
    borderColor: 'border-amber-200',
    icon: '🌱',
  },
  {
    id: 2,
    titleKey: 'level2Title',
    descKey: 'level2Desc',
    emoji: 'بَ',
    gradient: 'from-emerald-50 to-teal-100',
    borderColor: 'border-emerald-200',
    icon: '⚡',
  },
  {
    id: 3,
    titleKey: 'level3Title',
    descKey: 'level3Desc',
    emoji: 'ق',
    gradient: 'from-violet-50 to-fuchsia-100',
    borderColor: 'border-violet-200',
    icon: '🎨',
  },
  {
    id: 4,
    titleKey: 'level4Title',
    descKey: 'level4Desc',
    emoji: '۞',
    gradient: 'from-sky-50 to-cyan-100',
    borderColor: 'border-sky-200',
    icon: '📖',
  },
]

export function AppShell() {
  const {
    language,
    hasOnboarded,
    studentName,
    currentLevel,
    setCurrentLevel,
    completed,
    streak,
  } = useAppStore()
  const [badgesOpen, setBadgesOpen] = useState(false)
  const [starBurst, setStarBurst] = useState<{ show: boolean; stars: number }>({ show: false, stars: 0 })
  const t = (k: keyof typeof UI) => UI[k][language]

  const handleLevelComplete = (stars: number) => {
    setStarBurst({ show: true, stars })
  }

  if (!hasOnboarded) {
    return <Onboarding />
  }

  // Render lesson screen if a level is selected
  if (currentLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-stone-50">
        <TopBar onOpenBadges={() => setBadgesOpen(true)} />
        <div className="flex items-center justify-between px-3 pt-3">
          <Button
            variant="ghost"
            onClick={() => setCurrentLevel(null)}
            className="rounded-full text-stone-600"
          >
            ← {t('home')}
          </Button>
          <span className="text-xs font-semibold text-stone-400">
            {t('level')} {currentLevel}
          </span>
        </div>
        {currentLevel === 1 ? <Level1Huruf onComplete={handleLevelComplete} /> : null}
        {currentLevel === 2 ? <Level2Harakat onComplete={handleLevelComplete} /> : null}
        {currentLevel === 3 ? <Level3Tajweed onComplete={handleLevelComplete} /> : null}
        {currentLevel === 4 ? <Level4Surahs onComplete={handleLevelComplete} /> : null}
        <BadgesDialog open={badgesOpen} onOpenChange={setBadgesOpen} />
        <StarBurst
          show={starBurst.show}
          stars={starBurst.stars}
          onClose={() => {
            setStarBurst({ show: false, stars: 0 })
            setCurrentLevel(null)
          }}
        />
      </div>
    )
  }

  // Home screen — compute totals from stable references
  const totalStars = Object.values(completed).reduce((sum, c) => sum + c.stars, 0)
  const unlockedBadges = computeUnlockedBadges(completed, streak, totalStars)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-white">
      <TopBar onOpenBadges={() => setBadgesOpen(true)} />

      <div className="mx-auto max-w-3xl px-4 pb-12 pt-4">
        {/* Hero */}
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Mascot
            size={90}
            mood="happy"
            message={
              language === 'en'
                ? `Hi ${studentName}! Ready to learn?`
                : `Hai ${studentName}! Sedia belajar?`
            }
          />
          <h1 className="mt-2 text-2xl font-extrabold text-stone-800 sm:text-3xl">
            {t('appName')}
          </h1>
          <p className="text-sm text-stone-500">{t('pickLevel')}</p>
        </div>

        {/* Level cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map((level, idx) => {
            const starsEarned = levelStarsFor(completed, level.id)
            const isLevelComplete =
              (level.id === 1 && starsEarned >= 28) ||
              (level.id === 2 && starsEarned >= 8) ||
              (level.id === 3 && starsEarned >= 5) ||
              (level.id === 4 && starsEarned >= 5)

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentLevel(level.id)}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl border-2 ${level.borderColor} bg-gradient-to-br ${level.gradient} p-5 shadow-sm transition hover:shadow-lg`}
              >
                {/* Big arabic letter bg */}
                <div
                  className="pointer-events-none absolute -right-4 -top-2 text-9xl opacity-10"
                  style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                >
                  {level.emoji}
                </div>

                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {level.icon}
                </div>

                <div className="relative flex-1 text-left">
                  <p className="text-xs font-bold uppercase tracking-wide text-stone-500">
                    {t('level')} {level.id}
                  </p>
                  <p className="text-base font-bold text-stone-800">{t(level.titleKey)}</p>
                  <p className="text-xs text-stone-500">{t(level.descKey)}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className={`text-sm ${
                            s <= Math.min(3, starsEarned)
                              ? 'text-amber-400'
                              : 'text-stone-200'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500">
                      {isLevelComplete ? t('mastered') : starsEarned > 0 ? t('inProgress') : t('notStarted')}
                    </span>
                  </div>
                </div>

                <ChevronRight className="relative h-5 w-5 text-stone-400 transition group-hover:translate-x-1" />
              </motion.button>
            )
          })}
        </div>

        {/* Stats summary */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatChip
            value={totalStars}
            label={t('yourStars')}
            color="bg-amber-100 text-amber-700"
          />
          <StatChip
            value={streak}
            label={t('dayStreak')}
            color="bg-orange-100 text-orange-700"
          />
          <StatChip
            value={`${unlockedBadges.length}/${BADGES.length}`}
            label={t('badges')}
            color="bg-violet-100 text-violet-700"
          />
        </div>

        {/* Footer credit */}
        <div className="mt-8 flex items-center justify-center gap-1 text-[10px] text-stone-400">
          <Volume2 className="h-3 w-3" />
          {t('reciter')} · EveryAyah corpus
        </div>
      </div>

      <BadgesDialog open={badgesOpen} onOpenChange={setBadgesOpen} />
      <StarBurst
        show={starBurst.show}
        stars={starBurst.stars}
        onClose={() => setStarBurst({ show: false, stars: 0 })}
      />
    </div>
  )
}

function StatChip({ value, label, color }: { value: number | string; label: string; color: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl ${color} py-3`}>
      <span className="text-lg font-extrabold tabular-nums">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
    </div>
  )
}

function levelStarsFor(
  completed: Record<string, { id: string; stars: number; completedAt: number }>,
  levelId: LevelId
): number {
  const prefix = levelId === 1 ? 'letter:' : levelId === 2 ? 'harakah:' : levelId === 3 ? 'tajweed:' : 'surah:'
  return Object.values(completed)
    .filter((c) => c.id.startsWith(prefix))
    .reduce((sum, c) => sum + c.stars, 0)
}
