import { useState } from 'react'
import { translate } from '../lib/shipi18n'
import { LANGUAGES, POPULAR_LANGUAGES, getLanguageName } from '../constants/languages'

/**
 * MultiLangExample - Translate to multiple languages at once
 *
 * Demonstrates:
 * - Translating to multiple target languages in a single API call
 * - Displaying results for multiple languages
 * - Supports 100+ languages via Google Cloud Translation API
 */
export default function MultiLangExample() {
  const [text, setText] = useState('Welcome to our application!')
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLanguages, setSelectedLanguages] = useState(['es', 'fr', 'de', 'ja'])
  const [showAllLanguages, setShowAllLanguages] = useState(false)

  // Filter out English (source language) from the displayed languages
  const displayedLanguages = showAllLanguages
    ? LANGUAGES.filter(lang => lang.code !== 'en')
    : POPULAR_LANGUAGES.filter(lang => lang.code !== 'en')

  const toggleLanguage = (langCode) => {
    if (selectedLanguages.includes(langCode)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== langCode))
    } else {
      setSelectedLanguages([...selectedLanguages, langCode])
    }
  }

  const handleTranslate = async () => {
    if (selectedLanguages.length === 0) {
      setError('Please select at least one target language')
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
      <h2>Multi-Language Translation</h2>
      <p className="description">
        Translate text to multiple languages simultaneously. Choose from 100+ supported languages.
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

      <div className="input-group">
        <label>Select target languages ({selectedLanguages.length} selected):</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '10px',
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          {displayedLanguages.map((lang) => (
            <label key={lang.code} style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '5px'
            }}>
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang.code)}
                onChange={() => toggleLanguage(lang.code)}
                style={{ marginRight: '8px' }}
              />
              <span style={{ fontSize: '14px' }}>{lang.name}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAllLanguages(!showAllLanguages)}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#0066cc'
          }}
        >
          {showAllLanguages
            ? `Show popular languages only (${POPULAR_LANGUAGES.length - 1})`
            : `Show all ${LANGUAGES.length - 1} languages`
          }
        </button>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          {showAllLanguages
            ? `All ${LANGUAGES.length - 1} languages shown. Shipi18n supports 100+ languages via Google Cloud Translation API.`
            : `Showing ${POPULAR_LANGUAGES.length - 1} popular languages. Click above to see all.`
          }
        </p>
      </div>

      <button onClick={handleTranslate} disabled={loading || !text.trim() || selectedLanguages.length === 0}>
        {loading ? 'Translating...' : `Translate to ${selectedLanguages.length} Language${selectedLanguages.length !== 1 ? 's' : ''}`}
      </button>

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {translations && (
        <div className="result">
          <h3>Translations:</h3>
          {selectedLanguages.map((lang) => (
            <div key={lang} className="language-section">
              <h4>{getLanguageName(lang)} ({lang})</h4>
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
