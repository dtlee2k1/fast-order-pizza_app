import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import { Pizza } from '../../types/pizza.type'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from '../cart/DeleteItem'
import { addItem, getCart } from '../cart/cartSlice'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

interface MenuItemProps {
  pizza: Pizza
}

function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  const cart = useSelector(getCart)
  const isInCart = cart.map((item) => item.pizzaId).includes(id)
  const currentQuantity = cart.find((item) => item.pizzaId === id)?.quantity || 0

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className='flex gap-4 py-2'>
      <img className={`h-24  ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
      <div className='flex grow flex-col pl-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>Sold out</p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type='small' onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
