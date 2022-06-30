export type Collaborator = {
    id: string,
    origin: string,
    to: string,
    amount: number,
    date: Date
}

const updateUrl = "https://virtual-wallet-back-api.herokuapp.com/api/update/collaborator"

export const updateCollaborator = async (collaborator:Collaborator) => {
    let collaboratorUpdatedPromise = await fetch(updateUrl,
        {
            method:'PUT',
            headers: {
                'Content-type':'application/json'
            },
            body:JSON.stringify(collaborator)
        }
    )
    let collaboratorUpdated = await collaboratorUpdatedPromise.json()
    return collaboratorUpdated
};
