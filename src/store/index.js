import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer
  }
})

export default store