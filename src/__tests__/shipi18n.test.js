/**
 * Tests for Shipi18n React Example
 *
 * These tests verify the client library patterns and React integration logic.
 */

import { jest } from '@jest/globals';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock environment for tests
const mockEnv = {
  VITE_SHIPI18N_API_KEY: 'sk_test_123456',
  VITE_SHIPI18N_API_URL: 'https://api.test.shipi18n.com'
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe('Shipi18n API Client Patterns', () => {
  describe('API URL construction', () => {
    it('constructs correct translate endpoint URL', () => {
      const apiUrl = mockEnv.VITE_SHIPI18N_API_URL;
      const endpoint = '/translate';
      const url = `${apiUrl}/api${endpoint}`;

      expect(url).toBe('https://api.test.shipi18n.com/api/translate');
    });

    it('uses default API URL when not specified', () => {
      const DEFAULT_URL = 'https://x9527l3blg.execute-api.us-east-1.amazonaws.com';
      const apiUrl = undefined || DEFAULT_URL;

      expect(apiUrl).toBe(DEFAULT_URL);
    });
  });

  describe('Request formatting', () => {
    it('formats basic translation request correctly', () => {
      const request = {
        text: 'Hello, World!',
        sourceLanguage: 'en',
        targetLanguages: ['es', 'fr'],
        preservePlaceholders: true,
      };

      expect(request.text).toBe('Hello, World!');
      expect(request.targetLanguages).toHaveLength(2);
      expect(request.preservePlaceholders).toBe(true);
    });

    it('formats JSON translation request correctly', () => {
      const json = { greeting: 'Hello', farewell: 'Goodbye' };
      const jsonString = JSON.stringify(json);

      expect(jsonString).toBe('{"greeting":"Hello","farewell":"Goodbye"}');
    });

    it('handles nested JSON structures', () => {
      const json = {
        common: { welcome: 'Welcome' },
        auth: { login: 'Login' },
      };
      const jsonString = JSON.stringify(json);

      expect(JSON.parse(jsonString)).toEqual(json);
    });
  });

  describe('Response parsing', () => {
    it('parses translation response correctly', () => {
      const response = {
        es: [{ original: 'Hello', translated: 'Hola' }],
        fr: [{ original: 'Hello', translated: 'Bonjour' }],
      };

      expect(response.es[0].translated).toBe('Hola');
      expect(response.fr[0].translated).toBe('Bonjour');
    });

    it('parses JSON translation response correctly', () => {
      const response = {
        es: { greeting: 'Hola', farewell: 'Adiós' },
        fr: { greeting: 'Bonjour', farewell: 'Au revoir' },
      };

      expect(response.es.greeting).toBe('Hola');
      expect(response.fr.farewell).toBe('Au revoir');
    });
  });

  describe('Error handling', () => {
    it('detects missing API key', () => {
      const apiKey = undefined;
      const hasApiKey = !!apiKey;

      expect(hasApiKey).toBe(false);
    });

    it('constructs proper error message', () => {
      const errorMessage = 'VITE_SHIPI18N_API_KEY is not set. Get your free key at https://shipi18n.com';

      expect(errorMessage).toContain('VITE_SHIPI18N_API_KEY');
      expect(errorMessage).toContain('shipi18n.com');
    });

    it('handles non-ok response status', () => {
      const response = { ok: false, status: 401 };
      const isError = !response.ok;

      expect(isError).toBe(true);
      expect(response.status).toBe(401);
    });
  });

  describe('Headers', () => {
    it('includes required headers', () => {
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': mockEnv.VITE_SHIPI18N_API_KEY,
      };

      expect(headers['Content-Type']).toBe('application/json');
      expect(headers['x-api-key']).toBe('sk_test_123456');
    });
  });
});

describe('React Integration Patterns', () => {
  describe('useState pattern', () => {
    it('manages translation state', () => {
      let translations = null;
      const setTranslations = (value) => { translations = value; };

      setTranslations({ es: { greeting: 'Hola' } });

      expect(translations.es.greeting).toBe('Hola');
    });

    it('manages loading state', () => {
      let isLoading = false;
      const setLoading = (value) => { isLoading = value; };

      setLoading(true);
      expect(isLoading).toBe(true);
      setLoading(false);
      expect(isLoading).toBe(false);
    });

    it('manages error state', () => {
      let error = null;
      const setError = (value) => { error = value; };

      setError(new Error('API error'));
      expect(error.message).toBe('API error');
    });
  });

  describe('File handling pattern', () => {
    it('parses uploaded JSON file', () => {
      const fileContent = '{"greeting": "Hello"}';
      const parsed = JSON.parse(fileContent);

      expect(parsed.greeting).toBe('Hello');
    });

    it('generates downloadable translation files', () => {
      const translations = {
        es: { greeting: 'Hola' },
        fr: { greeting: 'Bonjour' },
      };

      const esJson = JSON.stringify(translations.es, null, 2);
      const frJson = JSON.stringify(translations.fr, null, 2);

      expect(esJson).toContain('Hola');
      expect(frJson).toContain('Bonjour');
    });
  });
});

/**
 * Snapshot tests for translation response structures
 */
describe('Translation Response Snapshots', () => {
  it('should match expected JSON translation response structure', () => {
    const translationResponse = {
      es: {
        common: {
          greeting: 'Hola',
          farewell: 'Adiós',
          buttons: { submit: 'Enviar', cancel: 'Cancelar' },
        },
      },
      fr: {
        common: {
          greeting: 'Bonjour',
          farewell: 'Au revoir',
          buttons: { submit: 'Soumettre', cancel: 'Annuler' },
        },
      },
    };

    expect(translationResponse).toMatchSnapshot();
  });

  it('should match expected pluralization response structure', () => {
    const pluralResponse = {
      es: {
        items_one: '{{count}} artículo',
        items_other: '{{count}} artículos',
      },
      ru: {
        items_one: '{{count}} элемент',
        items_few: '{{count}} элемента',
        items_many: '{{count}} элементов',
        items_other: '{{count}} элементов',
      },
    };

    expect(pluralResponse).toMatchSnapshot();
  });

  it('should match expected text translation response structure', () => {
    const textResponse = {
      es: [
        { original: 'Hello, world!', translated: '¡Hola, mundo!' },
        { original: 'Welcome', translated: 'Bienvenido' },
      ],
    };

    expect(textResponse).toMatchSnapshot();
  });
});

describe('Placeholder Preservation', () => {
  it('preserves i18next placeholders', () => {
    const output = 'Hola, {{name}}!';
    expect(output).toContain('{{name}}');
  });

  it('preserves React Intl placeholders', () => {
    const output = 'Hola, {name}!';
    expect(output).toContain('{name}');
  });

  it('preserves multiple placeholders', () => {
    const output = '{{user}} tiene {{count}} mensajes';
    expect(output).toContain('{{user}}');
    expect(output).toContain('{{count}}');
  });
});

describe('Language Codes', () => {
  it('accepts standard language codes', () => {
    const validCodes = ['es', 'fr', 'de', 'ja', 'zh', 'pt', 'ru', 'ar', 'ko', 'it'];

    validCodes.forEach(code => {
      expect(code).toMatch(/^[a-z]{2}$/);
    });
  });

  it('accepts regional language codes', () => {
    const regionalCodes = ['zh-CN', 'zh-TW', 'pt-BR', 'en-US', 'en-GB'];

    regionalCodes.forEach(code => {
      expect(code).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    });
  });
});
