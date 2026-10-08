'use client'

import { motion } from 'framer-motion'

interface MascotProps {
  size?: number
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrate'
  message?: string
}

/**
 * Noor the Star — kid-friendly SVG mascot.
 * Animated with framer-motion to feel alive.
 */
export function Mascot({ size = 120, mood = 'happy', message }: MascotProps) {
  const bounceY = mood === 'excited' || mood === 'celebrate' ? [0, -8, 0] : [0, -4, 0]
  const rotate = mood === 'celebrate' ? [-3, 3, -3] : [0, 2, 0]
  const duration = mood === 'excited' ? 1.2 : 2.4

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        animate={{ y: bounceY, rotate }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 200 200" width={size} height={size} aria-label="Noor the Star mascot">
          <defs>
            <radialGradient id="starGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff6cc" />
              <stop offset="60%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* star body */}
          <path
            d="M100 18 L122 70 L180 78 L138 118 L150 178 L100 148 L50 178 L62 118 L20 78 L78 70 Z"
            fill="url(#starGrad)"
            stroke="#d97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* eyes */}
          <g>
            <ellipse cx="78" cy="100" rx="9" ry="11" fill="#1f2937" />
            <ellipse cx="122" cy="100" rx="9" ry="11" fill="#1f2937" />
            <circle cx="81" cy="96" r="3" fill="#fff" />
            <circle cx="125" cy="96" r="3" fill="#fff" />
          </g>
          {/* cheeks */}
          <circle cx="62" cy="118" r="10" fill="url(#cheekGrad)" />
          <circle cx="138" cy="118" r="10" fill="url(#cheekGrad)" />
          {/* smile */}
          <path
            d={mood === 'celebrate' ? 'M70 125 Q100 160 130 125' : 'M75 122 Q100 145 125 122'}
            stroke="#1f2937"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* tiny sparkles */}
          {mood === 'excited' || mood === 'celebrate' ? (
            <g>
              <circle cx="40" cy="40" r="3" fill="#fde68a" />
              <circle cx="160" cy="50" r="3" fill="#fde68a" />
              <circle cx="35" cy="155" r="2.5" fill="#fde68a" />
              <circle cx="170" cy="150" r="2.5" fill="#fde68a" />
            </g>
          ) : null}
        </svg>
      </motion.div>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xs rounded-2xl bg-white px-4 py-2 text-center text-sm font-medium text-stone-700 shadow-md border border-amber-100"
        >
          {message}
        </motion.div>
      ) : null}
    </div>
  )
}
