# 🌸 Las Flores Jasmin

A beautiful and elegant florist website built with [Astro](https://astro.build/), showcasing real-time Instagram posts, smooth animations, and a stunning pink-and-green design palette inspired by floral aesthetics. This website serves as the digital storefront for Las Flores Jasmin, a local florist based in Bellwood, Illinois.

---

## ✨ Features

- 🌺 **Live Instagram Integration** — Fetches and displays all posts from the Las Flores Jasmin Instagram account using the Instagram Graph API
- 🎞️ **Interactive Slideshow** — Features a dynamic carousel highlighting the 5 most recent Instagram posts with smooth transitions
- �� **Fully Responsive Design** — Optimized for all devices with mobile-first approach
- 🎨 **Elegant UI/UX** — Beautiful pink/green color palette with custom typography (Playfair Display & Nunito)
- ✨ **Smooth Animations** — Fade-in effects, scroll animations, and interactive hover states
- �� **Contact Form** — Functional contact form with email integration via Resend API
- 🗺️ **Location Integration** — Embedded Google Maps showing service area in Bellwood, IL
- 🔝 **Back-to-Top Button** — Floating navigation button for better user experience
- 📞 **Direct Contact Links** — Click-to-call phone number and email links

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) v5.11.0
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4.1.11
- **Instagram API:** Facebook Graph API (v23.0)
- **Email Service:** [Resend](https://resend.com/) for contact form submissions
- **Animations:** Custom JavaScript with Intersection Observer API
- **Deployment:** Optimized for Netlify/Vercel with serverless functions

---

## 📁 Project Structure

las-flores-jasmin/
├── public/
│ ├── loadAnimations.js # Scroll animation utilities
│ ├── logo.jpg # Business logo
│ └── favicon-32x32.png # Site favicon
├── src/
│ ├── components/
│ │ └── NavBar.astro # Navigation component
│ ├── pages/
│ │ ├── index.astro # Homepage with Instagram feed
│ │ ├── about.astro # About page
│ │ └── contact.astro # Contact page with form
│ ├── styles/
│ │ └── global.css # Custom styles and animations
│ └── utils/
│ └── getAllInstagramPosts.ts # Instagram API integration
├── functions/
│ └── contact.js # Serverless function for contact form
├── astro.config.mjs # Astro configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Instagram Business Account with Graph API access

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd las-flores-jasmin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   IG_ACCESS_TOKEN=your_instagram_long_lived_token
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔐 Environment Variables

| Variable          | Description                                 | Required |
| ----------------- | ------------------------------------------- | -------- |
| `IG_ACCESS_TOKEN` | Instagram Graph API long-lived access token | Yes      |
| `RESEND_API_KEY`  | Resend API key for email functionality      | Yes      |

### Instagram API Setup

1. Create a Facebook App and connect your Instagram Business Account
2. Generate a long-lived access token
3. Use the Instagram Business Account ID (found in the code: `17841457779337649`)

### Email Setup

1. Sign up for [Resend](https://resend.com/)
2. Generate an API key
3. Configure your domain for sending emails

---

## �� Design Features

- **Color Palette:** Soft pinks (#ec4899, #f472b6) and greens (#5eead4) inspired by floral aesthetics
- **Typography:** Playfair Display for headings, Nunito for body text
- **Animations:** Smooth fade-in effects, hover transitions, and scroll-triggered animations
- **Layout:** Clean, modern design with proper spacing and visual hierarchy

---

## 📱 Pages

### Homepage (`/`)

- Instagram slideshow carousel
- Business introduction
- Contact information
- Instagram gallery grid
- Back-to-top navigation

### About (`/about`)

- Business description and mission
- Information about services and approach

### Contact (`/contact`)

- Contact form with email integration
- Direct contact links (phone/email)
- Google Maps integration showing Bellwood, IL service area

---

## �� Customization

### Styling

- Modify `src/styles/global.css` for custom styles
- Update `tailwind.config.js` for theme customization
- Colors and fonts can be adjusted in the CSS variables

### Instagram Integration

- Update the Instagram user ID in `src/pages/index.astro`
- Modify the API fields in `src/utils/getAllInstagramPosts.ts`
- Adjust the number of slideshow posts (currently 5)

### Contact Form

- Update email addresses in `functions/contact.js`
- Modify form fields in `src/pages/contact.astro`
- Customize email templates as needed

---

## 🚀 Deployment

This project is optimized for deployment on:

- **Netlify** (recommended)
- **Vercel**
- **Cloudflare Pages**

### Netlify Deployment

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on git push

### Build Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## 📞 Contact Information

- **Phone:** (847) 612-5745
- **Email:** jasmincarrera12@gmail.com
- **Location:** Bellwood, Illinois
- **Service:** Local pickup for floral arrangements

---

## �� Contributing

This is a private business website. For questions or support, please contact the business directly.

---

## 📄 License

This project is private and proprietary to Las Flores Jasmin.

---

**Built with ❤️ for Las Flores Jasmin**
