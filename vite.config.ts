import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

export default defineConfig({
    plugins: [

    ],
    resolve: {
        alias: [
            {
                find: '~',
                replacement: path.resolve(__dirname, './src'),
            },
        ],
    },
    esbuild: {
        drop: ['console', 'debugger'],
    },
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: {
                main: path.resolve(__dirname, 'src/index.ts'),
            },
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [],
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: 'dist',
                }),
            ],
        },
    },
});
