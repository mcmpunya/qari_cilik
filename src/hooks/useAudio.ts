'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useAudio — manages a single HTMLAudioElement with state machine.
 * Used for both EveryAyah recitation (mp3 URLs) and letter-pronunciation (Web Speech API).
 */
export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const onEndedRef = useRef<(() => void) | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    audioRef.current = new Audio()
    audioRef.current.preload = 'auto'
    audioRef.current.crossOrigin = 'anonymous'

    const a = audioRef.current
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      if (onEndedRef.current) onEndedRef.current()
    }
    const onLoadStart = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('audio-error')
    }

    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    a.addEventListener('loadstart', onLoadStart)
    a.addEventListener('canplay', onCanPlay)
    a.addEventListener('error', onError)

    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('loadstart', onLoadStart)
      a.removeEventListener('canplay', onCanPlay)
      a.removeEventListener('error', onError)
      a.pause()
      a.src = ''
    }
  }, [])

  const playUrl = useCallback((url: string) => {
    if (!audioRef.current) return
    setError(null)
    // Stop any speech synthesis in progress
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    const a = audioRef.current
    if (a.src !== url) {
      a.src = url
    }
    a.currentTime = 0
    a.play().catch(() => setError('audio-error'))
  }, [])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(false)
  }, [])

  const setOnEnded = useCallback((fn: (() => void) | null) => {
    onEndedRef.current = fn
  }, [])

  return { isPlaying, isLoading, error, playUrl, stop, setOnEnded }
}

/**
 * useSpeech — Web Speech API for letter/harakah names (no audio file needed).
 * Falls back gracefully if ar-SA voice unavailable.
 */
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [arabicVoice, setArabicVoice] = useState<SpeechSynthesisVoice | null>(null)

  // Use lazy initializer — speechSynthesis support is constant per-environment
  const [supported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return 'speechSynthesis' in window
  })

  useEffect(() => {
    if (!supported) return

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      // Prefer Arabic voices
      const ar = voices.find((v) => v.lang === 'ar-SA' || v.lang.startsWith('ar'))
      if (ar) setArabicVoice(ar)
    }
    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [supported])

  const speak = useCallback(
    (text: string, lang: string = 'ar-SA', rate: number = 0.8) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang
      u.rate = rate
      u.pitch = 1
      if (lang.startsWith('ar') && arabicVoice) {
        u.voice = arabicVoice
      }
      u.onstart = () => setIsSpeaking(true)
      u.onend = () => setIsSpeaking(false)
      u.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(u)
    },
    [arabicVoice]
  )

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  return { speak, cancel, isSpeaking, supported }
}
