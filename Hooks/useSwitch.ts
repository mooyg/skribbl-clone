import {useEffect} from 'react'
import { useStateValue } from '../Context/StateProvider';
const useSwitch = (timer:number, canvasRef, setTimer) =>{
const [{socket, userList}, dispatch] = useStateValue()
    useEffect(() => {
        if (timer === 0) {
          const copyArray = [...userList];
          const moveUser = copyArray.splice(0, 1);
          console.log(moveUser);
          dispatch({
            type: "SET_USERLIST",
            item: copyArray.concat(moveUser),
          });
          socket.emit('refresh-userList', copyArray.concat(moveUser))
          setTimer(20)
          canvasRef.current?.clear()
        }
      }, [timer]);
}
export default useSwitch