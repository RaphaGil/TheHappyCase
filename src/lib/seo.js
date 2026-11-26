import React from 'react';

/**
 * Shared SEO helpers for page metadata and structured data (JSON-LD).
 * Every public page should export `metadata = buildMetadata({...})` so it gets a
 * canonical URL, Open Graph / Twitter cards and a consistent title.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || 'https://thehappycase.store';

export const SITE_NAME = 'The Happy Case';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

export const absoluteUrl = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

/**
 * @param {object} opts
 * @param {string} opts.title        Page title (the " | The Happy Case" suffix is added by the root layout)
 * @param {string} opts.description  ~150 characters shown in search results
 * @param {string} opts.path         Canonical path, e.g. "/passport-cases/economy"
 * @param {string} [opts.image]      Share image path or URL (defaults to the site share image)
 * @param {boolean} [opts.absoluteTitle] Use the title as-is, without the brand suffix
 * @param {boolean} [opts.noindex]   Keep the page out of search results
 */
export function buildMetadata({ title, description, path, image, absoluteTitle = false, noindex = false }) {
  const img = image || DEFAULT_OG_IMAGE;
  const isDefaultImage = img === DEFAULT_OG_IMAGE;
  const ogImage = isDefaultImage
    ? { url: img, width: 1200, height: 630, alt: 'Personalised passport case with bronze charms and a name' }
    : { url: img, alt: title };
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_GB',
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [img],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Renders a JSON-LD <script> for structured data. Safe in server components. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** BreadcrumbList structured data from [{ name, path }]. */
export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
