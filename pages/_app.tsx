import "../styles/globals.css";
import {AppProps} from 'next/app'
import {StateProvider} from "../context/StateProvider";
import reducer, {initialState} from "../context/reducer";
import React from "react";

function MyApp({Component, pageProps}: AppProps ){

    return(
        <StateProvider initialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
        </StateProvider>
    )
}

export default MyApp;
