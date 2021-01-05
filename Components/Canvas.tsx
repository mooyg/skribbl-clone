import React, {useEffect, useRef, useState} from 'react';
import CanvasDraw from "react-canvas-draw";
import {useStateValue} from "../Context/StateProvider";

const Canvas = () => {
    const [{socket, userList}] = useStateValue()
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
        console.log("TURN OVER")
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
        if(userList.length <=1 ) return;
        const countdown = setInterval(()=>{
            setTimer(current => {
                if(current === 0 ) {
                    console.log(userList)
                    return current + 20
                }
                return current - 1
            })
        },1000)
        return () => clearInterval(countdown)
    },[userList])
    return (
        <>
            <h2>{timer}</h2>
            {/*TODO: make my own Canvas*/}
            <CanvasDraw disabled={disabled} brushColor={'#ff5733'} ref={canvasRef} onChange={handleDraw}/>
        </>
    )
}
export default Canvas