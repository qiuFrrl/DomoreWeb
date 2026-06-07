import { useRef, useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export default function TalkPage({ setPage, robotNickname }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [targetRobot, setTargetRobot] = useState("");
  const [tool, setTool] = useState("brush");
  const [brushSize, setBrushSize] = useState(6);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

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
    if (!targetRobot.trim()) return alert("Enter target robot nickname");

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

    try {
      await set(ref(db, `robot/canvas/${robotNickname}`), {
        from: robotNickname,
        to: targetRobot,
        pixels,
        width: 128,
        height: 64,
      });

      alert("Drawing sent!");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <button
            onClick={() => setPage("domore")}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition text-sm md:text-base"
          >
            Back
          </button>
          <div className="text-right">
            <p className="text-gray-400 text-xs md:text-sm">Logged as</p>
            <h2 className="font-bold text-cyan-400 text-sm md:text-lg">{robotNickname}</h2>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Talk with Domore's
          </h1>
          <p className="text-gray-400 mt-4 text-base md:text-lg">Send drawings between robots in realtime.</p>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[28px] md:rounded-[32px] p-4 md:p-8 shadow-2xl">
          <div className="mb-6">
            <label className="text-sm text-gray-400">Talk with :</label>
            <input
              type="text"
              placeholder="target robot nickname"
              value={targetRobot}
              onChange={(e) => setTargetRobot(e.target.value)}
              className="w-full mt-3 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={() => setTool("brush")}
              className={`px-5 py-2 rounded-full font-bold text-sm transition border ${
                tool === "brush"
                  ? "bg-cyan-500 border-cyan-500 text-black"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              ✏️ Brush
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`px-5 py-2 rounded-full font-bold text-sm transition border ${
                tool === "eraser"
                  ? "bg-purple-500 border-purple-500 text-black"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              🧹 Eraser
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-gray-400">Size: {brushSize}px</span>
              <input
                type="range"
                min={2}
                max={40}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-28 accent-cyan-400"
              />
              <div
                className="rounded-full bg-white"
                style={{ width: brushSize, height: brushSize, minWidth: 4, minHeight: 4 }}
              />
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-cyan-500/20 bg-black shadow-lg shadow-cyan-500/10">
            <canvas
              ref={canvasRef}
              width={1280}
              height={640}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] touch-none cursor-crosshair"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button
              onClick={clearCanvas}
              className="py-4 rounded-2xl font-bold text-lg border border-red-400/30 bg-red-500/10 hover:bg-red-500/20 transition"
            >
              CLEAR
            </button>
            <button
              onClick={sendDrawing}
              className="py-4 rounded-2xl text-lg font-black tracking-wide bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-[1.01] active:scale-[0.98] transition shadow-xl shadow-cyan-500/20"
            >
              SEND DRAWING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}