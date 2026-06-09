import { useRef, useEffect, useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase";
import SittingBmos from "../components/SittingBmos";

export default function TalkPage({ setPage, robotNickname }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [targetNickname, setTargetNickname] = useState("");
  const [tool, setTool] = useState("brush");
  const [brushSize, setBrushSize] = useState(6);
  const [targetStatus, setTargetStatus] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const checkTarget = async (nick) => {
    if (!nick.trim()) { setTargetStatus(null); return; }
    try {
      const snap = await get(ref(db, `robot/account/${nick.trim()}`));
      if (!snap.exists()) { setTargetStatus("notfound"); return; }
      const status = snap.val().status;
      setTargetStatus(status === "online" ? "online" : "offline");
    } catch {
      setTargetStatus(null);
    }
  };

  const getCtx = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = tool === "eraser" ? "#000000" : "#ffffff";
    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    return ctx;
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const { x, y } = getPos(e, canvas);
    const ctx = getCtx();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const endDraw = () => {
    setDrawing(false);
    getCtx().beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const { x, y } = getPos(e, canvas);
    const ctx = getCtx();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const sendDrawing = async () => {
    if (!targetNickname.trim()) return alert("Enter target nickname");
    if (targetStatus === "notfound") return alert("Nickname tidak ditemukan");
    if (targetStatus === "offline") return alert("Robot sedang offline");
    if (targetStatus !== "online") return alert("Cek status robot dulu");

    try {
      const targetSnap = await get(ref(db, `robot/account/${targetNickname.trim()}`));
      if (!targetSnap.exists()) return alert("Nickname tidak ditemukan");

      const targetPairCode = targetSnap.val().pairedWith;

      const canvas = canvasRef.current;
      const offscreen = document.createElement("canvas");
      offscreen.width = 128;
      offscreen.height = 64;
      const ctx2 = offscreen.getContext("2d");
      ctx2.drawImage(canvas, 0, 0, 128, 64);

      const imageData = ctx2.getImageData(0, 0, 128, 64);
      const pixels = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push(imageData.data[i + 3] > 128 ? 1 : 0);
      }

      const canvasKey = `${robotNickname}_to_${targetPairCode}`;

      await set(ref(db, `robot/canvas/${canvasKey}`), {
        from: robotNickname,
        to: targetPairCode,
        pixels,
        width: 128,
        height: 64,
        updatedAt: Date.now(),
      });

      alert("Drawing sent!");
    } catch (e) {
      alert(e.message);
    }
  };

  const statusConfig = {
    online:   { label: "Online",         dot: "bg-green-400", text: "text-green-400" },
    offline:  { label: "Offline",        dot: "bg-red-400",   text: "text-red-400"   },
    notfound: { label: "Tidak ditemukan", dot: "bg-gray-400", text: "text-gray-400"  },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080907] text-white">
      <div className="animated-grid absolute inset-0 opacity-60" />
      <div className="signal-sweep" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-200/70 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 md:py-8">
        <div className="mb-8 flex items-center justify-between md:mb-10">
          <button
            onClick={() => setPage("domore")}
            className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/72 backdrop-blur transition hover:border-lime-200/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/40 md:text-base"
          >
            Back
          </button>
          <div className="text-right">
            <p className="text-xs text-white/45 md:text-sm">Logged as</p>
            <h2 className="text-sm font-black text-lime-200 md:text-lg">{robotNickname}</h2>
          </div>
        </div>

        <div className="rise-in mb-8">
          <p className="mb-2 text-xs font-semibold uppercase text-emerald-100/55">
            Canvas channel
          </p>
          <h1 className="bg-gradient-to-r from-emerald-300 via-lime-200 to-amber-300 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl md:text-6xl">
            Talk with Domore's
          </h1>
          <p className="mt-4 text-base text-white/52 md:text-lg">have fun gng</p>
        </div>

        <div className="relative rise-in-delay">
          <SittingBmos />
          <div className="console-panel rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
            <div className="mb-6">
              <label className="text-sm font-medium text-white/65">Talk with :</label>
            <input
              type="text"
              placeholder="target robot nickname"
              value={targetNickname}
              onChange={(e) => {
                setTargetNickname(e.target.value);
                setTargetStatus(null);
              }}
              onBlur={(e) => checkTarget(e.target.value)}
              className="mt-3 w-full rounded-md border border-white/10 bg-black/45 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/25"
            />

            {targetStatus && statusConfig[targetStatus] && (
              <div className="mt-3 flex items-center gap-2 px-1">
                <span className={`w-2.5 h-2.5 rounded-full ${statusConfig[targetStatus].dot} animate-pulse`} />
                <span className={`text-sm font-semibold ${statusConfig[targetStatus].text}`}>
                  {statusConfig[targetStatus].label}
                </span>
              </div>
            )}
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setTool("brush")}
              className={`flex-1 rounded-md border px-5 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/40 sm:flex-none ${
                tool === "brush"
                  ? "border-emerald-300 bg-emerald-300 text-black"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              }`}
            >
              Brush
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`flex-1 rounded-md border px-5 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/40 sm:flex-none ${
                tool === "eraser"
                  ? "border-amber-300 bg-amber-300 text-black"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              }`}
            >
              Eraser
            </button>

            <div className="flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
              <span className="text-sm text-white/52">Size: {brushSize}px</span>
              <input
                type="range"
                min={2}
                max={40}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="min-w-0 flex-1 accent-lime-300 sm:w-28 sm:flex-none"
              />
              <div
                className="rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.4)]"
                style={{ width: brushSize, height: brushSize, minWidth: 4, minHeight: 4 }}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-lime-200/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.46)]">
            <canvas
              ref={canvasRef}
              width={1280}
              height={640}
              className="h-[300px] w-full touch-none cursor-crosshair bg-black sm:h-[400px] md:h-[500px]"
              onMouseDown={startDraw}
              onMouseUp={endDraw}
              onMouseMove={draw}
              onMouseLeave={endDraw}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                startDraw({ clientX: touch.clientX, clientY: touch.clientY });
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                draw({ clientX: touch.clientX, clientY: touch.clientY });
              }}
              onTouchEnd={endDraw}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={clearCanvas}
              className="rounded-md border border-red-300/30 bg-red-400/10 py-4 text-lg font-bold transition hover:border-red-200/45 hover:bg-red-400/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200/30"
            >
              CLEAR
            </button>
            <button
              onClick={sendDrawing}
              className="rounded-md bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 py-4 text-lg font-black text-black shadow-[0_14px_34px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/50"
            >
              SEND DRAWING
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
