import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import List from '../styles/List'

const UserList = () => {
    const [{userList, socket}] = useStateValue()
    return (
        <List>
            {userList?.map((item:string)=>(
                <>
               <li>{item}-{item === userList[0] && (
                   <>
                       Drawing
                   </>
               )} {item === socket.id &&(
                   <>
                       YOU
                   </>
               )}</li>
                </>
            ))}
        </List>
)
}

export default UserList
