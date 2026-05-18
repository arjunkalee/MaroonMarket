# MaroonMarket

Kalshi for TAMU — a prediction market platform for Texas A&M campus events.

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
- **Expo** - Mobile app in `mobile/`

## Project Structure

```
├── app/
│   ├── create/            # Create market page
│   ├── markets/[id]/      # Market detail page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (listings + Discover mode)
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # App shell
│   ├── markets/           # Market UI
│   └── ui/
├── mobile/                # Expo React Native app
├── lib/
├── types/
└── ...
```

## Future Enhancements

- User authentication and accounts
- Real-time price updates
- Order book and trade history
- Portfolio tracking
- Market resolution system
- Backend API integration

## License

MIT
