import { useState } from 'react'
import { translateJSON } from '../lib/shipi18n'

/**
 * JSONExample - Translate JSON while preserving structure
 *
 * Demonstrates:
 * - JSON-aware translation
 * - Structure preservation
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
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTranslate = async () => {
    setLoading(true)
    setError(null)
    setTranslations(null)

    try {
      // Validate JSON first
      JSON.parse(jsonInput)

      const result = await translateJSON({
        json: jsonInput,
        targetLanguages: ['es', 'fr']
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

      <button onClick={handleTranslate} disabled={loading || !jsonInput.trim()}>
        {loading ? 'Translating...' : 'Translate JSON to Spanish & French'}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translations && (
        <div className="result">
          <h3>Translated JSON:</h3>

          <div className="json-results">
            <div className="json-section">
              <h4>Spanish (es)</h4>
              <pre>{JSON.stringify(translations.es, null, 2)}</pre>
            </div>

            <div className="json-section">
              <h4>French (fr)</h4>
              <pre>{JSON.stringify(translations.fr, null, 2)}</pre>
            </div>
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
