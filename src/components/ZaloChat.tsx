import React, { useState } from 'react';
import { ZALO_URL } from '../config/constants';
import { MessageCircle } from 'lucide-react';

export const ZaloChat: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on hover */}
      <div
        className={`hidden sm:block px-3.5 py-1.5 rounded-full bg-[#1C1B1A] text-white text-xs font-medium shadow-xl border border-[#332F2A] transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
        }`}
      >
        <span>Cần tư vấn? Chat với chúng tôi</span>
      </div>

      {/* Floating Button */}
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0068FF] text-white rounded-full shadow-xl shadow-[#0068FF]/30 hover:bg-[#0055D4] hover:shadow-2xl hover:shadow-[#0068FF]/45 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat với Giao Thời qua Zalo"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-[#0068FF]/30 animate-ping -z-10 opacity-75" />
        
        {/* Zalo Icon badge */}
        <div className="w-7 h-7 rounded-full bg-white text-[#0068FF] flex items-center justify-center font-bold text-xs shadow-inner">
          <MessageCircle size={16} className="fill-[#0068FF] stroke-none" />
        </div>

        <span className="text-xs font-bold tracking-wide pr-1">
          Chat với Giao Thời
        </span>
      </a>
    </div>
  );
};
