import { createSlice } from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isSideBarOpen: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            return {...state, isSideBarOpen: !state.isSideBarOpen}
        }
    }
})

export const {toggleSidebar} = sidebarSlice.actions

export default sidebarSlice.reducer