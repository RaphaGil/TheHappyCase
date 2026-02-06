# Troubleshooting Netlify Function `/api/inventory` Error

## 🔴 Error: "Expected JSON, got: <!DOCTYPE html>"

This error means the `/api/inventory` endpoint is returning HTML (the SPA's index.html) instead of JSON from the Netlify Function.

---

## ✅ Step-by-Step Fix

### 1. **Verify `_redirects` File is Correct**

Check that `public/_redirects` contains:
```
/api/inventory    /.netlify/functions/inventory    200
```

**Important**: This line MUST come BEFORE the catch-all `/*    /index.html   200` rule.

### 2. **Verify Function File Exists**

Check that `netlify/functions/inventory.js` exists and exports a handler:
```javascript
exports.handler = async (event) => {
  // ... function code
};
```

### 3. **Verify `netlify.toml` Configuration**

Check that `netlify.toml` has:
```toml
[build]
  functions = "netlify/functions"
  publish = "build"
```

### 4. **Check Netlify Deployment**

#### A. Verify Function is Deployed
1. Go to Netlify Dashboard → Your Site → **Functions** tab
2. Look for `inventory` function in the list
3. If missing, the function didn't deploy

#### B. Check Build Logs
1. Go to Netlify Dashboard → **Deploys** → Latest deploy → **Deploy log**
2. Look for errors related to:
   - Function deployment
   - Missing dependencies
   - Build failures

#### C. Check Function Logs
1. Go to Netlify Dashboard → **Functions** → `inventory` → **Logs**
2. Check for runtime errors

### 5. **Verify Environment Variables**

In Netlify Dashboard → Site Settings → Environment Variables, ensure:
- `SUPABASE_URL` is set
- `SUPABASE_SERVICE_ROLE_KEY` is set

**Note**: These are needed for the function to work, but missing them would return JSON with an error, not HTML.

### 6. **Force Redeploy**

If changes were made but not deployed:
1. Go to Netlify Dashboard → **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete
4. Test `/api/inventory` endpoint

### 7. **Test Function Directly**

Test the function endpoint directly:
```
https://your-site.netlify.app/.netlify/functions/inventory
```

**Expected**: JSON response
**If HTML**: Function isn't deployed or routing is broken

### 8. **Check Function Dependencies**

The function uses:
- `@supabase/supabase-js` - Must be in `package.json` dependencies
- `fs` (Node.js built-in)
- `path` (Node.js built-in)

Verify `package.json` includes:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^..."
  }
}
```

---

## 🔍 Common Issues

### Issue 1: Function Not Deployed
**Symptom**: `/api/inventory` returns HTML

**Causes**:
- Function file has syntax errors
- Missing dependencies
- Build failed silently

**Fix**:
1. Check build logs for errors
2. Verify function file syntax
3. Ensure dependencies are installed
4. Redeploy

---

### Issue 2: Redirect Rule Not Working
**Symptom**: `/api/inventory` returns HTML even after adding redirect

**Causes**:
- `_redirects` file not in `public/` directory
- Redirect rule after catch-all rule
- File not copied to build directory

**Fix**:
1. Verify `public/_redirects` exists
2. Ensure redirect is BEFORE `/*    /index.html   200`
3. Check that Vite copies `public/` directory (should be automatic)
4. Redeploy

---

### Issue 3: Function Deployed But Returns Error
**Symptom**: `/api/inventory` returns JSON error, not HTML

**Causes**:
- Missing environment variables
- Supabase connection issues
- Function runtime error

**Fix**:
1. Check function logs in Netlify Dashboard
2. Verify environment variables
3. Test Supabase connection
4. Check function code for errors

---

### Issue 4: Caching Issue
**Symptom**: Changes deployed but still seeing old behavior

**Fix**:
1. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear browser cache
3. Test in incognito/private window
4. Check Netlify CDN cache settings

---

## 🧪 Testing Checklist

- [ ] `public/_redirects` file exists and has correct rule
- [ ] `netlify/functions/inventory.js` exists and exports handler
- [ ] `netlify.toml` has correct functions directory
- [ ] Function appears in Netlify Dashboard → Functions
- [ ] Environment variables are set in Netlify
- [ ] Build logs show no errors
- [ ] Function logs show no runtime errors
- [ ] Direct function URL returns JSON: `/.netlify/functions/inventory`
- [ ] API endpoint returns JSON: `/api/inventory`
- [ ] Browser cache cleared

---

## 🚀 Quick Fix Commands

### Test Function Locally (if using Netlify CLI)
```bash
netlify dev
# Then test: http://localhost:8888/.netlify/functions/inventory
```

### Check Function File Syntax
```bash
node -c netlify/functions/inventory.js
```

### Verify Redirects File
```bash
cat public/_redirects
```

---

## 📝 Still Not Working?

If after all these steps it's still not working:

1. **Check Netlify Support**: Netlify Dashboard → Help → Support
2. **Review Function Logs**: Detailed error messages in function logs
3. **Test Minimal Function**: Create a simple test function to verify routing works
4. **Check Netlify Status**: https://www.netlifystatus.com/

---

## 🔗 Related Files

- `public/_redirects` - Netlify redirect rules
- `netlify/functions/inventory.js` - Inventory function
- `netlify.toml` - Netlify configuration
- `src/utils/inventory.js` - Frontend inventory utility
