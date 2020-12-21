import React, {useEffect, useState} from 'react';
import Header from "../styles/Header";
import Container from "../styles/Container"
import Canvas from "../Components/Canvas";
import CanvasContainer from "../styles/CanvasContainer";
import {useStateValue} from "../context/StateProvider";
import UserList from "../styles/UserList";
const App = () => {
    const [{socket}] = useStateValue()
    const [userList, setUserList] = useState<string[] | null>(null)
    useEffect(()=>{
        socket.on('new-connection', (data: string[])=>{
            setUserList(data)
        })
    },[])
    return (
        <Container>
            <Header>
             <i><h2>Skribbl...</h2></i>
            </Header>
            <CanvasContainer>
                {userList&& userList.map((item,index)=>(
                    <UserList>
                    {item}-{index}
                    </UserList>
                ))}
                <Canvas />
            </CanvasContainer>
        </Container>
    );
};

export default App;
