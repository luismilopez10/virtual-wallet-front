import { createAsyncThunk } from "@reduxjs/toolkit";
import { collaboratorType } from "../../features/collaboratorSlice";


//TODO: cambiar la ruta por la real
const getallCollaboratorsUrl = "aqui va el endpoint de colaboradores"

export const getAllCollaborators = createAsyncThunk('getAllCollaborators', async () => {
    const response = await fetch(getallCollaboratorsUrl)
    return (await response.json() as collaboratorType[])
})