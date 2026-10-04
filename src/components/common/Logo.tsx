import React from 'react';

interface LogoProps {
  variant?: 'emblem' | 'full' | 'horizontal' | 'header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const GiaoThoiEmblem: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      {/* Background circle in signature deep burgundy */}
      <circle cx="80" cy="80" r="76" fill="#9E211D" />
      <circle cx="80" cy="80" r="74" stroke="#FAF8F5" strokeOpacity="0.4" strokeWidth="1.5" />

      {/* Dong Son drum concentric rings */}
      <circle cx="80" cy="80" r="64" stroke="#FAF8F5" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="80" cy="80" r="54" stroke="#FAF8F5" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="80" cy="80" r="42" stroke="#FAF8F5" strokeOpacity="0.2" strokeWidth="1" />
      
      {/* Sun star at center */}
      <g stroke="#FAF8F5" strokeOpacity="0.35" strokeWidth="1">
        <line x1="80" y1="68" x2="80" y2="92" />
        <line x1="68" y1="80" x2="92" y2="80" />
        <line x1="71.5" y1="71.5" x2="88.5" y2="88.5" />
        <line x1="88.5" y1="71.5" x2="71.5" y2="88.5" />
      </g>

      {/* Stylized traditional clouds & waves at bottom */}
      <path
        d="M26 102 C36 84 56 82 72 90 C84 96 92 104 112 108 C128 111 138 104 142 98 C138 122 114 138 80 138 C48 138 32 122 26 102 Z"
        fill="#FAF8F5"
      />
      <path
        d="M38 112 C44 112 50 112 56 112 M42 120 C52 120 62 120 70 120"
        stroke="#9E211D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* Sacred Chim Lạc (Au Lac mythical bird) in flight */}
      <g fill="#FAF8F5" stroke="#9E211D" strokeWidth="1.2">
        {/* Bird body, neck and head */}
        <path
          d="M44 98 L72 82 L96 66 L124 50 C128 48 132 46 138 43 L126 55 L106 68 L86 86 L62 98 Z"
          fill="#FAF8F5"
        />
        {/* Head and crest */}
        <circle cx="100" cy="62" r="3" fill="#9E211D" />
        <circle cx="100" cy="62" r="1.5" fill="#FAF8F5" />
        {/* Upper wing feather details */}
        <rect x="74" y="66" width="16" height="14" rx="2" fill="#FAF8F5" stroke="#9E211D" strokeWidth="1.5" />
        <line x1="78" y1="67" x2="78" y2="79" stroke="#9E211D" strokeWidth="1.2" />
        <line x1="82" y1="67" x2="82" y2="79" stroke="#9E211D" strokeWidth="1.2" />
        <line x1="86" y1="67" x2="86" y2="79" stroke="#9E211D" strokeWidth="1.2" />

        {/* Tail feathers */}
        <path
          d="M40 96 L48 112 L72 100 L64 88 Z"
          fill="#FAF8F5"
          stroke="#9E211D"
          strokeWidth="1.5"
        />
        <line x1="48" y1="98" x2="52" y2="108" stroke="#9E211D" strokeWidth="1.2" />
        <line x1="54" y1="95" x2="58" y2="105" stroke="#9E211D" strokeWidth="1.2" />
        <line x1="60" y1="92" x2="64" y2="102" stroke="#9E211D" strokeWidth="1.2" />
      </g>

      {/* Stylized upper decorative curved banner representing ancient scroll / cloud ribbon */}
      <path
        d="M66 38 C78 36 94 38 104 46 C94 48 84 46 72 44 C66 43 62 40 66 38 Z"
        fill="#FAF8F5"
        opacity="0.9"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'light'
}) => {
  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 64,
    xl: 84
  };

  const currentSize = pixelSizes[size];

  if (variant === 'emblem') {
    return <GiaoThoiEmblem size={currentSize} className={className} />;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <GiaoThoiEmblem size={currentSize} />
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-editorial font-bold tracking-[0.18em] uppercase ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-lg'
          } ${isDark ? 'text-white' : 'text-[#1E1E1E]'}`}
        >
          GIAO THỜI
        </span>
        <span
          className={`font-serif italic tracking-wide text-xs ${
            isDark ? 'text-[#D5C7B5]' : 'text-[#8F1D18]'
          } mt-0.5`}
        >
          Tinh hoa từ đất Việt
        </span>
      </div>
    </div>
  );
};
