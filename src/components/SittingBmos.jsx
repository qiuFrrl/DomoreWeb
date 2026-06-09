import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const W = 30;
const H = 36;
const LEG = 5;

function SittingBmo({ flip = false, side = "left", messageText }) {
  const [expression, setExpression] = useState("normal");
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const exprs = ["normal", "happy", "blink", "wow"];
    const iv = setInterval(() => {
      setExpression(exprs[Math.floor(Math.random() * exprs.length)]);
      setTimeout(() => setExpression("normal"), 2500);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (messageText) {
      if (Math.random() > 0.5) {
        setExpression("happy");
        setTimeout(() => setExpression("normal"), 3000);
      }
      setMessage(messageText);
      setShowBubble(true);
    } else {
      setShowBubble(false);
    }
  }, [messageText]);

  const isRight = flip; 

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
            <path d={`M${eyeL} 13 Q${eyeL+2} 10.5 ${eyeL+4} 13`} stroke="#022c22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d={`M${eyeR} 13 Q${eyeR+2} 10.5 ${eyeR+4} 13`} stroke="#022c22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </>
        );
      case "blink":
        return (
          <>
            <line x1={eyeL} y1="12" x2={eyeL+4} y2="12" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
            <line x1={eyeR} y1="12" x2={eyeR+4} y2="12" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          </>
        );
      case "wow":
        return (
          <>
            <circle cx={eyeL+2} cy="12" r="2" fill="#022c22" />
            <circle cx={eyeR+2} cy="12" r="2" fill="#022c22" />
          </>
        );
      default:
        return (
          <>
            <circle cx={eyeL+2} cy="12" r="1.6" fill="#022c22" />
            <circle cx={eyeR+2} cy="12" r="1.6" fill="#022c22" />
          </>
        );
    }
  })();

  const mouthSvg = (() => {
    switch (expression) {
      case "happy":
        return <path d={`M${mouthCenter-0.5} 15.5 Q${mouthCenter+2} 18 ${mouthCenter+4.5} 15.5`} stroke="#022c22" strokeWidth="1" strokeLinecap="round" fill="none" />;
      case "wow":
        return <circle cx={mouthCenter+2} cy="16" r="1.3" fill="#022c22" />;
      default:
        return <line x1={mouthCenter-0.5} y1="16" x2={mouthCenter+4.5} y2="16" stroke="#022c22" strokeWidth="1" strokeLinecap="round" />;
    }
  })();

  const bubbleOnRight = side === "left";

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className={`absolute bottom-full w-max max-w-[140px] whitespace-normal sm:max-w-none sm:whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-xs font-bold leading-tight text-emerald-900 shadow-md z-10 ${
              bubbleOnRight ? "right-0 mb-2" : "left-0 mb-2"
            }`}
          >
            <span className="flex items-start sm:items-center gap-[4px] font-sans text-left">
              <Sparkles className="mt-[1px] sm:mt-0 h-3 w-3 text-emerald-500 shrink-0" />
              <span className="break-words">{message}</span>
            </span>
            {bubbleOnRight ? (
              <svg className="absolute -bottom-[5px] right-[10px]" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M0 0 L10 0 L5 6 Z" fill="white" />
              </svg>
            ) : (
              <svg className="absolute -bottom-[5px] left-[10px]" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M0 0 L10 0 L5 6 Z" fill="white" />
              </svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}>
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
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="bmoSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bmoScreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
          </defs>

          <line x1={antennaX} y1="5.5" x2={antennaX} y2="2.5" stroke="#022c22" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx={antennaX} cy="1.5" r="1.5" fill="#fbbf24" stroke="#022c22" strokeWidth="0.8" />

          <rect x={sideX} y="7" width="5" height="23" rx="1.5" fill="url(#bmoSide)" stroke="#022c22" strokeWidth="1.2" />
          <line x1={sideX + 2.5} y1="10" x2={sideX + 2.5} y2="27" stroke="#022c22" strokeWidth="0.4" opacity="0.15" />

          <rect x={bodyX} y="5.5" width="23" height="27" rx="3.5" fill="url(#bmoBody)" stroke="#022c22" strokeWidth="1.5" />
          <rect x={bodyX + 0.5} y="8" width="2.2" height="7" rx="1.1" fill="white" opacity="0.18" />

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

        <div className="flex justify-start" style={{ gap: 6, marginTop: -2, paddingLeft: isRight ? 11 : 0 }}>
          <div style={{ width: LEG + 2, height: 3.5, background: "#022c22", borderRadius: isRight ? "0 2px 2px 0" : "2px 0 0 2px" }} />
          <div style={{ width: LEG + 2, height: 3.5, background: "#022c22", borderRadius: isRight ? "0 2px 2px 0" : "2px 0 0 2px" }} />
        </div>
      </div>
    </div>
  );
}

const randomMsgs1 = ["Wah lagi gambar apa tuh?", "Gambarnya bagus!", "Hehehe~", "Kerennn!", "Gitu doang?", "Ayo gambar lagi!", "🤖"];
const randomMsgs2 = ["Iya nih lagi mantau", "Wihh keren", "Wkwk", "Lagi ngapain sih?", "Hmm...", ":D", "Asyik banget"];

const story1 = [
  "Eh, lihat deh kanvas kosong di situ.",
  "Menurutmu hari ini bakal ada gambar keren nggak?",
  "Mungkin kali ini ada yang nggambar robot keren kayak kita?",
  "Atau jangan-jangan cuman mau dicoret-coret doang?",
  "Yasudah, kita duduk manis aja nonton dari sini deh."
];

const story2 = [
  "Iya nih, masih bersih banget.",
  "Bisa jadi! Aku udah siap jadi kritikus seni nih.",
  "Wah, pede banget! Emang ada yang lebih keren dari kita?",
  "Wkwk bener juga, kadang ada yang iseng doang.",
  "Siap! Ayo yang lagi pegang mouse, tunjukkan bakatmu!"
];

export default function SittingBmos() {
  const [msg1, setMsg1] = useState(null);
  const [msg2, setMsg2] = useState(null);

  useEffect(() => {
    let active = true;
    
    const runConversation = async () => {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      await wait(2000);

      let randomChatsSinceLastStory = 0;

      while (active) {
        const canTellStory = randomChatsSinceLastStory >= 8;
        const wantsToTellStory = Math.random() < 0.3;

        if (canTellStory && wantsToTellStory) {
          randomChatsSinceLastStory = 0;
          for (let i = 0; i < story1.length; i++) {
            if (!active) return;
            
            setMsg1(story1[i]);
            await wait(5500); 
            if (!active) return;
            setMsg1(null);
            
            await wait(1500); 
            if (!active) return;
            
            setMsg2(story2[i]);
            await wait(5500); 
            if (!active) return;
            setMsg2(null);
            
            await wait(1500); 
          }
          await wait(8000); 
        } else {
          randomChatsSinceLastStory++;
          if (!active) return;
          const isBmo1 = Math.random() > 0.5;
          
          if (isBmo1) {
            setMsg1(randomMsgs1[Math.floor(Math.random() * randomMsgs1.length)]);
            await wait(4500);
            if (!active) return;
            setMsg1(null);
          } else {
            setMsg2(randomMsgs2[Math.floor(Math.random() * randomMsgs2.length)]);
            await wait(4500);
            if (!active) return;
            setMsg2(null);
          }
          
          const pauseTime = 3000 + Math.random() * 5000;
          await wait(pauseTime);
        }
      }
    };
    
    runConversation();
    
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="absolute bottom-full right-1/4 md:right-80 flex items-end pointer-events-none z-20 translate-y-[2px]">
      <SittingBmo flip side="left" messageText={msg2} />
      
      <div className="ml-1">
        <SittingBmo side="right" messageText={msg1} />
      </div>
    </div>
  );
}
