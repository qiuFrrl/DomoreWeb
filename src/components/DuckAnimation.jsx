import { useEffect, useRef } from "react";

const ACTIONS = ["walk","walk","walk","sit","sleep","sing","happy","shake"];

export default function DuckAnimation() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const stageRef = useRef(null);
  const state = useRef({ x: 200, dir: 1, action: "walk", timer: 80, tick: 0 });

  useEffect(() => {
    let raf;
    const s = state.current;

    const pickAction = () => {
      s.action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const dur = { walk: 80, sit: 50, sleep: 70, sing: 60, happy: 50, shake: 40 };
      s.timer = (dur[s.action] || 60) + Math.floor(Math.random() * 40);
    };

    const animate = () => {
      s.tick++;
      s.timer--;
      if (s.timer <= 0) pickAction();

      const svg = svgRef.current;
      const wrap = wrapRef.current;
      const stageW = stageRef.current?.offsetWidth || 400;
      if (!svg || !wrap) { raf = requestAnimationFrame(animate); return; }

      const el = (id) => svg.getElementById(id);
      const set = (id, attrs) => { const e = el(id); if(e) Object.entries(attrs).forEach(([k,v]) => e.setAttribute(k,v)); };

      set("body",  {cy:62}); set("head",{cy:36,cx:57}); set("neck",{cy:47,cx:55});
      set("beak",  {points:"68,36 76,34 68,38"}); set("tail",{cx:17,cy:55}); set("wing",{cx:44,cy:62});
      set("leg-l", {x1:33,y1:78,x2:28,y2:88}); set("foot-l",{x1:28,y1:88,x2:20,y2:88});
      set("leg-r", {x1:47,y1:78,x2:52,y2:88}); set("foot-r",{x1:52,y1:88,x2:60,y2:88});
      ["zzz","note","heart"].forEach(id => set(id,{opacity:0}));

      const t = s.tick;
      if (s.action === "walk") {
        const sw = t % 16 < 8 ? 1 : -1;
        set("leg-l",{x2:28+sw*5}); set("foot-l",{x1:28+sw*5,x2:20+sw*5});
        set("leg-r",{x2:52-sw*5}); set("foot-r",{x1:52-sw*5,x2:60-sw*5});
        const b = Math.sin(t*0.4)*1.5;
        set("body",{cy:62+b}); set("head",{cy:36+b}); set("neck",{cy:47+b});
        s.x += s.dir * 1.5;
        if (s.x > stageW - 80) { s.dir = -1; wrap.classList.add("flipped"); }
        if (s.x < 0)            { s.dir =  1; wrap.classList.remove("flipped"); }
      } else if (s.action === "sit") {
        set("body",{cy:68}); set("head",{cy:42}); set("neck",{cy:53});
        set("leg-l",{x2:36,y2:80}); set("foot-l",{x1:36,y1:80,x2:25,y2:82});
        set("leg-r",{x2:44,y2:80}); set("foot-r",{x1:44,y1:80,x2:55,y2:82});
      } else if (s.action === "sleep") {
        set("body",{cy:68}); set("head",{cy:44}); set("neck",{cy:55});
        set("zzz",{opacity:1}); set("leg-l",{y2:80,x2:36}); set("leg-r",{y2:80,x2:44});
      } else if (s.action === "sing") {
        const m = Math.sin(t*0.6)*2;
        set("beak",{points:`68,${36+m} 76,33 68,${38-m}`}); set("note",{opacity:1});
      } else if (s.action === "happy") {
        const j = Math.abs(Math.sin(t*0.5))*8;
        set("body",{cy:62-j}); set("head",{cy:36-j}); set("neck",{cy:47-j}); set("heart",{opacity:1});
      } else if (s.action === "shake") {
        const sh = Math.sin(t*0.8)*3;
        set("head",{cx:57+sh}); set("beak",{points:`${68+sh},36 ${76+sh},34 ${68+sh},38`});
        set("tail",{cx:17-sh});
      }

      wrap.style.left = s.x + "px";
      raf = requestAnimationFrame(animate);
    };

    s.x = (stageRef.current?.offsetWidth || 400) / 2 - 40;
    pickAction();
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
     <div className="w-full absolute bottom-0 left-0">
    <div ref={stageRef} className="w-full h-16 relative overflow-hidden">
      <div ref={wrapRef} className="absolute bottom-0 [&.flipped]:scale-x-[-1]" style={{ left: 200, width: 40, height: 45 }}>
        <svg ref={svgRef} viewBox="0 0 80 90" width="40" height="45" xmlns="http://www.w3.org/2000/svg">
            <ellipse id="body" cx="40" cy="62" rx="26" ry="18" fill="#7c3aed"/>
            <ellipse id="wing" cx="44" cy="62" rx="13" ry="9" fill="#6d28d9" transform="rotate(-10 44 62)"/>
            <ellipse id="neck" cx="55" cy="47" rx="8" ry="11" fill="#7c3aed"/>
            <circle id="head" cx="57" cy="36" r="12" fill="#8b5cf6"/>
            <circle cx="61" cy="33" r="2.2" fill="#1e1b4b"/>
            <circle cx="62" cy="32.2" r="0.7" fill="white"/>
            <polygon id="beak" points="68,36 76,34 68,38" fill="#fbbf24"/>
            <ellipse id="tail" cx="17" cy="55" rx="7" ry="5" fill="#6d28d9" transform="rotate(-30 17 55)"/>
            <line id="leg-l" x1="33" y1="78" x2="28" y2="88" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
            <line id="foot-l" x1="28" y1="88" x2="20" y2="88" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
            <line id="leg-r" x1="47" y1="78" x2="52" y2="88" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
            <line id="foot-r" x1="52" y1="88" x2="60" y2="88" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
            <g id="zzz" opacity="0">
              <text x="62" y="22" fontSize="9" fill="#a78bfa" fontFamily="sans-serif">z</text>
              <text x="68" y="15" fontSize="11" fill="#a78bfa" fontFamily="sans-serif">z</text>
              <text x="75" y="8" fontSize="13" fill="#a78bfa" fontFamily="sans-serif">z</text>
            </g>
            <g id="note" opacity="0">
              <text x="63" y="18" fontSize="14" fill="#fbbf24" fontFamily="sans-serif">♪</text>
            </g>
            <g id="heart" opacity="0">
              <text x="60" y="18" fontSize="13" fill="#f43f5e" fontFamily="sans-serif">♥</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}