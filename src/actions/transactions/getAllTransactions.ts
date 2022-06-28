import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionType } from "../../features/transaccionSlice";

//TODO: cambiar la ruta por la real
//TODO: separar en dos metodos segun el tipo de accion y modificar el slice respectivamente
const getallTransactionsUrl = "https://apimocha.com/wallet/all/trs"

export const getAllTransactions = createAsyncThunk('getAllTransactions', async () => {
    const response = await fetch(getallTransactionsUrl)
    return (await response.json() as transactionType[])
})