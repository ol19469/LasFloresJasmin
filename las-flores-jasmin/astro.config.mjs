import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.IG_ACCESS_TOKEN": JSON.stringify(
        process.env.IG_ACCESS_TOKEN
      ),
    },
  },
});
