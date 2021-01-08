import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import List from '../styles/List'
interface userList {
    name: string,
    socketID: string

}
const UserList = () => {
    const [{userList}] = useStateValue()
    return (
        <List>
            {userList?.map((item:userList)=>(
                <>
               <li>{item.name}-{item.socketID}</li>
                </>
            ))}
        </List>
)
}

export default UserList
