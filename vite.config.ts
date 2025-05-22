import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      views: path.resolve(__dirname, "./src/views"),
    }
  },
  server: {
    open: true,
    port: 2000,
    host: '0.0.0.0'
  }
})
