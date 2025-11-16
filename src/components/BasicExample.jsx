import { useState } from 'react'
import { translate } from '../lib/shipi18n'

const POPULAR_LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ko', name: 'Korean' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
]

/**
 * BasicExample - Text translation to multiple languages
 *
 * Demonstrates:
 * - Basic API usage
 * - Multi-language selection
 * - Loading states
 * - Error handling
 */
export default function BasicExample() {
  const [text, setText] = useState('Hello, World!')
  const [selectedLanguages, setSelectedLanguages] = useState(['es', 'fr'])
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggleLanguage = (langCode) => {
    setSelectedLanguages(prev =>
      prev.includes(langCode)
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    )
  }

  const handleTranslate = async () => {
    if (!text.trim() || selectedLanguages.length === 0) {
      setError('Please enter text and select at least one language')
      return
    }

    setLoading(true)
    setError(null)
    setTranslations(null)

    try {
      const result = await translate({
        text,
        targetLanguages: selectedLanguages
      })

      setTranslations(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="example-card">
      <h2>Basic Translation</h2>
      <p className="description">
        Translate text to multiple languages in a single API call.
      </p>

      <div className="input-group">
        <label htmlFor="basic-text">Enter text to translate:</label>
        <textarea
          id="basic-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter English text..."
          rows={4}
        />
      </div>

      {/* Language Selector */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Select Target Languages ({selectedLanguages.length} selected):
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {POPULAR_LANGUAGES.map(lang => (
            <label
              key={lang.code}
              className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedLanguages.includes(lang.code)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang.code)}
                onChange={() => toggleLanguage(lang.code)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {lang.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading || !text.trim() || selectedLanguages.length === 0}
        className="mt-6"
      >
        {loading ? 'Translating...' : `Translate to ${selectedLanguages.length} Language${selectedLanguages.length !== 1 ? 's' : ''}`}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translations && (
        <div className="result">
          <h3>Translations ({Object.keys(translations).length} languages):</h3>
          <div className="space-y-6">
            {Object.entries(translations).map(([langCode, items]) => {
              const language = POPULAR_LANGUAGES.find(l => l.code === langCode)
              return (
                <div key={langCode} className="language-section">
                  <h4>{language?.name || langCode}:</h4>
                  <div className="translation-list">
                    {items.map((item, index) => (
                      <div key={index} className="translation-item">
                        <div className="original">{item.original}</div>
                        <div className="arrow">→</div>
                        <div className="translated">{item.translated}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
