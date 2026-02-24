"use client";

interface ScheduleThemeToggleProps {
  isLightMode: boolean;
  onToggle: () => void;
}

export function ScheduleThemeToggle({
  isLightMode,
  onToggle,
}: ScheduleThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group relative shrink-0 cursor-pointer"
      aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
    >
      {/* Outer glow ring */}
      <div
        className={`absolute -inset-2 rounded-full transition-all duration-700 group-hover:scale-110 ${
          isLightMode
            ? "bg-gradient-to-r from-amber-300 via-sky-300 to-amber-300 opacity-50 blur-md"
            : "bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-35 blur-md"
        }`}
      />

      {/* Inner glow ring */}
      <div
        className={`absolute -inset-0.5 rounded-full transition-all duration-500 ${
          isLightMode
            ? "bg-gradient-to-br from-amber-200/40 to-sky-200/40 opacity-80 blur-sm"
            : "bg-gradient-to-br from-indigo-400/20 to-violet-400/20 opacity-60 blur-sm"
        }`}
      />

      {/* Main circle */}
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 group-hover:scale-110 ${
          isLightMode
            ? "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-sky-50"
            : "border-indigo-500/50 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950"
        }`}
      >
        {/* Beaver */}
        <span
          className="relative text-2xl"
          style={{
            transform: isLightMode
              ? "scale(1.15) rotate(8deg)"
              : "scale(1) rotate(0deg)",
            transition:
              "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            display: "inline-block",
          }}
        >
          🦫
        </span>

        {/* Sleep (dark) */}
        <span
          className={`absolute -right-1.5 -top-1.5 text-xs transition-all ${
            isLightMode
              ? "-translate-y-2 scale-0 opacity-0 rotate-45"
              : "translate-y-0 scale-100 opacity-100 rotate-0"
          }`}
          style={{ transitionDuration: "400ms" }}
        >
          💤
        </span>

        {/* Sparkles (light) */}
        {[
          { top: -6, right: -4, delay: 0, size: 12 },
          { top: 2, left: -6, delay: 120, size: 10 },
          { bottom: -2, right: 0, delay: 240, size: 9 },
          { bottom: -4, left: 2, delay: 360, size: 8 },
        ].map((pos, i) => (
          <span
            key={i}
            className={`absolute transition-all ${
              isLightMode ? "scale-100 opacity-90" : "scale-0 opacity-0"
            }`}
            style={{
              top: pos.top,
              right: pos.right,
              left: pos.left,
              bottom: pos.bottom,
              fontSize: pos.size,
              transitionDuration: "400ms",
              transitionDelay: isLightMode ? `${200 + pos.delay}ms` : "0ms",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ✨
          </span>
        ))}

        {/* Moon (dark) */}
        <span
          className={`absolute -left-2.5 top-0 text-[10px] transition-all ${
            isLightMode
              ? "translate-x-2 scale-0 opacity-0"
              : "translate-x-0 scale-100 opacity-70"
          }`}
          style={{
            transitionDuration: "500ms",
            transitionDelay: isLightMode ? "0ms" : "150ms",
          }}
        >
          🌙
        </span>

        {/* Sun (light) */}
        <span
          className={`absolute -right-2 -top-2 text-[11px] transition-all ${
            isLightMode
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-0 opacity-0"
          }`}
          style={{
            transitionDuration: "500ms",
            transitionDelay: isLightMode ? "100ms" : "0ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            filter: isLightMode
              ? "drop-shadow(0 0 3px rgba(251,191,36,0.5))"
              : "none",
          }}
        >
          ☀️
        </span>

        {/* Star dots (dark) */}
        {[
          { angle: 30, dist: 24 },
          { angle: 150, dist: 26 },
          { angle: 260, dist: 22 },
        ].map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          const x = Math.cos(rad) * dot.dist;
          const y = Math.sin(rad) * dot.dist;
          return (
            <span
              key={i}
              className={`absolute h-1 w-1 rounded-full transition-all ${
                isLightMode
                  ? "scale-0 opacity-0 bg-transparent"
                  : "scale-100 opacity-60 bg-indigo-300"
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transitionDuration: "500ms",
                transitionDelay: isLightMode ? "0ms" : `${100 + i * 100}ms`,
                boxShadow: isLightMode
                  ? "none"
                  : "0 0 3px rgba(165,180,252,0.8)",
              }}
            />
          );
        })}
      </div>

      {/* Label */}
      <span
        className={`mt-1.5 block text-center text-[10px] font-semibold tracking-wide transition-all duration-500 ${
          isLightMode ? "text-amber-600" : "text-indigo-300"
        }`}
      >
        {isLightMode ? "Light" : "Dark"}
      </span>
    </button>
  );
}
