import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const bidsSlice = createSlice(
    {
        name: 'bidList',
        initialState: { bids: [] },

        reducers:{
            addBid(state, action)
            {
                console.log(action.payload);
                state.bids.push(action.payload);
                console.log(state.bids);
            },

            deleteBid(state, action)
            {
                state.bids.splice(action.payload, 1);
            }, 

            clearAllBids(state, action)
            {
                state.bids = [];
            }
        }
    }
)

export const { addBid, deleteBid, clearAllBids } = bidsSlice.actions;
export default bidsSlice.reducer;