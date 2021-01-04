import React, {useEffect, useRef, useState} from 'react';
import CanvasDraw from "react-canvas-draw";
import {useStateValue} from "../context/StateProvider";
interface CanvasProps {
    userList: string[]
}

const Canvas = ({userList}:CanvasProps) => {
    const [{socket}] = useStateValue()
    const canvasRef = useRef<CanvasDraw | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(20)
    useEffect(() => {
        socket.on('broadcast', (data: any) => {
            console.log("DRAWING BOARD CHANGED", data)
            canvasRef.current?.loadSaveData(data, true)
        })
    }, [])
    useEffect(()=>{
        if(socket.id !== userList[0]){
            setDisabled(true)
        }else {
            setDisabled(false)
        }
    },[userList])
    const handleDraw = () => {
        console.log('HEY')
        if (!canvasRef.current) return;
        socket.emit('on-draw', canvasRef.current.getSaveData())
    }
    useEffect(()=>{
        const countdown = setInterval(()=>{
            setTimer(current => {
                if(current === 0 ) {
                    console.log(userList)
                    const moveUser = userList.splice(0,1)
                    console.log(moveUser)
                };
                return current - 1
            })
            return () => clearInterval(countdown)
        },1000)
    },[userList])
    return (
        <>
            <h2>{timer}</h2>
            <CanvasDraw disabled={disabled} brushColor={'#ff5733'} ref={canvasRef} onChange={handleDraw}/>
        </>
    )
}
export default Canvas