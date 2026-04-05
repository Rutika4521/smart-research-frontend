# Smart Research System - Frontend

This is the frontend for the **Smart Research System**, a React application built with Vite. It provides a beautiful, responsive, and intuitive interface for researchers to explore categorized scientific literature.

## Features

- **Dynamic Search Interface:** A clean, modern search bar to query research topics.
- **Categorized Results View:** Presents AI-analyzed research outputs in three core pillars:
  - 📚 Past Research (Foundational)
  - ⚙️ Current Research (Active Development)
  - 🚀 Future Scope (Emerging)
- **Interactive Detail Pages:** View specific papers inside each category.
- **Advanced PDF Export:**
  - Export full reports natively directly into PDF.
  - Generates professional **Literature Review Tables** (using `jspdf-autotable`) with clickable links to actual papers.
- **Search History:** Keeps track of previous searches for easy access.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Custom Vanilla CSS (Modern Light Mode theme with glassmorphic accents)
- **PDF Generation:** `jspdf` & `jspdf-autotable`
- **HTTP Client:** `axios`

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`.

## Build for Production

To generate a production-ready build:
```bash
npm run build
```
The output will reside in the `dist/` directory.
