//This file tells Vite to build a React application, output files to dist, and use relative paths for assets.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  //Sets the base URL for the application.
  base: "./",
  //tells Vite to place the production build files inside the dist folder.
  build: {
    outDir: "dist",
  },
  //Registers the React plugin.
  // Enables:
  // JSX support
  // Fast Refresh (instant updates during development)
  // React-specific optimizations
  plugins: [react()],
});
