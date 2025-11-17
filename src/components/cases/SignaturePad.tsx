import { useRef, useEffect } from "react";

export function SignaturePad({ onSign }) {
  const canvasRef = useRef(null);
  let isDrawing = false;

  const startDrawing = (e) => {
    isDrawing = true;
    draw(e);
  };

  const endDrawing = () => {
    isDrawing = false;

    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onSign(dataUrl);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={150}
      className="border rounded-md bg-white cursor-crosshair"
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
    />
  );
}
