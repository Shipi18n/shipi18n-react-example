import { useState } from 'react'
import { translate } from '../lib/shipi18n'

/**
 * MultiLangExample - Translate to multiple languages at once
 *
 * Demonstrates:
 * - Translating to multiple target languages in a single API call
 * - Displaying results for multiple languages
 */
export default function MultiLangExample() {
  const [text, setText] = useState('Welcome to our application!')
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const targetLanguages = ['es', 'fr', 'de', 'ja']
  const languageNames = {
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    ja: 'Japanese'
  }

  const handleTranslate = async () => {
    setLoading(true)
    setError(null)
    setTranslations(null)

    try {
      const result = await translate({
        text,
        targetLanguages
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
      <h2>Multi-Language Translation</h2>
      <p className="description">
        Translate text to multiple languages simultaneously.
      </p>

      <div className="input-group">
        <label htmlFor="multi-text">Enter text to translate:</label>
        <textarea
          id="multi-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter English text..."
          rows={3}
        />
      </div>

      <button onClick={handleTranslate} disabled={loading || !text.trim()}>
        {loading ? 'Translating...' : `Translate to ${targetLanguages.length} Languages`}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translations && (
        <div className="result">
          <h3>Translations:</h3>
          {targetLanguages.map((lang) => (
            <div key={lang} className="language-section">
              <h4>{languageNames[lang]} ({lang})</h4>
              <div className="translation-list">
                {translations[lang]?.map((item, index) => (
                  <div key={index} className="translation-item">
                    <div className="original">{item.original}</div>
                    <div className="arrow">→</div>
                    <div className="translated">{item.translated}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
