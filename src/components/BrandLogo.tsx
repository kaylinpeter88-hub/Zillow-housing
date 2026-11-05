import React, { useState } from 'react';
import { Home } from 'lucide-react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  imgClassName?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  imgClassName = 'h-9 sm:h-10 w-auto object-contain max-h-12',
  showText = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // Direct image candidates resolved from Imgur album YwosH0r:
  // KkZlDkr is the direct media image asset inside album YwosH0r
  const logoUrls = [
    'https://i.imgur.com/KkZlDkr.jpeg',
    'https://i.imgur.com/KkZlDkrh.jpg',
    'https://i.imgur.com/KkZlDkr.png',
    'https://imgur.com/a/YwosH0r.png',
    'https://i.imgur.com/YwosH0r.png',
  ];

  const handleImageError = () => {
    if (currentSrcIndex < logoUrls.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 whitespace-nowrap shrink-0 group ${className}`}>
      {!imgError ? (
        <div className="flex items-center gap-2.5">
          <img
            src={logoUrls[currentSrcIndex]}
            alt="Zillow Real Estate Logo"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={handleImageError}
            className={`${imgClassName} transition-transform group-hover:scale-102 ${
              isDark ? 'bg-white p-1 rounded-lg shadow-xs' : ''
            }`}
          />
          {showText && (
            <div className="flex flex-col">
              <span
                className={`text-xl font-extrabold tracking-tight leading-none ${
                  isDark ? 'text-white' : 'text-[#102A43]'
                }`}
              >
                Zillow<span className="text-[#006AFF]">.</span>
              </span>
              <span
                className={`text-[10px] uppercase font-semibold tracking-wider leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Real Estate
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Zero-broken-image fallback if external host is blocked */
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#006AFF] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Home className="w-5 h-5 fill-white/20" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl font-extrabold tracking-tight leading-none ${
                isDark ? 'text-white' : 'text-[#102A43]'
              }`}
            >
              Zillow<span className="text-[#006AFF]">.</span>
            </span>
            <span
              className={`text-[10px] uppercase font-semibold tracking-wider leading-tight ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Real Estate
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
