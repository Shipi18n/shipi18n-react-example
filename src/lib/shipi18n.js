/**
 * Shipi18n API Client
 *
 * A simple wrapper around the Shipi18n translation API.
 * Uses native fetch - no external dependencies required.
 */

const API_BASE_URL = import.meta.env.VITE_SHIPI18N_API_URL || 'https://shipi18n.com/api'
const API_KEY = import.meta.env.VITE_SHIPI18N_API_KEY

/**
 * Translate text to one or more target languages
 *
 * @param {Object} options - Translation options
 * @param {string} options.text - The text to translate
 * @param {string} [options.sourceLanguage='en'] - Source language code (e.g., 'en', 'es')
 * @param {string[]} options.targetLanguages - Array of target language codes (e.g., ['es', 'fr', 'de'])
 * @param {boolean} [options.preservePlaceholders=false] - Preserve placeholders like {name}, {{value}}, %s, etc.
 * @returns {Promise<Object>} Translation results keyed by language code
 *
 * @example
 * const result = await translate({
 *   text: 'Hello, {name}!',
 *   targetLanguages: ['es', 'fr'],
 *   preservePlaceholders: true
 * })
 * // Returns: { es: [...], fr: [...] }
 */
export async function translate({
  text,
  sourceLanguage = 'en',
  targetLanguages,
  preservePlaceholders = false
}) {
  if (!API_KEY) {
    throw new Error('VITE_SHIPI18N_API_KEY environment variable is not set')
  }

  if (!text || typeof text !== 'string') {
    throw new Error('Text parameter is required and must be a string')
  }

  if (!Array.isArray(targetLanguages) || targetLanguages.length === 0) {
    throw new Error('targetLanguages must be a non-empty array')
  }

  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY
    },
    body: JSON.stringify({
      inputMethod: 'text',
      text,
      sourceLanguage,
      targetLanguages: JSON.stringify(targetLanguages),
      preservePlaceholders: String(preservePlaceholders)
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }))
    // Handle new structured error format: { error: { code, message, status } }
    const errorMessage = errorData.error?.message || errorData.message || `Translation failed: ${response.statusText}`
    const errorCode = errorData.error?.code
    const error = new Error(errorMessage)
    error.code = errorCode
    error.status = response.status
    throw error
  }

  return response.json()
}

/**
 * Translate JSON content while preserving structure
 *
 * @param {Object|string} options - Translation options
 * @param {Object|string} options.json - JSON object or stringified JSON
 * @param {string} [options.sourceLanguage='en'] - Source language code
 * @param {string[]} options.targetLanguages - Array of target language codes
 * @param {boolean} [options.preservePlaceholders=false] - Preserve placeholders in values
 * @returns {Promise<Object>} Translation results with JSON structure preserved
 *
 * @example
 * const result = await translateJSON({
 *   json: { greeting: 'Hello', farewell: 'Goodbye' },
 *   targetLanguages: ['es', 'fr']
 * })
 * // Returns: { es: { greeting: 'Hola', farewell: 'Adiós' }, fr: { greeting: 'Bonjour', farewell: 'Au revoir' } }
 */
export async function translateJSON({
  json,
  sourceLanguage = 'en',
  targetLanguages,
  preservePlaceholders = false
}) {
  if (!API_KEY) {
    throw new Error('VITE_SHIPI18N_API_KEY environment variable is not set')
  }

  if (!json) {
    throw new Error('JSON parameter is required')
  }

  if (!Array.isArray(targetLanguages) || targetLanguages.length === 0) {
    throw new Error('targetLanguages must be a non-empty array')
  }

  // Convert to string if it's an object
  const jsonString = typeof json === 'string' ? json : JSON.stringify(json)

  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY
    },
    body: JSON.stringify({
      inputMethod: 'text',
      text: jsonString,
      sourceLanguage,
      targetLanguages: JSON.stringify(targetLanguages),
      preservePlaceholders: String(preservePlaceholders)
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }))
    // Handle new structured error format: { error: { code, message, status } }
    const errorMessage = errorData.error?.message || errorData.message || `Translation failed: ${response.statusText}`
    const errorCode = errorData.error?.code
    const error = new Error(errorMessage)
    error.code = errorCode
    error.status = response.status
    throw error
  }

  const result = await response.json()

  // Parse JSON strings back to objects
  const parsed = {}
  for (const [lang, jsonStr] of Object.entries(result)) {
    if (lang === 'warnings') {
      parsed.warnings = jsonStr
      continue
    }
    try {
      parsed[lang] = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr
    } catch (e) {
      parsed[lang] = jsonStr
    }
  }

  return parsed
}

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/api/health`)

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`)
  }

  return response.json()
}
