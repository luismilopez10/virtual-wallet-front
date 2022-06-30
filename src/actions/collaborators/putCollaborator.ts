import { createAsyncThunk } from "@reduxjs/toolkit";
import { collaboratorType } from "../../features/collaboratorSlice";


const putCollaboratorUrl = 'https://virtual-wallet-back-api.herokuapp.com/api/update/collaborator'

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