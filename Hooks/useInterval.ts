import {useEffect} from 'react'
import { useStateValue } from '../Context/StateProvider';
const useInterval = (setTimer) =>{
    const [{userList}] = useStateValue()
    useEffect(() => {
        if (userList.length <= 1) return;
        const countdown = setInterval(() => {
          setTimer((current:number) => current - 1);
        }, 1000);
        return () => clearInterval(countdown);
      }, [userList]);
}
export default useInterval