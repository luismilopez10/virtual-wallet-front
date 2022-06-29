import { createAsyncThunk } from "@reduxjs/toolkit";
import { collaboratorType } from "../../features/collaboratorSlice";



const getallCollaboratorsUrl = "https://virtual-wallet-back-api.herokuapp.com/api/get/collaborator"

export const getAllCollaborators = createAsyncThunk('getAllCollaborators', async () => {
    const response = await fetch(getallCollaboratorsUrl)
    return (await response.json() as collaboratorType[])
})