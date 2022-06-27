import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import transaccionReducer from "../features/transaccionSlice"

const store = configureStore({
    reducer: {
        transacciones:transaccionReducer
        
    },
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()