import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import { copyFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/Aishwarya/", // ✅ Correct base for GitHub Pages

  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    {
      name: "copy-redirects", // ✅ Custom plugin to copy _redirects after build
      closeBundle() {
        const src = path.resolve(__dirname, "_redirects"); // ✅ Source in main folder
        const dest = path.resolve(__dirname, "docs/_redirects"); // ✅ Destination to docs

        try {
          copyFileSync(src, dest);
          console.log("✅ _redirects copied successfully!");
        } catch (err) {
          console.error("❌ Error copying _redirects:", err);
        }
      },
    },
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "docs"), // ✅ Output to "docs" for GitHub Pages
    emptyOutDir: true, // Clean the output directory before building
    assetsDir: "assets",
  },
  server: {
    host: true, // Enable external access (optional)
    port: 3000, // Specify port (optional)
    open: true, // Open browser automatically on start
    fs: {
      strict: false, // To avoid file system restrictions (optional)
    },
  },

  // ✅ Correct fallback for Single Page Applications (SPA)
  preview: {
    port: 4173, // Optional, for preview
    open: true,
  },
});
