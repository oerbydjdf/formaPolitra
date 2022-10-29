import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = {
    colors: [],
    changeColor: '',
    indexChangeColor: -1,

}

export const politraSlice = createSlice({
    name: 'politra',
    initialState,
    reducers: {
        addColor: (state, action) => {
            state.colors.push(action.payload);
        },
        replacementColor: (state, action) => {
            state.changeColor = action.payload.color;
            state.indexChangeColor = action.payload.index;
        },
        replacement: (state) => {
            if(state.colors.includes(state.changeColor)) {
                let color = state.colors.at(-1);
                state.colors = state.colors.slice(0, state.colors.length -1);                
                state.colors.splice(state.indexChangeColor, 1, color);
                state.indexChangeColor = - 1;
            }

        },
        deleteColor: (state, index) => {
            state.colors = state.colors.filter((e, i) => index.payload !== i); 
        },
    },
})
export const {
    addColor, replacementColor, replacement, deleteColor,
} = politraSlice.actions

export default politraSlice.reducer