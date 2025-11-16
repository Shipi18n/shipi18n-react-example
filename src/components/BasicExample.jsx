import { useState } from 'react'
import { translate } from '../lib/shipi18n'

/**
 * BasicExample - Simple text translation to a single language
 *
 * Demonstrates:
 * - Basic API usage
 * - Loading states
 * - Error handling
 */
export default function BasicExample() {
  const [text, setText] = useState('Hello, World!')
  const [translation, setTranslation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTranslate = async () => {
    setLoading(true)
    setError(null)
    setTranslation(null)

    try {
      const result = await translate({
        text,
        targetLanguages: ['es']
      })

      setTranslation(result.es)
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
        Translate text from English to Spanish using the Shipi18n API.
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

      <button onClick={handleTranslate} disabled={loading || !text.trim()}>
        {loading ? 'Translating...' : 'Translate to Spanish'}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translation && (
        <div className="result">
          <h3>Translation (Spanish):</h3>
          <div className="translation-list">
            {translation.map((item, index) => (
              <div key={index} className="translation-item">
                <div className="original">{item.original}</div>
                <div className="arrow">→</div>
                <div className="translated">{item.translated}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
