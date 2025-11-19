import { useState, useRef } from 'react'
import { translateJSON } from '../lib/shipi18n'
import { LANGUAGES, POPULAR_LANGUAGES, getLanguageName } from '../constants/languages'

/**
 * FileTranslationExample - Realistic i18n workflow
 *
 * Demonstrates:
 * - Upload locale file (e.g., en.json)
 * - Select target languages (100+ supported)
 * - Translate entire file
 * - Download translated files
 */

export default function FileTranslationExample() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileContent, setFileContent] = useState(null)
  const [selectedLanguages, setSelectedLanguages] = useState(['es', 'fr'])
  const [translations, setTranslations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [showAllLanguages, setShowAllLanguages] = useState(false)
  const fileInputRef = useRef(null)

  // Filter out English (source language) from displayed languages
  const displayedLanguages = showAllLanguages
    ? LANGUAGES.filter(lang => lang.code !== 'en')
    : POPULAR_LANGUAGES.filter(lang => lang.code !== 'en')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    // Validate file type
    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file')
      return
    }

    // Validate file size (1MB limit for JSON files)
    if (file.size > 1024 * 1024) {
      setError('File is too large. Maximum size is 1MB.')
      return
    }

    setUploadedFile(file)
    setError(null)
    setTranslations(null)

    // Read file contents
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result)
        setFileContent(content)
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.')
        setUploadedFile(null)
      }
    }
    reader.readAsText(file)
  }

  const toggleLanguage = (langCode) => {
    setSelectedLanguages(prev =>
      prev.includes(langCode)
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    )
  }

  const handleTranslate = async () => {
    if (!fileContent || selectedLanguages.length === 0) {
      setError('Please upload a file and select at least one target language')
      return
    }

    setLoading(true)
    setError(null)
    setTranslations(null)

    try {
      const result = await translateJSON({
        json: fileContent,
        targetLanguages: selectedLanguages
      })

      setTranslations(result)
    } catch (err) {
      setError(err.message || 'Translation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = (langCode, content) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${langCode}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    if (!translations) return

    Object.entries(translations).forEach(([langCode, content]) => {
      setTimeout(() => downloadFile(langCode, content), 100)
    })
  }

  return (
    <div className="example-card">
      <h2>File Translation - Real i18n Workflow</h2>
      <p className="description">
        Upload your locale file (e.g., <code>en.json</code>), select target languages,
        and download translated files ready to use in your app.
      </p>

      {/* File Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : uploadedFile
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileInput}
          className="hidden"
        />

        {!uploadedFile ? (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JSON files only (max 1MB)
            </p>
          </>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-2 text-sm font-semibold text-gray-900">
              {uploadedFile.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Object.keys(fileContent || {}).length} keys • {(uploadedFile.size / 1024).toFixed(2)} KB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setUploadedFile(null)
                setFileContent(null)
                setTranslations(null)
              }}
              className="mt-2 text-xs text-red-600 hover:text-red-800"
            >
              Remove file
            </button>
          </>
        )}
      </div>

      {/* File Preview */}
      {fileContent && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">File Preview:</h4>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs max-h-48 overflow-y-auto">
            {JSON.stringify(fileContent, null, 2)}
          </pre>
        </div>
      )}

      {/* Language Selector */}
      {uploadedFile && (
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
      )}

      {/* Translate Button */}
      {uploadedFile && (
        <div className="mt-6">
          <button
            onClick={handleTranslate}
            disabled={loading || selectedLanguages.length === 0}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Translating...' : `Translate to ${selectedLanguages.length} Language${selectedLanguages.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>Error:</strong> {error}
          </p>
          {error.includes('Language limit exceeded') && (
            <div className="mt-3">
              <a
                href="https://shipi18n.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade Your Plan →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {translations && (
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Translated Files ({Object.keys(translations).length})
            </h3>
            <button
              onClick={downloadAll}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Download All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(translations).map(([langCode, content]) => {
              return (
                <div key={langCode} className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {getLanguageName(langCode)} ({langCode}.json)
                    </h4>
                    <button
                      onClick={() => downloadFile(langCode, content)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
                    {JSON.stringify(content, null, 2)}
                  </pre>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Success!</strong> Your translations are ready. Click "Download" to save each file,
              or "Download All" to get all files at once.
            </p>
            <p className="text-xs text-green-700 mt-2">
              💡 Tip: Place these files in your <code>locales/</code> or <code>public/locales/</code> folder
              and configure your i18n library (react-i18next, next-i18next, etc.).
            </p>
          </div>
        </div>
      )}

      {/* Usage Example */}
      {!uploadedFile && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Example locale file format:
          </h4>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "welcome": "Welcome to our app!",
  "greeting": "Hello, {{name}}!",
  "messages": {
    "count": "You have {{count}} new messages",
    "empty": "No messages"
  },
  "actions": {
    "submit": "Submit",
    "cancel": "Cancel"
  }
}`}
          </pre>
          <p className="text-xs text-blue-700 mt-2">
            Upload a file like this, and we'll translate all values while preserving
            placeholders like <code>{'{{name}}'}</code> and <code>{'{{count}}'}</code>.
          </p>
        </div>
      )}
    </div>
  )
}
