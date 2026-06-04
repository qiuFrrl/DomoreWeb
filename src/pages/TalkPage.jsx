import { useRef, useEffect, useState } from "react";

export default function TalkPage({
  setPage,
  robotNickname,
}) {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);

  const [targetRobot, setTargetRobot] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#00ffff";
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

    const ctx = canvas.getContext("2d");

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const sendDrawing = () => {
    alert(
      `Drawing sent from ${robotNickname} to ${targetRobot}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-8">

        <div className="flex items-center justify-between mb-8 md:mb-10">

          <button
            onClick={() => setPage("domore")}
            className="
              px-4 py-2
              md:px-5 md:py-2
              rounded-full
              bg-white/10
              border border-white/10
              hover:bg-white/20
              transition
              text-sm md:text-base
            "
          >
             Back
          </button>

          <div className="text-right">
            <p className="text-gray-400 text-xs md:text-sm">
              Logged as
            </p>

            <h2 className="font-bold text-cyan-400 text-sm md:text-lg">
              {robotNickname}
            </h2>
          </div>

        </div>

        <div className="mb-8 md:mb-10">

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-black
              leading-tight
              bg-gradient-to-r
              from-cyan-400
              via-blue-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            Talk with Domore's
          </h1>

          <p className="text-gray-400 mt-4 text-base md:text-lg">
            Send drawings between robots in realtime.
          </p>

        </div>

        <div
          className="
            bg-white/10
            border border-white/10
            backdrop-blur-2xl
            rounded-[28px]
            md:rounded-[32px]
            p-4 md:p-8
            shadow-2xl
          "
        >

          <div className="mb-6 md:mb-8">

            <label className="text-sm text-gray-400">
              Talk with :
            </label>

            <input
              type="text"
              placeholder="target robot nickname"
              value={targetRobot}
              onChange={(e) =>
                setTargetRobot(e.target.value)
              }
              className="
                w-full
                mt-3
                px-5 py-4
                rounded-2xl
                bg-black/40
                border border-white/10
                text-white
                placeholder-gray-500
                outline-none
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/40
                transition
              "
            />

          </div>

          <div
            className="
              rounded-3xl
              overflow-hidden
              border border-cyan-500/20
              bg-black
              shadow-lg
              shadow-cyan-500/10
            "
          >

         <canvas
            ref={canvasRef}
            width={1000}
            height={500}
            className="
                w-full
                h-[300px]
                sm:h-[400px]
                md:h-[500px]
                touch-none
                cursor-crosshair
            "
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
            onMouseLeave={endDraw}
            onTouchStart={(e) => {
            const touch = e.touches[0];

            startDraw({
                clientX: touch.clientX,
                clientY: touch.clientY,
            });
            }}
            onTouchMove={(e) => {
            const touch = e.touches[0];

            draw({
                clientX: touch.clientX,
                clientY: touch.clientY,
            });
            }}
            onTouchEnd={endDraw}
        />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            <button
              onClick={clearCanvas}
              className="
                py-4
                rounded-2xl
                font-bold
                text-lg
                border border-red-400/30
                bg-red-500/10
                hover:bg-red-500/20
                transition
              "
            >
              CLEAR
            </button>

            <button
              onClick={sendDrawing}
              className="
                py-4
                rounded-2xl
                text-lg
                font-black
                tracking-wide
                bg-gradient-to-r
                from-cyan-500
                to-purple-500
                hover:scale-[1.01]
                active:scale-[0.98]
                transition
                shadow-xl
                shadow-cyan-500/20
              "
            >
              SEND DRAWING
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}