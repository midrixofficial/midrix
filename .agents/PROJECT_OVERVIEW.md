# Project Overview
This is an project where small business owner who sells food, product, other items can create account and add their product here and add category and product then they can create or customerize they frontend link in link generator and share that link to customer, customer can choose the product and food to create appointment or order the service it will be trun them selling into easy way

## Stack
- Backend: Laravel 13, PHP 8.3, Sanctum auth
- Frontend: React 19 + Vite
- Styling: Tailwind CSS v4 (via `@import "tailwindcss"`)
- Icons: `lucide-react`

## High-Level Structure
- API routes: `routes/api.php`
- React app entry: `resources/js/main.jsx`
- Main app shell/router logic: `resources/js/App.jsx`
- Page components: `resources/js/pages/*`
- Global styles: `resources/css/app.css`

## Business Flow (Owner Journey)
This is an project where small business owner who sells food, product, other items can create account and add their product here and add category and product then they can create or customerize they frontend link in link generator and share that link to customer, customer can choose the product and food to create appointment or order the service it will be trun them selling into easy way.

## Frontend Navigation Model
- Routing is currently manual in `App.jsx` using `window.history.pushState` and `currentPath` state.
- `menuByPath` maps URL paths to sidebar/header labels.
- Auth pages:
  - `/merchant/signin`
  - `/merchant/signup`
- Protected merchant area: paths under `/merchant/*` (except auth pages), guarded by `auth_token` in localStorage.

## Theme Model
- `darkMode` is controlled in `App.jsx`.
- The `dark` class is applied to `document.documentElement`.
- Theme preference persists in localStorage key: `theme` (`dark` or `light`).
- Tailwind dark variant is class-based through:
  - `@custom-variant dark (&:where(.dark, .dark *));` in `resources/css/app.css`

## Auth/Data Notes
- Frontend stores:
  - `auth_token` in localStorage
  - `user` in localStorage
- Logout clears both keys and navigates to `/`.
