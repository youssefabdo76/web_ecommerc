Markdown
# 🛍️ CrocBag – E-Commerce Store

A modern, responsive e-commerce web application for fashion clogs and bags, powered by a live database and instant WhatsApp checkout integration.

🔗 **Live Demo:** [web-ecommerc-l5v8.vercel.app](https://web-ecommerc-l5v8.vercel.app/)

---

## ✨ Features

- ⚡ **Real-time Database:** Dynamic product catalog powered by Supabase.
- 🎯 **Advanced Filtering:** Filter products by collections (Crocs, Bags & Totes, Kids Special) and target audience.
- 🔍 **Live Search:** Instant search functionality for products and accessories.
- 🛒 **Interactive Cart:** Smooth cart management with state persistence.
- 📱 **WhatsApp Direct Ordering:** One-click checkout that sends orders directly to WhatsApp with automated confirmation details.
- 🎨 **Modern UI/UX:** Styled using Tailwind CSS with dark mode aesthetic and responsive layout across all screens.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript (`App.tsx`), HTML5, Modern CSS / Tailwind CSS
- **Backend & Database:** Supabase (`supabaseClient.js`)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed:
```bash
node -v
npm -v
Installation
Clone the repository:

Bash
git clone [https://github.com/youssefabdo76/web_ecommerc.git](https://github.com/youssefabdo76/web_ecommerc.git)
cd web_ecommerc
Install dependencies:

Bash
npm install
Set up environment variables:
Create a .env file in the root directory and add your Supabase credentials:

مقتطف الرمز
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server:

Bash
npm run dev
📂 Project Structure
Plaintext
├── public/assets/       # Static assets and images
├── src/                 # Main application source code
├── utils/               # Helper functions and business logic
├── App.tsx              # Main application entry component
├── supabaseClient.js    # Supabase connection client
└── index.html           # HTML template
👤 Author
GitHub: @youssefabdo76
