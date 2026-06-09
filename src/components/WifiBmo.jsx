import { motion } from "framer-motion";

export default function WifiBmo() {
  const W = 30;
  const H = 36;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative pointer-events-none">
        <svg
          width={W * 1.5}
          height={H * 1.5}
          viewBox="0 0 30 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.5))", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="bmoBodyWifi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="bmoScreenWifi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
          </defs>

          <line x1="12" y1="5.5" x2="12" y2="2.5" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="12" cy="1.5" r="1.5" fill="#fbbf24" stroke="#022c22" strokeWidth="0.8" />

          <motion.g 
            animate={{ rotate: [-20, 15, -20] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "1px 20px" }}
          >
            <path d="M 1 20 Q -4 14 -2 8" stroke="#022c22" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </motion.g>

          <motion.g 
            animate={{ rotate: [20, -15, 20] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "24px 20px" }}
          >
            <path d="M 24 20 Q 29 14 27 8" stroke="#022c22" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </motion.g>

          <line x1="8" y1="32" x2="8" y2="35" stroke="#022c22" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="32" x2="17" y2="35" stroke="#022c22" strokeWidth="1.5" strokeLinecap="round" />

          <rect x="1" y="5.5" width="23" height="27" rx="3.5" fill="url(#bmoBodyWifi)" stroke="#022c22" strokeWidth="1.5" />
          
          <rect x="3.5" y="8" width="18" height="10" rx="2" fill="url(#bmoScreenWifi)" stroke="#022c22" strokeWidth="1" />

          {[10, 12, 14, 16].map((y) => (
            <line key={y} x1="4.5" y1={y} x2="20.5" y2={y} stroke="#022c22" strokeOpacity="0.04" strokeWidth="0.5" />
          ))}
          <circle cx="10.5" cy="11" r="1.6" fill="#022c22" />
          <circle cx="18.5" cy="11" r="1.6" fill="#022c22" />
          <ellipse cx="14.5" cy="14" rx="1.5" ry="2" fill="#022c22" />
          <circle cx="6.5" cy="13.5" r="2" fill="#fda4af" opacity="0.4" />
          <circle cx="22.5" cy="13.5" r="2" fill="#fda4af" opacity="0.4" />

          <rect x="5" y="21.5" width="7" height="2" rx="0.5" fill="#022c22" />
          <rect x="7.5" y="19" width="2" height="7" rx="0.5" fill="#022c22" />
          <circle cx="18.5" cy="21.5" r="1.8" fill="#f43f5e" stroke="#022c22" strokeWidth="0.6" />
          <circle cx="18.5" cy="26" r="1.8" fill="#38bdf8" stroke="#022c22" strokeWidth="0.6" />
          
          <rect x="7" y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
          <rect x="10.5" y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
          <rect x="14" y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
        </svg>

        <motion.div
          animate={{ y: [-35, -15, -35], rotate: [-10, 10, -10], scale: [1, 0.9, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center text-lime-300 drop-shadow-[0_0_12px_rgba(190,242,100,0.8)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="4" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
