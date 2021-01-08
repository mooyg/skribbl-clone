import React, { useEffect, useRef, useState, useMemo } from "react";
import CanvasDraw from "react-canvas-draw";
import { useStateValue } from "../Context/StateProvider";
import useSwitch from "../Hooks/useSwitch";
const Canvas = () => {
  const [{ socket, userList }, dispatch] = useStateValue();
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [timer, setTimer] = useState<number>(20);
  const [disabled, setDisabled] = useState<boolean>(false)
  useSwitch(timer, canvasRef, setTimer);
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
  useEffect(() => {
    if (userList.length <= 1) return;
    const countdown = setInterval(() => {
      setTimer((current) => current - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [userList]);
  useEffect(() =>{
    console.log("TURN OVER")
    if (socket.id !== userList[0]?.socketID) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userList])
  return (
    <>
      <h2>{timer}</h2>
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
