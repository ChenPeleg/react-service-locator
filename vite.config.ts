import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'react-services-locator',
            fileName: () => `index.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: [...Object.keys(peerDependencies)],
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [
        dts({
            outDir: 'dist',
            insertTypesEntry: true,
            cleanVueFileName: true,
            rollupTypes: true,
            tsconfigPath: './tsconfig.app.json',
        }),
    ],
});
