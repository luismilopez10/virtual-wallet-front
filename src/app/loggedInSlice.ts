import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

const loggedInSlice = createSlice(
  {
    name: 'logged',
    initialState,
    reducers:{
      logInInReducer(state, action){
        const stateLoggedIn = {...state, user: action.payload}
        return stateLoggedIn
      },
      logOutInReducer(){        
        return {user: null}
      }
    }
  }
)

export default loggedInSlice.reducer

export const {logInInReducer, logOutInReducer} = loggedInSlice.actions