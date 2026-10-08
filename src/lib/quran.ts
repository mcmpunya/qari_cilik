// Quranic curriculum data for kids ages 4-6
// Levels: 1=Huruf Hijaiyah, 2=Harakat, 3=Tajweed intro, 4=Short Surahs (Juz Amma)
// All translations bilingual: English + Bahasa Melayu

export type Bilingual = { en: string; ms: string }

// ============================================================
// LEVEL 1 — Huruf Hijaiyah (28 letters)
// Audio: Web Speech API (ar-SA voice) for letter name
// ============================================================

export interface HurufItem {
  id: number
  arabic: string
  name: Bilingual
  transliteration: string
  example: Bilingual // e.g. "Asadun (lion)"
  audioId: number // mualim-alquran.com data-id (1-30)
}

// Audio source: mualim-alquran.com — pre-recorded Qari pronunciation
// Pattern: /wp-includes/audio/s1/l1/001_silence_{audioId}.mp3
// "silence" variants have a brief pause before pronunciation — great for kids.
export const HURUF_AUDIO_BASE = "https://mualim-alquran.com/wp-includes/audio/s1/l1"

export function hurufAudioUrl(audioId: number): string {
  return `${HURUF_AUDIO_BASE}/001_silence_${audioId}.mp3`
}

export const HURUF_HIJAIYAH: HurufItem[] = [
  { id: 1, arabic: "ا", name: { en: "Alif", ms: "Alif" }, transliteration: "A", example: { en: "Asad (Lion)", ms: "Asad (Singa)" }, audioId: 1 },
  { id: 2, arabic: "ب", name: { en: "Ba", ms: "Ba" }, transliteration: "B", example: { en: "Bab (Door)", ms: "Bab (Pintu)" }, audioId: 2 },
  { id: 3, arabic: "ت", name: { en: "Ta", ms: "Ta" }, transliteration: "T", example: { en: "Tuffah (Apple)", ms: "Tuffah (Epal)" }, audioId: 3 },
  { id: 4, arabic: "ث", name: { en: "Tha", ms: "Tha" }, transliteration: "Th", example: { en: "Thawb (Garment)", ms: "Thawb (Pakaian)" }, audioId: 4 },
  { id: 5, arabic: "ج", name: { en: "Jeem", ms: "Jim" }, transliteration: "J", example: { en: "Jamal (Camel)", ms: "Jamal (Unta)" }, audioId: 5 },
  { id: 6, arabic: "ح", name: { en: "Ha (heavy)", ms: "Ha" }, transliteration: "Ḥ", example: { en: "Hisab (Counting)", ms: "Hisab (Pengiraan)" }, audioId: 6 },
  { id: 7, arabic: "خ", name: { en: "Kha", ms: "Kha" }, transliteration: "Kh", example: { en: "Khubz (Bread)", ms: "Khubz (Roti)" }, audioId: 7 },
  { id: 8, arabic: "د", name: { en: "Dal", ms: "Dal" }, transliteration: "D", example: { en: "Dajaja (Chicken)", ms: "Dajaja (Ayam)" }, audioId: 8 },
  { id: 9, arabic: "ذ", name: { en: "Dhal", ms: "Dzal" }, transliteration: "Dh", example: { en: "Dhi'bayn (Wolf)", ms: "Dhi'bayn (Serigala)" }, audioId: 9 },
  { id: 10, arabic: "ر", name: { en: "Ra", ms: "Ra" }, transliteration: "R", example: { en: "Rajul (Man)", ms: "Rajul (Lelaki)" }, audioId: 10 },
  { id: 11, arabic: "ز", name: { en: "Zay", ms: "Za" }, transliteration: "Z", example: { en: "Zaytun (Olive)", ms: "Zaytun (Zaitun)" }, audioId: 11 },
  { id: 12, arabic: "س", name: { en: "Seen", ms: "Sin" }, transliteration: "S", example: { en: "Samak (Fish)", ms: "Samak (Ikan)" }, audioId: 12 },
  { id: 13, arabic: "ش", name: { en: "Sheen", ms: "Syin" }, transliteration: "Sh", example: { en: "Shams (Sun)", ms: "Syams (Matahari)" }, audioId: 13 },
  { id: 14, arabic: "ص", name: { en: "Sad (heavy)", ms: "Sod" }, transliteration: "Ṣ", example: { en: "Saqr (Falcon)", ms: "Saqr (Helang)" }, audioId: 14 },
  { id: 15, arabic: "ض", name: { en: "Dad (heavy)", ms: "Dhod" }, transliteration: "Ḍ", example: { en: "Difda' (Frog)", ms: "Difda' (Katak)" }, audioId: 15 },
  { id: 16, arabic: "ط", name: { en: "Ta (heavy)", ms: "Tho" }, transliteration: "Ṭ", example: { en: "Tayr (Bird)", ms: "Tayr (Burung)" }, audioId: 16 },
  { id: 17, arabic: "ظ", name: { en: "Zha (heavy)", ms: "Zho" }, transliteration: "Ẓ", example: { en: "Zhiraf (Giraffe)", ms: "Zhiraf (Zirafah)" }, audioId: 17 },
  { id: 18, arabic: "ع", name: { en: "Ayn", ms: "'Ain" }, transliteration: "ʿ", example: { en: "Asal (Honey)", ms: "Asal (Madu)" }, audioId: 18 },
  { id: 19, arabic: "غ", name: { en: "Ghayn", ms: "Ghin" }, transliteration: "Gh", example: { en: "Ghaymah (Cloud)", ms: "Ghaymah (Awan)" }, audioId: 19 },
  { id: 20, arabic: "ف", name: { en: "Fa", ms: "Fa" }, transliteration: "F", example: { en: "Feel (Elephant)", ms: "Feel (Gajah)" }, audioId: 20 },
  { id: 21, arabic: "ق", name: { en: "Qaf (heavy)", ms: "Qof" }, transliteration: "Q", example: { en: "Qalam (Pen)", ms: "Qalam (Pena)" }, audioId: 21 },
  { id: 22, arabic: "ك", name: { en: "Kaf", ms: "Kaf" }, transliteration: "K", example: { en: "Kalb (Dog)", ms: "Kalb (Anjing)" }, audioId: 22 },
  { id: 23, arabic: "ل", name: { en: "Lam", ms: "Lam" }, transliteration: "L", example: { en: "Layl (Night)", ms: "Layl (Malam)" }, audioId: 23 },
  { id: 24, arabic: "م", name: { en: "Meem", ms: "Mim" }, transliteration: "M", example: { en: "Maa' (Water)", ms: "Maa' (Air)" }, audioId: 24 },
  { id: 25, arabic: "ن", name: { en: "Noon", ms: "Nun" }, transliteration: "N", example: { en: "Nakhl (Palm tree)", ms: "Nakhl (Pokok Kurma)" }, audioId: 25 },
  { id: 26, arabic: "ه", name: { en: "Ha (light)", ms: "Ha" }, transliteration: "H", example: { en: "Hilal (Crescent)", ms: "Hilal (Anak Bulan)" }, audioId: 27 },
  { id: 27, arabic: "و", name: { en: "Waw", ms: "Wau" }, transliteration: "W", example: { en: "Ward (Rose)", ms: "Ward (Mawar)" }, audioId: 26 },
  { id: 28, arabic: "ي", name: { en: "Ya", ms: "Ya" }, transliteration: "Y", example: { en: "Yad (Hand)", ms: "Yad (Tangan)" }, audioId: 30 },
]

// ============================================================
// LEVEL 2 — Harakat (vowel marks)
// ============================================================

export interface HarakahItem {
  id: string
  symbol: string
  name: Bilingual
  sound: Bilingual // short vowel sound description
  example: Bilingual // letter + harakah
  exampleArabic: string
  audioLesson: string // '1', '4', or '4_' (the 'l' prefix is added by harakahAudioUrl)
  audioId: number // file id within that lesson
}

// Audio source: mualim-alquran.com
// Pattern: /wp-includes/audio/s1/l{lesson}/00{lesson}_silence_{id}.mp3
// e.g. lesson "4" -> /wp-includes/audio/s1/l4/004_silence_79.mp3
// e.g. lesson "4_" -> /wp-includes/audio/s1/l4_/004__silence_79.mp3
export const HARAKAT_AUDIO_BASE = "https://mualim-alquran.com/wp-includes/audio/s1"

export function harakahAudioUrl(lesson: string, audioId: number): string {
  // lesson is just the number (e.g. "4", "4_", "1"); 'l' prefix is added here
  return `${HARAKAT_AUDIO_BASE}/l${lesson}/00${lesson}_silence_${audioId}.mp3`
}

export const HARAKAT: HarakahItem[] = [
  {
    id: "fathah",
    symbol: "َ",
    name: { en: "Fathah", ms: "Fathah" },
    sound: { en: "Short 'a' as in 'cat'", ms: "Bunyi 'a' pendek" },
    example: { en: "Ba + Fathah = 'Ba'", ms: "Ba + Fathah = 'Ba'" },
    exampleArabic: "بَ",
    audioLesson: "4",
    audioId: 79, // Ba + Fathah
  },
  {
    id: "kasrah",
    symbol: "ِ",
    name: { en: "Kasrah", ms: "Kasrah" },
    sound: { en: "Short 'i' as in 'sit'", ms: "Bunyi 'i' pendek" },
    example: { en: "Ba + Kasrah = 'Bi'", ms: "Ba + Kasrah = 'Bi'" },
    exampleArabic: "بِ",
    audioLesson: "4",
    audioId: 80, // Ba + Kasrah
  },
  {
    id: "dammah",
    symbol: "ُ",
    name: { en: "Dammah", ms: "Dammah" },
    sound: { en: "Short 'u' as in 'put'", ms: "Bunyi 'u' pendek" },
    example: { en: "Ba + Dammah = 'Bu'", ms: "Ba + Dammah = 'Bu'" },
    exampleArabic: "بُ",
    audioLesson: "4",
    audioId: 6, // Ba + Dammah
  },
  {
    id: "tanwin-fath",
    symbol: "ً",
    name: { en: "Tanwin Fathah", ms: "Tanwin Fathah" },
    sound: { en: "'an' sound", ms: "Bunyi 'an'" },
    example: { en: "Ba + Tanwin Fathah = 'Ban'", ms: "Ba + Tanwin Fathah = 'Ban'" },
    exampleArabic: "بً",
    audioLesson: "4_",
    audioId: 79, // Ba + Tanwin Fathah
  },
  {
    id: "tanwin-kasr",
    symbol: "ٍ",
    name: { en: "Tanwin Kasrah", ms: "Tanwin Kasrah" },
    sound: { en: "'in' sound", ms: "Bunyi 'in'" },
    example: { en: "Ba + Tanwin Kasrah = 'Bin'", ms: "Ba + Tanwin Kasrah = 'Bin'" },
    exampleArabic: "بٍ",
    audioLesson: "4_",
    audioId: 80, // Ba + Tanwin Kasrah
  },
  {
    id: "tanwin-damm",
    symbol: "ٌ",
    name: { en: "Tanwin Dammah", ms: "Tanwin Dammah" },
    sound: { en: "'un' sound", ms: "Bunyi 'un'" },
    example: { en: "Ba + Tanwin Dammah = 'Bun'", ms: "Ba + Tanwin Dammah = 'Bun'" },
    exampleArabic: "بٌ",
    audioLesson: "4_",
    audioId: 6, // Ba + Tanwin Dammah
  },
  {
    id: "sukun",
    symbol: "ْ",
    name: { en: "Sukun", ms: "Sukun" },
    sound: { en: "No vowel (silent)", ms: "Tanpa bunyi vokal" },
    example: { en: "Ba + Sukun = just 'B'", ms: "Ba + Sukun = 'B' sahaja" },
    exampleArabic: "بْ",
    audioLesson: "1",
    audioId: 2, // raw Ba consonant (sukun = no vowel)
  },
  {
    id: "madd",
    symbol: "ـا",
    name: { en: "Madd (long vowel)", ms: "Madd (vokal panjang)" },
    sound: { en: "Stretched 'aa' sound", ms: "Bunyi 'aa' panjang" },
    example: { en: "Ba + Madd = 'Baa'", ms: "Ba + Madd = 'Baa'" },
    exampleArabic: "بَا",
    audioLesson: "4",
    audioId: 79, // Ba + Fathah (Madd extends the Fathah sound)
  },
]

// ============================================================
// LEVEL 3 — Tajweed intro (color-coded)
// ============================================================

export interface TajweedRule {
  id: string
  name: Bilingual
  color: string // tailwind class
  hexColor: string
  explanation: Bilingual
  letters: string[] // arabic letters
  example: Bilingual
  exampleArabic: string
  highlightedLetter: string
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: "qalqalah",
    name: { en: "Qalqalah (Echoing)", ms: "Qalqalah (Gema)" },
    color: "bg-rose-100 text-rose-700 border-rose-300",
    hexColor: "#fda4af",
    explanation: {
      en: "Letters that bounce with an echo when they have a Sukun.",
      ms: "Huruf yang bergema apabila ber Sukun.",
    },
    letters: ["ق", "ط", "ب", "ج", "د"],
    example: { en: "Like 'B' in 'cub' — a little bounce at the end.", ms: "Seperti 'B' pada 'cub' — sedikit gema di akhir." },
    exampleArabic: "قُطْبٌ جَادٌ",
    highlightedLetter: "ط",
  },
  {
    id: "ghunnah",
    name: { en: "Ghunnah (Nasal)", ms: "Ghunnah (Sengau)" },
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    hexColor: "#6ee7b7",
    explanation: {
      en: "Humming sound from the nose, with Noon and Meem.",
      ms: "Bunyi dengungan dari hidung pada huruf Noon dan Meem.",
    },
    letters: ["ن", "م"],
    example: { en: "Like humming 'mmm' for 2 beats.", ms: "Seperti dengungan 'mmm' selama 2 ketukan." },
    exampleArabic: "إِنَّ اللَّهَ",
    highlightedLetter: "ن",
  },
  {
    id: "idgham",
    name: { en: "Idgham (Merging)", ms: "Idgham (Penggabungan)" },
    color: "bg-amber-100 text-amber-700 border-amber-300",
    hexColor: "#fcd34d",
    explanation: {
      en: "When Noon meets certain letters, they merge together.",
      ms: "Apabila Noon bertemu huruf tertentu, ia bergabung.",
    },
    letters: ["ي", "و", "م", "ن", "ل", "ر"],
    example: { en: "Like 'm' + 'y' sliding smoothly into each other.", ms: "Seperti 'm' + 'y' yang bersatu dengan licin." },
    exampleArabic: "مِنْ وَرَائِهِمْ",
    highlightedLetter: "و",
  },
  {
    id: "ikhfa",
    name: { en: "Ikhfa (Hiding)", ms: "Ikhfa (Sembunyi)" },
    color: "bg-violet-100 text-violet-700 border-violet-300",
    hexColor: "#c4b5fd",
    explanation: {
      en: "Hide the Noon sound with a soft nasal hum.",
      ms: "Sembunyikan bunyi Noon dengan dengungan halus.",
    },
    letters: ["ت", "ث", "ج", "د", "ذ", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ف", "ق", "ك"],
    example: { en: "Like a gentle hum — not too clear, not too hidden.", ms: "Seperti dengungan lembut — tidak jelas, tidak tersembunyi." },
    exampleArabic: "مِنْ تَحْتِهَا",
    highlightedLetter: "ت",
  },
  {
    id: "madd",
    name: { en: "Madd (Stretching)", ms: "Madd (Panjang)" },
    color: "bg-sky-100 text-sky-700 border-sky-300",
    hexColor: "#7dd3fc",
    explanation: {
      en: "Stretch the vowel sound for 2 beats.",
      ms: "Panjangkan bunyi vokal selama 2 ketukan.",
    },
    letters: ["ا", "و", "ي"],
    example: { en: "Like 'aa' held longer, like singing.", ms: "Seperti 'aa' yang dipanjangkan, seperti bernyanyi." },
    exampleArabic: "قَالَ",
    highlightedLetter: "ا",
  },
]

// ============================================================
// LEVEL 4 — Short Surahs from Juz Amma
// Audio: EveryAyah corpus — https://everyayah.com/data/{reciter}/{surah:03d}{ayah:03d}.mp3
// ============================================================

export interface Ayah {
  number: number
  arabic: string
  translation: Bilingual
  transliteration: string
}

export interface Surah {
  id: number
  surahNumber: number // for everyayah URL
  name: Bilingual
  arabicName: string
  ayahs: Ayah[]
}

// Reciter for EveryAyah corpus
export const RECITER = "Alafasy_128kbps"
export const EVERYAYAH_BASE = "https://everyayah.com/data"

export function ayahAudioUrl(surahNumber: number, ayahNumber: number): string {
  return `${EVERYAYAH_BASE}/${RECITER}/${String(surahNumber).padStart(3, "0")}${String(ayahNumber).padStart(3, "0")}.mp3`
}

// Bismillah (common prefix, used as ayah 1 in some surahs)
const BISMILLAH: Ayah = {
  number: 0, // shown but tracked separately
  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  transliteration: "Bismi llāhi r-raḥmāni r-raḥīm",
  translation: {
    en: "In the name of Allah, the Most Gracious, the Most Merciful.",
    ms: "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani.",
  },
}

export const SURAHS: Surah[] = [
  {
    id: 1,
    surahNumber: 1,
    name: { en: "Al-Fatihah", ms: "Al-Fatihah" },
    arabicName: "الفاتحة",
    ayahs: [
      { ...BISMILLAH, number: 1 },
      {
        number: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Al-ḥamdu lillāhi rabbi l-ʿālamīn",
        translation: { en: "All praise is for Allah, Lord of all worlds.", ms: "Segala puji bagi Allah, Tuhan sekalian alam." },
      },
      {
        number: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Ar-raḥmāni r-raḥīm",
        translation: { en: "The Most Gracious, the Most Merciful.", ms: "Yang Maha Pemurah, lagi Maha Mengasihani." },
      },
      {
        number: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        transliteration: "Māliki yawmi d-dīn",
        translation: { en: "Master of the Day of Judgment.", ms: "Yang Menguasai hari pembalasan." },
      },
      {
        number: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
        translation: { en: "You alone we worship, and You alone we ask for help.", ms: "Engkaulah sahaja yang kami sembah, dan kepada Engkaulah kami memohon pertolongan." },
      },
      {
        number: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinā ṣ-ṣirāṭa l-mustaqīm",
        translation: { en: "Guide us to the straight path.", ms: "Tunjukilah kami jalan yang lurus." },
      },
      {
        number: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        transliteration: "Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",
        translation: { en: "The path of those You have blessed, not of those who earned anger, nor of those who went astray.", ms: "Jalan orang-orang yang Engkau kurniakan nikmat, bukan jalan orang-orang yang dimurkai, dan bukan jalan orang-orang yang sesat." },
      },
    ],
  },
  {
    id: 2,
    surahNumber: 112,
    name: { en: "Al-Ikhlas", ms: "Al-Ikhlas" },
    arabicName: "الإخلاص",
    ayahs: [
      { ...BISMILLAH, number: 1 },
      {
        number: 2,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        transliteration: "Qul huwa llāhu aḥad",
        translation: { en: "Say, He is Allah, the One.", ms: "Katakanlah, Dialah Allah, Yang Maha Esa." },
      },
      {
        number: 3,
        arabic: "اللَّهُ الصَّمَدُ",
        transliteration: "Allāhu ṣ-ṣamad",
        translation: { en: "Allah, the Eternal Refuge.", ms: "Allah, tempat bergantung segala sesuatu." },
      },
      {
        number: 4,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        transliteration: "Lam yalid wa-lam yūlad",
        translation: { en: "He neither begets nor is born.", ms: "Ia tidak beranak, dan tidak pula Ia diperanakkan." },
      },
      {
        number: 5,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        transliteration: "Wa-lam yakun lahu kufuwan aḥad",
        translation: { en: "And none is equal to Him.", ms: "Dan tidak ada sesiapa yang setara dengan-Nya." },
      },
    ],
  },
  {
    id: 3,
    surahNumber: 108,
    name: { en: "Al-Kawthar", ms: "Al-Kautsar" },
    arabicName: "الكوثر",
    ayahs: [
      { ...BISMILLAH, number: 1 },
      {
        number: 2,
        arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
        transliteration: "Innā aʿṭaynāka l-kawthar",
        translation: { en: "Indeed, We have granted you Al-Kawthar (a river in Paradise).", ms: "Sesungguhnya Kami telah memberikan kepadamu Al-Kautsar." },
      },
      {
        number: 3,
        arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
        transliteration: "Faṣalli li-rabbika wa-nḥar",
        translation: { en: "So pray to your Lord and sacrifice.", ms: "Maka dirikanlah sembahyang kerana Tuhanmu, dan sembelihlah korban." },
      },
      {
        number: 4,
        arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
        transliteration: "Inna shāni'aka huwa l-abtar",
        translation: { en: "Indeed, your enemy is the one cut off.", ms: "Sesungguhnya orang-orang yang membencimu, dialah yang terputus (dari rahmat)." },
      },
    ],
  },
  {
    id: 4,
    surahNumber: 113,
    name: { en: "Al-Falaq", ms: "Al-Falaq" },
    arabicName: "الفلق",
    ayahs: [
      { ...BISMILLAH, number: 1 },
      {
        number: 2,
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        transliteration: "Qul aʿūdhu bi-rabbi l-falaq",
        translation: { en: "Say, I seek refuge in the Lord of the dawn,", ms: "Katakanlah, Aku berlindung kepada Tuhan yang menyelubungi subuh," },
      },
      {
        number: 3,
        arabic: "مِن شَرِّ مَا خَلَقَ",
        transliteration: "Min sharri mā khalaq",
        translation: { en: "From the evil of what He created,", ms: "Dari kejahatan makhluk yang dijadikan-Nya," },
      },
      {
        number: 4,
        arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        transliteration: "Wa-min sharri ghāsiqin idhā waqab",
        translation: { en: "And from the evil of darkness when it settles,", ms: "Dan dari kejahatan malam apabila gelap gulita," },
      },
      {
        number: 5,
        arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        transliteration: "Wa-min sharri n-naffāthāti fī l-ʿuqad",
        translation: { en: "And from the evil of those who blow on knots,", ms: "Dan dari kejahatan tukang-tukang sihir yang menghembus pada buhul-buhul," },
      },
      {
        number: 6,
        arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration: "Wa-min sharri ḥāsidin idhā ḥasad",
        translation: { en: "And from the evil of an envier when he envies.", ms: "Dan dari kejahatan pendengki apabila ia mendengki." },
      },
    ],
  },
  {
    id: 5,
    surahNumber: 114,
    name: { en: "An-Nas", ms: "An-Nas" },
    arabicName: "الناس",
    ayahs: [
      { ...BISMILLAH, number: 1 },
      {
        number: 2,
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration: "Qul aʿūdhu bi-rabbi n-nās",
        translation: { en: "Say, I seek refuge in the Lord of mankind,", ms: "Katakanlah, Aku berlindung kepada Tuhan manusia," },
      },
      {
        number: 3,
        arabic: "مَلِكِ النَّاسِ",
        transliteration: "Maliki n-nās",
        translation: { en: "King of mankind,", ms: "Raja manusia," },
      },
      {
        number: 4,
        arabic: "إِلَٰهِ النَّاسِ",
        transliteration: "Ilāhi n-nās",
        translation: { en: "God of mankind,", ms: "Sembahan manusia," },
      },
      {
        number: 5,
        arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        transliteration: "Min sharri l-waswāsi l-khannās",
        translation: { en: "From the evil of the retreating whisperer,", ms: "Dari kejahatan pembisik yang bersembunyi," },
      },
      {
        number: 6,
        arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        transliteration: "Alladhī yuwaswisu fī ṣudūri n-nās",
        translation: { en: "Who whispers into the hearts of mankind,", ms: "Yang membisikkan waswas ke dalam dada manusia," },
      },
      {
        number: 7,
        arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        transliteration: "Mina l-jinnati wa-n-nās",
        translation: { en: "From among jinn and mankind.", ms: "Dari kalangan jin dan manusia." },
      },
    ],
  },
]

// ============================================================
// BADGES
// ============================================================

export interface Badge {
  id: string
  name: Bilingual
  emoji: string
  requirement: string // e.g. "level1:complete" or "surah:1"
}

export const BADGES: Badge[] = [
  { id: "first-letter", name: { en: "First Letter!", ms: "Huruf Pertama!" }, emoji: "🌱", requirement: "letter:1" },
  { id: "alphabet-master", name: { en: "Alphabet Master", ms: "Master Huruf" }, emoji: "🏆", requirement: "level1:complete" },
  { id: "harakat-hero", name: { en: "Harakat Hero", ms: "Wira Harakat" }, emoji: "⚡", requirement: "level2:complete" },
  { id: "tajweed-star", name: { en: "Tajweed Star", ms: "Bintang Tajwid" }, emoji: "🌟", requirement: "level3:complete" },
  { id: "fatihah-finisher", name: { en: "Fatihah Finisher", ms: "Penyelsai Fatihah" }, emoji: "📚", requirement: "surah:1" },
  { id: "ikhlas-star", name: { en: "Ikhlas Star", ms: "Bintang Ikhlas" }, emoji: "✨", requirement: "surah:2" },
  { id: "kawthar-kid", name: { en: "Kawthar Kid", ms: "Anak Kautsar" }, emoji: "💧", requirement: "surah:3" },
  { id: "falaq-friend", name: { en: "Falaq Friend", ms: "Sahabat Falaq" }, emoji: "🌅", requirement: "surah:4" },
  { id: "nas-navigator", name: { en: "Nas Navigator", ms: "Pandu Nas" }, emoji: "🛡️", requirement: "surah:5" },
  { id: "streak-3", name: { en: "3-Day Streak!", ms: "3 Hari Berturut!" }, emoji: "🔥", requirement: "streak:3" },
  { id: "streak-7", name: { en: "Week Warrior", ms: "Pahlawan Seminggu" }, emoji: "👑", requirement: "streak:7" },
  { id: "stars-30", name: { en: "30 Stars", ms: "30 Bintang" }, emoji: "💫", requirement: "stars:30" },
]

// ============================================================
// i18n STRINGS (UI labels)
// ============================================================

export type Lang = "en" | "ms"

export const UI = {
  appName: { en: "Little Qari", ms: "Qari Cilik" },
  tagline: { en: "Let's learn the Quran!", ms: "Mari belajar Al-Quran!" },
  level: { en: "Level", ms: "Tahap" },
  level1Title: { en: "Arabic Letters", ms: "Huruf Hijaiyah" },
  level1Desc: { en: "Meet the 28 letters", ms: "Kenali 28 huruf" },
  level2Title: { en: "Vowel Marks", ms: "Tanda Baris" },
  level2Desc: { en: "Fathah, Kasrah, Dammah", ms: "Fathah, Kasrah, Dammah" },
  level3Title: { en: "Tajweed Colors", ms: "Warna Tajwid" },
  level3Desc: { en: "Sound rules made fun", ms: "Hukum bunyi yang menyeronokkan" },
  level4Title: { en: "Short Surahs", ms: "Surah Pendek" },
  level4Desc: { en: "Listen & learn Juz Amma", ms: "Dengar & belajar Juz Amma" },
  listen: { en: "Listen", ms: "Dengar" },
  listenAgain: { en: "Listen Again", ms: "Dengar Lagi" },
  tapToHear: { en: "Tap to hear", ms: "Tekan untuk dengar" },
  tapToTranslate: { en: "Tap words for meaning", ms: "Tekan perkataan untuk maksud" },
  greatJob: { en: "Great job!", ms: "Bagus sekali!" },
  tryAgain: { en: "Try again", ms: "Cuba lagi" },
  next: { en: "Next", ms: "Seterusnya" },
  back: { en: "Back", ms: "Kembali" },
  home: { en: "Home", ms: "Laman Utama" },
  completed: { en: "Completed!", ms: "Selesai!" },
  yourStars: { en: "Your Stars", ms: "Bintang Kamu" },
  dayStreak: { en: "Day Streak", ms: "Hari Berturut" },
  badges: { en: "Badges", ms: "Lencana" },
  example: { en: "Example", ms: "Contoh" },
  letters: { en: "Letters", ms: "Huruf" },
  sound: { en: "Sound", ms: "Bunyi" },
  playSurah: { en: "Play All", ms: "Main Semua" },
  stop: { en: "Stop", ms: "Berhenti" },
  translation: { en: "Translation", ms: "Terjemahan" },
  transliteration: { en: "How to read", ms: "Cara baca" },
  ayah: { en: "Ayah", ms: "Ayat" },
  surah: { en: "Surah", ms: "Surah" },
  welcomeName: { en: "What's your name?", ms: "Siapa nama kamu?" },
  start: { en: "Start Learning", ms: "Mula Belajar" },
  yourName: { en: "Your name", ms: "Nama kamu" },
  chooseLanguage: { en: "Language", ms: "Bahasa" },
  english: { en: "English", ms: "Inggeris" },
  malay: { en: "Bahasa Melayu", ms: "Bahasa Melayu" },
  pickLevel: { en: "Pick a level to start", ms: "Pilih tahap untuk mula" },
  starsForThis: { en: "Stars earned here", ms: "Bintang yang diperoleh" },
  justEarned: { en: "You just earned a badge!", ms: "Kamu baru saja dapat lencana!" },
  mascotGreet: { en: "Assalamualaikum! I'm Noor the Star.", ms: "Assalamualaikum! Saya Noor si Bintang." },
  mascotIntro: { en: "Let's learn together!", ms: "Mari belajar bersama!" },
  listening: { en: "Listening...", ms: "Mendengar..." },
  notStarted: { en: "Not started yet", ms: "Belum mula" },
  inProgress: { en: "Keep going!", ms: "Teruskan!" },
  mastered: { en: "Mastered!", ms: "Mahir!" },
  replay: { en: "Replay", ms: "Main semula" },
  audioLoading: { en: "Loading audio...", ms: "Memuatkan audio..." },
  audioError: { en: "Couldn't load audio. Check your internet.", ms: "Tidak boleh muatkan audio. Semak internet." },
  reciter: { en: "Reciter: Mishary Alafasy", ms: "Qari: Mishary Alafasy" },
  forParents: { en: "For Parents", ms: "Untuk Ibu Bapa" },
  comingSoon: { en: "Coming soon", ms: "Akan datang" },
}
