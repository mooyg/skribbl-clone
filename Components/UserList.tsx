import React from 'react'
import { useStateValue } from '../Context/StateProvider'
import List from '../styles/List'
const UserList = () => {
    const [{userList}] = useStateValue()
    return (
        <List>
            {userList?.map(item=>(
                <>
                {item}
                </>
            ))}
        </List>
)
}

export default UserList
