import { useState } from 'react'
import { translateJSON } from '../lib/shipi18n'
import { LANGUAGES, POPULAR_LANGUAGES, getLanguageName } from '../constants/languages'

/**
 * JSONExample - Translate JSON while preserving structure
 *
 * Demonstrates:
 * - JSON-aware translation
 * - Structure preservation
 * - Multi-language selection
 * - Handling complex nested objects
 */
export default function JSONExample() {
  const [jsonInput, setJsonInput] = useState(`{
  "welcome": "Welcome to our app",
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "messages": [
    "Thank you for signing up",
    "Please check your email"
  ]
}`)
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
    if (!jsonInput.trim() || selectedLanguages.length === 0) {
      setError('Please enter JSON and select at least one language')
      return
    }

    setLoading(true)
    setError(null)
    setTranslations(null)

    try {
      // Validate JSON first
      JSON.parse(jsonInput)

      const result = await translateJSON({
        json: jsonInput,
        targetLanguages: selectedLanguages
      })

      setTranslations(result)
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON: ' + err.message)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="example-card">
      <h2>JSON Translation</h2>
      <p className="description">
        Translate JSON content while preserving the structure. Perfect for
        translating app localization files.
      </p>

      <div className="input-group">
        <label htmlFor="json-input">JSON to translate:</label>
        <textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter valid JSON..."
          rows={10}
          style={{ fontFamily: 'monospace', fontSize: '14px' }}
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
        disabled={loading || !jsonInput.trim() || selectedLanguages.length === 0}
        className="mt-6"
      >
        {loading ? 'Translating...' : `Translate JSON to ${selectedLanguages.length} Language${selectedLanguages.length !== 1 ? 's' : ''}`}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translations && (
        <div className="result">
          <h3>Translated JSON ({Object.keys(translations).length} languages):</h3>

          <div className="json-results">
            {Object.entries(translations).map(([langCode, content]) => {
              if (langCode === 'warnings') return null
              return (
                <div key={langCode} className="json-section">
                  <h4>{getLanguageName(langCode)} ({langCode})</h4>
                  <pre>{JSON.stringify(content, null, 2)}</pre>
                </div>
              )
            })}
          </div>

          {translations.warnings && (
            <div className="warning">
              <strong>Warnings:</strong>
              <ul>
                {translations.warnings.map((warning, index) => (
                  <li key={index}>{warning.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
