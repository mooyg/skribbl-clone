import React, { useEffect } from "react";
import Header from "../styles/Header";
import Container from "../styles/Container";
import Canvas from "../Components/Canvas";
import CanvasContainer from "../styles/CanvasContainer";
import { useStateValue } from "../Context/StateProvider";
import UserList from "../styles/UserList";
const App = () => {
  const [{ socket, userList}, dispatch] = useStateValue();
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
      <UserList>
        {userList &&
          userList.map((item:string, index:number) => (
            <>
              <h2>
                {item}-{index}
              </h2>
            </>
          ))}
      </UserList>
      <CanvasContainer>
        <Canvas/>
      </CanvasContainer>
    </Container>
  );
};

export default App;
