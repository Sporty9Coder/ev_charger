import React, { createContext, useContext, useReducer, useState } from 'react';
import { useEffect } from 'react';

export const BookingContext = createContext();

export const UserIDContext = createContext();


export const BidsContext = createContext();

export function handleBidsReducer(prevState, action) {
    switch (action.type) {
      case "Add": {
        const bids = [...prevState.bids , action.payload];
        localStorage.setItem('context' , JSON.stringify({bids}));
        return { ...prevState , bids : bids };
      }
  
      case "Delete": {
        const idx = action.payload;
        const newBids = prevState.bids.filter( (item, index) => index !== idx );
        localStorage.setItem('context' , JSON.stringify({bids : newBids}))
        return { ...prevState , bids : [...newBids] };
      }

      case "Set" : {
        return action.payload;
      }
        
      default:
        return prevState;
    }
  }


export function BidsContextProvider({ children }) {
    const [state, dispatch] = useReducer(handleBidsReducer, {
        bids : []
    });

    useEffect(()=>{
        const context = localStorage.getItem('context') || "";
        if(context){
            dispatch({ type: "Set", payload: JSON.parse(context)  });
        }
    }, [])

    return (
      <BidsContext.Provider value={{ ...state, dispatch }}>
        {children}
      </BidsContext.Provider>
    );
  }