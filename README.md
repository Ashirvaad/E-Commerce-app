# E-Commerce App (TypeScript + Vite + React)

A modern, responsive e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates authentication, product browsing, cart management, order processing, and more.

## Features
- User authentication (login/register)
- Product listing and detail pages
- Shopping cart and checkout flow
- Order history and profile management
- Wishlist functionality
- Responsive design with Tailwind CSS
- Context API for state management

## Tech Stack
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd ecommerce-app-ts
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure
```
├── public/           # Static assets
├── src/
│   ├── auth/         # Auth pages (Login, Register)
│   ├── components/   # Reusable UI components
│   ├── context/      # React Context providers
│   ├── data/         # Static data (e.g., products)
│   ├── pages/        # Main app pages
│   ├── utils/        # Utility functions
│   ├── App.tsx       # App entry point
│   └── main.tsx      # Vite/React bootstrap
├── package.json      # Project metadata & scripts
├── tailwind.config.js
├── vite.config.ts
└── ...
```

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## License
MIT
