# Shipi18n React Example

A minimal React application demonstrating how to integrate the [Shipi18n](https://shipi18n.com) translation API into your project.

> **⚡ Quick Start Ready**: This example uses a public demo API key - no sign-up required! Just clone, install, and run. Rate limited to 10 requests/minute.

## Features

This example demonstrates:

- ✅ **Basic text translation** to multiple languages
- ✅ **JSON translation** with structure preservation
- ✅ **Multi-language translation** in a single API call
- ✅ **Placeholder preservation** for dynamic content (`{name}`, `{{value}}`, `%s`, etc.)
- ✅ **Error handling** and loading states
- ✅ **Native fetch API** (zero external HTTP dependencies)

## Prerequisites

- Node.js 18+ installed
- No API key required - uses public demo key (10 requests/minute limit)

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/shipi18n/shipi18n-react-example.git
cd shipi18n-react-example
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API endpoint

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update the API URL:

```env
VITE_SHIPI18N_API_KEY=41f7d39584af2c845103bb3b3ebb7631064927c4a21a40cf
VITE_API_URL=https://your-actual-api-url.execute-api.us-east-1.amazonaws.com
```

> **Note**: This example uses the public demo API key which is rate-limited to 10 requests per minute. When user authentication is available, you'll be able to get your own API key at [shipi18n.com](https://shipi18n.com) with higher limits.

### 4. Run the development server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
shipi18n-react-example/
├── src/
│   ├── lib/
│   │   └── shipi18n.js          # API client library
│   ├── components/
│   │   ├── BasicExample.jsx     # Simple translation demo
│   │   ├── MultiLangExample.jsx # Multi-language translation
│   │   ├── JSONExample.jsx      # JSON translation
│   │   └── PlaceholderExample.jsx # Placeholder preservation
│   ├── App.jsx                  # Main application
│   ├── App.css                  # Styles
│   └── main.jsx                 # Entry point
├── .env.example                 # Environment template
├── package.json
└── README.md
```

## Using the API Client

The `src/lib/shipi18n.js` file provides a simple wrapper around the Shipi18n API:

### Basic Translation

```javascript
import { translate } from './lib/shipi18n'

const result = await translate({
  text: 'Hello, World!',
  targetLanguages: ['es', 'fr', 'de']
})

console.log(result)
// {
//   es: [{ original: 'Hello, World!', translated: 'Hola, Mundo!' }],
//   fr: [{ original: 'Hello, World!', translated: 'Bonjour, le monde!' }],
//   de: [{ original: 'Hello, World!', translated: 'Hallo, Welt!' }]
// }
```

### JSON Translation

```javascript
import { translateJSON } from './lib/shipi18n'

const result = await translateJSON({
  json: {
    greeting: 'Hello',
    farewell: 'Goodbye'
  },
  targetLanguages: ['es']
})

console.log(result)
// {
//   es: {
//     greeting: 'Hola',
//     farewell: 'Adiós'
//   }
// }
```

### Preserve Placeholders

```javascript
import { translate } from './lib/shipi18n'

const result = await translate({
  text: 'Hello {username}, you have {count} messages',
  targetLanguages: ['es'],
  preservePlaceholders: true
})

console.log(result)
// {
//   es: [{
//     original: 'Hello {username}, you have {count} messages',
//     translated: 'Hola {username}, tienes {count} mensajes'
//   }]
// }
```

## API Reference

### `translate(options)`

Translate text to one or more languages.

**Parameters:**

- `text` (string, required) - The text to translate
- `sourceLanguage` (string, optional) - Source language code (default: 'en')
- `targetLanguages` (array, required) - Array of target language codes
- `preservePlaceholders` (boolean, optional) - Preserve placeholders (default: false)

**Returns:** Promise<Object> - Translation results keyed by language code

### `translateJSON(options)`

Translate JSON while preserving structure.

**Parameters:**

- `json` (object|string, required) - JSON object or string to translate
- `sourceLanguage` (string, optional) - Source language code (default: 'en')
- `targetLanguages` (array, required) - Array of target language codes
- `preservePlaceholders` (boolean, optional) - Preserve placeholders (default: false)

**Returns:** Promise<Object> - Translated JSON objects keyed by language code

### `healthCheck()`

Check API health status.

**Returns:** Promise<Object> - Health status

## Supported Languages

Shipi18n supports 100+ languages including:

- **es** - Spanish
- **fr** - French
- **de** - German
- **ja** - Japanese
- **zh** - Chinese
- **pt** - Portuguese
- **ru** - Russian
- **ar** - Arabic
- **hi** - Hindi
- **ko** - Korean

See the [full list of supported languages](https://shipi18n.com/docs/languages).

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_SHIPI18N_API_KEY` | Shipi18n API key | Public demo key (included) |
| `VITE_API_URL` | API base URL | Must be configured |

**Rate Limits:**
- Public demo key: 10 requests/minute
- Personal API key (coming soon): Higher limits based on plan

## Common Issues

### "API key is not set" error

Make sure you've created a `.env` file:

```bash
cp .env.example .env
```

Restart the dev server after creating/updating `.env`.

### Rate limit errors

The public demo key is limited to 10 requests per minute. If you hit the limit:
- Wait a minute before trying again
- Reduce the number of translations in a single request
- When available, sign up for a personal API key with higher limits

### CORS errors

If you're getting CORS errors, make sure:
1. Your API endpoint allows requests from your domain
2. You're using the correct API URL in `.env`

### Translation fails

Check that:
1. Your API key is valid
2. You have sufficient quota/credits
3. The target language codes are valid

## Learn More

- [Shipi18n Documentation](https://shipi18n.com/docs)
- [API Reference](https://shipi18n.com/docs/api)
- [Pricing](https://shipi18n.com/pricing)
- [Support](https://github.com/shipi18n/shipi18n-react-example/issues)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Related Projects

- [shipi18n-next-example](https://github.com/shipi18n/shipi18n-next-example) - Next.js example with SSR
- [shipi18n-cli](https://github.com/shipi18n/shipi18n-cli) - Command-line translation tool
- [shipi18n-translate-action](https://github.com/shipi18n/shipi18n-translate-action) - GitHub Action for CI/CD

---

Built with [Shipi18n](https://shipi18n.com) - Smart translation API for developers
