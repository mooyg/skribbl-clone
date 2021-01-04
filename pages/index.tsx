import React, {useEffect, useState} from 'react';
import Header from "../styles/Header";
import Container from "../styles/Container"
import Canvas from "../Components/Canvas";
import CanvasContainer from "../styles/CanvasContainer";
import {useStateValue} from "../context/StateProvider";
import UserList from "../styles/UserList";
    const App = () => {
        const [{socket}] = useStateValue()
        const [userList, setUserList] = useState<string[] >([])
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
                <UserList>
                    {userList && userList.map((item,index)=>(
                        <>
                            <h2>{item}-{index}</h2>
                        </>
                    ))}
                </UserList>
                <CanvasContainer>
    
                    <Canvas userList={userList}/>
                </CanvasContainer>
            </Container>
        );
    };
    
    export default App;
