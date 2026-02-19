# SEO issues and fixes (Google Search Console)

Here’s what can explain SEO not working well in Google Search Console, and what to change.

---

## 1. **Pre-rendering is OFF on Netlify (main issue)**

Your `package.json` has:

```json
"postbuild": "if [ \"$NETLIFY\" != \"true\" ]; then (react-snap || ...) || true; fi"
```

So **on Netlify, react-snap never runs**. The site is a pure SPA:

- Every URL (/, /CreateYours, /about, etc.) returns the **same** `index.html`.
- Page-specific **title**, **description**, **canonical**, and **og/twitter** tags are set only **after** JavaScript runs (via `react-helmet-async`).
- If the crawler doesn’t run JS or doesn’t wait long enough, it only sees the default homepage meta for all URLs.

**Effect:** Wrong or duplicate titles/descriptions per page, “Discovered – currently not indexed”, or slow indexing.

**Fix:** Run pre-rendering on Netlify too.

- **Option A – Use react-snap on Netlify**  
  Change the postbuild so react-snap runs on Netlify as well (and fix any port/headless issues in the Netlify environment).

- **Option B – Use a pre-render service**  
  e.g. Prerender.io or Netlify’s optional prerendering, so that crawlers get static HTML per URL.

- **Option C – Move to SSR/SSG**  
  e.g. Next.js or a static site generator so each URL has correct meta in the initial HTML.

Recommended first step: **Option A** – enable react-snap on Netlify and ensure `reactSnap.include` in `package.json` lists all important routes (you already have a good list there).

---

## 2. **Environment variable on Netlify**

Canonical URLs, `og:url`, and sitemap use `VITE_SITE_URL` (or the default `https://thehappycase.store` in `vite.config.js`).

- If the site is actually served from **thehappycase.store** and that’s the canonical domain, set in Netlify:
  - **Build env:** `VITE_SITE_URL=https://thehappycase.store`
- If you use a Netlify URL (e.g. `*.netlify.app`) or another domain, canonical and `og:url` must match the **final** production URL. Otherwise Google can see wrong canonicals or “different version on mobile” type issues.

**Fix:** In Netlify: Site settings → Environment variables → add `VITE_SITE_URL` = your real production URL (e.g. `https://thehappycase.store`). Redeploy after changing.

---

## 3. **Sitemap and robots.txt**

- **Sitemap:** The Vite plugin writes a good `sitemap.xml` into `build/` with multiple URLs and priorities. The `netlify.toml` redirect for `/sitemap.xml` is correct; the built file will be served from `build/`.
- **robots.txt:** The plugin also writes `build/robots.txt` with `Sitemap: https://thehappycase.store/sitemap.xml`. As long as `VITE_SITE_URL` is set correctly, this is fine.

**Fix:** No code change needed; just ensure `VITE_SITE_URL` is set on Netlify so the sitemap URL in `robots.txt` matches your real domain.

---

## 4. **What to check in Google Search Console**

- **URL Inspection**  
  Use “Test live URL” on a few important URLs (e.g. `/`, `/CreateYours`, `/about`). Check:
  - “Page fetch” / “View tested page” → do you see the **correct** title and meta description for that URL, or always the homepage?
- **Coverage / Pages**  
  Look for “Discovered – currently not indexed” or “Crawled – currently not indexed”. Common for SPAs without pre-rendering.
- **Enhancements**  
  Check for issues in Mobile usability, Core Web Vitals, or structured data (your JSON-LD in `index.html` is fine; after enabling pre-rendering, you could add per-page structured data if needed).

---

## 5. **Quick checklist**

| Item | Status / Action |
|------|------------------|
| Run pre-rendering on Netlify (react-snap or other) | **Fix** – enable so crawlers get per-URL HTML and meta |
| Set `VITE_SITE_URL` in Netlify to production URL | **Check** – must match the domain you want in search |
| Sitemap and robots.txt in build | OK (plugin writes them) |
| Meta tags and canonical in source | OK (react-helmet + index.html) |
| Initial HTML has fallback text in `#root` | OK (helps when JS isn’t run) |

---

**Summary:** The most likely reason SEO “is not working” in Google Search Console is that **on Netlify the app is not pre-rendered**, so Google often sees the same shell for every URL and may not get the right (or any) per-page meta. Enabling react-snap (or another pre-render/SSR approach) on Netlify and setting `VITE_SITE_URL` correctly should address the main issues.
