import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'loading',
  initialState: {},
  reducers: {
    updateState: (state, { payload }) => {
      return { ...state, ...payload }
    }
  }
})