import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionType } from "../../features/transaccionSlice";


const getallTransactionsInUrl = "https://virtual-wallet-back-api.herokuapp.com/api/get/transactionin"

export const getAllTransactionsIn = createAsyncThunk('getAllTransactions', async (user:any) => {
    const response = await fetch(`${getallTransactionsInUrl }/${user}`)
    return (await response.json() as transactionType[])
})