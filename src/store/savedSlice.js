import { createSlice } from '@reduxjs/toolkit'

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  }
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer