import { useState } from 'react'
import { translate } from '../lib/shipi18n'

/**
 * PlaceholderExample - Preserve placeholders during translation
 *
 * Demonstrates:
 * - Preserving placeholders like {name}, {{value}}, %s, <tag>, etc.
 * - Comparing translations with and without placeholder preservation
 */
export default function PlaceholderExample() {
  const [text, setText] = useState('Hello {username}, you have {count} new messages!')
  const [withPlaceholders, setWithPlaceholders] = useState(null)
  const [withoutPlaceholders, setWithoutPlaceholders] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTranslate = async () => {
    setLoading(true)
    setError(null)
    setWithPlaceholders(null)
    setWithoutPlaceholders(null)

    try {
      // Translate with placeholder preservation
      const resultWith = await translate({
        text,
        targetLanguages: ['es'],
        preservePlaceholders: true
      })

      // Translate without placeholder preservation
      const resultWithout = await translate({
        text,
        targetLanguages: ['es'],
        preservePlaceholders: false
      })

      setWithPlaceholders(resultWith.es)
      setWithoutPlaceholders(resultWithout.es)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const examples = [
    'Hello {username}, welcome back!',
    'You have {count} items in your cart',
    'Welcome to {{siteName}}',
    'Loading %s of %s...',
    'Click <here> to continue'
  ]

  return (
    <div className="example-card">
      <h2>Placeholder Preservation</h2>
      <p className="description">
        Preserve placeholders like {'{username}'}, {'{count}'}, %s, {'{{value}}'}, {'<tag>'} during translation.
        This is essential for dynamic content in your applications.
      </p>

      <div className="input-group">
        <label htmlFor="placeholder-text">Enter text with placeholders:</label>
        <textarea
          id="placeholder-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text with placeholders..."
          rows={3}
        />
        <div className="examples">
          <strong>Try these examples:</strong>
          <div className="example-chips">
            {examples.map((example, index) => (
              <button
                key={index}
                className="chip"
                onClick={() => setText(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleTranslate} disabled={loading || !text.trim()}>
        {loading ? 'Translating...' : 'Compare Translation Methods'}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {withPlaceholders && withoutPlaceholders && (
        <div className="result">
          <h3>Comparison:</h3>

          <div className="comparison">
            <div className="comparison-section">
              <h4>✅ With Placeholder Preservation</h4>
              <div className="translation-list">
                {withPlaceholders.map((item, index) => (
                  <div key={index} className="translation-item">
                    <div className="translated highlight">{item.translated}</div>
                  </div>
                ))}
              </div>
              <p className="note">
                Placeholders are preserved and remain unchanged
              </p>
            </div>

            <div className="comparison-section">
              <h4>❌ Without Placeholder Preservation</h4>
              <div className="translation-list">
                {withoutPlaceholders.map((item, index) => (
                  <div key={index} className="translation-item">
                    <div className="translated">{item.translated}</div>
                  </div>
                ))}
              </div>
              <p className="note">
                Placeholders may be translated or modified
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
