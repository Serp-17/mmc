import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true
    },
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        }),
        VitePWA({
            registerType: 'autoUpdate', // Автоматическое обновление PWA
            manifest: {
                name: 'My Vite PWA App', // Название приложения
                short_name: 'VitePWA', // Короткое название
                description: 'My awesome Vite PWA app!',
                theme_color: '#4DBA87', // Цвет темы
                background_color: '#ffffff', // Цвет фона
                display: 'standalone', // Открытие как отдельное приложение
                start_url: '/', // Стартовый URL
                icons: [
                    {
                        src: '/icons/logo.svg',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                ]
            },
            workbox: {

            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
