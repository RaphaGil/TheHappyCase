import React from 'react';

const Icon = ({ children }) => (
  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#eef0ff] text-[#30279f]">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  </span>
);

const ITEMS = [
  {
    title: 'UK delivery in 2–4 days',
    text: 'Carefully packed and sent from the UK',
    icon: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </>
    ),
  },
  {
    title: 'Personalised by you',
    text: 'Your case, your charms, your name',
    icon: (
      <>
        <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" />
        <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
      </>
    ),
  },
  {
    title: 'RFID protection',
    text: 'Keeps your passport details safe',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Secure checkout',
    text: 'Your payment details are always protected',
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
];

const TrustBar = () => (
  <div className="border-b border-[#30279f]/10 bg-white">
    <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-7 md:px-8 lg:grid-cols-4">
      {ITEMS.map((item) => (
        <li key={item.title} className="flex items-center gap-3">
          <Icon>{item.icon}</Icon>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 font-inter">{item.title}</p>
            <p className="text-xs text-gray-500 font-inter">{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default TrustBar;
