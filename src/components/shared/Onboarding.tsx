'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { UI, type Lang } from '@/lib/quran'
import { Mascot } from './Mascot'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Onboarding() {
  const { language, setLanguage, setStudentName, setOnboarded, touchStreak } = useAppStore()
  const [name, setName] = useState('')
  const t = (k: keyof typeof UI) => UI[k][language]

  const handleStart = () => {
    setStudentName(name.trim() || (language === 'en' ? 'Friend' : 'Kawan'))
    touchStreak()
    setOnboarded(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="flex flex-col items-center gap-4"
      >
        <Mascot size={140} mood="excited" message={t('mascotGreet')} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl border border-amber-100"
      >
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-3xl font-extrabold text-transparent">
            {t('appName')}
          </h1>
          <p className="mt-1 text-sm text-stone-500">{t('tagline')}</p>
        </div>

        {/* Language toggle */}
        <div>
          <p className="mb-2 text-xs font-semibold text-stone-500">{t('chooseLanguage')}</p>
          <div className="grid grid-cols-2 gap-2">
            {(['en', 'ms'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`rounded-2xl border-2 py-2.5 text-sm font-semibold transition ${
                  language === l
                    ? 'border-amber-400 bg-amber-50 text-amber-700'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                }`}
              >
                {UI.english[l]}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-stone-500">
            {t('welcomeName')}
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('yourName')}
            className="rounded-2xl border-stone-200 bg-stone-50 text-center text-base"
            maxLength={20}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />
        </div>

        <Button
          onClick={handleStart}
          className="mt-2 w-full gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-6 text-base font-bold shadow-lg hover:shadow-xl"
        >
          {t('start')} ✨
        </Button>
      </motion.div>

      <p className="text-center text-[11px] text-stone-400 max-w-xs">
        {language === 'en'
          ? 'For ages 4-6 • Audio by EveryAyah • Reciter: Mishary Alafasy'
          : 'Untuk umur 4-6 • Audio oleh EveryAyah • Qari: Mishary Alafasy'}
      </p>
    </div>
  )
}
