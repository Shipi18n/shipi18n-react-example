# Shipi18n React Example

A minimal React application demonstrating how to integrate the [Shipi18n](https://shipi18n.com) translation API into your project.

> **🚀 Get Started in 30 Seconds**: Sign up at [shipi18n.com](https://shipi18n.com) to get your free API key instantly. No credit card required!

## Features

This example demonstrates:

- ✅ **📁 File Translation** - Upload `en.json` → Download `es.json`, `fr.json`, etc. (REALISTIC WORKFLOW!)
- ✅ **Multi-language translation** in a single API call - translate to 12+ languages at once
- ✅ **JSON translation** with structure preservation
- ✅ **Placeholder preservation** for dynamic content (`{name}`, `{{value}}`, `%s`, etc.)
- ✅ **Basic text translation** for quick testing
- ✅ **Error handling** and loading states
- ✅ **Native fetch API** (zero external HTTP dependencies)

## Prerequisites

- Node.js 18+ installed
- Free API key from [shipi18n.com](https://shipi18n.com) (instant signup, no credit card)

## Quick Start

### 1. Get Your Free API Key

Visit [shipi18n.com](https://shipi18n.com) and enter your email to get your API key instantly:

- **Free tier**: 60 requests/minute, 10,000 characters/month
- **No credit card required**
- **Instant access** - check your email for your API key

### 2. Clone the repository

```bash
git clone https://github.com/shipi18n/shipi18n-react-example.git
cd shipi18n-react-example
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure your API key

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API key (from the email):

```env
VITE_SHIPI18N_API_KEY=sk_live_your_api_key_here
VITE_API_URL=https://x9527l3blg.execute-api.us-east-1.amazonaws.com
```

### 5. Run the development server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🎯 Realistic Workflow: File Translation

The **File Translation** tab shows how developers actually use Shipi18n in production:

### Real-World Usage

1. **Upload your locale file** (e.g., `locales/en.json`)
2. **Select target languages** - Spanish, French, German, Japanese, etc.
3. **Click "Translate"** - all files processed in one API call
4. **Download translated files** - ready to drop into your `locales/` folder

### Example Workflow

```bash
# Your project structure BEFORE:
my-app/
├── locales/
│   └── en.json        # ✅ You have this
└── src/

# After using Shipi18n:
my-app/
├── locales/
│   ├── en.json        # ✅ Original
│   ├── es.json        # ✅ Downloaded
│   ├── fr.json        # ✅ Downloaded
│   ├── de.json        # ✅ Downloaded
│   └── ja.json        # ✅ Downloaded
└── src/
```

### What Gets Preserved

- **JSON structure** - nested objects, arrays, everything
- **Placeholders** - `{{name}}`, `{count}`, `%s`, `<0>`, etc.
- **Keys** - only values are translated, keys stay in English

### Try It Now

1. Run `npm run dev`
2. Click the **📁 File Translation** tab
3. Upload the included `test-locale.json` file
4. Select languages and translate
5. Download the results!

## Project Structure

```
shipi18n-react-example/
├── src/
│   ├── lib/
│   │   └── shipi18n.js              # API client library
│   ├── components/
│   │   ├── FileTranslationExample.jsx   # 📁 File upload/download (REALISTIC!)
│   │   ├── BasicExample.jsx         # Simple translation demo
│   │   ├── MultiLangExample.jsx     # Multi-language translation
│   │   ├── JSONExample.jsx          # JSON translation
│   │   └── PlaceholderExample.jsx   # Placeholder preservation
│   ├── App.jsx                      # Main application
│   ├── App.css                      # Styles
│   └── main.jsx                     # Entry point
├── test-locale.json                 # Sample file for testing
├── .env.example                     # Environment template
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

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SHIPI18N_API_KEY` | Your Shipi18n API key (get it at shipi18n.com) | Yes |
| `VITE_API_URL` | API base URL | Yes |

**Rate Limits:**
- **Free tier**: 60 requests/minute, 10,000 characters/month
- **Pro tier** (coming soon): Higher limits for production apps

## Common Issues

### "API key is not set" error

Make sure you've created a `.env` file:

```bash
cp .env.example .env
```

Restart the dev server after creating/updating `.env`.

### Rate limit errors

The free tier is limited to 60 requests per minute. If you hit the limit:
- Wait a minute before trying again
- Reduce the number of translations in a single request
- Contact us about upgrading to a Pro plan for higher limits

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
