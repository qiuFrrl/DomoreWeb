import { useRef, useEffect, useState } from "react";

export default function TalkPage({ setPage, robotNickname }) {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [targetRobot, setTargetRobot] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#feffff";
  }, []);

  const startDraw = (e) => {
    setDrawing(true);
    draw(e);
  };

  const endDraw = () => {
    setDrawing(false);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d");

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

  const sendDrawing = () => {
    alert(`Sent from ${robotNickname} to ${targetRobot}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-8">

        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => setPage("domore")}
            className="px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            Back
          </button>

          <div className="text-right">
            <p className="text-gray-400 text-sm">Logged as</p>
            <h2 className="font-bold text-cyan-400">
              {robotNickname}
            </h2>
          </div>

        </div>

        <div className="mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Talk with Domore's
          </h1>
          <p className="text-gray-400 mt-3">
            Send drawings between robots in realtime
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl">

          <input
            value={targetRobot}
            onChange={(e) => setTargetRobot(e.target.value)}
            placeholder="Talk with :"
            className="w-full mb-6 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none"
          />

          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-black">

            <canvas
              ref={canvasRef}
              width={1000}
              height={500}
              className="w-full h-[350px] md:h-[500px] touch-none cursor-crosshair"
              onMouseDown={startDraw}
              onMouseUp={endDraw}
              onMouseMove={draw}
              onMouseLeave={endDraw}
              onTouchStart={(e) => {
                const t = e.touches[0];
                startDraw({ clientX: t.clientX, clientY: t.clientY });
              }}
              onTouchMove={(e) => {
                const t = e.touches[0];
                draw({ clientX: t.clientX, clientY: t.clientY });
              }}
              onTouchEnd={endDraw}
            />

            <div className="absolute bottom-2 right-3 text-xs text-gray-300 bg-black/50 px-3 py-1 rounded-full">
              have fun gng
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <button
              onClick={clearCanvas}
              className="py-4 rounded-2xl border border-red-400/30 bg-red-500/10 hover:bg-red-500/20 transition"
            >
              CLEAR
            </button>

            <button
              onClick={sendDrawing}
              className="py-4 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500"
            >
              SEND
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}