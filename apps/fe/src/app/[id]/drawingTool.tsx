'use client'

import { useEffect, useRef, useState } from "react";

type Tool = "line" | "rect" | "circle";

type Shape =
  | { type: "line"; start: { x: number; y: number }; end: { x: number; y: number } }
  | { type: "rect"; start: { x: number; y: number }; end: { x: number; y: number } }
  | { type: "circle"; start: { x: number; y: number }; end: { x: number; y: number } };

export default function DrawingBoard({socket,  roomId,}: any) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tool, setTool] = useState<Tool>("line");
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  const snapshotRef = useRef<ImageData | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event: MessageEvent) => {
        console.log("reached -1");

        if (typeof event.data !== 'string') {
            console.log("Not a string, skipping");
            return;
        }

        console.log("reached-0");

        try {
            const data = JSON.parse(event.data);

            console.log("reached-1");

            if (data.type !== "message") return;

            console.log("reached-2");

            console.log("message received:", data.message);

            const shape = data.message;
            drawFromSocket(shape);

        } catch (err) {
            console.error("JSON parse error:", event.data);
        }
    };
    }, [socket]);

    const drawFromSocket = (shape: Shape) => {
        const ctx = getCtx();
        if (!ctx) return;

        ctx.beginPath();

        if (shape.type === "line") {
            ctx.moveTo(shape.start.x, shape.start.y);
            ctx.lineTo(shape.end.x, shape.end.y);
        }

        if (shape.type === "rect") {
            ctx.rect(
            shape.start.x,
            shape.start.y,
            shape.end.x - shape.start.x,
            shape.end.y - shape.start.y
            );
        }

        if (shape.type === "circle") {
            const radius = Math.sqrt(
            Math.pow(shape.end.x - shape.start.x, 2) +
                Math.pow(shape.end.y - shape.start.y, 2)
            );
            ctx.arc(shape.start.x, shape.start.y, radius, 0, Math.PI * 2);
        }

        ctx.stroke();
        };

  const getCtx = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    setStart({ x, y });
    setIsDrawing(true);

    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !start) return;

    const ctx = getCtx();
    if (!ctx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;


    if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
    }

    ctx.beginPath();

    let shape: Shape | null = null;

    if (tool === "line") {
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(x, y);
    }

    if (tool === "rect") {
      const width = x - start.x;
      const height = y - start.y;
      ctx.rect(start.x, start.y, width, height);
    }

    if (tool === "circle") {
      const radius = Math.sqrt(
        Math.pow(x - start.x, 2) + Math.pow(y - start.y, 2)
      );
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
    }

    ctx.stroke();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !start) return;

        const ctx = getCtx();
        if (!ctx) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        let shape: Shape | null = null;

        ctx.beginPath();

        if (tool === "line") {
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(x, y);
            shape = { type: "line", start, end: { x, y } };
        }

        if (tool === "rect") {
            ctx.rect(start.x, start.y, x - start.x, y - start.y);
            shape = { type: "rect", start, end: { x, y } };
        }

        if (tool === "circle") {
            const radius = Math.sqrt(
            Math.pow(x - start.x, 2) + Math.pow(y - start.y, 2)
            );
            ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
            shape = { type: "circle", start, end: { x, y } };
        }

        ctx.stroke();

        console.log("message send" + shape);
        socket.send(JSON.stringify(
            {
                "type": "message",
                "roomId":roomId,
                "message": shape,
            }
        ));

        setIsDrawing(false);
        setStart(null);
    };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button className="bg-red-400 m-5 rounded border p-2" onClick={() => setTool("line")}>Line</button>
        <button className="bg-blue-400 m-5 rounded border p-2" onClick={() => setTool("rect")}>Rectangle</button>
        <button className="bg-green-400 m-5 rounded border p-2" onClick={() => setTool("circle")}>Circle</button>
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={400}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
