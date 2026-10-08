'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Star, ChevronRight, ChevronLeft, Snail } from 'lucide-react'
import { HURUF_HIJAIYAH, UI, hurufAudioUrl } from '@/lib/quran'
import { useAppStore } from '@/store/useAppStore'
import { useAudio, useSpeech } from '@/hooks/useAudio'
import { Button } from '@/components/ui/button'

// Slow playback rate for kids — clear and easy to follow
const KID_PLAYBACK_RATE = 0.75

export function Level1Huruf({ onComplete }: { onComplete: (stars: number) => void }) {
  const { language, completeItem, completed } = useAppStore()
  const audio = useAudio()
  const { speak, isSpeaking: isSpeakingName } = useSpeech()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showExample, setShowExample] = useState(false)
  const [justCompleted, setJustCompleted] = useState<number | null>(null)
  const t = (k: keyof typeof UI) => UI[k][language]

  const letter = HURUF_HIJAIYAH[currentIdx]
  const total = HURUF_HIJAIYAH.length
  const earnedStars = Object.values(completed)
    .filter((c) => c.id.startsWith('letter:'))
    .reduce((sum, c) => sum + c.stars, 0)

  // Play real Qari audio for the letter, slowed down for kids
  const handleSpeakArabic = () => {
    const url = hurufAudioUrl(letter.audioId)
    audio.playUrl(url, { rate: KID_PLAYBACK_RATE })
  }

  // After Arabic plays, optionally say the letter name in EN/MS via Web Speech
  const handleSpeakAll = () => {
    handleSpeakArabic()
    // Speak the name in user's language after a delay (only if supported)
    setTimeout(() => {
      speak(letter.name[language], language === 'en' ? 'en-US' : 'ms-MY', 0.85)
    }, 1800)
  }

  const handleNext = () => {
    completeItem(`letter:${letter.id}`, 1)
    setJustCompleted(letter.id)
    setTimeout(() => setJustCompleted(null), 1200)
    useAppStore.getState().touchStreak()
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1)
      setShowExample(false)
    } else {
      onComplete(3)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
      setShowExample(false)
    }
  }

  const isPlaying = audio.isPlaying || isSpeakingName

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 pb-8 pt-4">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-500">
          {currentIdx + 1} / {total}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
          <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
          {earnedStars}
        </span>
      </div>

      {/* Letter card */}
      <motion.div
        key={letter.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-lg border-2 border-amber-100"
      >
        <AnimatePresence>
          {justCompleted === letter.id ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-4 top-4"
            >
              <Star className="h-10 w-10 fill-amber-400 text-amber-500" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Slow-play indicator badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-stone-500 shadow-sm">
          <Snail className="h-3 w-3" />
          {Math.round(KID_PLAYBACK_RATE * 100)}% {language === 'en' ? 'speed' : 'kelajuan'}
        </div>

        {/* Big Arabic letter */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSpeakArabic}
          className="flex h-48 w-48 items-center justify-center rounded-3xl bg-white shadow-inner border-4 border-amber-200 sm:h-56 sm:w-56"
          aria-label={t('tapToHear')}
        >
          <motion.span
            animate={isPlaying ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.4, repeat: isPlaying ? Infinity : 0 }}
            className="font-serif text-8xl leading-none text-stone-800 sm:text-9xl"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
          >
            {letter.arabic}
          </motion.span>
        </motion.button>

        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-bold text-stone-800">{letter.name[language]}</p>
          <p className="text-sm text-stone-500">
            {t('sound')}: <span className="font-mono font-semibold text-amber-700">/{letter.transliteration}/</span>
          </p>
        </div>

        {/* Listen button */}
        <Button
          onClick={handleSpeakAll}
          disabled={isPlaying}
          className="gap-2 rounded-full bg-amber-500 px-6 hover:bg-amber-600 disabled:opacity-50"
        >
          <Volume2 className="h-5 w-5" />
          {isPlaying ? t('listening') : t('listen')}
        </Button>

        {audio.isLoading ? (
          <p className="text-xs text-amber-600">{t('audioLoading')}</p>
        ) : null}
        {audio.error ? (
          <p className="text-xs text-rose-600">{t('audioError')}</p>
        ) : null}

        {/* Example */}
        <button
          onClick={() => setShowExample((v) => !v)}
          className="text-sm font-semibold text-stone-600 underline decoration-amber-300 underline-offset-4 hover:text-amber-700"
        >
          {t('example')} ▾
        </button>
        <AnimatePresence>
          {showExample ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-4"
            >
              <span
                className="text-4xl text-stone-800"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {letter.example.en.split(' ')[0]}
              </span>
              <span className="text-sm font-medium text-stone-600">
                {letter.example[language]}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
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
          className="gap-1 rounded-full bg-emerald-500 px-6 hover:bg-emerald-600"
        >
          {currentIdx === total - 1 ? t('completed') : t('next')}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
