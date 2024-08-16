import { configureStore } from '@reduxjs/toolkit';
import bidsReducer from '../Slice/BidsSlice';

const store = configureStore(
    {
        reducer: {
            bidList: bidsReducer
        }
    }
)

export default store;