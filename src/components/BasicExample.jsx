import { useState } from 'react'
import { translate } from '../lib/shipi18n'
import { LANGUAGES, POPULAR_LANGUAGES, getLanguageName } from '../constants/languages'

/**
 * BasicExample - Text translation to multiple languages
 *
 * Demonstrates:
 * - Basic API usage
 * - Multi-language selection (100+ languages)
 * - Loading states
 * - Error handling
 */
export default function BasicExample() {
  const [text, setText] = useState('Hello, World!')
  const [selectedLanguages, setSelectedLanguages] = useState(['es', 'fr'])
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  // Filter out English (source language) from displayed languages
  const displayedLanguages = showAllLanguages
    ? LANGUAGES.filter(lang => lang.code !== 'en')
    : POPULAR_LANGUAGES.filter(lang => lang.code !== 'en')

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
          {displayedLanguages.map(lang => (
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

        <button
          type="button"
          onClick={() => setShowAllLanguages(!showAllLanguages)}
          className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAllLanguages
            ? `Show popular languages only (${POPULAR_LANGUAGES.length - 1})`
            : `Show all ${LANGUAGES.length - 1} languages`
          }
        </button>

        <p className="text-xs text-gray-500 mt-2">
          {showAllLanguages
            ? `All ${LANGUAGES.length - 1} languages shown. Shipi18n supports 100+ languages via Google Cloud Translation API.`
            : `Showing ${POPULAR_LANGUAGES.length - 1} popular languages. Click above to see all.`
          }
        </p>
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
              return (
                <div key={langCode} className="language-section">
                  <h4>{getLanguageName(langCode)}:</h4>
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
