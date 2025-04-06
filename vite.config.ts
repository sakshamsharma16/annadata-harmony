
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxRuntime: 'classic', // Use classic JSX transform to ensure proper React import
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": path.resolve(__dirname, "node_modules/react"), // Ensure single React instance
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"), // Ensure single ReactDOM instance
    },
    dedupe: ['react', 'react-dom'], // Deduplicate React to prevent multiple instances
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
}));
