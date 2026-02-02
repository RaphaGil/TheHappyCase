# TheHappyCase 🎨✈️

A modern e-commerce platform for custom passport cases and decorative charms. Create personalized passport cases with custom designs, charms, and text - perfect for travelers who want to protect their documents in style.

## 📖 About

TheHappyCase is a full-stack e-commerce application that allows customers to:
- Design custom passport cases with interactive canvas tools
- Select from various case types (Economy, Business Class, First Class, Smart Case)
- Add decorative charms (Colorful, Bronze, Flags)
- Customize with text and colors
- Purchase products with secure Stripe payment integration
- Track orders and manage inventory through an admin dashboard

The project was created by Raphaela, a Frontend Developer and travel enthusiast from Brazil, who built this website to share her passion for stylish travel accessories.

## ✨ Features

### 🛍️ E-Commerce Features
- **Product Catalog**: Browse passport cases, charms, and accessories
- **Custom Case Designer**: Interactive canvas-based design tool using Fabric.js
- **Shopping Cart**: Persistent cart with inventory management
- **Checkout**: Secure payment processing with Stripe Embedded Checkout
- **Order Management**: Track orders and view order history
- **Multi-Currency Support**: Currency conversion and display
- **Inventory Management**: Real-time stock tracking with Supabase

### 🎨 Customization Features
- **Case Selection**: Choose from Economy, Business Class, First Class, and Smart Case
- **Color Selection**: Multiple color options per case type
- **Charm Selection**: Browse and add decorative charms from different categories
- **Custom Text**: Add personalized text to cases
- **Design Preview**: Real-time preview of custom designs
- **Design Ideas Gallery**: Browse inspiration and pre-made designs

### 👨‍💼 Admin Features
- **Dashboard**: Admin panel for managing inventory and orders
- **Inventory Management**: Update stock levels and track availability
- **Order Tracking**: View and manage customer orders
- **Product Management**: Manage product catalog and pricing

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Fabric.js** - Canvas manipulation for custom designs
- **FontAwesome & Heroicons** - Icon libraries
- **React Slick** - Carousel component

### Backend
- **Express.js** - Node.js server framework
- **Stripe** - Payment processing
- **Supabase** - Database and storage (PostgreSQL + Storage)
- **Resend** - Email service
- **Shippo** - Shipping rate calculation

### State Management
- **React Context API** - Cart and currency state management
- **Custom Hooks** - Reusable business logic

### Deployment
- **Netlify** - Frontend hosting and serverless functions


## 📁 Project Structure

```
TheHappyCase/
├── public/                 # Static assets
│   ├── images/            # Product images
│   ├── assets/            # Videos and logos
│   └── _redirects         # Netlify SPA redirects
├── src/
│   ├── component/         # Reusable React components
│   │   ├── CartDrawer/    # Shopping cart sidebar
│   │   ├── Checkout/      # Checkout flow
│   │   ├── CreateYours/   # Custom case designer
│   │   ├── Canvas/        # Fabric.js canvas wrapper
│   │   ├── NavBar/        # Navigation bar
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── CreateYours/   # Custom case creation page
│   │   ├── Cart/          # Shopping cart page
│   │   ├── Checkout/      # Checkout page
│   │   ├── Dashboard/     # Admin dashboard
│   │   ├── MyOrders/      # Order history
│   │   └── ...
│   ├── context/           # React Context providers
│   │   ├── CartContext.jsx
│   │   └── CurrencyContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── createyours/   # Custom case creation logic
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── inventory.js   # Inventory management
│   │   ├── cartHelpers.js # Cart operations
│   │   └── ...
│   ├── data/              # Static data
│   │   ├── products.json  # Product catalog
│   │   └── ...
│   └── App.jsx            # Main app component
├── netlify/
│   └── functions/         # Netlify serverless functions
│       └── create-payment-intent.js
├── server.js              # Express backend server
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase account** (for database and storage)
- **Stripe account** (for payments)
- **Resend account** (for emails, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TheHappyCase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   
   # Supabase Configuration
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   
   # Frontend Environment Variables (for Vite)
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   
   # API Configuration (optional)
   VITE_API_URL=http://localhost:3001
   VITE_BASE_URL=/
   
   # Email Service (optional)
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Set up Supabase**
   
   - Create a new Supabase project
   - Run the SQL schemas in your Supabase SQL Editor:
     - `SUPABASE_ORDERS_SCHEMA.sql` - Creates orders table
     - `SUPABASE_INVENTORY_SCHEMA.sql` - Creates inventory tables
     - `SUPABASE_STORAGE_SETUP.sql` - Sets up storage buckets
     - `SUPABASE_TRACKING_SCHEMA.sql` - Creates tracking tables

5. **Start the development server**
   ```bash
   # Start frontend only (Vite dev server)
   npm run dev
   
   # Start backend server only
   npm run server
   
   # Start both frontend and backend concurrently
   npm run dev:full
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📜 Available Scripts

### Development
- `npm run dev` - Start Vite development server (frontend only)
- `npm run server` - Start Express backend server (port 3001)
- `npm run dev:full` - Start both frontend and backend concurrently

### Production
- `npm run build` - Build the app for production (outputs to `build/` directory)
- `npm run preview` - Preview the production build locally

### Deployment
- `npm run predeploy` - Build the app before deployment
- `npm run deploy` - Deploy to GitHub Pages (requires `gh-pages` package)

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` file includes:
- React plugin configuration
- Proxy setup for API requests (development)
- Code splitting and chunk optimization
- Base URL configuration for different deployment targets

### Tailwind CSS
Tailwind is configured in `tailwind.config.js` with custom colors, fonts, and breakpoints matching the design system.

### Environment Variables

#### Required for Development
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for frontend
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_URL` - Supabase project URL (for backend)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for backend)

#### Optional
- `VITE_API_URL` - Backend API URL (defaults to relative paths)
- `VITE_BASE_URL` - Base path for deployment (defaults to `/`)
- `RESEND_API_KEY` - For email notifications

## 🌐 Deployment

### Netlify Deployment

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`

2. **Environment Variables**
   Set the following in Netlify dashboard:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Redirects**
   The `public/_redirects` file handles SPA routing:
   ```
   /*    /index.html   200
   ```

### GitHub Pages Deployment

1. Set `VITE_BASE_URL` to your repository path:
   ```env
   VITE_BASE_URL=/TheHappyCase/
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎯 Key Features Explained

### Custom Case Designer
The custom case designer (`/CreateYours`) allows users to:
1. Select a case type and color
2. Browse and add charms from different categories
3. Add custom text with styling options
4. Preview the design in real-time using Fabric.js canvas
5. Add the custom design to cart with pricing breakdown

### Shopping Cart
- Persistent cart using localStorage
- Real-time inventory checking
- Quantity management with stock limits
- Price calculations including case, charms, and customizations

### Checkout Flow
1. Cart review
2. Shipping address collection
3. Stripe Embedded Checkout integration
4. Order confirmation
5. Order storage in Supabase
6. Email notifications (if Resend is configured)

### Admin Dashboard
Accessible at `/dashboard` (requires authorized email):
- View and manage inventory
- Update stock levels
- View and process orders
- Track order status

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive keys
- Stripe keys should be kept secure
- Supabase service role key has admin access - keep it secret
- The dashboard is protected by email authorization

## 📝 Database Schema

The project uses Supabase (PostgreSQL) with the following main tables:
- `orders` - Customer orders
- `inventory_items` - Product inventory
- `order_tracking` - Order status tracking

See the SQL schema files in the root directory for complete schema definitions.

## 🐛 Troubleshooting

### Common Issues

1. **Backend server not running**
   - Make sure to run `npm run server` or `npm run dev:full`
   - Check that port 3001 is available

2. **Stripe errors**
   - Verify `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY` are set correctly
   - Ensure keys match (test vs live mode)

3. **Supabase connection errors**
   - Verify all Supabase environment variables are set
   - Check that SQL schemas have been run
   - Verify storage buckets are created

4. **Build errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version (requires v18+)

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Raphaela**
- Originally from Brazil, living in the UK
- Frontend Developer
- Creator of TheHappyCase

## 🙏 Acknowledgments

- Built with love for travelers and adventure seekers
- Special thanks to all the customers who support this project

---

**Happy travels, and may your passport collect many stories! 🌍✨**
