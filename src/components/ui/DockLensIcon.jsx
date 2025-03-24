import React from 'react';

export default function DockLensIcon({ className = "h-8 w-8" }) {
  return (
    <svg className={`text-white filter drop-shadow-lg ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
        <animate attributeName="stroke-dasharray" from="0 100" to="100 100" dur="1.5s" fill="freeze" />
      </path>
    </svg>
  );
} 