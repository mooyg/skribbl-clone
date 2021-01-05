import "../styles/globals.css";
import {AppProps} from 'next/app'
import {StateProvider} from "../Context/StateProvider";
import reducer, {initialState} from "../Context/reducer";
import React from "react";

function MyApp({Component, pageProps}: AppProps ){

    return(
        <StateProvider initialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
        </StateProvider>
    )
}

export default MyApp;
