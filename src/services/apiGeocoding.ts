import axios from 'axios'
import { Position } from '../types/position.type'

export async function getAddress({ latitude, longitude }: Position) {
  try {
    const res = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    )
    return res.data
  } catch (error) {
    throw Error('Failed getting address')
  }
}
