import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loggedInReducer from './loggedInSlice';
import transaccionReducer from "../features/transaccionSlice";
import collaboratorReducer from "../features/collaboratorSlice";

const store = configureStore({
    reducer: {
        logged: loggedInReducer,
        transacciones:transaccionReducer,
        collaborator:collaboratorReducer
    },
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()