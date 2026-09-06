import inject from "@arcangel/admin-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_ARCANGEL_BASE || "/"
  const BACKEND_URL = env.VITE_ARCANGEL_BACKEND_URL || "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_ARCANGEL_STOREFRONT_URL || "http://localhost:8000"

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const ARCANGEL_PROJECT = env.VITE_ARCANGEL_PROJECT || null
  const sources = ARCANGEL_PROJECT ? [ARCANGEL_PROJECT] : []

  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: JSON.stringify(STOREFRONT_URL),
    },
    server: {
      open: true,
    },
  }
})
