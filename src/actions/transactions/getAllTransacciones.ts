import { createAsyncThunk } from "@reduxjs/toolkit";
import { transaccionType } from "../../features/transaccionSlice";

//TODO: cambiar la ruta por la real
//TODO: separar en dos metodos segun el tipo de accion y modificar el slice respectivamente
const getallTransactionsUrl = "https://apimocha.com/wallet/all/trs"

export const getAllTransacciones = createAsyncThunk('getAllTransacciones', async () => {
    const response = await fetch(getallTransactionsUrl)
    return (await response.json() as transaccionType[])
})