import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import { useDispatch } from 'react-redux'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
