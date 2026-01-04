// Frontend/src/Component/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ size = 'default', showText = true, className = '' }) {
  const sizeClasses = {
    small: {
      container: 'w-8 h-8',
      icon: 'w-5 h-5',
      text: 'text-lg',
      subtext: 'text-xs'
    },
    default: {
      container: 'w-10 h-10',
      icon: 'w-6 h-6',
      text: 'text-xl',
      subtext: 'text-xs'
    },
    large: {
      container: 'w-12 h-12',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      subtext: 'text-sm'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <Link to="/" className={`flex-shrink-0 flex items-center space-x-3 ${className}`}>
      {/* Logo Container */}
      <div className={`flex items-center justify-center ${currentSize.container} bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}>
        {/* Try to load actual logo image first */}
        <img 
          src="/src/assets/logo[1].png" 
          alt="Swastha Logo" 
          className={`${currentSize.icon} object-contain`}
          onError={(e) => {
            // Fallback to SVG icon if logo image not found
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        
        {/* Fallback Medical Cross SVG Icon */}
        <svg 
          className={`${currentSize.icon} text-white`}
          style={{display: 'none'}}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200`}>
            Swastha
          </span>
          <span className={`${currentSize.subtext} text-gray-500 leading-tight`}>
            Healthcare Platform
          </span>
        </div>
      )}
    </Link>
  );
}

export default Logo;