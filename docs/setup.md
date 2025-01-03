# Project setup

## Prerequisites
- [Node.js](https://nodejs.org/en/download/)

## Npm installations

### Vite

```bash
npm create vite@latest react-service-locator -- --template react-ts 
```

### Eslint and prettier

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
``` 
### Eslint extends prettier

add this to eslint.config.js:
```
    extends: [
     ...
"prettier"
    ],
```
### Add prettier rules


Add the prettier rules:
```bash
@"
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": true,
  "singleQuote": true,
  "endOfLine": "auto"
}
"@ | Out-File -FilePath .prettierrc -Enco utf8

```

### Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D prettier-plugin-tailwindcss

```
### Add the tailwind.config.js file
copy this to `tailwind.config.js`
``` 
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
```
### Tailwind styles
Add the tailwind styles to the `App.css` file
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Vitest

```bash
npm install --save-dev vitest
```

### Add the vitest.config.js file
Add the prettier rules:
```bash
@"
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react() ],
    test: {
        globals: true,
        environment: 'jsdom',
        includeSource: ['src/**/*.{js,jsx,ts,tsx}'],
    },
    // setupFiles: './tests/setupTests.js',
});
"@ | Out-File -FilePath vitest.config.js -Encoding utf8

```


## Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```

