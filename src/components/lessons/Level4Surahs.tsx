'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Star, ChevronRight, ChevronLeft, Globe, Volume2 } from 'lucide-react'
import { SURAHS, UI, ayahAudioUrl, type Surah, type Ayah } from '@/lib/quran'
import { useAppStore } from '@/store/useAppStore'
import { useAudio } from '@/hooks/useAudio'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export function Level4Surahs({ onComplete }: { onComplete: (stars: number) => void }) {
  const { language, completeItem, completed } = useAppStore()
  const audio = useAudio()
  const [surahIdx, setSurahIdx] = useState(0)
  const [currentAyah, setCurrentAyah] = useState<number | null>(null)
  const [tappedAyah, setTappedAyah] = useState<number | null>(null)
  const [showTranslations, setShowTranslations] = useState(true)
  const [showTranslit, setShowTranslit] = useState(false)
  const t = (k: keyof typeof UI) => UI[k][language]

  const surah: Surah = SURAHS[surahIdx]
  const earnedStars = Object.values(completed)
    .filter((c) => c.id.startsWith('surah:'))
    .reduce((sum, c) => sum + c.stars, 0)

  const handleAyahEnded = useCallback(() => {
    setCurrentAyah((cur) => {
      if (cur === null) return null
      const next = cur + 1
      if (next <= surah.ayahs.length) {
        const url = ayahAudioUrl(surah.surahNumber, next)
        // delay a touch for natural pacing
        setTimeout(() => audio.playUrl(url), 350)
        return next
      } else {
        // finished surah
        completeItem(`surah:${surah.id}`, 3)
        useAppStore.getState().touchStreak()
        return null
      }
    })
  }, [surah, audio, completeItem])

  useEffect(() => {
    audio.setOnEnded(handleAyahEnded)
    return () => audio.setOnEnded(null)
  }, [audio, handleAyahEnded])

  const playAyah = useCallback(
    (n: number) => {
      const ayah: Ayah | undefined = surah.ayahs.find((a) => a.number === n)
      if (!ayah) return
      const url = ayahAudioUrl(surah.surahNumber, n)
      setCurrentAyah(n)
      audio.playUrl(url)
    },
    [surah, audio]
  )

  const handlePlayAll = () => {
    if (audio.isPlaying) {
      audio.stop()
      setCurrentAyah(null)
      return
    }
    playAyah(1)
  }

  const handleSurahComplete = () => {
    audio.stop()
    completeItem(`surah:${surah.id}`, 3)
    useAppStore.getState().touchStreak()
    if (surahIdx < SURAHS.length - 1) {
      setSurahIdx((i) => i + 1)
      setCurrentAyah(null)
      setTappedAyah(null)
    } else {
      onComplete(3)
    }
  }

  const handlePrev = () => {
    if (surahIdx > 0) {
      audio.stop()
      setSurahIdx((i) => i - 1)
      setCurrentAyah(null)
      setTappedAyah(null)
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3 px-3 pb-8 pt-4">
      {/* Surah selector strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {SURAHS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              audio.stop()
              setSurahIdx(i)
              setCurrentAyah(null)
              setTappedAyah(null)
            }}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              i === surahIdx
                ? 'bg-sky-500 text-white shadow'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {s.name[language]}
          </button>
        ))}
      </div>

      {/* Surah header */}
      <motion.div
        key={surah.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-sky-50 to-cyan-50 p-5 shadow border-2 border-sky-100"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-stone-800">{surah.name[language]}</h2>
            <p className="text-xs text-stone-500">{t('reciter')}</p>
          </div>
          <span
            className="text-3xl text-sky-700"
            style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
          >
            {surah.arabicName}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            onClick={handlePlayAll}
            className="gap-2 rounded-full bg-sky-500 px-5 hover:bg-sky-600"
            size="sm"
          >
            {audio.isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                {t('stop')}
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {t('playSurah')}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslations((v) => !v)}
            className="gap-1 rounded-full text-xs"
          >
            <Globe className="h-3 w-3" />
            {t('translation')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslit((v) => !v)}
            className="gap-1 rounded-full text-xs"
          >
            {t('transliteration')}
          </Button>
        </div>

        {audio.isLoading ? (
          <p className="mt-3 text-xs text-sky-700">{t('audioLoading')}</p>
        ) : null}
        {audio.error ? (
          <p className="mt-3 text-xs text-rose-600">{t('audioError')}</p>
        ) : null}
      </motion.div>

      {/* Ayah list */}
      <ScrollArea className="max-h-[55vh] rounded-2xl bg-white p-3 shadow-inner border border-sky-100">
        <div className="flex flex-col gap-2">
          {surah.ayahs.map((ayah) => {
            const isActive = currentAyah === ayah.number
            const isTapped = tappedAyah === ayah.number
            return (
              <motion.button
                key={ayah.number}
                onClick={() => {
                  setTappedAyah(isTapped ? null : ayah.number)
                  playAyah(ayah.number)
                }}
                whileTap={{ scale: 0.99 }}
                className={`relative flex flex-col items-end gap-3 rounded-2xl border-2 p-4 text-right transition ${
                  isActive
                    ? 'border-sky-400 bg-sky-50 shadow-md'
                    : isTapped
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-transparent bg-stone-50 hover:bg-stone-100'
                }`}
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                    {ayah.number}
                  </span>
                  <motion.div
                    animate={isActive ? { scale: [1, 1.04, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                    className="flex-1"
                  >
                    <p
                      className="text-3xl leading-loose text-stone-800 sm:text-4xl"
                      style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                      dir="rtl"
                    >
                      {ayah.arabic}
                    </p>
                  </motion.div>
                </div>

                {showTranslit ? (
                  <p className="w-full text-left text-xs italic text-stone-500" dir="ltr">
                    {ayah.transliteration}
                  </p>
                ) : null}

                <AnimatePresence>
                  {showTranslations || isTapped ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full"
                    >
                      <p className="text-left text-sm text-stone-700" dir="ltr">
                        {ayah.translation[language]}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {isActive ? (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-sky-500"
                    />
                  </div>
                ) : null}
              </motion.button>
            )
          })}
        </div>
      </ScrollArea>

      {/* Star count for surahs */}
      <div className="flex items-center justify-center gap-1 text-xs text-amber-600">
        <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
        {earnedStars} {t('yourStars').toLowerCase()}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={surahIdx === 0}
          className="gap-1 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
          {t('back')}
        </Button>
        <Button
          onClick={handleSurahComplete}
          className="gap-1 rounded-full bg-sky-500 px-6 hover:bg-sky-600"
        >
          {surahIdx === SURAHS.length - 1 ? t('completed') : t('next')}
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
