'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Star, ChevronRight, ChevronLeft, Snail } from 'lucide-react'
import { HARAKAT, UI, harakahAudioUrl } from '@/lib/quran'
import { useAppStore } from '@/store/useAppStore'
import { useAudio, useSpeech } from '@/hooks/useAudio'
import { Button } from '@/components/ui/button'

// Slow playback rate for kids — clear and easy to follow
const KID_PLAYBACK_RATE = 0.75

export function Level2Harakat({ onComplete }: { onComplete: (stars: number) => void }) {
  const { language, completeItem, completed } = useAppStore()
  const audio = useAudio()
  const { speak, isSpeaking: isSpeakingName } = useSpeech()
  const [currentIdx, setCurrentIdx] = useState(0)
  const total = HARAKAT.length
  const earnedStars = Object.values(completed)
    .filter((c) => c.id.startsWith('harakah:'))
    .reduce((sum, c) => sum + c.stars, 0)
  const t = (k: keyof typeof UI) => UI[k][language]

  const item = HARAKAT[currentIdx]

  // Play real Qari audio for the harakah example, slowed down for kids
  const handleSpeakArabic = () => {
    const url = harakahAudioUrl(item.audioLesson, item.audioId)
    audio.playUrl(url, { rate: KID_PLAYBACK_RATE })
  }

  // Play Arabic first, then speak the name in user's language
  const handleSpeakAll = () => {
    handleSpeakArabic()
    setTimeout(() => {
      speak(item.name[language], language === 'en' ? 'en-US' : 'ms-MY', 0.85)
    }, 1500)
  }

  const handleNext = () => {
    completeItem(`harakah:${item.id}`, 1)
    useAppStore.getState().touchStreak()
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1)
    } else {
      onComplete(3)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1)
  }

  const isPlaying = audio.isPlaying || isSpeakingName

  const colorMap: Record<string, string> = {
    fathah: 'from-rose-50 to-pink-50 border-rose-200',
    kasrah: 'from-emerald-50 to-teal-50 border-emerald-200',
    dammah: 'from-amber-50 to-yellow-50 border-amber-200',
    'tanwin-fath': 'from-orange-50 to-rose-50 border-orange-200',
    'tanwin-kasr': 'from-teal-50 to-cyan-50 border-teal-200',
    'tanwin-damm': 'from-yellow-50 to-amber-50 border-yellow-200',
    sukun: 'from-violet-50 to-purple-50 border-violet-200',
    madd: 'from-sky-50 to-blue-50 border-sky-200',
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
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
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
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cnCard(colorMap[item.id])}
      >
        {/* Slow-play indicator badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-stone-500 shadow-sm">
          <Snail className="h-3 w-3" />
          {Math.round(KID_PLAYBACK_RATE * 100)}% {language === 'en' ? 'speed' : 'kelajuan'}
        </div>

        <div className="flex flex-col items-center gap-5">
          <p className="text-lg font-bold text-stone-800">{item.name[language]}</p>

          {/* Big symbol with example */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpeakArabic}
            className="flex h-40 w-56 items-center justify-center rounded-3xl bg-white shadow-inner border-4 border-white"
            aria-label={t('tapToHear')}
          >
            <motion.span
              animate={isPlaying ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 0.4, repeat: isPlaying ? Infinity : 0 }}
              className="font-serif text-7xl leading-none text-stone-800"
              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
            >
              {item.exampleArabic}
            </motion.span>
          </motion.button>

          {/* Symbol + label */}
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
            <span
              className="text-3xl text-stone-800"
              style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
            >
              {item.symbol}
            </span>
            <span className="text-sm font-semibold text-stone-600">{item.name[language]}</span>
          </div>

          <p className="text-center text-sm text-stone-600">{item.sound[language]}</p>
          <p className="text-center text-sm font-medium text-stone-700">
            {item.example[language]}
          </p>

          <Button
            onClick={handleSpeakAll}
            disabled={isPlaying}
            className="gap-2 rounded-full bg-emerald-500 px-6 hover:bg-emerald-600 disabled:opacity-50"
          >
            <Volume2 className="h-5 w-5" />
            {isPlaying ? t('listening') : t('listen')}
          </Button>

          {audio.isLoading ? (
            <p className="text-xs text-emerald-600">{t('audioLoading')}</p>
          ) : null}
          {audio.error ? (
            <p className="text-xs text-rose-600">{t('audioError')}</p>
          ) : null}
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
          className="gap-1 rounded-full bg-emerald-500 px-6 hover:bg-emerald-600"
        >
          {currentIdx === total - 1 ? t('completed') : t('next')}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function cnCard(gradient: string) {
  return `relative bg-gradient-to-br ${gradient} rounded-3xl border-2 p-6 shadow-lg`
}
