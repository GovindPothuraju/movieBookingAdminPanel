import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Only run the bundle visualizer when explicitly requested (e.g. `ANALYZE=1 npm run build`).
  // The `open: true` option would try to launch a browser during the build, which fails
  // in Vercel's headless build environment and breaks the deployment.
  const shouldAnalyze = env.ANALYZE === "1";

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      ...(shouldAnalyze
        ? [
            visualizer({
              filename: "./dist/stats.html",
              open: false,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
  };
});
