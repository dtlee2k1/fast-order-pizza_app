import { CartItemType } from './cartItem.type'

export interface OrderType {
  id: string | number
  customer: string
  phone: string
  address: string
  priority: boolean
  estimatedDelivery: string
  cart: CartItemType[]
  position: string
  orderPrice: number
  priorityPrice: number
  status?: string
}
