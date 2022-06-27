import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loggedInReducer from './loggedInSlice';

const store = configureStore({
    reducer: {
        logged: loggedInReducer
    },
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()