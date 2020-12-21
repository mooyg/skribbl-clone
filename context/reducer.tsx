import io from "socket.io-client"
import {IS_BROWSER} from "../window";
interface Action {
    item: any,
    type: string
}
export const initialState = {
    socket: IS_BROWSER ? io('http://localhost:8000') : null,
}
const reducer = (state=initialState, action:Action)=>{
    console.log(action)
    switch(action.type) {
        default:
            return state
    }
}
export default reducer;