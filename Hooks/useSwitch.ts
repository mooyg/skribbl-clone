import { useEffect } from "react";
import { useStateValue } from "../Context/StateProvider";
const useSwitch = (canvasRef) => {
  const [{ socket, userList }, dispatch] = useStateValue();
  useEffect(() => {
      const copyArray = [...userList];
      const moveUser = copyArray.splice(0, 1);
      console.log(moveUser);
      dispatch({
        type: "SET_USERLIST",
        item: copyArray.concat(moveUser),
      });
      const backendArray = copyArray.concat(moveUser).map((item)=>{
        return item.socketID
      })      
      socket.emit("refresh-userList", backendArray);
      canvasRef.current?.clear();
  }, []);
};
export default useSwitch;
