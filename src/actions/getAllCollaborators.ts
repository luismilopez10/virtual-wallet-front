
export const fetchAllCollaborators = async () => {
    let response = await fetch("https://virtual-wallet-back-api.herokuapp.com/api/get/collaborator")
    let data = response.json()
    return data
}