import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  resolve: {
    alias: [
      {
        find: "eventsource",
        replacement:
          "./node_modules/sockjs-client/lib/transport/browser/eventsource.js",
      },
      {
        find: "events",
        replacement: "./node_modules/sockjs-client/lib/event/emitter.js",
      },
      {
        find: "crypto",
        replacement: "./node_modules/sockjs-client/lib/utils/browser-crypto.js",
      },
    ],
  },
  plugins: [react()],
  build: {
    outDir: "../backend/src/main/resources/static",
  },
  server: {
    port: 3030,
  },
});
