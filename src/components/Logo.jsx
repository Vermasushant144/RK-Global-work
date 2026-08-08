'use client';

export default function Logo({ width = 240, height = 75, lightMode = true }) {
  const navy = "#0B1F33";
  const orange = "#F47B20";
  const textColor = lightMode ? navy : "#FFFFFF";
  const grayColor = lightMode ? "#5A6578" : "#94A3B8";

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 450 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {/* Background Gear Teeth */}
      <g transform="translate(245, 12)">
        <circle cx="50" cy="50" r="42" stroke={navy} strokeWidth="10" strokeDasharray="14 8" fill="none" />
        <path d="M 50 12 A 38 38 0 0 1 85 35" stroke={orange} strokeWidth="4" fill="none" />
      </g>

      {/* Buildings Skyline Graphic on bottom left of R */}
      <g transform="translate(110, 42)">
        <rect x="10" y="24" width="12" height="30" fill={grayColor} opacity="0.8" />
        <rect x="24" y="14" width="14" height="40" fill={grayColor} />
        <rect x="40" y="28" width="10" height="26" fill={grayColor} opacity="0.8" />
        {/* Windows */}
        <line x1="28" y1="20" x2="34" y2="20" stroke="#FFF" strokeWidth="2" />
        <line x1="28" y1="26" x2="34" y2="26" stroke="#FFF" strokeWidth="2" />
        <line x1="28" y1="32" x2="34" y2="32" stroke="#FFF" strokeWidth="2" />
        <path d="M 0 54 Q 45 42 90 54" stroke={navy} strokeWidth="3" fill="none" />
      </g>

      {/* R and K Monogram */}
      <g transform="translate(140, 20)">
        {/* 'R' in Deep Navy */}
        <path 
          d="M 10 75 V 15 H 48 C 65 15 75 24 75 38 C 75 50 66 58 50 58 L 78 75 H 56 L 35 57 H 30 V 75 H 10 Z M 30 42 H 46 C 54 42 58 39 58 32 C 58 25 54 22 46 22 H 30 V 42 Z" 
          fill={navy} 
        />
        {/* 'K' Orange diagonal top stroke */}
        <path 
          d="M 72 15 L 125 55 H 98 L 62 26 Z" 
          fill={orange} 
        />
        {/* 'K' Navy diagonal bottom stroke */}
        <path 
          d="M 80 40 L 132 75 H 105 L 68 50 Z" 
          fill={navy} 
        />
      </g>

      {/* Main Brand Text: RK GLOBAL */}
      <text x="65" y="105" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="32" fill={textColor} letterSpacing="2">
        R K
      </text>
      <text x="145" y="105" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="32" fill={orange} letterSpacing="2">
        GLOBAL
      </text>

      {/* Subtitle Line: — ENGINEERING — */}
      <line x1="65" y1="116" x2="110" y2="116" stroke={orange} strokeWidth="2.5" />
      <text x="122" y="120" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="13" fill={textColor} letterSpacing="7">
        ENGINEERING
      </text>
      <line x1="320" y1="116" x2="365" y2="116" stroke={orange} strokeWidth="2.5" />

      {/* Tagline Line: — ENGINEERING SOLUTIONS. BUILDING A BETTER TOMORROW. — */}
      <line x1="65" y1="131" x2="80" y2="131" stroke={navy} strokeWidth="1.5" />
      <text x="88" y="134" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="7.5" fill={grayColor} letterSpacing="1.2">
        ENGINEERING SOLUTIONS. BUILDING A BETTER TOMORROW.
      </text>
      <line x1="350" y1="131" x2="365" y2="131" stroke={navy} strokeWidth="1.5" />
    </svg>
  );
}
