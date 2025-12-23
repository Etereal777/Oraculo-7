
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-32 h-32", showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
        {/* Outer Ring with dots */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
        <circle cx="200" cy="200" r="160" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
        
        {/* Moon phases and stars around */}
        <path d="M200 20 A 15 15 0 1 1 200 50 A 10 10 0 1 0 200 20" fill="#D4AF37" /> {/* Top Moon */}
        <path d="M350 200 A 15 15 0 1 1 380 200 A 10 10 0 1 0 350 200" fill="#D4AF37" opacity="0.5" />
        
        {/* Main Eye Structure */}
        <path d="M100 200 Q200 100 300 200 Q200 300 100 200" fill="none" stroke="#D4AF37" strokeWidth="3" />
        <circle cx="200" cy="200" r="45" fill="none" stroke="#D4AF37" strokeWidth="2" />
        
        {/* Star in Eye */}
        <path d="M200 170 L208 192 L230 200 L208 208 L200 230 L192 208 L170 200 L192 192 Z" fill="#D4AF37" className="animate-pulse" />
        
        {/* Inner lines / Rays */}
        {[...Array(12)].map((_, i) => (
          <line 
            key={i}
            x1="200" y1="200" 
            x2={200 + Math.cos(i * 30 * Math.PI / 180) * 140} 
            y2={200 + Math.sin(i * 30 * Math.PI / 180) * 140} 
            stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"
          />
        ))}

        {/* The Stylized 7 */}
        <path d="M185 240 L215 240 L195 330" fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round" />
        <path d="M185 240 L215 240 L195 330" fill="none" stroke="#050510" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      </svg>
      
      {showText && (
        <span className="mt-4 text-2xl font-bold tracking-[0.3em] gold-text font-serif">
          ORÁCULO 7
        </span>
      )}
    </div>
  );
};

export default Logo;
