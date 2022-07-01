import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionType } from "../../features/transaccionSlice";


const getallTransactionsInUrl = "https://virtual-wallet-back-api.herokuapp.com/api/get/transactions"

export const getAllTransactions = createAsyncThunk('getAllTransactions', async () => {
    const response = await fetch(getallTransactionsInUrl )
    return (await response.json() as transactionType[])
})