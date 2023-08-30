import axios from 'axios'
import { OrderType } from '../types/order.type'

const API_URL = 'https://react-fast-pizza-api.onrender.com/api'

export async function getMenu() {
  try {
    const res = await axios.get(`${API_URL}/menu`)
    return res.data.data
  } catch (error) {
    throw Error('Failed getting menu')
  }
}

export async function getOrder(id: number | string) {
  try {
    const res = await axios.get(`${API_URL}/order/${id}`)
    return res.data.data
  } catch (error) {
    throw Error(`Couldn't find order #${id}`)
  }
}

export async function createOrder(newOrder: OrderType) {
  try {
    const res = await axios.post(`${API_URL}/order`, JSON.stringify(newOrder), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data.data
  } catch {
    throw Error('Failed creating your order')
  }
}

export async function updateOrder(id: number | string, updateObj: Pick<OrderType, 'priority'>) {
  try {
    await axios.patch(`${API_URL}/order/${id}`, JSON.stringify(updateObj), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    throw Error('Failed updating your order')
  }
}
