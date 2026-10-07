'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Star, ChevronRight, ChevronLeft, Info } from 'lucide-react'
import { TAJWEED_RULES, UI } from '@/lib/quran'
import { useAppStore } from '@/store/useAppStore'
import { useSpeech } from '@/hooks/useAudio'
import { Button } from '@/components/ui/button'

export function Level3Tajweed({ onComplete }: { onComplete: (stars: number) => void }) {
  const { language, completeItem, completed } = useAppStore()
  const { speak, isSpeaking } = useSpeech()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const total = TAJWEED_RULES.length
  const earnedStars = Object.values(completed)
    .filter((c) => c.id.startsWith('tajweed:'))
    .reduce((sum, c) => sum + c.stars, 0)
  const t = (k: keyof typeof UI) => UI[k][language]

  const rule = TAJWEED_RULES[currentIdx]

  const handleSpeak = (text: string) => {
    speak(text, 'ar-SA', 0.7)
  }

  const handleNext = () => {
    completeItem(`tajweed:${rule.id}`, 1)
    useAppStore.getState().touchStreak()
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1)
      setShowInfo(false)
    } else {
      onComplete(3)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
      setShowInfo(false)
    }
  }

  // Split example arabic so we can highlight the relevant letter
  const renderHighlightedArabic = (arabic: string, hl: string) => {
    if (!arabic.includes(hl)) {
      return <span className="font-serif text-4xl text-stone-800" style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}>{arabic}</span>
    }
    const parts = arabic.split(hl)
    return (
      <span className="font-serif text-4xl text-stone-800" style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}>
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 ? (
              <motion.span
                animate={{ backgroundColor: [rule.hexColor + '88', rule.hexColor, rule.hexColor + '88'] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="rounded px-1 text-stone-900"
                style={{ backgroundColor: rule.hexColor }}
              >
                {hl}
              </motion.span>
            ) : null}
          </span>
        ))}
      </span>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 pb-8 pt-4">
      {/* Progress */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-500">
          {currentIdx + 1} / {total}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
          <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
          {earnedStars}
        </span>
      </div>

      {/* Card */}
      <motion.div
        key={rule.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border-2 border-stone-200 bg-white p-6 shadow-lg"
      >
        {/* Color band */}
        <div className="mb-4 h-2 w-full rounded-full" style={{ backgroundColor: rule.hexColor }} />

        <div className="flex flex-col items-center gap-5">
          <div className="text-center">
            <h3 className="text-xl font-bold text-stone-800">{rule.name[language]}</h3>
            <p className="mt-1 text-sm text-stone-600">{rule.explanation[language]}</p>
          </div>

          {/* Letters grid */}
          <div className="flex flex-wrap justify-center gap-2">
            {rule.letters.map((l) => (
              <motion.button
                key={l}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSpeak(l)}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-3xl font-bold shadow-sm ${rule.color}`}
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                aria-label={t('tapToHear')}
              >
                {l}
              </motion.button>
            ))}
          </div>

          {/* Example */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSpeak(rule.exampleArabic)}
            className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-stone-100 bg-stone-50 p-5"
          >
            {renderHighlightedArabic(rule.exampleArabic, rule.highlightedLetter)}
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={() => handleSpeak(rule.exampleArabic)}
                disabled={isSpeaking}
                className="gap-2 rounded-full bg-violet-500 px-5 hover:bg-violet-600 disabled:opacity-50"
                size="sm"
              >
                <Volume2 className="h-4 w-4" />
                {isSpeaking ? t('listening') : t('listen')}
              </Button>
            </div>
            <p className="text-xs text-stone-500">{rule.example[language]}</p>
          </motion.div>

          <button
            onClick={() => setShowInfo((v) => !v)}
            className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-violet-700"
          >
            <Info className="h-3 w-3" />
            {t('tapToTranslate')}
          </button>
          <AnimatePresence>
            {showInfo ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-violet-50 p-3 text-center text-xs text-violet-700"
              >
                {rule.explanation[language]}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="gap-1 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
          {t('back')}
        </Button>
        <Button
          onClick={handleNext}
          className="gap-1 rounded-full bg-violet-500 px-6 hover:bg-violet-600"
        >
          {currentIdx === total - 1 ? t('completed') : t('next')}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
