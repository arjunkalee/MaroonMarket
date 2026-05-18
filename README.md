# TAMU Prediction Markets

A prediction market platform for Texas A&M campus events, inspired by Kalshi and Polymarket.

## Features

- 🎯 **Market Listings**: Browse prediction markets on campus events, sports, and more
- 📱 **Discover (Swipe) Mode**: Tinder-style swipe — left to skip, right to open a market
- 📊 **Market Details**: View detailed market information with YES/NO pricing
- 💰 **Trading Interface**: Place orders to buy YES or NO shares
- ➕ **Create Markets**: Users can create new prediction markets
- 🔍 **Search & Filter**: Filter markets by category and search by keywords
- 🌓 **Dark / Light Mode**: Theme toggle with persistence
- 🎨 **Modern UI**: Clean, responsive design inspired by Kalshi and Polymarket

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure (production-ready)

```
├── app/
│   ├── create/            # Create market page
│   ├── markets/[id]/      # Market detail page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (listings + Discover mode)
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # App shell
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx
│   ├── markets/           # Market UI
│   │   ├── MarketCard.tsx
│   │   ├── MarketFilters.tsx
│   │   ├── MarketSwipeCard.tsx   # Swipe card for Discover
│   │   ├── SwipeDeck.tsx        # Swipe deck + buttons
│   │   └── ViewModeToggle.tsx   # Grid / Discover toggle
│   └── ui/
│       └── ThemeToggle.tsx
├── hooks/
│   └── useSwipe.ts        # Swipe gesture (touch + pointer)
├── lib/
│   ├── constants.ts       # App name, categories, etc.
│   ├── mockData.ts        # Mock market data
│   └── utils.ts           # formatMarketDate, formatVolume
├── types/
│   └── market.ts          # Market types
└── ...
```

## Features Overview

### Market Listings
- **Grid** and **Discover (swipe)** modes — toggle at the top of the home page
- In Discover: swipe left to skip, swipe right (or tap ♥) to open that market
- Category filtering (Sports, Campus, Academics, Events)
- Search functionality
- Market cards showing YES/NO prices, volume, and end dates

### Market Detail Page
- Full market information
- Large YES/NO price display
- Trading panel with order placement
- Market statistics (volume, liquidity, end date)

### Create Market
- Form to create new prediction markets
- Category selection
- Resolution date picker
- Market rules and guidelines

## Future Enhancements

- User authentication and accounts
- Real-time price updates
- Order book and trade history
- Portfolio tracking
- Market resolution system
- Backend API integration
- Payment processing

## License

MIT
