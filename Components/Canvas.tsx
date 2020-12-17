import React, {useEffect, useRef, useState} from 'react';

interface coord {
    x: number,
    y: number,
}

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [mousePos, setMousePos] = useState<coord | null>(null)
    const [painting, setPainting] = useState<boolean>(false)
    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.style.width = `600px`;
        canvasRef.current.style.height = `400px`;
        canvasRef.current.style.backgroundColor = 'white'
        const context = canvasRef.current.getContext("2d")
        if (!context) return;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, [])
    const startDrawing = (event: any) => {
        console.log(event.clientX)
        if (!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.moveTo(event.clientX, event.clientY);
        setPainting(true);
    }
    const sketch = (event: any) => {
        if (!painting) {
            return;
        }
        console.log(event.clientX)
        if (!contextRef.current) return;

        contextRef.current.lineTo(event.clientX, event.clientY);
        contextRef.current.stroke();
    }
    return (
        <canvas onMouseUp={() => setPainting(false)} onMouseMove={sketch} onMouseDown={startDrawing} ref={canvasRef}/>
    );
};

export default Canvas;
