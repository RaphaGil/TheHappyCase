'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTiktok,
  faFacebook,
  faEtsy,
  faWhatsapp,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import etsyReviews from '../../data/etsyReviews.json';

const LogoImg = '/assets/logo.webp';
const ETSY_SHOP_URL = 'https://www.etsy.com/shop/TheHappyCaseShop';
const WHATSAPP_URL = 'https://wa.me/447450437243';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { href: '/custom-passport', label: 'Create yours' },
      { href: '/passport-cases', label: 'Passport cases' },
      { href: '/charms', label: 'Charms' },
      { href: '/design-ideas', label: 'Design ideas' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/shipping', label: 'Shipping & processing times' },
      { href: '/returns', label: 'Refund policy' },
      { href: '/privacypolicy', label: 'Privacy policy' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/my-orders', label: 'My orders' },
      { href: ETSY_SHOP_URL, label: 'Our Etsy shop', external: true },
      { href: WHATSAPP_URL, label: 'Chat on WhatsApp', external: true },
    ],
  },
];

const SOCIALS = [
  { href: ETSY_SHOP_URL, icon: faEtsy, label: 'Visit our Etsy shop' },
  { href: 'https://instagram.com/thehappycase.store', icon: faInstagram, label: 'Follow us on Instagram' },
  { href: 'https://tiktok.com/@thehappycase.store', icon: faTiktok, label: 'Follow us on TikTok' },
  { href: 'https://facebook.com/thehappycase', icon: faFacebook, label: 'Follow us on Facebook' },
  { href: WHATSAPP_URL, icon: faWhatsapp, label: 'Chat with us on WhatsApp' },
];

const PAYMENTS = [
  { icon: faCcVisa, label: 'Visa', color: '#1434CB' },
  { icon: faCcMastercard, label: 'Mastercard', color: '#EB001B' },
  { icon: faCcAmex, label: 'American Express', color: '#006FCF' },
  { icon: faCcPaypal, label: 'PayPal', color: '#003087' },
];

const linkClass =
  'inline-block py-1 text-[15px] text-white/80 transition-colors hover:text-[#ffd93d] focus:outline-none focus-visible:text-[#ffd93d] font-inter';

const FooterLink = ({ link }) =>
  link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );

/** Link column: collapsible on phones, always open from tablet up. */
const FooterColumn = ({ column }) => {
  const [open, setOpen] = useState(false);
  const id = `footer-${column.title.toLowerCase()}`;
  return (
    <div className="border-b border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-4 text-left md:pointer-events-none md:py-0"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#ffd93d] font-inter">{column.title}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 text-white/70 transition-transform md:hidden ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul id={id} className={`${open ? 'block' : 'hidden'} space-y-1 pb-4 md:mt-4 md:block md:pb-0`}>
        {column.links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const { average, count } = etsyReviews.summary;

  return (
    <footer className="bg-[#231c7a] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 md:px-8 md:pb-8 md:pt-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-sm md:col-span-3 md:max-w-xl lg:col-span-1 lg:max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="The Happy Case home">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5">
                <img src={LogoImg} alt="" className="h-full w-full object-contain" loading="lazy" decoding="async" width="40" height="40" />
              </span>
              <span className="font-brand text-2xl text-white">The Happy Case</span>
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-white/80 font-inter">
              Personalised passport cases, designed by you and made with love, to bring joy to every journey.
            </p>
            <a
              href={`${ETSY_SHOP_URL}#reviews`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white transition-colors hover:bg-white/20 font-inter"
            >
              <span className="text-[#ffd93d]" aria-hidden="true">★★★★★</span>
              {average.toFixed(1)} from {count} Etsy reviews
            </a>
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Social media">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#ffd93d] hover:text-[#30279f]"
                  >
                    <FontAwesomeIcon icon={s.icon} className="text-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="md:contents">
            {COLUMNS.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/15 pt-6 md:flex-row md:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
            {PAYMENTS.map((p) => (
              <li key={p.label} className="flex h-8 w-12 items-center justify-center rounded-md bg-white" title={p.label}>
                <FontAwesomeIcon icon={p.icon} className="text-[22px]" style={{ color: p.color }} aria-label={p.label} />
              </li>
            ))}
            <li className="flex h-8 w-12 items-center justify-center rounded-md bg-[#FFB3C7]" title="Klarna">
              <img
                src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
                alt="Klarna"
                className="h-4 w-auto"
                loading="lazy"
                decoding="async"
                width={40}
                height={16}
              />
            </li>
          </ul>

          {/* Right padding keeps the floating WhatsApp button from covering this text */}
          <div className="text-center text-sm text-white/70 font-inter md:pr-20 md:text-right">
            <p>© {currentYear} The Happy Case. All rights reserved.</p>
            <p className="mt-1">
              Developed by{' '}
              <a
                href="https://www.linkedin.com/in/raphaelagil/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-white/40 underline-offset-2 hover:text-[#ffd93d] hover:decoration-[#ffd93d]"
              >
                Raphaela Gil
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
