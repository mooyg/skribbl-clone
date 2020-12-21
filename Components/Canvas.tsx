import React, {useEffect, useRef} from 'react';
import CanvasDraw from "react-canvas-draw";
import {useStateValue} from "../context/StateProvider";

const Canvas = () => {
    const [{socket}] = useStateValue()
    const canvasRef = useRef<CanvasDraw | null>(null)
    useEffect(() => {
            socket.on('broadcast', (data: any) => {
                console.log("DRAWING BOARD CHANGED", data)
                canvasRef.current?.loadSaveData(data, true)
            })
        }, [])
    const handleDraw = () => {
        console.log('HEY')
        if (!canvasRef.current) return;
        socket.emit('on-draw', canvasRef.current.getSaveData())
    }

    return (
        <>
            <CanvasDraw ref={canvasRef} onChange={handleDraw}/>
        </>
    )
}
export default Canvas;
