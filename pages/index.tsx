import React from 'react';
import Header from "../styles/Header";
import Container from "../styles/Container"
import Canvas from "../Components/Canvas";
import CanvasContainer from "../styles/CanvasContainer";
const App = () => {

    return (
        <Container>
            <Header>
             <i><h2>Skribbl...</h2></i>
            </Header>
            <CanvasContainer>
                <Canvas />
            </CanvasContainer>
        </Container>
    );
};

export default App;
