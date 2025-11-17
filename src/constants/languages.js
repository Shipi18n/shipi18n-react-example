/**
 * Complete list of languages supported by Google Cloud Translation API
 * Source: https://cloud.google.com/translate/docs/languages
 * Total: 100+ languages
 */

export const LANGUAGES = [
  // Popular languages (sorted by usage)
  { code: 'en', name: 'English', region: 'Global' },
  { code: 'es', name: 'Spanish', region: 'Europe & Latin America' },
  { code: 'fr', name: 'French', region: 'Europe & Africa' },
  { code: 'de', name: 'German', region: 'Europe' },
  { code: 'zh', name: 'Chinese (Simplified)', region: 'Asia' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', region: 'Asia' },
  { code: 'ja', name: 'Japanese', region: 'Asia' },
  { code: 'ko', name: 'Korean', region: 'Asia' },
  { code: 'pt', name: 'Portuguese', region: 'Europe & Latin America' },
  { code: 'ru', name: 'Russian', region: 'Europe' },
  { code: 'it', name: 'Italian', region: 'Europe' },
  { code: 'ar', name: 'Arabic', region: 'Middle East & North Africa' },
  { code: 'hi', name: 'Hindi', region: 'South Asia' },
  { code: 'nl', name: 'Dutch', region: 'Europe' },
  { code: 'pl', name: 'Polish', region: 'Europe' },
  { code: 'tr', name: 'Turkish', region: 'Europe & Middle East' },
  { code: 'vi', name: 'Vietnamese', region: 'Southeast Asia' },
  { code: 'th', name: 'Thai', region: 'Southeast Asia' },
  { code: 'id', name: 'Indonesian', region: 'Southeast Asia' },
  { code: 'sv', name: 'Swedish', region: 'Europe' },

  // All other languages (alphabetical)
  { code: 'af', name: 'Afrikaans', region: 'Africa' },
  { code: 'sq', name: 'Albanian', region: 'Europe' },
  { code: 'am', name: 'Amharic', region: 'Africa' },
  { code: 'hy', name: 'Armenian', region: 'Europe & Middle East' },
  { code: 'az', name: 'Azerbaijani', region: 'Europe & Middle East' },
  { code: 'eu', name: 'Basque', region: 'Europe' },
  { code: 'be', name: 'Belarusian', region: 'Europe' },
  { code: 'bn', name: 'Bengali', region: 'South Asia' },
  { code: 'bs', name: 'Bosnian', region: 'Europe' },
  { code: 'bg', name: 'Bulgarian', region: 'Europe' },
  { code: 'ca', name: 'Catalan', region: 'Europe' },
  { code: 'ceb', name: 'Cebuano', region: 'Southeast Asia' },
  { code: 'ny', name: 'Chichewa', region: 'Africa' },
  { code: 'co', name: 'Corsican', region: 'Europe' },
  { code: 'hr', name: 'Croatian', region: 'Europe' },
  { code: 'cs', name: 'Czech', region: 'Europe' },
  { code: 'da', name: 'Danish', region: 'Europe' },
  { code: 'eo', name: 'Esperanto', region: 'Global' },
  { code: 'et', name: 'Estonian', region: 'Europe' },
  { code: 'tl', name: 'Filipino', region: 'Southeast Asia' },
  { code: 'fi', name: 'Finnish', region: 'Europe' },
  { code: 'fy', name: 'Frisian', region: 'Europe' },
  { code: 'gl', name: 'Galician', region: 'Europe' },
  { code: 'ka', name: 'Georgian', region: 'Europe & Middle East' },
  { code: 'el', name: 'Greek', region: 'Europe' },
  { code: 'gu', name: 'Gujarati', region: 'South Asia' },
  { code: 'ht', name: 'Haitian Creole', region: 'Caribbean' },
  { code: 'ha', name: 'Hausa', region: 'Africa' },
  { code: 'haw', name: 'Hawaiian', region: 'Pacific' },
  { code: 'iw', name: 'Hebrew', region: 'Middle East' },
  { code: 'hmn', name: 'Hmong', region: 'Asia' },
  { code: 'hu', name: 'Hungarian', region: 'Europe' },
  { code: 'is', name: 'Icelandic', region: 'Europe' },
  { code: 'ig', name: 'Igbo', region: 'Africa' },
  { code: 'ga', name: 'Irish', region: 'Europe' },
  { code: 'jw', name: 'Javanese', region: 'Southeast Asia' },
  { code: 'kn', name: 'Kannada', region: 'South Asia' },
  { code: 'kk', name: 'Kazakh', region: 'Central Asia' },
  { code: 'km', name: 'Khmer', region: 'Southeast Asia' },
  { code: 'rw', name: 'Kinyarwanda', region: 'Africa' },
  { code: 'ku', name: 'Kurdish (Kurmanji)', region: 'Middle East' },
  { code: 'ky', name: 'Kyrgyz', region: 'Central Asia' },
  { code: 'lo', name: 'Lao', region: 'Southeast Asia' },
  { code: 'la', name: 'Latin', region: 'Europe' },
  { code: 'lv', name: 'Latvian', region: 'Europe' },
  { code: 'lt', name: 'Lithuanian', region: 'Europe' },
  { code: 'lb', name: 'Luxembourgish', region: 'Europe' },
  { code: 'mk', name: 'Macedonian', region: 'Europe' },
  { code: 'mg', name: 'Malagasy', region: 'Africa' },
  { code: 'ms', name: 'Malay', region: 'Southeast Asia' },
  { code: 'ml', name: 'Malayalam', region: 'South Asia' },
  { code: 'mt', name: 'Maltese', region: 'Europe' },
  { code: 'mi', name: 'Maori', region: 'Pacific' },
  { code: 'mr', name: 'Marathi', region: 'South Asia' },
  { code: 'mn', name: 'Mongolian', region: 'Asia' },
  { code: 'my', name: 'Myanmar (Burmese)', region: 'Southeast Asia' },
  { code: 'ne', name: 'Nepali', region: 'South Asia' },
  { code: 'no', name: 'Norwegian', region: 'Europe' },
  { code: 'or', name: 'Odia (Oriya)', region: 'South Asia' },
  { code: 'ps', name: 'Pashto', region: 'South Asia & Middle East' },
  { code: 'fa', name: 'Persian', region: 'Middle East' },
  { code: 'pa', name: 'Punjabi', region: 'South Asia' },
  { code: 'ro', name: 'Romanian', region: 'Europe' },
  { code: 'sm', name: 'Samoan', region: 'Pacific' },
  { code: 'gd', name: 'Scots Gaelic', region: 'Europe' },
  { code: 'sr', name: 'Serbian', region: 'Europe' },
  { code: 'st', name: 'Sesotho', region: 'Africa' },
  { code: 'sn', name: 'Shona', region: 'Africa' },
  { code: 'sd', name: 'Sindhi', region: 'South Asia' },
  { code: 'si', name: 'Sinhala', region: 'South Asia' },
  { code: 'sk', name: 'Slovak', region: 'Europe' },
  { code: 'sl', name: 'Slovenian', region: 'Europe' },
  { code: 'so', name: 'Somali', region: 'Africa' },
  { code: 'su', name: 'Sundanese', region: 'Southeast Asia' },
  { code: 'sw', name: 'Swahili', region: 'Africa' },
  { code: 'tg', name: 'Tajik', region: 'Central Asia' },
  { code: 'ta', name: 'Tamil', region: 'South Asia' },
  { code: 'tt', name: 'Tatar', region: 'Europe' },
  { code: 'te', name: 'Telugu', region: 'South Asia' },
  { code: 'tk', name: 'Turkmen', region: 'Central Asia' },
  { code: 'uk', name: 'Ukrainian', region: 'Europe' },
  { code: 'ur', name: 'Urdu', region: 'South Asia & Middle East' },
  { code: 'ug', name: 'Uyghur', region: 'Central Asia' },
  { code: 'uz', name: 'Uzbek', region: 'Central Asia' },
  { code: 'cy', name: 'Welsh', region: 'Europe' },
  { code: 'xh', name: 'Xhosa', region: 'Africa' },
  { code: 'yi', name: 'Yiddish', region: 'Europe' },
  { code: 'yo', name: 'Yoruba', region: 'Africa' },
  { code: 'zu', name: 'Zulu', region: 'Africa' },
]

// Popular languages for quick access (top 20 by usage)
export const POPULAR_LANGUAGES = LANGUAGES.slice(0, 20)

// Group languages by region for filtering
export const LANGUAGES_BY_REGION = {
  'Global': LANGUAGES.filter(l => l.region === 'Global'),
  'Europe': LANGUAGES.filter(l => l.region.includes('Europe')),
  'Asia': LANGUAGES.filter(l => l.region.includes('Asia')),
  'Middle East': LANGUAGES.filter(l => l.region.includes('Middle East')),
  'Africa': LANGUAGES.filter(l => l.region.includes('Africa')),
  'Americas': LANGUAGES.filter(l => l.region.includes('Latin America') || l.region.includes('Caribbean')),
  'Pacific': LANGUAGES.filter(l => l.region.includes('Pacific')),
}

// Helper function to get language name by code
export const getLanguageName = (code) => {
  const lang = LANGUAGES.find(l => l.code === code)
  return lang ? lang.name : code
}

// Helper function to search languages
export const searchLanguages = (query) => {
  const lowerQuery = query.toLowerCase()
  return LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(lowerQuery) ||
    lang.code.toLowerCase().includes(lowerQuery)
  )
}

export default LANGUAGES
