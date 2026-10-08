'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Flame, Award, Languages } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { UI, BADGES, type Lang } from '@/lib/quran'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface TopBarProps {
  onOpenBadges: () => void
}

export function TopBar({ onOpenBadges }: TopBarProps) {
  const { language, setLanguage, streak, hasOnboarded, completed } = useAppStore()
  const t = (k: keyof typeof UI) => UI[k][language]

  // Compute total stars from completed (stable reference to the object)
  const totalStars = Object.values(completed).reduce((sum, c) => sum + c.stars, 0)
  const unlockedCount = computeUnlockedBadges(completed, streak, totalStars).length

  if (!hasOnboarded) return null

  const toggleLang = () => setLanguage(language === 'en' ? 'ms' : 'en')

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-amber-100/80 bg-white/85 px-3 py-2 backdrop-blur-md sm:px-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-700">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold tabular-nums">{streak}</span>
          <span className="hidden text-xs font-medium sm:inline">{t('dayStreak')}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-700">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-bold tabular-nums">{totalStars}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-700 transition hover:bg-stone-200 active:scale-95"
          aria-label={t('chooseLanguage')}
          title={language === 'en' ? 'Tukar ke Bahasa Melayu' : 'Switch to English'}
        >
          <Languages className="h-3.5 w-3.5 text-stone-500" />
          <span className={language === 'en' ? 'text-amber-700' : 'text-stone-400'}>EN</span>
          <span className="text-stone-300">/</span>
          <span className={language === 'ms' ? 'text-amber-700' : 'text-stone-400'}>MS</span>
        </button>

        <Button
          size="sm"
          variant="ghost"
          className="gap-1 rounded-full text-violet-700 hover:bg-violet-50"
          onClick={onOpenBadges}
        >
          <Award className="h-4 w-4" />
          <span className="text-xs font-semibold">{unlockedCount}/{BADGES.length}</span>
        </Button>
      </div>
    </div>
  )
}

interface BadgesDialogProps {
  open: boolean
  onOpenChange: (v: boolean) => void
}

// Pure helper — same logic as store.getUnlockedBadges but takes raw state.
export function computeUnlockedBadges(
  completed: Record<string, { id: string; stars: number; completedAt: number }>,
  streak: number,
  totalStars: number
): string[] {
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
        .filter((t2) => completed[`tajweed:${t2}`]).length
      if (tajweedDone >= 5) unlocked.push(badge.id)
    } else if (type === 'surah') {
      if (completed[`surah:${val}`]) unlocked.push(badge.id)
    } else if (type === 'streak') {
      if (streak >= parseInt(val)) unlocked.push(badge.id)
    } else if (type === 'stars') {
      if (totalStars >= parseInt(val)) unlocked.push(badge.id)
    }
  }
  return unlocked
}

export function BadgesDialog({ open, onOpenChange }: BadgesDialogProps) {
  const { language, completed, streak } = useAppStore()
  const totalStars = Object.values(completed).reduce((sum, c) => sum + c.stars, 0)
  const unlocked = computeUnlockedBadges(completed, streak, totalStars)
  const t = (k: keyof typeof UI) => UI[k][language]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{t('badges')}</DialogTitle>
          <DialogDescription className="text-center">
            {unlocked.length} / {BADGES.length}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {BADGES.map((b) => {
            const isUnlocked = unlocked.includes(b.id)
            return (
              <motion.div
                key={b.id}
                initial={false}
                animate={{ scale: isUnlocked ? 1 : 0.92, opacity: isUnlocked ? 1 : 0.4 }}
                className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-3 text-center ${
                  isUnlocked
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-stone-200 bg-stone-50'
                }`}
              >
                <div className="text-3xl" aria-hidden>{isUnlocked ? b.emoji : '🔒'}</div>
                <div className="text-[10px] font-semibold leading-tight text-stone-700">
                  {isUnlocked ? b.name[language] : '?'}
                </div>
              </motion.div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface StarBurstProps {
  show: boolean
  stars: number
  onClose: () => void
}

export function StarBurst({ show, stars, onClose }: StarBurstProps) {
  const { language } = useAppStore()
  const t = (k: keyof typeof UI) => UI[k][language]

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
              className="flex gap-1"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: i <= stars ? 1 : 0.6, y: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                >
                  <Star
                    className={`h-14 w-14 ${
                      i <= stars ? 'fill-amber-400 text-amber-500' : 'fill-stone-200 text-stone-300'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center">
              <p className="text-2xl font-bold text-stone-800">{t('greatJob')}</p>
              <p className="text-sm text-stone-500">
                +{stars} {t('yourStars').toLowerCase()}
              </p>
            </div>
            <Button onClick={onClose} className="rounded-full bg-amber-500 px-8 hover:bg-amber-600">
              {t('next')}
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
