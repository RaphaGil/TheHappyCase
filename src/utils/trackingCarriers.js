export const TRACKING_CARRIERS = [
  {
    id: 'EVRI',
    label: 'Evri',
    trackingUrl: 'https://www.evri.com/track-a-parcel',
  },
  {
    id: 'Royal Mail',
    label: 'Royal Mail',
    trackingUrl: 'https://www.royalmail.com/track-your-item',
  },
];

const DEFAULT_TRACKING_URLS = TRACKING_CARRIERS.map((c) => c.trackingUrl);

export const getCarrierTrackingUrl = (carrier, trackingNumber) => {
  const name = String(carrier || '').trim();
  const number = String(trackingNumber || '').trim();
  const isRoyalMail = /royal\s*mail/i.test(name);

  if (isRoyalMail) {
    if (number) {
      return `https://www.royalmail.com/track-your-item#/tracking-results/${encodeURIComponent(number)}`;
    }
    return 'https://www.royalmail.com/track-your-item';
  }

  if (/evri/i.test(name) && number) {
    return `https://www.evri.com/track/parcel/${encodeURIComponent(number)}`;
  }

  return 'https://www.evri.com/track-a-parcel';
};

export const isDefaultTrackingUrl = (url) => {
  const value = String(url || '').trim();
  if (!value) return true;
  return DEFAULT_TRACKING_URLS.some((base) => value === base || value.startsWith(`${base}#`) || value.startsWith('https://www.evri.com/track'));
};

export const getOrderTrackingHref = (order) => {
  const link = order?.tracking?.tracking_link || order?.metadata?.tracking_link;
  if (link) return link;
  const carrier = order?.tracking?.carrier || order?.metadata?.carrier;
  const number = order?.tracking?.tracking_number;
  return getCarrierTrackingUrl(carrier, number);
};
