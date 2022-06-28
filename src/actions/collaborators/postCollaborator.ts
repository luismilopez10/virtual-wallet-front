import { createAsyncThunk } from "@reduxjs/toolkit";
import { collaboratorType } from "../../features/collaboratorSlice";

//TODO: cambiar la ruta por la real
const postCollaboratorUrl = 'aqui va el endpoint de  postear colaboradores'

export const postCollaborator = createAsyncThunk('postCollaborator', async (collaborator: collaboratorType) => {
    const response = await fetch(postCollaboratorUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(collaborator)
    })
    return (await response.json()) as collaboratorType;
})