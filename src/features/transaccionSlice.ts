import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store'
import { getAllTransactions } from '../actions/transactions/getAllTransactions'
import { postTransaction } from "../actions/transactions/postTransaction";


export enum requestStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}

type transactionType = {
    id:string
    source: string,
    receiver: string,
    amount: number,
    date: string
    
    
}


interface transactionStateType {
    transactions: transactionType[],
    status: requestStatus,
    error: string | null
}

const initialState: transactionStateType = {
    transactions: [],
    status: requestStatus.IDLE,
    error: null,
}

const transactionSlice = createSlice({
    name: 'transaccion',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //Traer las transacciones
        builder.addCase(getAllTransactions.pending, (state, action) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(getAllTransactions.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            state.transactions = action.payload
        })
        builder.addCase(getAllTransactions.rejected, (state, action) => {
            state.status = requestStatus.FAILED
            state.error = "Algo salio mal buscando las transacciones"
            state.transactions = []
        })
        //post a una transaccion
        builder.addCase(postTransaction.pending, (state) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(postTransaction.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            state.transactions.push(action.payload)
        })
        builder.addCase(postTransaction.rejected, (state) => {
            state.status = requestStatus.FAILED
            state.error = "Ocurrio un error mientras se generaba la transaccion"
        })

}
})


export type { transactionType }
export type { transactionStateType }
export default transactionSlice.reducer
export const selectTransaccionState = () => (state: RootState) => state.transacciones.transactions
export const selectTransaccionStatus = () => (state: RootState) => state.transacciones.status
export const selectTransaccionFetchError = () => (state: RootState) => state.transacciones.error