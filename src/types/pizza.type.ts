export interface Pizza {
  id: number | string
  name: string
  unitPrice: number
  ingredients: string[]
  soldOut: boolean
  imageUrl: string
}
