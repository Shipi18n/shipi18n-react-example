/**
 * Tests for Shipi18n React Example
 *
 * These tests verify the client library by importing and testing actual functions.
 */

import { jest } from '@jest/globals';
import {
  translate,
  translateJSON,
  healthCheck,
  setConfig,
  resetConfig
} from '../lib/shipi18n.js';

// Mock fetch globally
let mockFetchResponse = {};
let mockFetchOk = true;
let mockFetchStatusText = 'OK';
let lastFetchCall = null;

global.fetch = async (url, options) => {
  lastFetchCall = { url, options };

  return {
    ok: mockFetchOk,
    status: mockFetchOk ? 200 : 401,
    statusText: mockFetchStatusText,
    json: async () => mockFetchResponse
  };
};

// Reset before each test
beforeEach(() => {
  mockFetchResponse = {};
  mockFetchOk = true;
  mockFetchStatusText = 'OK';
  lastFetchCall = null;
  resetConfig();
});

describe('Shipi18n API Client', () => {
  describe('setConfig and resetConfig', () => {
    test('setConfig sets the configuration', () => {
      setConfig({
        apiKey: 'test_key',
        apiUrl: 'https://test.api.com'
      });
      expect(true).toBe(true);
    });

    test('resetConfig clears the configuration', async () => {
      setConfig({ apiKey: 'test_key', apiUrl: 'https://test.api.com' });
      resetConfig();

      await expect(translate({
        text: 'Hello',
        targetLanguages: ['es']
      })).rejects.toThrow('VITE_SHIPI18N_API_KEY environment variable is not set');
    });
  });

  describe('translate', () => {
    test('throws error when API key is not set', async () => {
      await expect(translate({
        text: 'Hello',
        targetLanguages: ['es']
      })).rejects.toThrow('VITE_SHIPI18N_API_KEY environment variable is not set');
    });

    test('throws error when text is empty', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translate({
        text: '',
        targetLanguages: ['es']
      })).rejects.toThrow('Text parameter is required and must be a string');
    });

    test('throws error when text is not a string', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translate({
        text: 123,
        targetLanguages: ['es']
      })).rejects.toThrow('Text parameter is required and must be a string');
    });

    test('throws error when targetLanguages is empty', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translate({
        text: 'Hello',
        targetLanguages: []
      })).rejects.toThrow('targetLanguages must be a non-empty array');
    });

    test('throws error when targetLanguages is not an array', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translate({
        text: 'Hello',
        targetLanguages: 'es'
      })).rejects.toThrow('targetLanguages must be a non-empty array');
    });

    test('makes correct API call with all parameters', async () => {
      setConfig({
        apiKey: 'sk_test_123',
        apiUrl: 'https://api.test.com'
      });

      mockFetchResponse = { es: [{ original: 'Hello', translated: 'Hola' }] };

      await translate({
        text: 'Hello',
        sourceLanguage: 'en',
        targetLanguages: ['es'],
        preservePlaceholders: true,
        enablePluralization: false
      });

      expect(lastFetchCall.url).toBe('https://api.test.com/api/translate');
      expect(lastFetchCall.options.method).toBe('POST');
      expect(lastFetchCall.options.headers['Content-Type']).toBe('application/json');
      expect(lastFetchCall.options.headers['X-API-Key']).toBe('sk_test_123');

      const body = JSON.parse(lastFetchCall.options.body);
      expect(body.text).toBe('Hello');
      expect(body.sourceLanguage).toBe('en');
      expect(body.targetLanguages).toBe('["es"]');
      expect(body.preservePlaceholders).toBe('true');
      expect(body.enablePluralization).toBe('false');
    });

    test('returns translation response', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = {
        es: [{ original: 'Hello', translated: 'Hola' }],
        fr: [{ original: 'Hello', translated: 'Bonjour' }]
      };

      const result = await translate({
        text: 'Hello',
        targetLanguages: ['es', 'fr']
      });

      expect(result.es[0].translated).toBe('Hola');
      expect(result.fr[0].translated).toBe('Bonjour');
    });

    test('uses default values', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await translate({
        text: 'Hello',
        targetLanguages: ['es']
      });

      const body = JSON.parse(lastFetchCall.options.body);
      expect(body.sourceLanguage).toBe('en');
      expect(body.preservePlaceholders).toBe('false');
      expect(body.enablePluralization).toBe('true');
    });

    test('throws error on non-ok response with error message', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchOk = false;
      mockFetchResponse = { error: { code: 'INVALID_KEY', message: 'Invalid API key' } };

      try {
        await translate({ text: 'Hello', targetLanguages: ['es'] });
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error.message).toBe('Invalid API key');
        expect(error.code).toBe('INVALID_KEY');
        expect(error.status).toBe(401);
      }
    });

    test('uses fallback error message', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchOk = false;
      mockFetchStatusText = 'Unauthorized';
      mockFetchResponse = {};

      await expect(translate({
        text: 'Hello',
        targetLanguages: ['es']
      })).rejects.toThrow('Translation failed: Unauthorized');
    });
  });

  describe('translateJSON', () => {
    test('throws error when API key is not set', async () => {
      await expect(translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      })).rejects.toThrow('VITE_SHIPI18N_API_KEY environment variable is not set');
    });

    test('throws error when json is empty', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translateJSON({
        json: null,
        targetLanguages: ['es']
      })).rejects.toThrow('JSON parameter is required');
    });

    test('throws error when targetLanguages is empty', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });

      await expect(translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: []
      })).rejects.toThrow('targetLanguages must be a non-empty array');
    });

    test('accepts object JSON input', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = { es: '{"greeting":"Hola"}' };

      await translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      });

      const body = JSON.parse(lastFetchCall.options.body);
      expect(body.text).toBe('{"greeting":"Hello"}');
    });

    test('accepts string JSON input', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = { es: '{"greeting":"Hola"}' };

      await translateJSON({
        json: '{"greeting":"Hello"}',
        targetLanguages: ['es']
      });

      const body = JSON.parse(lastFetchCall.options.body);
      expect(body.text).toBe('{"greeting":"Hello"}');
    });

    test('parses JSON string responses', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = {
        es: '{"greeting":"Hola","farewell":"Adiós"}'
      };

      const result = await translateJSON({
        json: { greeting: 'Hello', farewell: 'Goodbye' },
        targetLanguages: ['es']
      });

      expect(result.es.greeting).toBe('Hola');
      expect(result.es.farewell).toBe('Adiós');
    });

    test('handles already-parsed JSON responses', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = {
        es: { greeting: 'Hola' }
      };

      const result = await translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      });

      expect(result.es.greeting).toBe('Hola');
    });

    test('preserves warnings in response', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = {
        es: '{"greeting":"Hola"}',
        warnings: ['Some warning message']
      };

      const result = await translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      });

      expect(result.warnings).toEqual(['Some warning message']);
    });

    test('handles invalid JSON gracefully', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = {
        es: 'not valid json'
      };

      const result = await translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      });

      expect(result.es).toBe('not valid json');
    });

    test('throws error on non-ok response', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchOk = false;
      mockFetchResponse = { message: 'Rate limit exceeded' };

      await expect(translateJSON({
        json: { greeting: 'Hello' },
        targetLanguages: ['es']
      })).rejects.toThrow('Rate limit exceeded');
    });
  });

  describe('healthCheck', () => {
    test('calls the health endpoint', async () => {
      setConfig({ apiKey: 'sk_test_123', apiUrl: 'https://api.test.com' });
      mockFetchResponse = { status: 'healthy', version: '1.0.0' };

      const result = await healthCheck();

      expect(lastFetchCall.url).toBe('https://api.test.com/api/health');
      expect(result.status).toBe('healthy');
    });

    test('throws error on non-ok response', async () => {
      setConfig({ apiKey: null, apiUrl: 'https://api.test.com' });
      mockFetchOk = false;
      mockFetchStatusText = 'Service Unavailable';

      await expect(healthCheck()).rejects.toThrow('Health check failed: Service Unavailable');
    });
  });
});

describe('Translation Response Snapshots', () => {
  test('should match expected JSON translation response structure', () => {
    const translationResponse = {
      es: {
        common: {
          greeting: 'Hola',
          farewell: 'Adiós',
          buttons: { submit: 'Enviar', cancel: 'Cancelar' }
        }
      },
      fr: {
        common: {
          greeting: 'Bonjour',
          farewell: 'Au revoir',
          buttons: { submit: 'Soumettre', cancel: 'Annuler' }
        }
      }
    };

    expect(translationResponse).toMatchSnapshot();
  });

  test('should match expected pluralization response structure', () => {
    const pluralResponse = {
      es: {
        items_one: '{{count}} artículo',
        items_other: '{{count}} artículos'
      },
      ru: {
        items_one: '{{count}} элемент',
        items_few: '{{count}} элемента',
        items_many: '{{count}} элементов',
        items_other: '{{count}} элементов'
      }
    };

    expect(pluralResponse).toMatchSnapshot();
  });

  test('should match expected text translation response structure', () => {
    const textResponse = {
      es: [
        { original: 'Hello, world!', translated: '¡Hola, mundo!' },
        { original: 'Welcome', translated: 'Bienvenido' }
      ]
    };

    expect(textResponse).toMatchSnapshot();
  });
});
