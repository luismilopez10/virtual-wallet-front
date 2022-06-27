import { createAsyncThunk } from "@reduxjs/toolkit";
import { transaccionType } from "../features/transaccionSlice";


const getallTransactionsUrl = "https://apimocha.com/wallet/all/trs"

export const getAllTransacciones = createAsyncThunk('getAllTransacciones', async () => {
    const response = await fetch(getallTransactionsUrl)
    return (await response.json() as transaccionType[])
})