import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";


const W = 30;
const H = 36;
const LEG = 5;          
const FULL_H = H + LEG; 
const SPEED = 1.0;      
const GRAV = 0.45;      
const JUMP_V = -9;       
const HOP_V = -4.5;      
const GROUND_PAD = 6;    
const PLATFORM_SEL = "h1, h2, h3, button, [data-bmo-platform]";

export default function BmoAnimation() {
  const [expression, setExpression] = useState("normal");
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");
  const [facingState, setFacingState] = useState(1);
  const rootRef  = useRef(null);
  const bodyRef  = useRef(null);
  const legLRef  = useRef(null);
  const legRRef  = useRef(null);
  const pos      = useRef({ x: 160, y: 0 });
  const vel      = useRef({ x: SPEED, y: 0 });
  const facing   = useRef(1);       
  const st       = useRef("walk");  
  const groundY  = useRef(0);
  const plats    = useRef([]);
  const curPlat  = useRef(null);
  const hopWait  = useRef(0);
  const idleTick = useRef(0);
  const legPhase = useRef(0);
  const dragFlag = useRef(false);
  const dragOfs  = useRef({ x: 0, y: 0 });
  const facingDirRef = useRef(1);
  const rafId    = useRef(0);

  const calcGround = () => window.innerHeight - FULL_H - GROUND_PAD;

  const scanPlatforms = useCallback(() => {
    const out = [];
    document.querySelectorAll(PLATFORM_SEL).forEach((el) => {
      if (rootRef.current?.contains(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width > 20 && r.height > 8) {
        const isHang = el.textContent?.trim().toLowerCase() === "back";
        out.push({ l: r.left, r: r.right, t: r.top - FULL_H + 2, b: r.bottom, w: r.width, isHang });
      }
    });
    plats.current = out;
  }, []);

  const applyPos = () => {
    if (!rootRef.current) return;
    rootRef.current.style.transform =
      `translate3d(${pos.current.x}px,${pos.current.y}px,0)`;
  };

  const applyBody = (sx = 1, sy = 1, rot = 0) => {
    if (!bodyRef.current) return;
    bodyRef.current.style.transform =
      `scaleX(${sx}) scaleY(${sy}) rotate(${rot}deg)`;
  };

  const animLegs = (walking) => {
    if (!legLRef.current || !legRRef.current) return;
    if (walking) {
      legPhase.current += 0.35;
      const a = Math.sin(legPhase.current) * 30;
      legLRef.current.style.transform = `rotate(${a}deg)`;
      legRRef.current.style.transform = `rotate(${-a}deg)`;
    } else {
      legLRef.current.style.transform = "rotate(0)";
      legRRef.current.style.transform = "rotate(0)";
    }
  };

  useEffect(() => {
    groundY.current = calcGround();
    pos.current.y = groundY.current;
    applyPos();
    scanPlatforms();
    const platIv = setInterval(scanPlatforms, 2000);

    const tick = () => {
      const p = pos.current;
      const v = vel.current;
      const s = st.current;

      if (s === "drag") {
        animLegs(false);
        applyPos();
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      let walking = false;

      
      if (s === "walk") {
        walking = true;
        p.x += v.x;
        p.y = curPlat.current ? curPlat.current.t : groundY.current;

        if (p.x <= 0)                     { v.x = SPEED;  facing.current = 1;  }
        if (p.x >= window.innerWidth - W) { v.x = -SPEED; facing.current = -1; }

        if (curPlat.current) {
          const pl = curPlat.current;
          if (p.x < pl.l - 5 || p.x > pl.r - W + 5) {
            const dir = facing.current;
            const nextPl = plats.current.find(
              (other) => other !== pl && 
              Math.abs(other.t - pl.t) < 40 && 
              ((dir === 1 && other.l > pl.r && other.l - pl.r < 100) ||
               (dir === -1 && other.r < pl.l && pl.l - other.r < 100))
            );
            if (nextPl) {
              st.current = "fly";
              curPlat.current = nextPl;
              v.y = -2; 
              const mid = nextPl.l + nextPl.w / 2 - W / 2;
              v.x = Math.sign(mid - p.x) * 3; 
              
              const texts = ["Wheee!", "Superman!", "To infinity!"];
              setMessage(texts[Math.floor(Math.random() * texts.length)]);
              setShowBubble(true);
              setTimeout(() => setShowBubble(false), 2000);
            } else {
              st.current = "fall"; curPlat.current = null; v.y = 0;
            }
          }
        }

        if (!curPlat.current && Math.random() < 0.007) {
          const tgt = plats.current.find(
            (pl) => p.x > pl.l - 80 && p.x < pl.r + 80 && pl.t < groundY.current
          );
          if (tgt) {
            st.current = "fly"; curPlat.current = tgt; 
            v.y = -2;
            const mid = tgt.l + tgt.w / 2 - W / 2;
            v.x = Math.sign(mid - p.x) * 3;
            facing.current = v.x >= 0 ? 1 : -1;

            const texts = ["Wheee!", "Superman!", "To infinity!"];
            setMessage(texts[Math.floor(Math.random() * texts.length)]);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 2000);
          }
        }

        idleTick.current++;
        if (idleTick.current > 160 && Math.random() < 0.006) {
          st.current = "idle"; walking = false; idleTick.current = 0;
          setTimeout(() => {
            if (st.current === "idle") {
              st.current = "walk";
              vel.current.x = facing.current * SPEED;
            }
          }, 1000 + Math.random() * 2000);
        }
        applyBody();
      }

      if (s === "fly") {
        p.x += v.x; 
        p.y += v.y; 
        
        const tgt = curPlat.current;
        if (tgt) {
          const targetY = tgt.isHang ? tgt.b - FULL_H : tgt.t;
          if (p.y > targetY - 15) v.y -= 0.3; 
          else v.y += 0.3; 
          
          if (v.y > 3) v.y = 3;
          if (v.y < -3) v.y = -3;
        }

        applyBody(1, 1, 75); 

        if (tgt) {
          const mid = tgt.l + tgt.w / 2 - W / 2;
          if ((v.x > 0 && p.x >= mid) || (v.x < 0 && p.x <= mid) || Math.abs(p.x - mid) < 5) {
            p.x = mid;
            p.y = tgt.isHang ? tgt.b - FULL_H : tgt.t;
            v.y = 0; 
            v.x = facing.current * SPEED;
            st.current = tgt.isHang ? "hang" : "walk";
            const rot = tgt.isHang ? 180 : 0;
            applyBody(1.2, 0.78, rot); setTimeout(() => applyBody(1, 1, rot), 100);
          }
        }
        
        if (p.y >= groundY.current) {
          p.y = groundY.current; v.y = 0; v.x = facing.current * SPEED;
          st.current = "walk"; curPlat.current = null;
          applyBody(1.18, 0.8, 0); setTimeout(() => applyBody(1, 1, 0), 110);
        }
      }

      if (s === "hang") {
        walking = true;
        p.x += v.x;
        p.y = curPlat.current ? curPlat.current.b - FULL_H : groundY.current;

        if (curPlat.current) {
          if (p.x <= curPlat.current.l) { v.x = SPEED; facing.current = 1; }
          if (p.x >= curPlat.current.r - W) { v.x = -SPEED; facing.current = -1; }
        }

        applyBody(1, 1, 180);

        if (Math.random() < 0.003) {
          const tgt = plats.current.find((pl) => !pl.isHang && p.x > pl.l - 80 && p.x < pl.r + 80);
          if (tgt) {
            st.current = "fly"; curPlat.current = tgt;
            v.y = 2; 
            const mid = tgt.l + tgt.w / 2 - W / 2;
            v.x = Math.sign(mid - p.x) * 3;
            facing.current = v.x >= 0 ? 1 : -1;
            const texts = ["Wheee!", "Superman!", "To infinity!"];
            setMessage(texts[Math.floor(Math.random() * texts.length)]);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 2000);
          } else {
            st.current = "fall"; curPlat.current = null; v.y = 0;
          }
        }

        idleTick.current++;
        if (idleTick.current > 160 && Math.random() < 0.006) {
          st.current = "idle_hang"; walking = false; idleTick.current = 0;
          setTimeout(() => {
            if (st.current === "idle_hang") {
              st.current = "hang";
              vel.current.x = facing.current * SPEED;
            }
          }, 1000 + Math.random() * 2000);
        }
      }

      if (s === "idle_hang") {
        applyBody(1, 1, 180);
      }

      if (s === "fall") {
        p.x += v.x; p.y += v.y; v.y += GRAV;
        if (v.y > 1) applyBody(1.08, 0.9);
        if (p.y >= groundY.current) {
          p.y = groundY.current; v.y = 0; v.x = facing.current * SPEED;
          st.current = "walk";
          applyBody(1.2, 0.76); setTimeout(() => applyBody(), 120);
        }
      }

      animLegs(walking || s === "walk");
      applyPos();
      
      if (facingDirRef.current !== facing.current) {
        facingDirRef.current = facing.current;
        setFacingState(facing.current);
      }
      
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const onResize = () => { groundY.current = calcGround(); scanPlatforms(); };
    const onScroll = () => scanPlatforms();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      clearInterval(platIv);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scanPlatforms]);

  useEffect(() => {
    const exprs = ["normal", "happy", "blink", "wow"];
    const msgs  = [
      "Beep boop!", "Hi!", "Let's go!", ":D", "DOMORE!", "🤖",
      "Hmm...", "Jalan jalan~", "Apa itu?", "Huft...", "Robot life", "Asyik~"
    ];
    const iv = setInterval(() => {
      setExpression(exprs[Math.floor(Math.random() * exprs.length)]);
      setTimeout(() => setExpression("normal"), 1500);

      if (Math.random() > 0.6) {
        setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 2500);
      }
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const onPtrDown = (e) => {
    dragFlag.current = true;
    st.current = "drag";
    dragOfs.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPtrMove = (e) => {
    if (!dragFlag.current) return;
    pos.current.x = e.clientX - dragOfs.current.x;
    pos.current.y = e.clientY - dragOfs.current.y;
  };
  const onPtrUp = () => {
    if (!dragFlag.current) return;
    dragFlag.current = false;
    vel.current.y = 0;
    const onPlat = plats.current.find(
      (pl) =>
        pos.current.x > pl.l - 20 &&
        pos.current.x < pl.r - W + 20 &&
        (pl.isHang ? Math.abs(pos.current.y - (pl.b - FULL_H)) < 40 : Math.abs(pos.current.y - pl.t) < 40)
    );
    if (onPlat) {
      pos.current.y = onPlat.isHang ? onPlat.b - FULL_H : onPlat.t;
      curPlat.current = onPlat;
      st.current = onPlat.isHang ? "hang" : "walk";
      vel.current.x = facing.current * SPEED;
    } else {
      st.current = "fall";
      vel.current.x = facing.current * SPEED;
    }
  };

  const isRight = facingState === 1;

  const bodyX = isRight ? 6 : 1;
  const sideX = isRight ? 2 : 23;
  const screenX = isRight ? 10.5 : 1.5;
  const eyeL = isRight ? 15.5 : 2.5;
  const eyeR = isRight ? 23.5 : 10.5;
  const mouthCenter = isRight ? 19.5 : 6.5;
  const blushL = isRight ? 13.5 : 2;
  const blushR = isRight ? 25.5 : 14;
  const dpadX = isRight ? 12 : 13.5;
  const dpadVX = isRight ? 14.5 : 16;
  const btnX = isRight ? 25.5 : 6;
  const spk1 = isRight ? 14 : 5;
  const spk2 = isRight ? 17.5 : 8.5;
  const spk3 = isRight ? 21 : 12;
  const antennaX = isRight ? 18 : 12;
  const scanlineX1 = isRight ? 11.5 : 2.5;
  const scanlineX2 = isRight ? 27.5 : 18.5;

  const eyesSvg = (() => {
    switch (expression) {
      case "happy":
        return (
          <>
            <path d={`M${eyeL-2} 13 Q${eyeL} 10.5 ${eyeL+2} 13`} stroke="#022c22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d={`M${eyeR-2} 13 Q${eyeR} 10.5 ${eyeR+2} 13`} stroke="#022c22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </>
        );
      case "blink":
        return (
          <>
            <line x1={eyeL-2} y1="12" x2={eyeL+2} y2="12" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <line x1={eyeR-2} y1="12" x2={eyeR+2} y2="12" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </>
        );
      case "wow":
        return (
          <>
            <circle cx={eyeL} cy="12" r="2" fill="#022c22" />
            <circle cx={eyeR} cy="12" r="2" fill="#022c22" />
          </>
        );
      default:
        return (
          <>
            <circle cx={eyeL} cy="12" r="1.6" fill="#022c22" />
            <circle cx={eyeR} cy="12" r="1.6" fill="#022c22" />
          </>
        );
    }
  })();

  const mouthSvg = (() => {
    switch (expression) {
      case "happy":
        return <path d={`M${mouthCenter-2.5} 15.5 Q${mouthCenter} 18 ${mouthCenter+2.5} 15.5`} stroke="#022c22" strokeWidth="1" strokeLinecap="round" fill="none" />;
      case "wow":
        return <circle cx={mouthCenter} cy="16" r="1.3" fill="#022c22" />;
      default:
        return <line x1={mouthCenter-2.5} y1="16" x2={mouthCenter+2.5} y2="16" stroke="#022c22" strokeWidth="1" strokeLinecap="round" />;
    }
  })();

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        willChange: "transform",
        touchAction: "none",
        userSelect: "none",
        cursor: "grab",
      }}
      onPointerDown={onPtrDown}
      onPointerMove={onPtrMove}
      onPointerUp={onPtrUp}
      onPointerCancel={onPtrUp}
    >

      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.6 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-xs font-bold leading-none text-emerald-900 shadow-md"
          >
            <span className="flex items-center gap-[4px]">
              <Sparkles className="h-3 w-3 text-emerald-500" />
              {message}
            </span>
            <div className="absolute -bottom-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={bodyRef}
        style={{
          transformOrigin: "bottom center",
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
          position: "relative"
        }}
      >

        <svg
          width={W}
          height={H}
          viewBox="0 0 30 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="bmoBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#a3e635" />
            </linearGradient>
            <linearGradient id="bmoSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#65a30d" />
            </linearGradient>
            <linearGradient id="bmoScreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>
          </defs>

          <line x1={antennaX} y1="5.5" x2={antennaX} y2="2.5" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx={antennaX} cy="1.5" r="1.5" fill="#fbbf24" stroke="#022c22" strokeWidth="0.8" />

          <rect x={sideX} y="7" width="5" height="23" rx="1.5" fill="url(#bmoSide)" stroke="#022c22" strokeWidth="1.2" />
          <line x1={sideX + 2.5} y1="10" x2={sideX + 2.5} y2="27" stroke="#022c22" strokeWidth="0.4" opacity="0.15" />
          <rect x={bodyX} y="5.5" width="23" height="27" rx="3.5" fill="url(#bmoBody)" stroke="#022c22" strokeWidth="1.5" />

          <rect x={bodyX + 2} y="8" width="2.2" height="7" rx="1.1" fill="white" opacity="0.18" />

          <rect x={screenX} y="8" width="18" height="10" rx="2" fill="url(#bmoScreen)" stroke="#022c22" strokeWidth="1" />

          {[10, 12, 14, 16].map((y) => (
            <line key={y} x1={scanlineX1} y1={y} x2={scanlineX2} y2={y} stroke="#022c22" strokeOpacity="0.04" strokeWidth="0.5" />
          ))}

          {eyesSvg}

          {mouthSvg}

          {(expression === "happy" || expression === "wow") && (
            <>
              <circle cx={blushL} cy="14.5" r="2" fill="#fda4af" opacity="0.3" />
              <circle cx={blushR} cy="14.5" r="2" fill="#fda4af" opacity="0.3" />
            </>
          )}

          <rect x={dpadX} y="21.5" width="7" height="2" rx="0.5" fill="#022c22" />
          <rect x={dpadVX} y="19" width="2" height="7" rx="0.5" fill="#022c22" />

          <circle cx={btnX} cy="21.5" r="1.8" fill="#f43f5e" stroke="#022c22" strokeWidth="0.6" />
          <circle cx={btnX} cy="26" r="1.8" fill="#38bdf8" stroke="#022c22" strokeWidth="0.6" />

          <rect x={spk1} y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
          <rect x={spk2} y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
          <rect x={spk3} y="29.5" width="2.5" height="0.7" rx="0.35" fill="#022c22" opacity="0.3" />
        </svg>

        <div className="flex justify-start" style={{ gap: 10, marginTop: -1, paddingLeft: isRight ? 9 : 3 }}>
          <div
            ref={legLRef}
            style={{
              width: 3.5,
              height: LEG,
              background: "#022c22",
              borderRadius: "0 0 2px 2px",
              transformOrigin: "top center",
            }}
          />
          <div
            ref={legRRef}
            style={{
              width: 3.5,
              height: LEG,
              background: "#022c22",
              borderRadius: "0 0 2px 2px",
              transformOrigin: "top center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
