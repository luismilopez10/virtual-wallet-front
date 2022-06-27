import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store'
import { getAllTransacciones} from '../actions/getAllTransacciones'


export enum requestStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}

type transaccionType = {
    id:string
    origen: string,
    destinatario: string,
    cantidad: number,
    fecha: number
    
    
}


interface transaccionStateType {
    transacciones: transaccionType[],
    status: requestStatus,
    error: string | null
}

const initialState: transaccionStateType = {
    transacciones: [],
    status: requestStatus.IDLE,
    error: null,
}

const transaccionSlice = createSlice({
    name: 'transaccion',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //Traer las transacciones
        builder.addCase(getAllTransacciones.pending, (state, action) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(getAllTransacciones.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            state.transacciones = action.payload
        })
        builder.addCase(getAllTransacciones.rejected, (state, action) => {
            state.status = requestStatus.FAILED
            state.error = "Algo salio mal buscando las transacciones"
            state.transacciones = []
        })

}
})


export type { transaccionType }
export type { transaccionStateType }
export default transaccionSlice.reducer
export const selectTransaccionState = () => (state: RootState) => state.transacciones.transacciones
export const selectTransaccionStatus = () => (state: RootState) => state.transacciones.status
export const selectTransaccionFetchError = () => (state: RootState) => state.transacciones.error