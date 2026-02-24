# Merlin Fashion - Next.js E-commerce Website

A modern e-commerce website for men's fashion built with Next.js, recreating the original HTML/CSS/JS project with enhanced features.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Product Streaming**: Load products on demand when scrolling (pagination)
- **Shopping Cart**: Add/remove products from cart with Zustand state management
- **CRUD Operations**: Full API routes for product management (ready for admin panel)
- **Modern UI**: Built with Tailwind CSS for exact visual match to original design
- **Animations**: Smooth loading effects and transitions with Framer Motion
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and visit `http://localhost:3000`

## Project Structure

```
app/
├── api/
│   └── products/
│       ├── [id]/
│       │   └── route.ts    # Individual product CRUD
│       └── route.ts        # Products collection CRUD
├── categories/
│   └── page.tsx           # Categories page
├── components/
│   ├── Footer.tsx         # Site footer
│   └── Navbar.tsx         # Navigation bar
├── contact/
│   └── page.tsx           # Contact page
├── lib/
│   └── store.ts           # Zustand store & product data
├── login/
│   └── page.tsx           # Login page
├── merlin/
│   └── page.tsx           # Brand page
├── products/
│   └── page.tsx           # Products page with streaming
├── globals.css            # Global styles
├── layout.tsx             # Root layout
└── page.tsx               # Home page
```

## API Routes

### Products Collection

- `GET /api/products` - Get all products (with optional filters: category, type, limit, offset)
- `POST /api/products` - Create a new product

### Individual Product

- `GET /api/products/[id]` - Get a single product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

## Key Features Implementation

### Product Streaming

Products are loaded in chunks when there are more than 30 items. The `ProductGrid` component handles:

- Initial loading of first batch
- "Load More" button for additional products
- Loading states with skeleton animations
- API integration for server-side filtering

### Shopping Cart

- Uses Zustand for global state management
- Persistent across page navigation
- Add/remove/clear functionality
- Real-time cart updates

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Grid layouts that adapt to screen size
- Exact visual match to original HTML design

### CRUD Ready for Admin Panel

- Full REST API for product management
- Type-safe interfaces
- Ready for database integration
- Structured for easy admin panel addition

## Original Design Recreation

The website faithfully recreates the original Merlin Fashion HTML project with:

- Exact color scheme (#f84258 red/pink, #caa529 gold)
- Same layout and grid structures
- Original typography and spacing
- All images and content preserved
- Interactive elements (hover effects, animations)

## Future Enhancements

- **Admin Panel**: Product management interface
- **User Authentication**: Login/signup functionality
- **Database Integration**: Replace mock data with real database
- **Payment Integration**: Checkout and payment processing
- **Search & Filters**: Advanced product filtering
- **Wishlist**: Save favorite products
- **Order History**: User order management

## Deployment

The application is ready for deployment on Vercel, Netlify, or any other Next.js-compatible platform.

```bash
npm run build
npm start
```
