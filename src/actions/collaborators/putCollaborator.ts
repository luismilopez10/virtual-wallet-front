import { createAsyncThunk } from "@reduxjs/toolkit";
import { collaboratorType } from "../../features/collaboratorSlice";

//TODO: cambiar la ruta por la real
const putCollaboratorUrl = 'aqui va el endpoint de  postear colaboradores'

export const putCollaborator = createAsyncThunk('putCollaborator', async (collaborator: collaboratorType) => {
    const response = await fetch(putCollaboratorUrl, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(collaborator)
    })
    return (await response.json()) as collaboratorType
})