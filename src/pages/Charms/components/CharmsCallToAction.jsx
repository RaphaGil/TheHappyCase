import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharmsCallToAction = ({ links = [] }) => {
  const navigate = useNavigate();

  if (links.length === 0) return null;

  return (
    <div className="pt-12 pb-8 text-center border-t border-gray-100">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {links.map(({ path, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
            style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharmsCallToAction;

