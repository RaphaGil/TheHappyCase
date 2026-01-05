# Vite Migration Guide

This project has been migrated from Create React App (CRA) to Vite.

## What Changed

### 1. Build Tool
- **Before**: Create React App (`react-scripts`)
- **After**: Vite

### 2. Configuration Files
- **New**: `vite.config.js` - Vite configuration
- **New**: `index.html` - Moved from `public/` to root directory
- **New**: `jsconfig.json` - Path aliases configuration
- **Removed**: `src/setupProxy.js` - Proxy now configured in `vite.config.js`

### 3. Environment Variables
- **Before**: `REACT_APP_*` prefix
- **After**: `VITE_*` prefix
- **Example**: `REACT_APP_STRIPE_PUBLISHABLE_KEY` → `VITE_STRIPE_PUBLISHABLE_KEY`

### 4. Environment Variable Access
- **Before**: `process.env.REACT_APP_*`
- **After**: `import.meta.env.VITE_*`
- **Before**: `process.env.NODE_ENV`
- **After**: `import.meta.env.DEV` (development) or `import.meta.env.PROD` (production)

### 5. Scripts
- **Before**: `npm start` → `npm run dev`
- **Before**: `npm run build` → `npm run build` (same)
- **New**: `npm run preview` - Preview production build locally
- **New**: `npm run dev:full` - Run both server and frontend

## Installation

1. **Remove old dependencies and install new ones:**
   ```bash
   npm uninstall react-scripts http-proxy-middleware
   npm install
   ```

2. **Update your `.env` file:**
   - Rename `REACT_APP_*` variables to `VITE_*`
   - Example: `REACT_APP_STRIPE_PUBLISHABLE_KEY` → `VITE_STRIPE_PUBLISHABLE_KEY`

3. **Clean up old files (optional):**
   ```bash
   rm -rf build
   rm src/setupProxy.js  # Proxy now in vite.config.js
   ```

## Running the Project

### Development
```bash
# Frontend only
npm run dev

# Frontend + Backend server
npm run dev:full
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Key Differences

### 1. Hot Module Replacement (HMR)
Vite provides faster HMR than CRA. Changes should reflect almost instantly.

### 2. Build Output
- Build output is still in `build/` directory (configured in `vite.config.js`)
- Assets are optimized and code-split automatically

### 3. Public Assets
- Files in `public/` are served at root path (`/`)
- No need for `%PUBLIC_URL%` - use `/` directly

### 4. Import Paths
- You can use `@/` alias for `src/` directory
- Example: `import Component from '@/component/Component'`

## Troubleshooting

### Issue: Environment variables not working
- Make sure variables are prefixed with `VITE_`
- Restart the dev server after changing `.env` file
- Access via `import.meta.env.VITE_*`

### Issue: Proxy not working
- Check `vite.config.js` server.proxy configuration
- Make sure backend server is running on port 3001

### Issue: Build fails
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for any remaining `process.env` references (should be `import.meta.env`)

## Migration Checklist

- [x] Created `vite.config.js`
- [x] Moved `index.html` to root
- [x] Updated `package.json` scripts
- [x] Updated environment variable references
- [x] Configured proxy in Vite
- [x] Created `jsconfig.json` for path aliases
- [ ] Update any remaining `process.env` references
- [ ] Test development server
- [ ] Test production build
- [ ] Update deployment configuration if needed

## Notes

- The `homepage: "."` setting in package.json was removed (handled by Vite's `base` config)
- Tailwind CSS and PostCSS configurations remain unchanged
- All existing functionality should work the same way

