import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server", // needed for API routes
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.IG_ACCESS_TOKEN": JSON.stringify(
        process.env.IG_ACCESS_TOKEN
      ),
    },
  },
});
