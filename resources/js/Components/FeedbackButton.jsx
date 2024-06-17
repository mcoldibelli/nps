import React from 'react';

export default function FeedbackButton({ color, onClick, children }) {
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500',
    green: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
  };

  return (
    <button
      className={`rounded-full p-28 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${colorClasses[color]}`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
