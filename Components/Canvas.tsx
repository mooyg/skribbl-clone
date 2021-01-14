import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { useStateValue } from "../Context/StateProvider";
import axios from 'axios'
const Canvas = () => {
  const [{ socket, userList, currentWord } ,dispatch] = useStateValue();
  
  const canvasRef = useRef<CanvasDraw | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false)
  
  useEffect(()=>{
    socket.on('switch-player', (data:string[])=>{
      console.log(data)
      dispatch({
        type:"SET_USERLIST",
        item: data
      })
      canvasRef.current?.clear();
      axios.get('http://localhost:8000/get/word').then((res)=>{
        console.log("RANDOM WORD", res.data)
        dispatch({
          type:"SET_CURRENT_WORD",
          item: res.data
        })
      })
    })
  },[])

  useEffect(()=>{
    if(userList.length >= 2){
      console.log("START THE GAME")
      socket.emit('start-game')
    }
  },[userList])

  useEffect(() => {
    socket.on("broadcast", (data: any) => {
      console.log("DRAWING BOARD CHANGED", data);
      canvasRef.current?.loadSaveData(data, true);
    });
  }, []);
  
  const handleDraw = () => {
    if (!canvasRef.current) return;
    socket.emit("on-draw", canvasRef.current.getSaveData());
  };

  useEffect(() =>{
    console.log("TURN OVER")
    if (socket.id !== userList[0]) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userList])
  
  
  return (
    <>
      {/*TODO: make my own Canvas*/}
      <CanvasDraw
        disabled={disabled}
        brushColor={"#ff5733"}
        ref={canvasRef}
        onChange={handleDraw}
      />
    </>
  );
};
export default Canvas;
