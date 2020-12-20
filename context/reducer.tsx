import { io as openSocket } from "socket.io-client"
import {IS_BROWSER} from "../window";
interface Action {
    item: any,
    type: string
}
export const initialState = {
    socket: IS_BROWSER ? openSocket('http://localhost:8080') : null,
}
const reducer = (state=initialState, action:Action)=>{
    console.log(action)
    switch(action.type) {
        default:
            return state
    }
}
export default reducer;