import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { imagetools } from "vite-imagetools";

/** Production-only plugin: strips vite-imagetools query params from image imports
 *  and resolves them as standard Vite asset URLs. This avoids the massive
 *  build-time penalty of processing 100+ images through imagetools, while
 *  keeping the responsive-image pipeline functional in development. */
function stripImageQueryPlugin() {
  return {
    name: "strip-image-query",
    enforce: "pre" as const,
    async resolveId(source: string, importer: string | undefined, options: { skipSelf?: boolean }) {
      if (/\.(png|jpe?g|gif|webp|avif)\?.+$/.test(source)) {
        const cleanSource = source.split("?")[0] + "?url";
        const resolution = await this.resolve(cleanSource, importer, { ...options, skipSelf: true });
        return resolution;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "production" ? stripImageQueryPlugin() : imagetools(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
    }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
