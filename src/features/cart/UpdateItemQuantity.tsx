import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

interface UpdateItemQuantityProps {
  pizzaId: string | number
  currentQuantity: number
}

export default function UpdateItemQuantity({ pizzaId, currentQuantity }: UpdateItemQuantityProps) {
  const dispatch = useDispatch()

  return (
    <div className='flex items-center gap-2 text-center md:gap-3'>
      <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
        -
      </Button>
      <span className='w-4 text-sm font-medium'>{currentQuantity}</span>
      <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  )
}
