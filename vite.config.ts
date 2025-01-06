import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    lib: {
      entry:  'src/index.ts' ,
      name: 'react-services-locator',
      fileName: 'index',
    },
  },

  plugins: [react()],
})
