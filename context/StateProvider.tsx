//setup data layer
import React,{createContext, useContext, useReducer} from 'react'
//Data Layer
export const StateContext = createContext<null | any>(null)
//Build a provider for this data layer
export const StateProvider = ({ reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
//this is how we use it
export const useStateValue = () => useContext(StateContext);
