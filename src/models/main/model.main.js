import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'main',
  initialState: {
    text: ''
  },
  reducers: {
    saveState: (state, { payload }) => {
      return { ...state, ...payload }
    }
  }
})

export default ({
  ...authSlice,
  effects: {
    setText: (payload, { dispatch }) => {
      dispatch({ type: 'main/saveState', payload: { text: payload.text } })
    }
  }
})