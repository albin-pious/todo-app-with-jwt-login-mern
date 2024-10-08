import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    username: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    username: '',
    isAuthenticated: false,
}; 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>)=>{
            state.username = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state)=>{
            state.username='',
            state.isAuthenticated=false
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 