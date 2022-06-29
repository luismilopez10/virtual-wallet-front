import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionType } from "../../features/transaccionSlice";


const getallTransactionsOutUrl = "https://virtual-wallet-back-api.herokuapp.com/api/get/transactionout"

export const getAllTransactionsOut = createAsyncThunk('getAllTransactions', async (user: any) => {
    const response = await fetch(`${getallTransactionsOutUrl}/${user}`)
    return (await response.json() as transactionType[])
})