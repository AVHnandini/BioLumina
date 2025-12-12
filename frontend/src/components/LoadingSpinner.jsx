import React from 'react';

/**
 * LoadingSpinner Component - Animated loading indicator
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-600 border-r-primary-600 animate-spin-slow"></div>
      </div>
      <p className="text-gray-600 font-semibold">Analyzing your symptoms...</p>
      <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
    </div>
  );
}
