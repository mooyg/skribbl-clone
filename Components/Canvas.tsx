import React, {useRef } from 'react';
import CanvasDraw from "react-canvas-draw";
const Canvas = () => {
    const canvasRef = useRef<CanvasDraw | null>(null)
    const handleDraw = () =>{
        if(!canvasRef.current) return;
        console.log('Board changed')
        console.log(canvasRef.current.getSaveData())
    }
    return(
        <>
        <CanvasDraw ref={canvasRef} onChange={handleDraw}/>
        </>
    )
}
export default Canvas;
