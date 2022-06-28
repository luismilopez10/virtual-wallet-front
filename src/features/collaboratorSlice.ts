import { createSlice } from "@reduxjs/toolkit"
import { getAllCollaborators } from "../actions/collaborators/getAllCollaborators";
import { postCollaborator } from "../actions/collaborators/postCollaborator";
import { putCollaborator } from "../actions/collaborators/putCollaborator";
import { RootState } from '../app/store'
import { requestStatus } from "./transaccionSlice"


type contactType={
    email:string;
    nickname:string;
}

type collaboratorType = {
    email: string ,
    name: string ,
    balance: number,
    contactsList:contactType[]    
    
}

interface collaboratorStateType {
    collaborators: collaboratorType[]
    status: requestStatus 
    error: string | null
}

const initialState: collaboratorStateType = {
    collaborators: [],
    status: requestStatus.IDLE,
    error: null,
}

const collaboratorSlice = createSlice({
    name: 'collaborators',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //GET collaborators
        builder.addCase(getAllCollaborators.pending, (state) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(getAllCollaborators.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            state.collaborators = action.payload
        })
        builder.addCase(getAllCollaborators.rejected, (state) => {
            state.status = requestStatus.FAILED
            state.error = "Ocurrio un error mientras se solicitaba la información de los colaboradores"
            state.collaborators = []
        })

        //POST collaborator
        builder.addCase(postCollaborator.pending, (state) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(postCollaborator.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            state.collaborators.push(action.payload)
        })
        builder.addCase(postCollaborator.rejected, (state) => {
            state.status = requestStatus.FAILED
            state.error = "Ocurrio un error mientras se registraba el colaborador"
        })

        //PUT collaborator
        builder.addCase(putCollaborator.pending, (state) => {
            state.status = requestStatus.PENDING
        })
        builder.addCase(putCollaborator.fulfilled, (state, action) => {
            state.status = requestStatus.COMPLETED
            let collaboratorUpdated = state.collaborators.filter(collaborator => collaborator.email === action.payload.email)[0]
            let positionCollaboratorUpdated = state.collaborators.indexOf(collaboratorUpdated)
            state.collaborators[positionCollaboratorUpdated] = action.payload
        })
        builder.addCase(putCollaborator.rejected, (state) => {
            state.status = requestStatus.FAILED
            state.error = "Ocurrio un error mientras se actualizaba la información del colaborador"
        })
    }
})

export type { collaboratorType }
export type { collaboratorStateType }
export default collaboratorSlice.reducer
export const selectCollaboratorStateTypeState = () => (state: RootState) => state.collaborator.collaborators
export const selectCollaboratorStateTypeStatus = () => (state: RootState) => state.collaborator.status   
export const selectCollaboratorStateTypeFetchError = () => (state: RootState) => state.collaborator.error