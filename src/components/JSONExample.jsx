import { useState } from 'react'
import { translateJSON } from '../lib/shipi18n'

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
              const language = POPULAR_LANGUAGES.find(l => l.code === langCode)
              return (
                <div key={langCode} className="json-section">
                  <h4>{language?.name || langCode} ({langCode})</h4>
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
