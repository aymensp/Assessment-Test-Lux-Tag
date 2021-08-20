import {  createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState : {
    editor: null  
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEditor: (state ,action) => {
      state.editor = action.payload.editor;
    },
  },

});

export const { setEditor } = appSlice.actions;

export const selectEditor = (state) => state.app.editor;

export default appSlice.reducer;