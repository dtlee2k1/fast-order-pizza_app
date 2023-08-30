import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItemType } from '../../types/cartItem.type'
import { RootState } from '../../store'

interface CartState {
  cart: CartItemType[]
}

const initialState: CartState = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action: PayloadAction<string | number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    increaseItemQuantity(state, action: PayloadAction<string | number>) {
      const selectedItem = state.cart.find((item) => item.pizzaId === action.payload)
      if (selectedItem) {
        selectedItem.quantity++
        selectedItem.totalPrice = selectedItem.unitPrice * selectedItem.quantity
      }
    },
    decreaseItemQuantity(state, action) {
      const selectedItem = state.cart.find((item) => item.pizzaId === action.payload)
      if (selectedItem && selectedItem.quantity > 1) {
        selectedItem.quantity--
        selectedItem.totalPrice = selectedItem.unitPrice * selectedItem.quantity
      }
    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export const { addItem, increaseItemQuantity, decreaseItemQuantity, deleteItem, clearCart } =
  cartSlice.actions

export const getCart = (state: RootState) => state.cart.cart

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.map((item) => item.quantity).reduce((total, item) => total + item, 0)

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.map((item) => item.totalPrice).reduce((total, item) => total + item, 0)

const cartReducer = cartSlice.reducer
export default cartReducer
