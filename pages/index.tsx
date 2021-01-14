import React, { useEffect } from "react";
import Header from "../styles/Header";
import Container from "../styles/Container";
import Canvas from "../Components/Canvas";
import CanvasContainer from "../styles/CanvasContainer";
import { useStateValue } from "../Context/StateProvider";
import UserList from '../Components/UserList';
import Chat from "../Components/Chat";
const App = () => {
  const [{ socket}, dispatch] = useStateValue();
  useEffect(() => {
    socket.on("new-connection", (data: string[]) => {

      dispatch({
        type: "SET_USERLIST",
        item: data,
      });
    
    });
  }, []);
  return (
    <Container>
      <Header>
        <i>
          <h2>Skribbl...</h2>
        </i>
      </Header>
      <UserList/>
      <CanvasContainer>
        <Canvas/>
      </CanvasContainer>
      <Chat/>
    </Container>
  );
};

export default App;
