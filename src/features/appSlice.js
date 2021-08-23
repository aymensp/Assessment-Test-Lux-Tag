import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    editor: null,
    html: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEditor: (state, action) => {
      state.editor = action.payload.editor;
    },
    setHtml: (state, action) => {
      state.html = action.payload.html
    }
  },

});

export const { setEditor, setHtml } = appSlice.actions;

export const selectEditor = (state) => state.app.editor;

export const selectHtml = (state) => state.app.html;

export default appSlice.reducer;