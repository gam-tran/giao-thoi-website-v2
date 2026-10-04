import React from 'react';

/**
 * Traditional Vietnamese decorative line divider: --o-- TITLE --o--
 * Matches the reference image exact section title ornament.
 */
export const SectionHeading: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center my-8 ${className}`}>
      <div className="inline-flex items-center justify-center gap-4">
        {/* Left ornament */}
        <div className="flex items-center gap-1.5 text-[#9E211D]">
          <span className="w-8 sm:w-16 h-[1px] bg-[#9E211D]/40"></span>
          <span className="w-2 h-2 rounded-full border border-[#9E211D] bg-[#FAF8F5]"></span>
          <span className="w-4 sm:w-8 h-[1px] bg-[#9E211D]"></span>
        </div>

        {/* Title */}
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#1E1E1E] uppercase">
          {title}
        </h2>

        {/* Right ornament */}
        <div className="flex items-center gap-1.5 text-[#9E211D]">
          <span className="w-4 sm:w-8 h-[1px] bg-[#9E211D]"></span>
          <span className="w-2 h-2 rounded-full border border-[#9E211D] bg-[#FAF8F5]"></span>
          <span className="w-8 sm:w-16 h-[1px] bg-[#9E211D]/40"></span>
        </div>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base font-serif italic text-[#6B5E51] max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Delicate Vietnamese cloud and mist vector ornament
 */
export const CloudOrnament: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.15,
}) => {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <path
        d="M20 50 C40 30 70 30 90 45 C100 25 130 20 150 35 C170 15 205 20 220 45 C230 45 235 55 228 62 C215 65 30 65 20 50 Z"
        stroke="#9E211D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 48 C70 42 100 44 115 52"
        stroke="#9E211D"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M130 44 C150 38 180 40 195 50"
        stroke="#9E211D"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};
