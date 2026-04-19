import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  preview: {
    allowedHosts: ["planet-slogs-production.up.railway.app"],
    port: 8080,
    host: "0.0.0.0",
  },
});
