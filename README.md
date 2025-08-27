# DoorDash Clone

![App Preview](https://imgix.cosmicjs.com/d75e7860-838f-11f0-8ece-89921cbea84a-photo-1521305916504-4a1121188589-1756331426149.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern food delivery application built with Next.js and powered by Cosmic CMS. This DoorDash clone features restaurant browsing, menu management, shopping cart functionality, and order tracking.

## Features

- 🍽️ **Restaurant Discovery** - Browse restaurants by cuisine type with ratings and delivery info
- 📋 **Dynamic Menus** - View menu items with categories, pricing, and availability
- 🛒 **Shopping Cart** - Add items, manage quantities, and calculate totals
- 📦 **Order Tracking** - Real-time order status updates from placement to delivery
- 👨‍💼 **Admin Dashboard** - Manage restaurants, menus, and process orders
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Next.js 15 and modern web technologies

<!-- CLONE_PROJECT_BUTTON -->

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a DoorDash clone"

### Code Generation Prompt

> Create a DoorDash clone using Next.js

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **CMS**: Cosmic CMS
- **Language**: TypeScript
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic CMS account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Restaurants
```typescript
import { cosmic } from '@/lib/cosmic'

const restaurants = await cosmic.objects
  .find({ type: 'restaurants' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Creating Orders
```typescript
const order = await cosmic.objects.insertOne({
  type: 'orders',
  title: `Order #${orderNumber}`,
  metadata: {
    order_number: orderNumber,
    customer_name: customerData.name,
    restaurant: restaurantId,
    order_items: cartItems,
    total_amount: total,
    status: 'placed'
  }
})
```

## Cosmic CMS Integration

This application uses four main content types:

- **Restaurants**: Store restaurant information, cuisine types, and delivery details
- **Menu Items**: Individual food items with pricing and availability
- **Categories**: Food categories for organizing menu items
- **Orders**: Customer orders with status tracking and item details

The content structure supports complex relationships between restaurants, menu items, and orders, with real-time data synchronization.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Add environment variables in Netlify settings

For production deployments, ensure all environment variables are properly configured in your hosting platform.
