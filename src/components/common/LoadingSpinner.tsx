import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-blue-600 w-24 h-24 animate-pulse">
        <img src="/heart-pulse-2.svg" alt="Loading..." className="w-full h-full" />
      </div>
    </div>
  );
};

export default LoadingSpinner;