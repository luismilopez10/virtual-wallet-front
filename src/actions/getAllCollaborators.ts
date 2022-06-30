
const urlGet = "https://virtual-wallet-back-api.herokuapp.com/api/get/collaborator"

export const fetchAllCollaborators = async () => {
    let response = await fetch(urlGet)
    let data = response.json()
    return data
}