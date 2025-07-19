# 🌸 Las Flores Jasmin

A vibrant and elegant florist website built with [Astro](https://astro.build/), showcasing real-time Instagram posts, beautiful scroll animations, and a soft pink-and-green design palette inspired by floral aesthetics.

---

## ✨ Features

- 🌺 **Live Instagram Feed** — Fetches and displays all posts from the Las Flores Jasmin Instagram account using the Instagram Graph API.
- 🎞️ **Slideshow Carousel** — Highlights the 5 most recent Instagram posts at the top of the homepage.
- 🎨 **Responsive UI** — Fully responsive layout with a pink/green complementary palette and elegant typography.
- 🧚 **CSS Animations** — Smooth fade-in and fade-up scroll animations to enhance user experience.
- 🌙 **Back-to-Top Button** — Floating pink button fixed to the bottom-right corner of the page for easy navigation.

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** Tailwind CSS + custom CSS (`global.css`)
- **Instagram API:** Facebook Graph API via token-based access
- **Animations:** JavaScript-based intersection observer (`loadAnimations.js`)
- **Hosting:** Optimized for deployment on Netlify, Vercel, etc.

---

## 📁 Project Structure

las-flores-jasmin/
├── public/
│ ├── loadAnimations.js
│ ├── logo.jpg
│ └── favicon.svg
├── src/
│ ├── components/
│ │ └── NavBar.astro
│ ├── pages/
│ │ ├── index.astro
│ │ ├── about.astro
│ │ └── contact.astro
│ ├── styles/
│ │ └── global.css
│ └── utils/
│ └── getAllInstagramPosts.ts
├── .env
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json

---

## 🔐 Environment Variables

Create a `.env` file at the root with the following:

```env
IG_ACCESS_TOKEN=your_instagram_long_lived_token
```

📸 Instagram Integration Notes
Uses a long-lived token to query the Graph API.

Posts are fetched once at build time using getAllInstagramPosts.ts.

If needed, tokens can be refreshed using Facebook's tool.

📬 Contact
Built and maintained by @ol19469
