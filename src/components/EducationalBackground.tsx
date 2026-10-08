import React from 'react';

interface EducationalBackgroundProps {
  variant?: 'home' | 'map' | 'game';
}

export const EducationalBackground: React.FC<EducationalBackgroundProps> = ({ variant = 'game' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* Sky Gradient Base */}
      <div
        className={`absolute inset-0 ${
          variant === 'home'
            ? 'bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-200'
            : variant === 'map'
            ? 'bg-gradient-to-b from-sky-300 via-cyan-100 to-emerald-100'
            : 'bg-gradient-to-b from-sky-200 via-sky-100 to-lime-100'
        }`}
      />

      {/* Soft Illustrated Island Backdrop */}
      <img
        src="/src/assets/images/game_adventure_island_1790830674769.jpg"
        alt=""
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover ${
          variant === 'home' ? 'opacity-25' : 'opacity-15'
        }`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Glowing Sun in Top Left */}
      <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-amber-300/40" />
      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 shadow-md flex items-center justify-center text-3xl">
        ☀️
      </div>

      {/* Cheerful Rainbow Arc */}
      <svg
        className="absolute top-0 right-0 w-[420px] sm:w-[600px] h-[280px] opacity-35"
        viewBox="0 0 600 300"
        fill="none"
      >
        <path d="M50 300 A250 250 0 0 1 550 300" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />
        <path d="M64 300 A236 236 0 0 1 536 300" stroke="#F59E0B" strokeWidth="14" strokeLinecap="round" />
        <path d="M78 300 A222 222 0 0 1 522 300" stroke="#FACC15" strokeWidth="14" strokeLinecap="round" />
        <path d="M92 300 A208 208 0 0 1 508 300" stroke="#10B981" strokeWidth="14" strokeLinecap="round" />
        <path d="M106 300 A194 194 0 0 1 494 300" stroke="#38BDF8" strokeWidth="14" strokeLinecap="round" />
        <path d="M120 300 A180 180 0 0 1 480 300" stroke="#8B5CF6" strokeWidth="14" strokeLinecap="round" />
      </svg>

      {/* Fluffy Cartoon Clouds */}
      <div className="absolute top-10 left-[18%] text-white/85 text-6xl drop-shadow-sm animate-gentle-bounce">
        ☁️
      </div>
      <div
        className="absolute top-16 right-[15%] text-white/85 text-5xl drop-shadow-sm animate-gentle-bounce"
        style={{ animationDelay: '1.1s' }}
      >
        ☁️
      </div>
      <div
        className="absolute top-32 left-[6%] text-white/70 text-4xl drop-shadow-sm animate-gentle-bounce"
        style={{ animationDelay: '0.6s' }}
      >
        ☁️
      </div>

      {/* Floating Educational Math Badges (Prime Numbers & Symbols) */}
      <div className="hidden sm:flex absolute top-28 left-8 w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-xs border-2 border-white shadow-sm items-center justify-center font-black text-lg text-emerald-600 rotate-[-8deg] animate-gentle-bounce">
        2
      </div>
      <div
        className="hidden sm:flex absolute top-44 right-10 w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-xs border-2 border-white shadow-sm items-center justify-center font-black text-lg text-amber-600 rotate-[10deg] animate-gentle-bounce"
        style={{ animationDelay: '0.8s' }}
      >
        3
      </div>
      <div
        className="hidden md:flex absolute bottom-36 left-10 w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-xs border-2 border-white shadow-sm items-center justify-center font-black text-base text-sky-700 rotate-[6deg] animate-gentle-bounce"
        style={{ animationDelay: '1.4s' }}
      >
        FPB
      </div>
      <div
        className="hidden md:flex absolute bottom-40 right-12 w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-xs border-2 border-white shadow-sm items-center justify-center font-black text-base text-indigo-700 rotate-[-6deg] animate-gentle-bounce"
        style={{ animationDelay: '0.4s' }}
      >
        KPK
      </div>
      <div
        className="hidden lg:flex absolute top-1/2 left-6 w-11 h-11 rounded-full bg-amber-100/70 border-2 border-white shadow-sm items-center justify-center font-black text-base text-amber-700 animate-wiggle"
      >
        ×
      </div>
      <div
        className="hidden lg:flex absolute top-1/2 right-6 w-11 h-11 rounded-full bg-emerald-100/70 border-2 border-white shadow-sm items-center justify-center font-black text-base text-emerald-700 animate-wiggle"
      >
        ÷
      </div>

      {/* Rolling 2D Cartoon Green Hills at Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-28 sm:h-36"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 Q360 30 720 110 T1440 90 L1440 200 L0 200 Z"
          fill="#86EFAC"
          fillOpacity="0.55"
        />
        <path
          d="M0 150 Q400 70 850 140 T1440 120 L1440 200 L0 200 Z"
          fill="#4ADE80"
          fillOpacity="0.45"
        />
      </svg>

      {/* Cute Trees & Flowers along bottom corners */}
      <div className="absolute bottom-3 left-6 text-4xl sm:text-5xl opacity-75">
        🌳
      </div>
      <div className="absolute bottom-2 left-20 text-2xl sm:text-3xl opacity-80">
        🌻
      </div>
      <div className="absolute bottom-3 right-6 text-4xl sm:text-5xl opacity-75">
        🌲
      </div>
      <div className="absolute bottom-2 right-20 text-2xl sm:text-3xl opacity-80">
        🌷
      </div>
    </div>
  );
};
